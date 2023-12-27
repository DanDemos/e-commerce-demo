import { useEffect } from 'react'
import { useProduct, useCart, useOther, useTheme } from '../../common'
import { showToast, useHandleOther, useAuth } from 'hook'

type PropsType = {}

export const  useHandleCart = (props?: PropsType) => {
  const { getProductById_data, ProductAction, dispatch } = useProduct()
  const { createCart_data, getShippingAddress_data, getShippingAddressById_data, CartAction, getPaymentList_data } = useCart()
  const { AuthAction } = useAuth()
  const { translate } = useHandleOther()
  const { langStore } = useOther()
  const { signIn_data } = useAuth()
  let selectedShippingAddress = getShippingAddress_data?.selected_item
  let langCode = langStore?.code
  const { CreatePreview_data, themeContext } = useTheme()

  useEffect(() => {
    if (selectedShippingAddress) {
      // dispatch(
      //   CartAction.joinShippingAndOrder({
      //     ID: selectedShippingAddress?.ID,
      //     order_id: createCart_data?.order_id,
      //   })
      // )
      // dispatch(CartAction.getCart())
    }
  }, [selectedShippingAddress])

  let pos_data: any = {
    order_id: createCart_data?.order_id,
    langCode,
  }
  const handleCartItemDelete = async (item?: any) => {
    if (createCart_data?.order_id) {
      pos_data.product_id = item?.product_id
      await dispatch(CartAction.deleteCart(pos_data))
    }
  }

  const handleCartAllItemDelete = async () => {
    if (createCart_data?.order_id) {
      await dispatch(CartAction.deleteAllInCart(pos_data))
    }
  }

  const handleCreateShippingAddress = async (data: any) => {
    let pos_req = {
      mobile: data?.user_phone,
      name: data?.name,
      street: data?.address,
      street2: data?.address,
      state_id: Number(data?.state),
      township_id: Number(data?.township),
      country_id: 145,
      // lat: data?.map?.latitude,
      // long: data?.map?.longitude,
    }
    let res = await dispatch(CartAction.createShippingAddress(pos_req))
    return res
  }

  const handleEditShippingAddress = async (data: any) => {
    let pos_req = {
      shipping_id: data?.edit_id,
      mobile: data?.user_phone,
      name: data?.name,
      street: data?.address,
      state_id: Number(data?.state),
      township_id: Number(data?.township),
    }
    let res = await dispatch(CartAction.editShippingAddress(pos_req))
    return res
  }

  const handlePayNow = async (data: any) => {
    let pay_now_req: any = {
      order_id: createCart_data?.order_id,
      acquirer_id: data?.payment_id,
      special_request: data?.request,
      user_id: signIn_data?.user_id,
    }
    if (!signIn_data?.user_id) {
      delete pay_now_req.user_id
    }

    let payment_method_code = getPaymentList_data?.data?.filter((x: any) => x.id === pay_now_req?.acquirer_id)[0]?.code
    let res = await dispatch(CartAction.payNow(pay_now_req))
    if (res?.payload?.status === 'success') {
      if (payment_method_code === 'bppay' || payment_method_code === 'B2C_2C2P') {
        delete pay_now_req.user_id
        delete pay_now_req.acquirer_id
        pay_now_req.pay_method = payment_method_code
        let otherPayment_res = await dispatch(CartAction.payNow(pay_now_req))
        return otherPayment_res
      } else {
        return 'success'
      }
    } else {
      return 'fail'
    }
  }

  const handleSelectShipping = async (item?: any) => {
    let res = await dispatch(CartAction.handleSelectShippingAddress(item))
    if (res?.meta?.requestStatus === 'fulfilled') {
      dispatch(CartAction.getCart({}))
    }
    return res
  }

  const handleDeleteShippingAddress = async (item?: any) => {
    dispatch(CartAction.removeShippingAddress(item))
  }

  const handleAddToCart = async (product_id?: any, w_item?: any, w_index?: any, type_for?: any) => {
    let isCreateCart = true
    let pos_obj: any = {
      type: 'addtocart',
      item: getProductById_data,
      product_id,
      quantity: w_item?.quantity || getProductById_data?.quantity,
    }

    if (type_for === 'wishlist') {
      pos_obj.w_index = w_index
      pos_obj.item = w_item
      pos_obj.variant_id = w_item?.variant_id || null
      pos_obj.quantity = w_item.quantity
    } else {
      if (getProductById_data?.attributes?.data?.length > 0) {
        pos_obj.variant_id = getProductById_data?.attributes?.selected_variant_ids?.length > 0 ? getProductById_data?.attributes?.selected_variant_ids?.toString() : null
      }
    }
    if (type_for === 'package_product') {
      let package_item: any[] = []
      if (getProductById_data?.package_products?.data?.length > 0) {
        getProductById_data?.package_products?.data?.map((x: any) => {
          if (x?.attributes?.data?.length > 0) {
            if (x?.attributes?.data?.length === x?.attributes?.selected_variant_ids?.length) {
              package_item.push({
                product_id: x?.product_template_id,
                variant_id: x?.attributes?.selected_variant_ids?.toString(),
              })
            } else {
              isCreateCart = false
              // showToast({ titleStyle: { color: 'light', textAlign: 'center' }, title: 'Something wrong add to cart process! Please try again.', placement: 'bottom' })
            }
          } else {
            package_item.push({
              product_id: x?.product_template_id,
            })
          }
        })
      }
      pos_obj.package_item = package_item
    }
    if (createCart_data?.order_id) {
      pos_obj.order_id = createCart_data.order_id
    }

    let checkStock_res = await dispatch(ProductAction.checkStock(pos_obj))
    if (checkStock_res?.payload?.status === true) {
      delete pos_obj.type
      delete pos_obj.item
      pos_obj.langCode = langCode
      pos_obj.source = 'web'
      if (isCreateCart) {
        let createCart_res = await dispatch(CartAction.createCart(pos_obj))
        // if (createCart_res?.payload?.data?.result?.message === 'access token is expired or invalid') {
        //   showToast({
        //     title: translate('access-token-expire-or-invalid', 'access-token-expire-or-invalid'),
        //     titleStyle: { textAlign: 'center' },
        //     placement: 'bottom',
        //     btnText: translate('sign-in', 'Sign In'),
        //     route: '/user/signin',
        //     alway: true
        //   })
        //   dispatch(AuthAction.signOut())
        // }
        return createCart_res
      }
    }
  }

  return {
    selectedShippingAddress,
    handleAddToCart,
    handleCartItemDelete,
    handleCartAllItemDelete,
    handleCreateShippingAddress,
    handleEditShippingAddress,
    handlePayNow,
    handleSelectShipping,
    handleDeleteShippingAddress,
  }
}
