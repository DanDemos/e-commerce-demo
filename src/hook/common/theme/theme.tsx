import { useContext } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { theme as ThemeAction } from 'store/actions'

type PropsType = {
}
export const useTheme = (props?: PropsType) => {
  const theme = useSelector((state: any) => state.theme, shallowEqual)
  const themeContext = useContext(ThemeContext)
  const dispatch = useDispatch()

  return {
    ...theme,
    ThemeAction,
    themeContext,
    dispatch,
    useSelector,
    shallowEqual,
  }
}