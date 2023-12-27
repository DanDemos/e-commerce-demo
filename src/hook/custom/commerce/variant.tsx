import { useProduct, useTheme } from '../../common'

type Props = {
  variant_type?: string | undefined
}

export const useHandleVariant = ({ variant_type, ...props }: Props) => {
  const { getProductById_data, getPreviewProduct_data, ProductAction, dispatch } = useProduct()
  const { CreatePreview_data } = useTheme()
  let variants = getProductById_data?.attributes?.data

  const handleVariant = async (att_id: any, sub_id: any, package_product_index?: any, package_product_data?: any) => {
    let data = {
      att_data: variant_type === 'package_product' ? getProductById_data?.package_products?.data?.[package_product_index]?.attributes?.data : getProductById_data?.attributes?.data,
      att_id,
      sub_id,
      variant_type,
      package_product_index,
      package_product_data,
    }
    await dispatch(ProductAction.handleVariant(data))
  }

  return [variants, handleVariant]
}
