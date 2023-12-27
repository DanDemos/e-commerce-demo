import { useOther, showToast, useProduct, useAuth } from '../../common'
import { getUiTranslate } from 'utils'

type PropsType = {

}
export const useHandleOther = (props?: PropsType) => {
  const { languages, langStore, dictionary_data, isLoading, OtherAction, dispatch } = useOther()
  const { getProfile_data } = useAuth()
  const { ProductAction } = useProduct()

  type ChangeLanguagePostData = {}
  const handleChangeLanguage = async (data: ChangeLanguagePostData) => {

    await dispatch(OtherAction.setLangStore(data))
  }

  const translate = (key: any, def: any) => {
    return getUiTranslate(dictionary_data, key, langStore?.code, def)
  }

  const handleSentContactUs = async (data: any) => {
    let res = await dispatch(OtherAction.sentContactUs(data))
    if (res?.payload?.result?.status === 'success') {
      showToast({
        title: translate('contact_success', 'Successfully sent message.'),
        titleStyle: { textAlign: 'center' },
        placement: 'bottom',
      })
    } else {
      showToast({
        titleStyle: { textAlign: 'center' },
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    }
  }

  const handleSentRating = async (data: any) => {
    if (getProfile_data) {
      let res = await dispatch(ProductAction.sentProductRating(data))

      if (res?.payload?.result?.status === 'success') {
        showToast({
          title: translate('success', 'Successfully sent message.'),
          titleStyle: { textAlign: 'center' },
          placement: 'bottom',
        })
      } else {
        showToast({
          titleStyle: { textAlign: 'center' },
          title: res?.payload?.message || 'Something wrong! Please try again.',
          placement: 'bottom',
        })
      }
    }
  }

  return {
    handleChangeLanguage,
    handleSentContactUs,
    dictionary_data,
    isLoading,
    languages,
    langStore,
    translate,
    handleSentRating,
  }
}
