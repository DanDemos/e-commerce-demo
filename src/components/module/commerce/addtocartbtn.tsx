import React, { useState, useEffect } from 'react'

import { ButtonCom, ModalCom, TextCom } from '../../common'
import { Loading } from 'components/custom'
import { useHandleCart, useHandleOther, useAuth, hidePreview, useProduct, useHandleQty, showToast, useCart } from 'hook'
import { StyledAddtoCartCon } from 'theme'

type AddToCartButtonModProps = {
  navigate?: any
  params?: any
  w_item?: any
  type?: string
  htmlFor?: string
  text?: string
  bgcolor?: string
  color?: string
  outline?: any
  btntype?: any
  borderColor?: string
  btnBorderRadius?: string
  onClick?: any
  set?: any
  w_index?: any
  type_for?: any
  disabled?: any
  setLoadState?: any
}

export const AddToCartButtonMod: React.FC<AddToCartButtonModProps> = ({ navigate, params, w_item, w_index, type, type_for, set, disabled, loadstate, setLoadState, ...props }) => {
  const { handleAddToCart } = useHandleCart()
  const { translate } = useHandleOther()
  const { getProfile_data } = useAuth()
  const { getProductById_data, ProductAction, dispatch } = useProduct()
  const { getCart_data } = useCart()
  const [state, setstate] = useState({
    modalVisible: false,
    desc: '',
  })
  const [typeName, setTypeName] = useState(null)

  const onHandleAddToCart = async () => {
    try {
      setLoadState(true)
      let res = await handleAddToCart(params?.id || params || w_item?.product_template_id, w_item, w_index, type_for)
      if (res?.payload?.status === 'success') {
        setLoadState(false)
        console.log('hello run time')
        if (type === 'buynow') {
          setTypeName(type)
        } else {
          setTypeName(type)
          if (set) {
            set(true)
          } else {
            handleModal(true, translate('product_succcessfully_cart', 'Product successfully cart'))
          }
        }
      } else if (res?.payload?.status === 'fail' && res?.payload?.message === 'Buy Limit is reached.') {
        setLoadState(false)
        dispatch(ProductAction.setProductDetail({ key: 'check_stock', data: { in_stock: false, stock_balance: res?.payload?.buy_limit, desc: `Maximum Buy limit is ${res?.payload?.buy_limit}` } }))
        showToast({ type: 'error', placement: 'bottom', title: 'Something wrong add to cart process!' })
      } else {
        setLoadState(false)
        showToast({
          type: 'error',
          title: translate('out_of_stock', res?.payload?.error || 'stock is not enough!'),
          placement: 'bottom',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeName === 'buynow') {
      if (getCart_data?.cart_item_count > 0) {
        if (getProfile_data) {
          navigate('/order/checkout')
        } else {
          navigate('/order/payment')
        }
      }
    }
  }, [getCart_data?.cart_item_count, typeName])

  const handleModal: any = (modalVisible: boolean, desc: string) => {
    setstate({
      ...state,
      modalVisible,
      desc,
    })
  }

  const handleRoute: any = (route: any, params: any) => {
    navigate(route, { ...params })
    handleModal(false)
    hidePreview()
  }

  return (
    <>
      <StyledAddtoCartCon>
        <ButtonCom color="light" btnHeight={39} onClick={onHandleAddToCart} {...props} disabled={disabled} />
        <div className="disable-layer" style={disabled === true ? { display: 'block' } : { display: 'none' }}></div>
        <ModalCom isModal={state.modalVisible} handleIsModal={() => handleModal(false)}>
          <div>
            <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 26, paddingLeft: 20, paddingRight: 20 }}>
              <TextCom color="text" style={{ textAlign: 'center', marginBottom: 20 }}>
                {state?.desc}
              </TextCom>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonCom color="light" bgcolor="dark" btnBorderRadius="xxxs" text={translate('go-to-cart', 'Go to cart')} onClick={() => handleRoute('/order/cart')} />
              </div>
            </div>
          </div>
        </ModalCom>
      </StyledAddtoCartCon>
    </>
  )
}
