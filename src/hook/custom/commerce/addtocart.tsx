import { useProduct, useCart, useOther } from '../../common'

type PropsType = {

}
export const useHandleAddToCart = (props: PropsType) => {
  const { getProductById_data, ProductAction, dispatch } = useProduct()
  const { createCart_data, CartAction } = useCart()
  const { langStore } = useOther()
  let langCode = langStore.code

  const handleAddToCart = async (product_id: any) => {
    let pos_obj: any = {
      type: 'addtocart',
      item: getProductById_data,
      product_id: Number(product_id),
      qty: getProductById_data?.quantity,
    }
    if (getProductById_data?.attributes?.data?.length > 0) {
      pos_obj.variant_id = getProductById_data?.attributes?.selected_variant_ids?.length > 0 ? getProductById_data?.attributes?.selected_variant_ids : null
    }
    let checkStock_res = await dispatch(ProductAction.checkStock(pos_obj))
    if (checkStock_res?.payload?.in_stock) {
      delete pos_obj.type
      delete pos_obj.item
      pos_obj.langCode = langCode
      if (createCart_data?.order_id) {
        pos_obj.order_id = createCart_data.order_id
      }
      let createCart_res = await dispatch(CartAction.createCart(pos_obj))
      return createCart_res
    }
  }

  return {
    handleAddToCart,
  }
}
