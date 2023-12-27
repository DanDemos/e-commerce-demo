import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { auth as AuthAction } from 'store/actions'

type PropsType = {

}
export const useAuth = (props?: PropsType) => {
  const auth = useSelector((state: any) => state.auth, shallowEqual)
  const dispatch = useDispatch()

  return {
    ...auth,
    AuthAction,
    dispatch,
    useSelector,
    shallowEqual,
  }
}
