import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import serviceController, { routes, routeFilter } from 'controller'
import { isPendingAction, isFulfilledAction, isRejectedAction } from '../typehandle.action'
import Icon from 'asset/icon/luxura'

interface OtherPropsType {
  langCode: string
}

interface ResDataType {
  res: any
}

const initialState = {
  isLoading: false,
  error: null,
  moreModalVisible: false,
  flashVisible: true,
  langStore: {
    lang: 'english',
    code: 'en',
    lan_icon: Icon.engImage,
  },
}

const getDictionary = createAsyncThunk('otherSlice/dictionary', async () => {
  return await serviceController(routes.getTranslation)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetMetaDataPropsType = {
  code?: any,
  langCode: string
}
const getMetaData = createAsyncThunk<ResDataType, GetMetaDataPropsType>('otherSlice/getMetaData', async (data) => {
  let { langCode } = data
  return await serviceController(`${routes.getMetaData}?lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetPageCodePropsType = {
  code: any
}
const getPageCode = createAsyncThunk<ResDataType, GetPageCodePropsType>('otherSlice/getPageCode', async data => {
  const { code, ...field } = data
  return await serviceController(`${routes.getPageCode}/${code}${routeFilter(field)}`)
    .then(res => {
      if (res?.data) {
        return res.data
      } else {
        return res.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

type GetWeebsiteSliderPropsType = {
  code?: any,
  langCode: string
}
const getWebsiteSlider = createAsyncThunk<ResDataType, GetWeebsiteSliderPropsType>('otherSlice/getWebsiteSlider', async (data, thunkAPI) => {
  let { code, langCode, ...field } = data

  return await serviceController(`${routes.getWebsiteSlider}${code}?lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})
const getWebsiteSliderMobile = createAsyncThunk<ResDataType, GetWeebsiteSliderPropsType>('otherSlice/getWebsiteSliderMobile', async (data, thunkAPI) => {
  let { code, langCode, ...field } = data

  return await serviceController(`${routes.getWebsiteSlider}${code}?lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})
type getWebsiteBanner = {
  langCode?: any
  id?: any
}
const getWebsiteBanner = createAsyncThunk<ResDataType, getWebsiteBanner>('otherSlice/getWebsiteBanner', async (data) => {
  let { langCode, id, ...field } = data
  return await serviceController(`${routes.getWebsiteBanner}?code=${id}&lang=${langCode}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

const getContactUsPage = createAsyncThunk('otherSlice/getContactUsPage', async data => {
  return await serviceController(`${routes.getContactUsPage}${routeFilter(data)}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})

const sentContactUs = createAsyncThunk('otherSlice/sentContactUs', async data => {
  return await serviceController(routes.sentContactUs, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error.message', error.message))
})
const getAllCityListForStore = createAsyncThunk('otherSlice/getAllCityListForStore', async (data: any) => {
  const { lang } = data
  return await serviceController(`${routes.getAllCityListForStore}?lang=${lang}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
})
const getStoreByCityId = createAsyncThunk('otherSlice/getStoreByCityId', async data => {

  return await serviceController(`${routes.getStoreByCityId}${routeFilter(data)}`)
    .then(res => {
      if (res?.data?.store) {
        return res?.data?.store
      } else {
        return res?.data?.store
      }
    })
})
type getNewsActivityList = {
  page_no: number,
  per_page: number,
  lang: string
}
const getNewsActivityList = createAsyncThunk<ResDataType, getNewsActivityList>('otherSlice/getNewsActivityList', async data => {
  return await serviceController(`${routes.getNewsActivityList}${routeFilter(data)}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
})

type getNewsActivityDetail = {
  id: number,
  lang: string
}
const getNewsActivityDetail = createAsyncThunk<getNewsActivityDetail>('otherSlice/getNewsActivityDetail', async data => {
  const { id, lang, ...field }: any = data
  return await serviceController(`${routes.getNewsActivityDetail}/${id}?lang=${lang}`)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
})
const otherSlice = createSlice({
  name: 'otherSlice',
  initialState,
  reducers: {
    setLangStore: (state: any, action: any) => ({
      ...state,
      langStore: action.payload,
    }),
    setFlashVisible: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    setEmit: (state: any, action: any) => ({
      ...state,
      emit_data: {
        [action.payload.key]: action.payload.data,
      },
    }),
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction('otherSlice/'), (state: any) => {
        // let tmp = action.type.split('/')
        return {
          ...state,
          isLoading: true,
          error: null,
        }
      })
      .addMatcher(isFulfilledAction('otherSlice/'), (state: any, action: any) => {
        let tmp = action.type.split('/')
        return {
          ...state,
          [tmp[1] + '_data']: action.payload,
          isLoading: false,
          error: null,
        }
      })
      .addMatcher(isRejectedAction('otherSlice/'), (state: any, action: any) => {
        // let tmp = action.type.split('/')
        return {
          ...state,
          isLoading: false,
          error: action.payload, // or you could use `rejectWithValue` and pull it from the payload.
        }
      })
  },
})

export default {
  otherSlice: otherSlice.reducer,
  setLangStore: otherSlice.actions.setLangStore,
  setEmit: otherSlice.actions.setEmit,
  setFlashVisible: otherSlice.actions.setFlashVisible,
  getDictionary,
  getMetaData,
  getPageCode,
  getWebsiteSlider,
  getWebsiteSliderMobile,
  getWebsiteBanner,
  getContactUsPage,
  sentContactUs,
  getAllCityListForStore,
  getStoreByCityId,
  getNewsActivityList,
  getNewsActivityDetail
}
