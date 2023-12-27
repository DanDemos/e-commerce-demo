import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { other as OtherAction } from 'store/actions'
import { languages } from '../../../key/LangKey'

type PropsType = {

}
export const useOther = (props?: PropsType) => {
  const other = useSelector((state: any) => state.other, shallowEqual)
  const dispatch = useDispatch()

  return {
    ...other,
    languages,
    OtherAction,
    dispatch,
    useSelector,
  }
}