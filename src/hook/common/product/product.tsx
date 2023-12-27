import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { product as ProductAction } from 'store/actions'

type PropsType = {

}
export const useProduct = (props?: PropsType) => {
  const product = useSelector((state: any) => state.product, shallowEqual)
  const dispatch = useDispatch()

  return {
    ...product,
    ProductAction,
    dispatch,
    useSelector,
    shallowEqual,
  }
}
