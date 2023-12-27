import { useState } from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import serviceController, { routes, routeFilter } from 'controller'
import { isPendingAction, isFulfilledAction, isRejectedAction } from '../typehandle.action'
import { checkChange, splitedTime } from 'utils'
import productSlice from '../product'
import { cartStore } from 'service'

interface CartPropsType {
  langCode: string,
}

interface ResDataType {
  res: any
}

const initialState: any = {
  isLoading: false,
  isBottomReach: false,
  error: null,
  order_offset: 1,
  order_limit: 10,
  order_id: null
}

type GetCartPropsType = {
  order_id?: any
}
const getCart = createAsyncThunk < ResDataType, GetCartPropsType> ('cartSlice/getCart', async (data, thunkAPI) => {
  let { cart, other }: any = thunkAPI.getState()
  return await serviceController(`${routes.getCart}${cart?.createCart_data?.order_id || data?.order_id}?lang=${other?.langStore?.code || 'en'}`)
    .then(async res => {
      if (res?.data) {
        //royalty program conditions
        let isRoyaltyProgram = true
        // sorting order line with product_type (service | real product)
        let tmp = await res?.data?.order_lines?.sort((a: any, b: any) => (a.line_id < b.line_id))
        let productOnly: any = []
        tmp.map((item: any) => {
          if (item.line_ref === false) {
            productOnly.push(item)
          }
        })
        tmp.map((item: any) => {
          if (item.line_ref !== false) {
            let line_ref = null
            if (item.line_ref.toString().includes(',')) {
              let split = item.line_ref.toString().split(',')
              line_ref = split[split.length - 1]
            } else {
              line_ref = item.line_ref
            }
            for (let i = 0; productOnly?.length > i; i++) {
              if (productOnly[i].line_id.toString() === line_ref) {
                if (productOnly[i].promotion_lines === undefined) {
                  productOnly[i].promotion_lines = []
                }
                productOnly[i].promotion_lines.push(item)
              }
            }
          }
        })

        let final_products = await productOnly?.sort((a: any, b: any) => (b.product_template_id - a.product_template_id))
        final_products = await final_products?.filter((data: any) => data?.package_info !== 'package item')
        // calc cart product item count
        // let cart_item = tmp?.filter((x: any) => x.product_type === 'product')
        let cart_item_count = await final_products.reduce((total: any, value: any) => total + value.quantity, 0)

        //clear Chosen Gift Product
        if (await res?.data?.order_lines.length === 0 && res?.data?.gifts?.length > 0) {
          let pos_data: any = {
            order_id: cart?.createCart_data?.order_id
          }
          let gift_line: any = []
          res?.data?.gifts?.map((item: any) => {
            gift_line.push({
              gift_id: item?.id,
              gift_qty: 0,
            })
          })
          pos_data.gift_lines = gift_line
          thunkAPI.dispatch(updateGift(pos_data))
        }
        let { create_date, ...field } = res?.data
        let create_Date = ''
        if (create_date?.includes('T')) {
          create_Date = create_date?.split('T')[0]
        }
        cartStore.setCart(create_Date)
        return {
          isRoyaltyProgram,
          create_Date,
          ...field,
          cart_item_count,
          order_lines: final_products,
        }
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

type CreateCartProps = {
  langCode: string
  product_id: number
  qty: number
  variant_id: any
  package_item?: any
}


const createCart = createAsyncThunk < ResDataType, CreateCartProps> ('cartSlice/createCart', async (data, thunkAPI) => {
  let { langCode, ...field } = data
  let order_id = thunkAPI?.getState()?.cart?.createCart_data?.order_id
  let check_stock_data = thunkAPI?.getState()?.product?.getProductById_data?.check_stock
  let final_req_obj = field?.variant_id ? { ...field, variant_id: field?.variant_id?.toString() } : { ...field }
  return await serviceController(data?.package_item ? routes.createCartPackage : routes.createCart, final_req_obj)
    .then(async res => {
      if (res?.data?.status === 'success') {
        if (res?.data?.order_id) thunkAPI.dispatch(getCart({ order_id: res?.data?.order_id }))
        return res?.data
      } else {
        let final_obj = {
          order_id,
          data: res?.data
        }
        return final_obj
      }
    })
    .catch(error => error.message)
})


type UpdateQtyInCartPropsType = {
  item: any,
  c_index: any,
  field: any
}
const updateQtyInCart = createAsyncThunk < ResDataType, UpdateQtyInCartPropsType> ('cartSlice/updateQtyInCart', async (data, thunkAPI) => {
  let { item, c_index, ...field } = data
  return await serviceController(routes.updateQtyInCart, field)
    .then(async res => {
      if (res?.data) {
        await thunkAPI.dispatch(getCart({}))

        await thunkAPI.dispatch(
          cartSlice.actions.setCartList({
            key: 'check_stock',
            data: res?.data,
            c_index,
          })
        )
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const updateCustomer = createAsyncThunk('cartSlice/updateCustomer', async data => {
  return await serviceController(routes.updateCustomer, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})
const getPointRate = createAsyncThunk('cartSlice/getPointRate', async () => {
  return await serviceController(routes.getPointRate)
    .then(async res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})
type GetGiftProductPropsType = {
}
const getGiftProduct = createAsyncThunk('cartSlice/getGiftProduct', async (data: any, thunkAPI: any) => {
  const { page_no = 1, per_page = 30, lang } = data
  let getCart_data = thunkAPI.getState()?.cart?.getCart_data
  return await serviceController(`${routes.getGiftProduct}?lang=${lang}&page_no=${page_no}&per_page=${per_page}`)
    .then(res => {
      if (res?.data) {
        if (getCart_data?.gifts) {
          let final_arr: any = null
          let gift_data = res?.data?.gift_item
          for (let i = 0; i < gift_data?.length; i++) {
            getCart_data?.gifts?.map((item: any) => {
              if (item?.id === gift_data[i].id) {
                if (gift_data[i].quantity === undefined) {
                  gift_data[i].quantity = null
                }
                gift_data[i].quantity = item?.quantity
              }
            })
          }
          final_arr = {
            total_count: res?.data?.total_count,
            gift_item: gift_data
          }
          return final_arr
        } else {
          return res?.data
        }
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

const updateGift = createAsyncThunk('cartSlice/updateGift', async (data: any, thunkAPI: any) => {
  let { order_id, ...field } = data
  return await serviceController(`${routes.updateGift}/${order_id}/add/gift`, field)
    .then(async res => {
      if (res?.data) {
        if (res?.data.status === 'success') {
          await thunkAPI.dispatch(getCart({}))
        }
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const postRedeemPointToOrder = createAsyncThunk('cartSlice/postRedeemPointToOrder', async (data: any, thunkAPI: any) => {
  let Order_id = thunkAPI?.getState()?.cart?.createCart_data?.order_id
  let { order_id = Order_id, ...field } = data
  return await serviceController(`${routes.postRedeemPointToOrder}${order_id}/claim/discount`, data)
    .then(async res => {
      if (res?.data) {
        await thunkAPI.dispatch(getCart({}))

        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

type DeleteCartPropsType = {
  langCode: string,
}
const deleteCart = createAsyncThunk < ResDataType, DeleteCartPropsType> ('cartSlice/deleteCart', async (data, thunkAPI) => {
  let { langCode = 'en', ...field } = data
  return await serviceController(routes.deleteCart, { data: field })
    .then(async res => {
      if (res?.data) {
        await thunkAPI.dispatch(getCart({}))
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

type DeleteAllInCartPropsType = {
  langCode: string
  order_id: any
}
const deleteAllInCart = createAsyncThunk < ResDataType, DeleteAllInCartPropsType> ('cartSlice/deleteAllInCart', async (data: any, thunkAPI) => {
  let { langCode = 'en', ...field } = data
  return await serviceController(routes.deleteAllInCart, { data: field })
    .then(async res => {
      if (res?.data) {
        await thunkAPI.dispatch(getCart({}))
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getShippingAddress = createAsyncThunk('cartSlice/getShippingAddress', async (thunkAPI: any) => {
  let langCode = thunkAPI?.getState()?.other?.langStore?.code
  return await serviceController(`${routes.getShippingAddress}?lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        let tmp = {
          data: res?.data
        }
        return tmp
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getShippingAddressById = createAsyncThunk('cartSlice/getShippingAddressById', async id => {
  return await serviceController(`${routes.getShippingAddressById}${id}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const createShippingAddress = createAsyncThunk('cartSlice/createShippingAddress', async (data, thunkAPI) => {
  let { auth, cart } = thunkAPI.getState()
  return await serviceController(routes.createShippingAddress, data)
    .then(async res => {
      if (res?.data) {
        if (auth?.getProfile_data) {
          await thunkAPI.dispatch(getShippingAddress())
          let getShippingAddressById_res = null
          if (res?.data?.id) {
            getShippingAddressById_res = await thunkAPI.dispatch(getShippingAddressById(res?.data?.id))
          }
          if (getShippingAddressById_res?.payload?.id) {
            await thunkAPI.dispatch(handleSelectShippingAddress(getShippingAddressById_res?.payload))
          }
        } else {
          // await thunkAPI.dispatch(joinShippingAndOrder({ id: res?.data?.id, order_id: cart.createCart_data?.order_id }))
          // await thunkAPI.dispatch(getCart({}))
        }
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const editShippingAddress = createAsyncThunk('cartSlice/editShippingAddress', async (data: any, thunkAPI) => {
  let { shipping_id, ...field } = data
  return await serviceController(`${routes.editShippingAddress}${shipping_id}`, field)
    .then(res => {
      if (res?.data) {
        thunkAPI.dispatch(getShippingAddress())
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const removeShippingAddress = createAsyncThunk('cartSlice/removeShippingAddress', async (id, thunkAPI: any) => {
  let order_id = thunkAPI?.getState()?.cart?.createCart_data?.order_id || null
  return await serviceController(`${routes.removeShippingAddress}${id}?order_id=${order_id}`)
    .then(res => {
      if (res?.data) {
        thunkAPI.dispatch(getShippingAddress())
        thunkAPI.dispatch(getCart({}))
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getDeliveryFee = createAsyncThunk('cartSlice/getDeliveryFee', async township_id => {
  return await serviceController(`${routes.getDeliveryFee}?township_id=${township_id}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getShippingLocations = createAsyncThunk('cartSlice/getShippingLocations', async (country_code, thunkAPI: any) => {
  let langCode = thunkAPI?.getState()?.other?.langStore?.code
  return await serviceController(`${routes.getShippingLocations}${country_code}?lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

type GetAllLocationPropsType = {
  country_code: string,
  lang: string
}
const getAllLocation = createAsyncThunk < ResDataType, GetAllLocationPropsType> ('cartSlice/getAllLocation', async data => {
  let { country_code = 'MM', lang, ...field } = data
  return await serviceController(`${routes.getAllLocation}${country_code}?lang=${lang}`)
    .then(async res => {
      if (res?.data) {
        let final_data = {
          data: res?.data
        }
        return final_data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

type JoinShippingAndOrderPropsType = {
  data?: any
  id?: any
  order_id?: any
}
const joinShippingAndOrder = createAsyncThunk < ResDataType, JoinShippingAndOrderPropsType> ('cartSlice/joinShippingAndOrder', async data => {
  return await serviceController(routes.joinShippingAndOrder, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getPaymentList = createAsyncThunk('cartSlice/getPaymentList', async () => {
  return await serviceController(routes.getPaymentList)
    .then(async res => {

      if (res?.data) {
        let tmp = checkChange('id', { data: res.data }, res?.data?.[0]?.id, 'single')
        let final_res: any = {
          data: tmp,
        }
        if (tmp?.length > 0) {
          let check_tmp = tmp.filter(x => x.check)?.[0]?.id
          final_res.selected_payment_id = check_tmp
        }
        return final_res
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const payNow = createAsyncThunk('cartSlice/payNow', async (data: any, thunkAPI) => {
  const { pay_method, ...field } = data
  return await serviceController(pay_method === 'bppay' ? `${routes.PayNow_BPpay}?order_id=${data?.order_id}` : routes.payNow, field)
    .then(async res => {
      if (res?.data) {
        thunkAPI.dispatch(getOrder({ offset: 1, limit: 10 }))
        if (res?.data?.status === 'success') {
          await thunkAPI.dispatch(cartSlice.actions.resetCart())
        }
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})


type GetOrderPropsType = {
  limit?: number,
  offset?: number,
  isStateClean?: boolean
}
const getOrder = createAsyncThunk < ResDataType, GetOrderPropsType> ('cartSlice/getOrder', async (data, thunkAPI: any) => {
  let { limit, offset, isStateClean = true, ...field } = data
  let order_data: any = thunkAPI.getState().cart.getOrder_data
  !isStateClean &&
    thunkAPI.dispatch(
      cartSlice.actions.handleBottomReach({
        isLoading: false,
        isBottomReach: true,
        order_offset: offset,
      })
    )

  return await serviceController(`${routes.getOrder}?page_no=${offset}&per_page=${limit}`)
    .then(res => {
      if (res?.data) {
        if (order_data && !isStateClean) {
          let obj = {
            ...order_data,
            orders: [...order_data.orders, ...res.data.orders],
          }
          !isStateClean &&
            thunkAPI.dispatch(
              cartSlice.actions.handleBottomReach({
                isLoading: false,
                isBottomReach: false,
              })
            )
          return obj
        } else {
          isStateClean
            ? thunkAPI.dispatch(cartSlice.actions.handleBottomReach({ order_offset: 1 }))
            : thunkAPI.dispatch(
              cartSlice.actions.handleBottomReach({
                isLoading: false,
                isBottomReach: false,
              })
            )
          return res.data
        }
      } else {
        !isStateClean &&
          thunkAPI.dispatch(
            cartSlice.actions.handleBottomReach({
              isLoading: false,
              isBottomReach: false,
            })
          )
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getOrderById = createAsyncThunk('cartSlice/getOrderById', async id => {
  return await serviceController(`${routes.getOrderById}${id}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const handleSelectShippingAddress = createAsyncThunk('cartSlice/selectShippingAddress', async (data?: any, thunkAPI?: any) => {
  let { id, ...field } = data
  let { getShippingAddress_data, createCart_data, createShippingAddress_data } = thunkAPI.getState().cart
  let tmp = checkChange('id', getShippingAddress_data, id, 'single')
  if (tmp?.length > 0) {
    let selected_item = tmp.filter(x => x.check)?.[0]
    let final_res = {
      selected_item,
      data: tmp
    }
    if (selected_item?.id) {
      await thunkAPI.dispatch(joinShippingAndOrder({ id: selected_item?.id, order_id: createCart_data?.order_id }))
    }
    // await thunkAPI.dispatch(getCart({}))
    // await thunkAPI.dispatch(cartSlice.actions.setShippingAddress({ key: 'getShippingAddress_data', data: final_res }))
    return final_res
  } else {
    await thunkAPI.dispatch(joinShippingAndOrder({ id: createShippingAddress_data?.ID, order_id: createCart_data?.order_id }))
  }
})

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCartList: (state: any, action: any) => {
      state.getCart_data.order_lines[action.payload.c_index][action.payload.key] = action.payload.data
    },
    setLocationList: (state: any, action: any) => {
      let { type, checkListItem, data, actionType } = action.payload
      let tmp = checkChange(type, checkListItem, data, actionType)
      let selected_item = tmp.filter(x => x.check)
      let arr: any[] = []
      selected_item?.map(x => arr.push(x.id))
      let obj: any = {
        data: [{
          ...state.getAllLocation_data.data[0],
          state_ids: tmp
        }],
        selected_ids: arr,
        selected_item: selected_item,
      }
      state.getAllLocation_data = obj
    },
    setQtyInCartList: (state: any, action: any) => {
      state.getCart_data.order_lines[action.payload.c_index].quantity = action.payload.quantity
    },
    handleBottomReach: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    setShippingAddress: (state, action) => {
      state[action.payload.key] = action.payload.data
    },
    setGiftQty: (state: any, action: any) => {
      if (action.payload.quantity <= state.getGiftProduct_data.gift_item[action.payload.id].stock) {
        state.getGiftProduct_data.gift_item[action.payload.id].quantity = action.payload.quantity
      } else {
        state.getGiftProduct_data.gift_item[action.payload.id].quantity = state.getGiftProduct_data.gift_item[action.payload.id].stock
      }
    },
    resetCart: (state?: any, action?: any) => {
      state.createCart_data = null
      state.getCart_data = null
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction('cartSlice/'), state => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addMatcher(isFulfilledAction('cartSlice/'), (state, action) => {
        let tmp = action.type.split('/')
        return {
          ...state,
          [tmp[1] + '_data']: action.payload,
          isLoading: false,
          error: null,
        }
      })
      .addMatcher(isRejectedAction('cartSlice/'), (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
  },
})

export default {
  cartSlice: cartSlice.reducer,
  setCartList: cartSlice.actions.setCartList,
  resetCart: cartSlice.actions.resetCart,
  handleBottomReach: cartSlice.actions.handleBottomReach,
  setQtyInCartList: cartSlice.actions.setQtyInCartList,
  setLocationList: cartSlice.actions.setLocationList,
  setGiftQty: cartSlice.actions.setGiftQty,
  handleSelectShippingAddress,
  postRedeemPointToOrder,
  getCart,
  createCart,
  updateQtyInCart,
  getGiftProduct,
  updateGift,
  getPointRate,
  updateCustomer,
  deleteCart,
  deleteAllInCart,
  getShippingAddress,
  getShippingAddressById,
  createShippingAddress,
  editShippingAddress,
  removeShippingAddress,
  getDeliveryFee,
  getShippingLocations,
  getAllLocation,
  joinShippingAndOrder,
  getPaymentList,
  payNow,
  getOrder,
  getOrderById,
}