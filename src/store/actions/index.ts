import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import auth from './auth'
import cart from './cart'
import other from './other'
import product from './product'
import theme from './theme'

const reducers = combineReducers({
  auth: auth.authSlice,
  cart: cart.cartSlice,
  product: product.productSlice,
  theme: theme.themeSlice,
  other: other.otherSlice,
})

const persistConfig = {
  key: 'root',
  devTools: process.env.NODE_ENV !== 'production',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const store = rootStore
export const persist = persistStore(rootStore)

export { default as auth } from './auth'
export { default as theme } from './theme'
export { default as other } from './other'
export { default as cart } from './cart'
export { default as product } from './product'
