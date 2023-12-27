import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import serviceController, { routes, routeFilter } from 'controller'
import { isPendingAction, isFulfilledAction, isRejectedAction } from '../typehandle.action'
import { checkChange, calcuPromo, wishlistHandleChange, UnitArray, handleNestedChange } from 'utils'
import { forEachChild } from 'typescript'

interface ProductPropsType {
  langCode: string
}

interface ResDataType {
  res: any
}

const initialState = {
  isLoading: false,
  error: null,
  isBottomReach: false,
  product_offset: 1,
  product_limit: 10,
  sortBy: '',
}

type SentProductRatingPropsType = {
  id: any
}
const sentProductRating = createAsyncThunk < ResDataType, SentProductRatingPropsType> ('productSlice/sentProductRating', async data => {
  let { id, ...fields } = data
  return await serviceController(`${routes.sentProductRating}${id}/ratingreview`, fields)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})


type GetProductPropsType = {
  isStateClean?: boolean,
  page_number?: number,
  params?: any
}
const getProduct = createAsyncThunk < ResDataType, GetProductPropsType> ('productSlice/getProduct', async (data, thunkAPI: any) => {
  let { isStateClean = true, ...field } = data
  let product_data = thunkAPI.getState().product.getProduct_data
  !isStateClean && thunkAPI.dispatch(productSlice.actions.handleBottomReach({ isLoading: false, isBottomReach: true, product_offset: field.page_number }))

  return await serviceController(`${routes.getProduct}${routeFilter(field)}`)
    .then(async res => {
      if (res?.data) {
        if (product_data && !isStateClean) {
          let obj = {
            ...product_data,
            product_list: [...product_data.product_list, ...res.data.product_list]
          }
          !isStateClean && thunkAPI.dispatch(productSlice.actions.handleBottomReach({ isLoading: false, isBottomReach: false }))
          // calc promotion
          let final_res = await calcuPromo(obj, 'product_list')
          return final_res
        } else {
          isStateClean ? thunkAPI.dispatch(productSlice.actions.handleBottomReach({ product_offset: 1 }))
            :
            thunkAPI.dispatch(productSlice.actions.handleBottomReach({ isLoading: false, isBottomReach: false }))
          // calc promotion
          let final_res = await calcuPromo(res.data, 'product_list')
          return final_res
        }
      } else {
        !isStateClean && thunkAPI.dispatch(productSlice.actions.handleBottomReach({ isLoading: false, isBottomReach: false }))
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetPackageProductPropsType = {
  id?: any
}
const getPackageProduct = createAsyncThunk('productSlice/getPackageProduct', async (id, thunkAPI: any) => {
  return await serviceController(`${routes.getPackageProduct}${id ? `?category_id=${id}` : ''}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})


type GetProductByIdPropsType = {
  id: any,
  langCode?: string
}
const getProductById = createAsyncThunk < GetProductByIdPropsType > ('productSlice/getProductById', async (data, thunkAPI: any) => {
  let getProfile_data = thunkAPI.getState()?.auth?.getProfile_data
  return await serviceController(`${routes.getProductById}${data.id}?lang=${data.langCode}`)
    .then(async (res: any) => {
      if (res?.data) {
        let obj = {
          quantity: 1,
          product_id: data.id,
          ...res.data,
        }
        // change calc promotion json //
        if (res?.data?.promotion?.length > 0) {
          let promo_arr = await UnitArray(res?.data?.promotion, 'promotion_program_id')
          obj.promotion = promo_arr || []
          let final_res = await calcuPromo(obj, 'product_list', 'discount')
          obj = {
            ...final_res,
          }
          if (obj.promo_price) obj.promo_price = obj.promo_price.toFixed(2)
        }
        // change product gallery json //
        let gall_arr: any[] = []
        if (res?.data?.gallery?.length < 0) {
          if (res?.data?.image) {
            gall_arr.push({ image: res?.data.image })
          }
        } else {
          for (let i = 0; res?.data?.gallery.length > i; i++) {
            gall_arr.push({ image: res?.data?.gallery[i]?.image_url })
          }
          obj.gallery = gall_arr
        }
        // change attributes json //
        if (res?.data?.package_product_type) {
          let arr: any[] = []
          res?.data?.package_products?.length > 0 && res?.data?.package_products?.map((x: any) => {
            if (x?.attributes?.length > 0) {
              obj.check_stock = { desc: 'select_variant_attributes_each_product' }
              arr.push({
                ...x,
                check_stock: { desc: 'select_variant_each_attributes' },
                attributes: {
                  data: x.attributes
                }
              })
            } else {
              arr.push({
                ...x,
                attributes: {
                  data: x.attributes
                }
              })
            }
          })
          obj.package_products = {
            data: arr
          }
        } else if (res?.data?.attributes?.length > 0) {
          obj.check_stock = { desc: 'select_variant_each_attributes' }
          if (getProfile_data) {
            obj.check_wishlist = { exist: false }
          }
          obj.attributes = {
            data: res?.data?.attributes,
          }
        } else {
          let pos_data = {
            product_id: data.id,
            quantity: 1,
            item: res.data,
          }
          pos_data.order_id = thunkAPI?.getState()?.cart?.createCart_data?.order_id
          let check_stock_res = await thunkAPI.dispatch(checkStock(pos_data))
          obj.check_stock = { ...check_stock_res?.payload }

          if (getProfile_data) {
            let check_wishlist_res = await thunkAPI.dispatch(getExistsWishlist(pos_data))
            let myBool = check_wishlist_res?.payload?.exist === true
            let res_obj = {
              ...check_wishlist_res.payload,
              exist: myBool,
            }
            obj.check_wishlist = res_obj
          }
        }
        return obj
      } else {
        return res?.data
      }
    })
    .catch((error: any) => console.log('error.message', error.message))
})

const getProductCategory = createAsyncThunk('productSlice/getProductCategory', async (data, thunkAPI: any) => {
  return await serviceController(`${routes.getProductCategory}${routeFilter(data)}`)
    .then(res => {
      if (res?.data) {
        let tmp = handleNestedChange(res?.data, 'category_id', 'sub_category')
        let obj = {
          data: tmp,
          key: thunkAPI.getState().product.getProductCategory_data?.key,
          max_price: thunkAPI.getState().product.getProductCategory_data?.max_price,
          selected_ids: thunkAPI.getState().product.getProductCategory_data?.selected_ids
        }
        return obj
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type CheckStockPropsType = {
  item?: any,
  type?: any,
  variant_id?: any,
  package_product_index?: any
}
const checkStock = createAsyncThunk < CheckStockPropsType > ('productSlice/checkStock', async (data, thunkAPI) => {

  let { item, package_product_index, type = 'productbyid', ...field } = data
  if (item?.attributes?.data?.length > 0) {
    if (item?.attributes?.data?.length === field?.variant_id?.toString()?.split(',')?.length) {
      let res: any = await handleCheckStockApi(data, thunkAPI)
      return res
    } else {
      if (type === 'productbyid') {
        await thunkAPI.dispatch(
          productSlice.actions.setProductDetail({
            key: 'check_stock',
            data: { desc: 'select_variant_each_attributes' },
          })
        )
      } else if (type === 'wishlist') {
        await thunkAPI.dispatch(
          productSlice.actions.setWishlistList({
            key: 'check_stock',
            data: { desc: 'select_variant_each_attributes' },
          })
        )
      } else if (type === 'cartlist') {
      } else if (type === 'addtocart') {
        await thunkAPI.dispatch(
          productSlice.actions.setProductDetail({
            key: 'check_stock',
            data: { desc: 'select_variant_each_attributes' },
          })
        )
        return { desc: 'select_variant_each_attributes' }
      } else {
      }
    }
  } else {
    let res = await handleCheckStockApi(data, thunkAPI)
    return res
  }
})

type HandleCheckStockApiProps = {
  item?: any,
  type?: string,
  w_index?: any,
  variant_id?: any,
  quantity?: number,
  package_product_index?: any
  product_id?: any
}
const handleCheckStockApi = async (data: HandleCheckStockApiProps, thunkAPI: any) => {
  let getProductById_data = thunkAPI.getState()?.product?.getProductById_data
  let { item, type = 'productbyid', w_index, package_product_index, ...field } = data

  if (item?.variant_id && type === 'wishlist') {
    field.variant_id = item.variant_id
  }
  if (data?.package_item?.length > 0) {
    field.package_item = data?.package_item
  }


  return await serviceController(routes.checkStock, field)
    .then(async (res: any) => {
      if (res?.data?.status) {
        await thunkAPI.dispatch(
          productSlice.actions.setHandleQty({
            qty: field?.quantity,
            type,
            w_index,
            package_product_index,
            key: 'check_stock',
            data: { ...res.data, id: field.product_id },
          })
        )
        return res?.data
      } else {
        if (type === 'productbyid') {
          await thunkAPI.dispatch(
            productSlice.actions.setProductDetail({
              key: 'check_stock',
              data: res.data,
            })
          )
          await thunkAPI.dispatch(
            productSlice.actions.setProductDetail({
              key: 'quantity',
              data: res?.data?.available_qty > 0 ? res?.data?.available_qty : 1,
            })
          )
        } else if (type === 'wishlist') {
          await thunkAPI.dispatch(
            productSlice.actions.setWishlistList({
              key: 'check_stock',
              w_index,
              data: res.data,
            })
          )
          await thunkAPI.dispatch(
            productSlice.actions.setWishlistList({
              key: 'quantity',
              w_index,
              data: res?.data?.stock_balance > 0 ? res?.data?.stock_balance : 1,
            })
          )
        } else if (type === 'cartlist') {
        } else if (type === 'addtocart') {
          await thunkAPI.dispatch(
            productSlice.actions.setProductDetail({
              key: 'check_stock',
              data: res.data,
            })
          )
          await thunkAPI.dispatch(
            productSlice.actions.setProductDetail({
              key: 'quantity',
              data: res?.data?.stock_balance > 0 ? res?.data?.stock_balance : 1,
            })
          )
        } else {
        }
        return res?.data
      }
    })
    .catch((error: any) => console.log('error.message', error.message))
}

const getRelatedProduct = createAsyncThunk('productSlice/getRelatedProduct', async (data: any) => {
  const { product_id, count } = data
  return await serviceController(`${routes.getRelatedProduct}${product_id}/related/${count}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetExistWishlistPropsType = {
  item?: any,
  qty?: number,
  isExistCheck?: any,
  variant_id?: any,
  w_id?: any
}


const getExistsWishlist = createAsyncThunk < ResDataType, GetExistWishlistPropsType> ('productSlice/getExistsWishlist', async (data, thunkAPI) => {
  let { item, w_id, qty, isExistCheck = true, ...field }: any = data
  if (item?.attributes?.data?.length > 0) {
    if (item?.attributes?.data?.length === field?.variant_id?.toString()?.split(',')?.length) {

      return await serviceController(`${routes.getExistsWishlist}${routeFilter(field)}`)
        .then(res => {
          if (res?.data) {
            if (isExistCheck) {
              let myBool = res?.data?.exist === true
              thunkAPI.dispatch(
                productSlice.actions.setProductDetail({
                  key: 'check_wishlist',
                  data: { ...res.data, exist: myBool },
                })
              )
              return res?.data
            } else {
              let myBool = res?.data?.exist === true
              if (myBool) {
                thunkAPI.dispatch(removeWishlist({ wishlist_id: w_id }))
              } else {
                let req_obj: any = {
                  ...field,
                  variant_id: data?.variant_id?.toString(),
                }
                thunkAPI.dispatch(createWishlist(req_obj))
              }
              return res?.data
            }
          } else {
            return res?.data
          }
        })
        .catch(error => console.log('error.message', error.message))
    } else {

      await thunkAPI.dispatch(
        productSlice.actions.setProductDetail({
          key: 'check_wishlist',
          data: { exist: false, desc: 'select_variant_each_attributes' },
        })
      )
    }
  } else {
    return await serviceController(`${routes.getExistsWishlist}${routeFilter(field)}`)
      .then(res => {
        if (res?.data) {
          if (isExistCheck) {
            return res?.data
          } else {
            let myBool = res?.data?.exist === true

            if (myBool) {
              thunkAPI.dispatch(removeWishlist({ wishlist_id: w_id }))
            } else {
              delete field.variant_id
              thunkAPI.dispatch(createWishlist(field))
            }
            return res?.data
          }
        } else {
          return res?.data
        }
      })
      .catch(error => console.log('error.message', error.message))
  }
})

type CreateWishlistPropsType = {
  langCode?: string
}
const createWishlist = createAsyncThunk < ResDataType, CreateWishlistPropsType> ('productSlice/createWishlist', async (data, thunkAPI) => {
  let { langCode = 'en', ...field } = data
  return await serviceController(routes.createWishlist, field)
    .then(res => {
      if (res?.data) {
        if (res?.data?.status !== 'fail') {
          thunkAPI.dispatch(
            productSlice.actions.setProductDetail({
              key: 'check_wishlist',
              data: { exist: true },
            })
          )
          thunkAPI.dispatch(getWishlist(langCode))
        }
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type RemoveWishlistPropsType = {
  langCode?: string,
  wishlist_id?: any
}
const removeWishlist = createAsyncThunk < ResDataType, RemoveWishlistPropsType> ('productSlice/removeWishlist', async (data, thunkAPI) => {
  let { langCode, ...field } = data
  return await serviceController(routes.removeWishlist, { data: field })
    .then(res => {
      if (res?.data) {
        thunkAPI.dispatch(
          productSlice.actions.setProductDetail({
            key: 'check_wishlist',
            data: { exist: false },
          })
        )
        thunkAPI.dispatch(getWishlist(langCode))
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('errordd.message', error.message))
})

const getWishlist = createAsyncThunk('productSlice/getWishlist', async (langCode: string = 'en') => {
  return await serviceController(`${routes.getWishlist}`)
    .then(res => {
      if (res?.data) {
        if (res?.data?.length > 0) {
          let tmp = res.data.map((x: any) => ({
            ...x,
            quantity: 1,
            check_stock: {
              in_stock: x.status === 'in_stock',
            },
          }))
          return tmp
        }
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

const getPromotion = createAsyncThunk('productSlice/getPromotion', async (langCode) => {
  return await serviceController(`${routes.getPromotion}?show=product&lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        res?.data?.map(async (data: any) => {
          await calcuPromo(data, 'product_list', 'discount')
        })
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetPromotionByIdPropsType = {
  id: any
  langCode?: any
}
const getPromotionById = createAsyncThunk < ResDataType, GetPromotionByIdPropsType> ('productSlice/getPromotionById', async data => {
  let { id, langCode, ...field } = data
  return await serviceController(`${routes.getPromotionById}${id}/products?lang=${langCode}`)
    .then(async res => {
      if (res?.data) {
        await calcuPromo(res?.data, 'product_list', 'discount')
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

const getProductGroup = createAsyncThunk('productSlice/getProductGroup', async (code: any, thunkAPI: any) => {
  let langCode = thunkAPI.getState()?.other?.langStore?.code
  return await serviceController(`${routes.getProductGroup}?lang=${langCode}`)
    .then(async res => {
      if (res?.data) {
        let temp: any = []
        if (res?.data?.data?.length > 0) {
          res?.data?.data?.map(async (x: any) => {
            let tmp = await calcuPromo(x, 'item', 'discount')
            temp.push(tmp)
          })
        }
        let final_res = {
          data: temp
        }
        return final_res
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

const getFlashSaleList = createAsyncThunk('productSlice/getFlashSaleList', async (langCode: string = 'en') => {
  return await serviceController(`${routes.getFlashSaleList}?lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetFlashSaleDetailPropsType = {
  id: any
}
const getFlashSaleDetail = createAsyncThunk < ResDataType, GetFlashSaleDetailPropsType> ('productSlice/getFlashSaleDetail', async data => {
  let { id, ...field } = data
  return await serviceController(`${routes.getFlashSaleDetail}${id}/products${routeFilter(field)}`)
    .then(async res => {
      if (res?.data) {
        let tmp = await calcuPromo(res?.data, 'product_list', 'flash_sale')
        return tmp
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetBrandPropsType = {
  params?: any
}
const getBrandList = createAsyncThunk < ResDataType, GetBrandPropsType> ('productSlice/getBrandList', async (data: any, thunkAPI: any) => {
  const { ...field }: any = data
  return await serviceController(`${routes.getBrandList}?category_id=${data}`)
    .then(res => {
      if (res?.data) {
        if (!data) {
          let tmp: any = {
            all_data: res.data,
            data: thunkAPI?.getState()?.product?.getBrandList_data?.data
          }
          return tmp
        } else {
          let tmp: any = {
            all_data: thunkAPI?.getState()?.product?.getBrandList_data?.all_data,
            data: res.data,
          }
          return tmp
        }
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})
const getHighLightBrandList = createAsyncThunk < ResDataType, GetBrandPropsType> ('productSlice/getHighLightBrandList', async _ => {
  return await serviceController(`${routes.getHighLightBrandList}`)
    .then(res => {
      if (res?.data) {
        return res.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetCountryPropsType = {
  category_id?: any
}

const getCountryOrigin = createAsyncThunk < ResDataType, GetCountryPropsType> ('productSlice/getCountryOrigin', async (data) => {
  const { category_id } = data
  return await serviceController(`${routes.getCountryOrigin}?category_id=${category_id}`)
    .then(res => {
      if (res?.data) {
        let tmp = {
          data: res.data,
        }
        return tmp
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})


const handleVariant = createAsyncThunk('productSlice/handleVariant', async (data: any, thunkAPI: any) => {
  let { variant_type, package_product_index, package_product_data, ...field } = data
  let getProductById_data = thunkAPI.getState()?.product?.getProductById_data
  let calc_attribute = wishlistHandleChange(field)
  if (variant_type === 'package_product') {
    await thunkAPI.dispatch(
      productSlice.actions.setProductDetail({
        key_type: 'package_product',
        package_product_index: package_product_index,
        data: calc_attribute,
      })
    )
  } else {
    let calc_price = getProductById_data.price + (calc_attribute?.extra_price_for_variant || 0)
    await thunkAPI.dispatch(
      productSlice.actions.setProductDetail({
        key: 'attributes',
        data: calc_attribute,
      })
    )
    await thunkAPI.dispatch(
      productSlice.actions.setProductDetail({
        key: 'extra_price_for_variant',
        data: calc_price,
      })
    )

    // calc change promotion //
    if (getProductById_data?.promotion?.length > 0) {
      let final_res = await calcuPromo(getProductById_data, '', 'discount', calc_price)
      await thunkAPI.dispatch(
        productSlice.actions.setProductDetail({
          key: 'promo_price',
          data: final_res?.promo_price,
        })
      )
      await thunkAPI.dispatch(
        productSlice.actions.setProductDetail({
          key: 'cal_discount_percent',
          data: final_res?.cal_discount_percent,
        })
      )
    }

  }

  let check_pos_data = {
    item: getProductById_data,
    product_id: getProductById_data?.product_id,
    variant_id: calc_attribute?.selected_variant_ids?.length > 0 ? calc_attribute?.selected_variant_ids?.toString() : null,
    quantity: getProductById_data?.quantity,
  }

  if (variant_type !== 'package_product') {
    await thunkAPI.dispatch(checkStock(check_pos_data))
    await thunkAPI.dispatch(getExistsWishlist(check_pos_data))
  }
})

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    clearSearchAction: (state: any, action: any) => {
      state.getProductsSearch_data[action.payload.key] = {}
    },
    setProductDetail: (state: any, action: any) => {
      let { key_type, package_product_index, ...data } = action?.payload
      if (key_type === 'package_product') {
        state.getProductById_data.package_products.data[package_product_index].attributes = data.data
      } else {

        state.getProductById_data[action.payload.key] = data.data


      }
    },
    setWishlistList: (state: any, action: any) => {
      state.getWishlist_data[action.payload.w_index][action.payload.key] = action.payload.data
    },
    setHandleQty: (state: any, action: any) => {
      if (action?.payload?.type === 'productbyid') {
        state.getProductById_data.quantity = action.payload.qty
        state.getProductById_data[action.payload.key] = action.payload.data
      } else if (action?.payload?.type === 'wishlist') {
        state.getWishlist_data[action.payload.w_index].quantity = action.payload.qty
        state.getWishlist_data[action.payload.w_index][action.payload.key] = action.payload.data
      } else if (action?.payload?.type === 'cartlist') {
      } else {
      }
    },

    setProductCategory: (state, action) => {
      let { key, actionType, max_price } = action.payload
      let tmp_string_arr = key?.split('-')
      let last_id = tmp_string_arr?.[tmp_string_arr?.length - 1]
      let final_obj: any = {
        ...state.getProductCategory_data,
        selected_ids: Number(last_id),
        key: key,
        max_price: Number(max_price) || 100000
      }
      if (actionType === 'clear_all') {
        delete final_obj.selected_ids
        delete final_obj.key
        delete final_obj.max_price
      }
      state.getProductCategory_data = final_obj
    },
    setBrandList: (state: any, action: any) => {
      let { type, checkListItem, data, actionType } = action.payload
      let tmp = checkChange(type, checkListItem, data, actionType)
      let selected_item = tmp.filter(x => x.check)
      let arr: any = []
      selected_item?.map(x => arr.push(x.ID))
      let new_arr = Array.isArray(arr) ? arr.join('|') : "";
      let obj: any = {
        ...state.getBrandList_data,
        data: tmp,
        selected_ids: new_arr,
        selected_item: selected_item,
      }
      state.getBrandList_data = obj
    },
    setCountryList: (state: any, action: any) => {
      let { type, checkListItem, data, actionType } = action.payload
      let tmp = checkChange(type, checkListItem, data, actionType)
      let selected_item = tmp.filter(x => x.check)
      let arr: any[] = []
      selected_item?.map(x => arr.push(x.ID))
      let new_arr = Array.isArray(arr) ? arr.join('|') : "";
      let obj: any = {
        data: tmp,
        selected_ids: new_arr,
        selected_item: selected_item,
      }
      state.getCountryOrigin_data = obj
    },
    resetBrandChange: (state: any, action: any) => {
      let array = action.payload
      if (array?.length > 0) {
        let res = array.map((x: any) => ({ ...x, check: false }))
        if (res?.length > 0) {
          let obj = {
            data: res,
            selected_ids: [],
            selected_item: [],
          }
          state.getBrandList_data = obj
        }
      }
    },
    handleBottomReach: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    setSortBy: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction('productSlice/'), state => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addMatcher(isFulfilledAction('productSlice/'), (state: any, action: any) => {
        let tmp = action.type.split('/')
        return {
          ...state,
          [tmp[1] + '_data']: action.payload,
          isLoading: false,
          error: null,
        }
      })
      .addMatcher(isRejectedAction('productSlice/'), (state: any, action: any) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
  },
})

export default {
  productSlice: productSlice.reducer,
  setProductDetail: productSlice.actions.setProductDetail,
  setWishlistList: productSlice.actions.setWishlistList,
  setProductCategory: productSlice.actions.setProductCategory,
  setBrandList: productSlice.actions.setBrandList,
  setCountryList: productSlice.actions.setCountryList,
  resetBrandChange: productSlice.actions.resetBrandChange,
  handleBottomReach: productSlice.actions.handleBottomReach,
  setSortBy: productSlice.actions.setSortBy,
  handleVariant,
  getProduct,
  getPackageProduct,
  getProductById,
  getProductCategory,
  checkStock,
  getRelatedProduct,
  createWishlist,
  getWishlist,
  getExistsWishlist,
  removeWishlist,
  getPromotion,
  getPromotionById,
  getProductGroup,
  getFlashSaleList,
  getFlashSaleDetail,
  getBrandList,
  getHighLightBrandList,
  getCountryOrigin,
  sentProductRating
}
