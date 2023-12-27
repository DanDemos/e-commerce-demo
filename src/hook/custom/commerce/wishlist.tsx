import { useAuth, useProduct } from '../../common'

type Props = {}

export const useHandleWishlist = (props: Props) => {
  const { getProductById_data, getWishlist_data, ProductAction, dispatch } = useProduct()
  const { getProfile_data } = useAuth()
  let exist = getProductById_data?.check_wishlist?.exist
  let w_id = getWishlist_data?.filter((item: any) => item.product_template_id === getProductById_data?.product_id)[0]?.id
  const getWishlist = (data?: any) => {
    dispatch(ProductAction.getWishlist(data))
  }

  const handleIsExistWishlist = async (data: any) => {
    if (getProfile_data) {
      let pos_data = {
        item: getProductById_data,
        product_id: Number(data?.product_id),
        variant_id: getProductById_data?.attributes?.selected_variant_ids || null,
        isExistCheck: false,
        w_id,
      }
      let res = await dispatch(ProductAction.getExistsWishlist(pos_data))

      return res
    } else {
      // open modal
      return {
        required_login: true,
      }
    }
  }

  const handleWislistItemDelete = async (item: any) => {
    let pos_data = { wishlist_id: item.id }
    dispatch(ProductAction.removeWishlist(pos_data))
    dispatch(ProductAction.getWishlist())
  }

  return {
    exist,
    getWishlist_data,
    getWishlist,
    handleIsExistWishlist,
    handleWislistItemDelete,
  }
}
