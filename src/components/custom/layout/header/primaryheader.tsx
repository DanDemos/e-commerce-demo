import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import { useHandleOther, useOther, useAuth, useCart, useHandleProduct } from 'hook'
import { PrimaryHeaderCom, TextCom, InputCom, ButtonCom } from '../../../common'
import { moneyFormat } from 'utils'
import Icon from 'asset/icon/luxura'

type PrimaryHeaderProps = {}
export const PrimaryHeader: React.FC<PrimaryHeaderProps> = props => {
  const navigate = useNavigate()
  const { translate, languages, handleChangeLanguage } = useHandleOther()
  const { langStore, dispatch, getContactUsPage_data } = useOther()
  const { getProfile_data, AuthAction } = useAuth()
  const { createCart_data, CartAction } = useCart()
  const { getCart_data } = useCart()
  let [productName, setProductName] = useState('')
  let [search_active, setSearch_active] = useState(false)

  const HandleSignOut = async () => {
    await dispatch(AuthAction.signOut())
    if (createCart_data?.order_id) {
      await dispatch(CartAction.deleteAllInCart({ order_id: createCart_data?.order_id }))
      await dispatch(CartAction.resetCart())
    }

    navigate(`/`)
  }

  const handleCheck = (e: any, value: any) => {
    handleChangeLanguage(value)
    e.target.classList.toggle('active')
  }

  const handleSearch = (e: any) => {
    productName !== '' && navigate(`/search/${encodeURI(productName)}`)
    setSearch_active(!search_active)
    setProductName('')
  }

  const handleGotoCart = () => {
    navigate(`/order/cart`)
  }

  let user_icon = document.querySelector('.user')
  let user_menu = document.querySelector('.user-menu')
  user_icon?.addEventListener('mouseover', () => {
    user_menu?.classList.add('active')
  })
  user_icon?.addEventListener('mouseout', () => {
    user_menu?.classList.remove('active')
  })

  const handleCLick = (route: any) => {
    navigate(route)
    user_menu?.classList.remove('active')
  }

  return (
    <PrimaryHeaderCom>
      <div className="container-fluid primary-header-con">
        <div className="left-con">
          {getProfile_data?.name ? (
            <div className="user">
              <Link to={'/user/profile'}>
                <img src={Icon.userIcon} alt="user" />
              </Link>
              <div className="user-menu">
                {getProfile_data?.name ? (
                  <ul>
                    <li>
                      <img
                        src={Icon.userIconFill}
                        alt="user"
                        onClick={() => {
                          handleCLick('/user/profile')
                        }}
                        className="profile_icon"
                      />
                      <div>
                        <TextCom className="name">{getProfile_data?.name || ''}</TextCom>
                        <TextCom className="phone">{getProfile_data?.mobile || ''}</TextCom>
                        <ButtonCom
                          text={translate('edit-profile', 'Edit Profile')}
                          bgcolor="dark"
                          color="light"
                          onClick={() => {
                            handleCLick('/user/profile_edit')
                          }}
                        />
                      </div>
                    </li>
                    <li>
                      <img src={Icon.heartIconOutline} alt="wishlist" />
                      <TextCom
                        onClick={() => {
                          handleCLick('/user/wishlist')
                        }}
                      >
                        {translate('my-wishlist', 'Wishlist')}
                      </TextCom>
                    </li>
                    <li>
                      <img src={Icon.fileIcon} alt="order" />
                      <TextCom
                        onClick={() => {
                          handleCLick('/user/my_orders')
                        }}
                      >
                        {translate('order-history', 'order history')}
                      </TextCom>
                    </li>
                    <li>
                      <img src={Icon.keyIcon} alt="change-pwd" />
                      <TextCom
                        onClick={() => {
                          handleCLick('/user/change_password')
                        }}
                      >
                        {translate('change-password', 'change password')}
                      </TextCom>
                    </li>
                    <li onClick={HandleSignOut}>
                      <img src={Icon.logoutIcon} alt="logout" />
                      <TextCom>{translate('logout', 'Logout')}</TextCom>
                    </li>
                  </ul>
                ) : (
                  <ul className="welcome">
                    <li>
                      <TextCom weight="xl" className="title">
                        Welcome to Innivox Shop
                      </TextCom>
                      <hr />
                      <div className="d-flex">
                        <ButtonCom
                          text={translate('Login', 'Login')}
                          bgcolor="dark"
                          color="light"
                          onClick={() => {
                            handleCLick('/user/signin')
                          }}
                        />
                        <ButtonCom
                          text={translate('signup', 'Sign up')}
                          bgcolor="dark"
                          color="light"
                          onClick={() => {
                            handleCLick('/user/signup')
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to="/user/signin">
                <TextCom size="lg" weight="lg" color="dark">
                  {translate('Login', 'Login')}
                </TextCom>
              </Link>
              <hr />
              <Link to="/user/signup">
                <TextCom size="lg" weight="lg" color="dark">
                  {translate('signup', 'Sign up')}
                </TextCom>
              </Link>
              <hr />
            </>
          )}
          <ul className="language-switch">
            {languages.length > 0 &&
              languages.map((lang: any, i: any) => {
                return (
                  <li className={`${langStore?.code === lang?.code ? 'active' : ''}`} key={i} onClick={(e: any) => handleCheck(e, lang)}>
                    <img src={lang?.lan_icon} alt={lang?.lang} />
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="center-con">
          <Link to="/">
            <img src={require('../../../../asset/icon/luxura/innovix-shop.png')} alt="logo" />
          </Link>
        </div>
        <div className="right-con">
          <div className={`search-con ${search_active === true ? 'active' : ''}`}>
            <InputCom isValidate={false} placeholder={translate('search', 'Search')} type="text" value={productName} onChange={(e: any) => setProductName(e.target.value)} onKeyPress={(e: any) => e.key === 'Enter' && handleSearch(e)} />
            <FiSearch size={25} onClick={e => handleSearch(e)} />
          </div>
          <div
            className="cart"
            onClick={() => {
              handleGotoCart()
            }}
          >
            <img src={require('../../../../asset/icon/luxura/shopping-bag.png')} alt="logo" />
            {getCart_data?.order_lines?.length > 0 && (
              <div className="cart-badge">
                <TextCom color="light" size="sm">
                  {getCart_data?.cart_item_count > 999 ? moneyFormat(Math.ceil(999)) + '+' : getCart_data?.cart_item_count}
                </TextCom>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrimaryHeaderCom>
  )
}
