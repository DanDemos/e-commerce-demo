import { useCart, useProduct } from '../../common'

type PropsType = {
  type?: string
  item?: any
  w_index?: any
  c_index?: any
}

let tmp: any = null
let timeout = 500
export const useHandleQty = ({ type = 'productbyid', item, w_index = 0, c_index = 0, ...props }: PropsType) => {
  const { getProductById_data, getWishlist_data, checkStock_isLoading, ProductAction, dispatch } = useProduct()
  const { createCart_data, getCart_data, updateQtyInCart_isLoading, CartAction } = useCart()

  const handleQty = () => {
    if (type === 'productbyid') {
      return getProductById_data?.quantity || 1
    } else if (type === 'wishlist') {
      return getWishlist_data?.[w_index]?.quantity || 1
    } else if (type === 'cartlist') {
      return getCart_data?.order_lines?.[c_index]?.quantity || 1
    } else {
      return
    }
  }

  const handleQtyFun = async (quantity: any, qty: any) => {
    if (type === 'productbyid') {
      let pos_data: any = {
        type: 'productbyid',
        item: getProductById_data,
        product_id: getProductById_data?.product_id,
        quantity,
        // quantity: getProductById_data?.buy_limit === 0 ? quantity : getProductById_data?.buy_limit >= quantity ? quantity : getProductById_data?.buy_limit,
      }

      if (getProductById_data?.attributes?.data?.length > 0) {
        pos_data.variant_id = getProductById_data?.attributes?.selected_variant_ids?.length > 0 ? getProductById_data?.attributes?.selected_variant_ids.toString() : null
      }
      if (createCart_data?.order_id) {
        pos_data.order_id = createCart_data?.order_id
      }

      if (getProductById_data?.package_product_type === true) {
        let package_item: any = []
        getProductById_data?.package_products?.data?.map((item: any) => {
          package_item.push({
            product_id: item?.product_template_id,
            variant_id: item?.attributes?.selected_variant_ids?.toString(),
          })
        })
        pos_data.package_item = package_item
      }
      if (!checkStock_isLoading) {
        if (quantity > 0) {
          await dispatch(ProductAction.setProductDetail({ key: 'quantity', data: quantity }))
        }
        // if (quantity > 0 && getProductById_data?.buy_limit === 0) {
        //   await dispatch(ProductAction.setProductDetail({ key: 'quantity', data: quantity }))
        // } else if (quantity <= getProductById_data?.buy_limit) {
        //   await dispatch(ProductAction.setProductDetail({ key: 'quantity', data: quantity }))
        // }
        clearTimeout(tmp)
        tmp = setTimeout(async () => {
          // if (getProductById_data?.buy_limit === 0) {
          getProductById_data?.product_id && (await dispatch(ProductAction.checkStock(pos_data)))

          // } else if (pos_data?.quantity <= getProductById_data?.buy_limit) {
          //   getProductById_data?.product_id && (await dispatch(ProductAction.checkStock(pos_data)))
          //   if (pos_data?.quantity === getProductById_data?.buy_limit) {
          //     dispatch(ProductAction.setProductDetail({ key: 'check_stock', data: { in_stock: false, stock_balance: getProductById_data?.buy_limit, desc: `Maximum Buy limit is ${pos_data?.quantity}` } }))
          //   }
          // }
        }, timeout)
      }
      return
    } else if (type === 'wishlist') {
      let pos_data = {
        type: 'wishlist',
        product_id: item?.product_template_id,
        w_index,
        item,
        quantity,
      }
      // if (!checkStock_isLoading) {
      if (quantity > 0) {
        await dispatch(
          ProductAction.setWishlistList({
            key: 'quantity',
            w_index,
            data: quantity,
          })
        )
      }
      clearTimeout(tmp)
      tmp = setTimeout(async () => {
        await dispatch(ProductAction.checkStock(pos_data))
      }, timeout)
      // }
    } else if (type === 'cartlist') {
      let pos_data: any = {
        order_id: createCart_data?.order_id,
        product_id: item?.product_template_id,
        variant_id: item?.variant_id,
        c_index,
        item,
        quantity,
      }
      if (!item?.variant_id) {
        delete pos_data.variant_id
      }

      if (item?.package_data_line?.length > 0) {
        pos_data.package_item = item?.package_data_line
      }
      // if (!updateQtyInCart_isLoading) {
      if (quantity > 0) {
        let obj = {
          c_index,
          quantity,
        }
        await dispatch(CartAction.setQtyInCartList(obj))
      }
      clearTimeout(tmp)
      tmp = setTimeout(async () => {
        createCart_data?.order_id && (await dispatch(CartAction.updateQtyInCart(pos_data)))
      }, timeout)
      // }
    }
  }

  return [handleQty(), handleQtyFun]
}
