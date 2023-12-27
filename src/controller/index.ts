import httpClient from './constant/httpclient'
const queryString = require('query-string')
export * from './constant/config'
export * from './constant/routes'

export const routeFilter = (params?: any) => {
  let str = queryString.stringify(params, {
    skipNull: true,
    arrayFormat: 'comma',
  })
  return str !== '' ? `?${str}` : str
}

export default async (endpoint?: any, ...data: any) => {
  let tmp = endpoint.split(':')
  return await httpClient[tmp[0]](tmp[1], ...data)
    .then((res?: any) => res && res)
    .catch((error?: any) => error)
}
