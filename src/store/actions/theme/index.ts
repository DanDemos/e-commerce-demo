import { createSlice } from '@reduxjs/toolkit'

import * as theme from 'theme/attribute'

let darkTheme = { ...theme, color: theme.darkcolor }
let lightTheme = { ...theme, color: theme.lightcolor }

let loc = localStorage.getItem('store_theme')

const initialState = {
  baseTheme: loc === 'dark' ? darkTheme : loc === 'light' ? lightTheme : lightTheme,
  createToast_data: {
    toastModalVisible: false,
  },
  CreatePreview_data: {
    PreviewModalVisible: false,
  }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setToast: (state: any, action: any) => {
      state.createToast_data = action.payload
    },
    setPreview: (state: any, action: any) => {
      state.CreatePreview_data = action.payload
    }
  },
})

export default {
  themeSlice: themeSlice.reducer,
  setToast: themeSlice.actions.setToast,
  setPreview: themeSlice.actions.setPreview
}
