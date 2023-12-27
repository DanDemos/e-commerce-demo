const setCart = (data: any) => {
  localStorage.setItem('cart_store', JSON.stringify(data))
}

const getCart = () => {
  let tmp: any = localStorage.getItem('cart_store')
  return JSON.parse(tmp)
}

const removeCart = () => {
  localStorage.removeItem('cart_store')
}

export default {
  setCart,
  getCart,
  removeCart,
}