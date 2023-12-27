import axios from 'axios'

import { configKey } from './config'
import { authStore, cartStore } from 'service'
// let date = new Date()?.toJSON()?.split('T')[0];
// let created_Cart = cartStore?.getCart()
// if (created_Cart !== null && created_Cart !== date) {


// } else {

// }
const client: any = axios.create()
client.interceptors.request.use(async (config?: any) => {
  config.baseURL = configKey.apiUrl
  let res = await authStore.getAuth()

  config.headers['access-token'] = res?.access_token?.[0]?.token || ''

  return config
}, (error?: any) => {
  return Promise.reject(error)
})

client.interceptors.response.use(async (response?: any) => {
  if (!response.data) {
    return Promise.reject(response)
  }
  return response
}, (error?: any) => {
  if (axios.isAxiosError(error)) {
    return error.response
  } else {
    return Promise.reject(error)
  }
})

export default client