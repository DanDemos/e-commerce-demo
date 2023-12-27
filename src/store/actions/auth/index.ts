import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import serviceController, { routes } from 'controller'
import { authStore } from 'service'
import { isPendingAction, isFulfilledAction, isRejectedAction } from '../typehandle.action'
import cart from '../cart'
import product from '../product'

interface AuthPropsType {
  langCode: string
}

interface ResDataType {
  res: any
}

const initialState: any = {
  error: null,
  isLoading: false,
}

const signIn = createAsyncThunk<
  ResDataType,
  AuthPropsType
>('authSlice/signIn', async (data, thunkAPI) => {
  let { langCode, ...field } = data
  return await serviceController(routes.signIn, field)
    .then(res => {
      if (res?.data) {
        if (res?.data?.access_token) {
          authStore.setAuth(res.data)
          // thunkAPI.dispatch(getProfile())
          thunkAPI.dispatch(cart.getOrder({ limit: 10, offset: 1 }))
          thunkAPI.dispatch(product.getWishlist(langCode))
        }
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => console.log('error 1', { error }))

})

const signOut = createAsyncThunk('authSlice/signOut', async (data, thunkAPI) => {
  return await serviceController(routes.signOut)
    .then(res => {
      if (res?.data) {
        authStore.removeAuth()
        thunkAPI.dispatch(authSlice.actions.clearAuthStore())
        let temp = res?.data?.[0] || res?.data
        return temp
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const signUp = createAsyncThunk('authSlice/signUp', async data => {
  return await serviceController(routes.signUp, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })

    .catch(error => error.message)
})

const otpVerify = createAsyncThunk('authSlice/otpVerify', async data => {
  return await serviceController(routes.otpVerify, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const existUser = createAsyncThunk('authSlice/existUser', async data => {

  return await serviceController(routes.existUser, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const resetPassword = createAsyncThunk('authSlice/resetPassword', async data => {
  return await serviceController(routes.resetPassword, data)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const changePassword = createAsyncThunk('authSlice/changePassword', async (data, thunkAPI) => {
  return await serviceController(routes.changePassword, data)
    .then(res => {
      if (res?.data) {
        // if (res?.data?.status === 'success') {
        //   thunkAPI.dispatch(signOut())
        // }
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const getProfile = createAsyncThunk('authSlice/getProfile', async () => {
  return await serviceController(routes.getProfile)
    .then(res => {
      if (res?.data) {
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const updateProfile = createAsyncThunk('authSlice/updateProfile', async (data, thunkAPI) => {
  return await serviceController(routes.updateProfile, data)
    .then(res => {
      if (res?.data) {
        thunkAPI.dispatch(getProfile())
        return res?.data
      } else {
        return res?.data
      }
    })
    .catch(error => error.message)
})

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    clearAuthStore: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(isPendingAction('authSlice/'), state => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addMatcher(isFulfilledAction('authSlice/'), (state, action) => {
        let tmp = action.type.split('/')
        return {
          ...state,
          [tmp[1] + '_data']: action.payload,
          isLoading: false,
          error: null,
        }
      })
      .addMatcher(isRejectedAction('authSlice/'), (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
  },
})

export default {
  authSlice: authSlice.reducer,
  clearAuthStore: authSlice.actions.clearAuthStore,
  signIn,
  signOut,
  signUp,
  otpVerify,
  existUser,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
}