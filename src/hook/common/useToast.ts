import { useTheme } from '../common'
import { store } from '../../store/actions'
import { theme } from 'store/actions'

type PropsType = {

}
export const useToast = (props?: PropsType) => {
  const { createToast_data, ThemeAction, dispatch } = useTheme()

  const showToast = async (data: any) => {
    let final_data = {
      ...data,
      toastModalVisible: true,
    }
    await dispatch(ThemeAction.setToast(final_data))
  }

  const hideToast = async () => {
    await dispatch(ThemeAction.setToast({ toastModalVisible: false }))
  }

  return {
    createToast_data,
    ThemeAction,
    dispatch,
    showToast,
    hideToast,
  }
}
export const usePreview = (props?: PropsType) => {
  const { ThemeAction, dispatch } = useTheme()

  const showPreview = async () => {
    await dispatch(ThemeAction.setPreview({ PreviewModalVisible: true }))
  }
  const hidePreview = async () => {
    await dispatch(ThemeAction.setPreview({ PreviewModalVisible: false }))
  }

  return {
    ThemeAction,
    dispatch,
    usePreview,
    showPreview,
    hidePreview
  }
}
export const showToast = async (data: any) => {
  let final_data = {
    ...data,
    toastModalVisible: true,
  }
  await store.dispatch(theme.setToast(final_data))
}

export const hideToast = async () => {
  await store.dispatch(theme.setToast({ toastModalVisible: false }))
}
export const showPreview = async () => {
  await store.dispatch(theme.setPreview({ PreviewModalVisible: true }))
}
export const hidePreview = async () => {
  await store.dispatch(theme.setPreview({ PreviewModalVisible: false }))

}