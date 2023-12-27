import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { cart as CartAction } from 'store/actions'

type PropsType = {

}
export const useCart = (props?: PropsType) => {
  const cart = useSelector((state: any) => state.cart, shallowEqual)
  const dispatch = useDispatch()

  return {
    ...cart,
    CartAction,
    dispatch,
    useSelector,
    shallowEqual,
  }
}
