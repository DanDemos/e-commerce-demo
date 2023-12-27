import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalCom, ButtonCom, TextCom } from '../../common'
import { StyledHeadCon, StyledHeadWrap } from 'theme'
import { useHandleWishlist, hidePreview, useProduct, useHandleOther } from 'hook'
import Icon from 'asset/icon/luxura'

type WishlistButtonModProps = {
  product_id?: number | string
}

export const WishlistButtonMod: React.FC<WishlistButtonModProps> = ({ product_id, ...props }) => {
  let navigate = useNavigate()
  const { translate } = useHandleOther()
  const { exist, handleIsExistWishlist } = useHandleWishlist(props)
  const { getProductById_data, isLoading } = useProduct()
  const [state, setState] = useState({
    modalVisible: false,
  })
  const [error, seterror] = useState(false)

  const handleExist = async () => {
    let res: any = await handleIsExistWishlist({ product_id })
    if (res?.required_login) {
      handleModal(true)
    } else if (getProductById_data?.attributes?.selected_variant_ids?.length !== getProductById_data?.attributes?.data?.length) {
      seterror(true)
      setTimeout(() => {
        seterror(false)
      }, 3000)
    }
  }
  const handleRouteChange: any = (route: any, params: any) => {
    navigate(route, { ...params })
    hidePreview()
  }

  const handleModal = (modalVisible: boolean) => {
    setState({
      ...state,
      modalVisible,
    })
  }

  return (
    <>
      <TextCom size="xs" color="danger" className={`${error ? 'd-block' : 'd-none'} `}>
        {translate('please-choose-variant-to-add-wishlist', 'Please Choose Variant To Add Wishlist')}
      </TextCom>
      <StyledHeadCon onClick={handleExist} className="wishlist-btn">
        <TextCom weight="lg">{translate('add-to-wishlist', 'Add to wishlist')} : </TextCom>
        <StyledHeadWrap>{exist ? <img src={Icon.Wishlistheart} /> : <img src={Icon.Active_wishlistheart} />}</StyledHeadWrap>
      </StyledHeadCon>
      <ModalCom isModal={state.modalVisible} handleIsModal={handleModal} isCloseBtn={true}>
        <div style={{ position: 'relative' }}>
          <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 6, paddingLeft: 10, paddingRight: 10 }}>
            <img className="d-flex justify-content-center align-items-center m-auto mb-3" src={Icon.WishlistInfo} alt="wishlist-info" />
            <TextCom style={{ textAlign: 'center', marginBottom: 25 }}>{translate('please-login-to-get-wishlist', 'Please Login to get Wishlist')}</TextCom>
            <div style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase' }}>
              <ButtonCom text="Login" bgcolor="dark" color="light" btnBorderRadius="xxxs" onClick={() => handleRouteChange('/user/signin')} />
            </div>
          </div>
        </div>
      </ModalCom>
    </>
  )
}
