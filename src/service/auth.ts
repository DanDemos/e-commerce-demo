const setAuth = (data: any) => {
  localStorage.setItem('auth_store', JSON.stringify(data))
}

const getAuth = () => {
  let tmp: any = localStorage.getItem('auth_store')
  return JSON.parse(tmp)
}

const removeAuth = () => {
  localStorage.clear()
}

export default {
  setAuth,
  getAuth,
  removeAuth,
}