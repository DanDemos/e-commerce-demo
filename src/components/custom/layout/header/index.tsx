import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Media from 'react-media'
import { FiMenu, FiSearch, FiLayers, FiHome, FiBriefcase, FiTag, FiStar, FiMapPin, FiActivity, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

import { HeaderContainerCom, MobileHeaderCom, MobileDrawerCom, TextCom, ButtonCom, InputCom, CollapseCom, CollapsePanel } from 'components'
import { PrimaryHeader } from './primaryheader'
import { SecondaryHeader } from './secondaryheader'
import { useOther, useAuth, useProduct, useHandleOther, useHandleProduct, useCart } from 'hook'
import Icon from 'asset/icon/luxura'
import { any } from 'underscore'
import { bottom } from '@popperjs/core'

type HeaderProps = {}
export const HeaderCom: React.FC<HeaderProps> = props => {
  const navigate = useNavigate()
  const { translate, languages, handleChangeLanguage } = useHandleOther()
  const { handleProductFilterChange } = useHandleProduct()

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const drawerHandler = () => setDrawerOpen(!isDrawerOpen)
  const { langStore, OtherAction, dispatch, getContactUsPage_data } = useOther()
  const { getProfile_data, AuthAction } = useAuth()
  const { ProductAction, getProductCategory_data, getBrandList_data } = useProduct()
  const { getCart_data } = useCart()
  const langCode = langStore?.code

  let [productName, setProductName] = useState('')
  let [search_active, setSearch_active] = useState(false)
  const open_tab = getProductCategory_data?.key?.split('-')

  useEffect(() => {
    dispatch(OtherAction.getDictionary())
    dispatch(ProductAction.getProductCategory({ lang: langCode }))
    dispatch(OtherAction.getContactUsPage({ lang: langCode }))
    dispatch(OtherAction.getMetaData({ langCode }))
    let mega_menu = document.querySelector('.mega-menu')
    let indicator = document.querySelector('.indicator')
    if (mega_menu) mega_menu.classList.remove('right-active')
    // if (indicator) indicator.setAttribute('style', `display:none`)
  }, [langCode])

  const handleCheck = (e: any, value: any) => {
    handleChangeLanguage(value)
    e.target.classList.toggle('active')
    setDrawerOpen(false)
  }

  const HandleSignOut = async () => {
    await dispatch(AuthAction.signOut())
    navigate('/')
  }

  const handleSearch = (e: any) => {
    productName !== '' && navigate(`/search/${encodeURI(productName)}`)
    setSearch_active(!search_active)
    setProductName('')
    setDrawerOpen(false)
  }

  const onHandleChange = (filter_change_obj: any) => {
    handleProductFilterChange(filter_change_obj)
  }

  const handleCategoryChange = (item?: any) => {
    if (item?.item?.sub_category?.length === 0) {
      onHandleChange({ type: 'category', key: item?.item?.key })
    }
  }

  const handleClick = (cate: any, sub: any) => {
    if (sub?.sub_category?.length <= 0) {
      navigate(`products?category_ids=${sub?.category_id}`)
      setDrawerOpen(false)
    }
  }

  const handleNestedRenderCategory = (category: any) => {
    return (
      category?.sub_category?.length > 0 && (
        <CollapseCom
          accordion
          // expandIcon={({ isActive }: any) => isActive ? <FiMinus /> : <FiPlus />}
          handleChange={handleCategoryChange}
        // defaultActiveKey={[open_tab?.length > 2 ? open_tab?.[1] : '']}
        >
          {category?.sub_category?.map((subcategory: any, index: any) => (
            <CollapsePanel
              header={() => (
                <div className="d-flex name-wrap sub-cate">
                  <div className="line"></div>
                  <TextCom weight="xl" color={getProductCategory_data?.selected_ids == subcategory?.category_id ? 'primary' : 'text'} onClick={() => handleClick(category, subcategory)}>
                    {subcategory?.category_name}
                  </TextCom>
                </div>
              )}
              item={subcategory}
              key={index.toString()}
              className="sub-panel"
            >
              {handleNestedRenderCategory(subcategory)}
            </CollapsePanel>
          ))}
        </CollapseCom>
      )
    )
  }

  //---------------------Drawer---------------------------
  let [drawerType, setDrawerType] = useState({
    type: 'main',
    content: [],
  })

  let drawer_content = [
    {
      name: 'home',
      icon: <FiHome size={20} />,
      link: '/',
    },
    {
      name: 'product',
      icon: <FiLayers size={20} />,
      hasInner: true,
      drawer: 'product',
      content: getProductCategory_data ? getProductCategory_data?.data : [],
      link: '#',
    },
    {
      name: 'about-us',
      icon: <FiBriefcase size={20} />,
      link: 'aboutus',
    },
    {
      name: 'promotion',
      icon: <FiTag size={20} />,
      link: '/promotion',
    },
    {
      name: 'brand',
      icon: <FiStar size={20} />,
      hasInner: true,
      drawer: 'brand',
      content: getBrandList_data ? getBrandList_data?.all_data : [],
      link: '#',
    },
    {
      name: 'our-store',
      icon: <FiMapPin size={20} />,
      link: '/our_store',
    },
    {
      name: 'news-activity',
      icon: <FiActivity size={20} />,
      link: '/news_and_activity',
    },
  ]

  const handleDrawerType = (type: any, content: any) => {
    setDrawerType({
      ...drawerType,
      type: type,
      content: content,
    })
    type === 'main' && setDrawerOpen(false)
  }

  const handleChangeRoute = (id: any) => {
    navigate(`/products?brand_id=${id}`)
    window.location.reload()
    setDrawerOpen(false)
  }

  let user_icon = document.querySelector('.right_con .user')
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
    <HeaderContainerCom>
      <Media query={{ minWidth: 992 }}>
        {matches =>
          matches ? (
            <>
              <PrimaryHeader {...props} />
              <SecondaryHeader {...props} />
            </>
          ) : (
            <>
              <MobileHeaderCom>
                <div className="container-fluid">
                  <div className="mb_header_content">
                    <div className="left_con">
                      <Link to={'/'}>
                        <img src={require('../../../../asset/icon/luxura/innovix-shop.png')} alt="logo" />
                      </Link>
                    </div>
                    <div className="right_con">
                      <div className="user">
                        {/* <Link to={'/user/profile'}> */}
                        <img src={Icon.userWhite} alt="user" className="user_icon" />
                        {/* </Link> */}
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
                                  Welcome to Innovix Shop
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
                      <div className="cart">
                        <Link to="/order/cart">
                          <img src={Icon.BagIconMobile} alt="logo" />
                        </Link>
                        {getCart_data?.order_lines?.length > 0 && (
                          <div className="cart-badge">
                            <TextCom color="light" size="sm">
                              {getCart_data?.cart_item_count}
                            </TextCom>
                          </div>
                        )}
                      </div>
                      <FiMenu size={25} className="menu_icon" onClick={drawerHandler} />
                    </div>
                  </div>
                </div>
              </MobileHeaderCom>
              <MobileDrawerCom isOpen={isDrawerOpen} drawerHandler={drawerHandler}>
                <div className="mobile-drawer main">
                  <div className="head d-flex justify-content-between">
                    {drawerType.type === 'main' ? (
                      <div className={`search-con ${search_active === true ? 'active' : ''}`}>
                        <InputCom isValidate={false} placeholder={translate('search', 'Search')} type="text" value={productName} onChange={(e: any) => setProductName(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch(e)} />
                        <FiSearch size={25} onClick={e => handleSearch(e)} />
                      </div>
                    ) : (
                      <div className="d-flex align-items-center sub-drawer">
                        <FiChevronLeft size={24} onClick={e => setDrawerType({ ...drawerType, type: 'main' })} />
                        <TextCom size="xl" weight="xl">
                          {translate(drawerType.type, drawerType.type)}
                        </TextCom>
                      </div>
                    )}
                    <GrClose size={23} onClick={drawerHandler} className="close-icon" />
                  </div>
                  <div className="content">
                    {drawerType.type === 'main' ? (
                      <>
                        <ul>
                          {drawer_content.map((content, key) => (
                            <li key={key}>
                              <Link className="d-flex justify-content-between align-items-center" to={content?.link ? content?.link : '#'} onClick={e => handleDrawerType(content?.drawer ? content?.drawer : 'main', content?.content)}>
                                <div className="d-flex">
                                  {content.icon}
                                  <TextCom weight="xl">{translate(content.name, content.name)}</TextCom>
                                </div>
                                {content?.content && <FiChevronRight />}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <hr />
                        <ul className="language-switch">
                          {languages.length > 0 &&
                            languages.map((lang: any, i: any) => {
                              return (
                                <li className={`${langStore?.code === lang?.code ? 'active' : ''}`} key={i} onClick={e => handleCheck(e, lang)}>
                                  <img src={lang?.lan_icon} alt={lang?.lang} />
                                </li>
                              )
                            })}
                        </ul>
                        <hr />
                        <div className="call d-flex">
                          <img src={Icon.hotlineBlack} alt="hotline" />
                          {getContactUsPage_data && (
                            <>
                              <TextCom color="primary" size="lg" weight="lg">
                                {translate('call-us', 'Call Us')}: <a href={`tel: ${getContactUsPage_data ? getContactUsPage_data?.hotline : ''}`}>{getContactUsPage_data?.hotline ? getContactUsPage_data?.hotline : ''}</a>
                              </TextCom>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {drawerType?.content?.length > 0 && drawerType?.type === 'product' ? (
                          <CollapseCom>
                            {drawerType?.content?.map((category: any, key: any) => (
                              <CollapsePanel
                                header={(isActive: any) => (
                                  <TextCom weight="xl" color={getProductCategory_data?.selected_ids == category?.category_id ? 'primary' : 'text'}>
                                    {category?.category_name}
                                  </TextCom>
                                )}
                                item={category}
                                key={key}
                              >
                                {handleNestedRenderCategory(category)}
                              </CollapsePanel>
                            ))}
                          </CollapseCom>
                        ) : (
                          <div className="brand">
                            {drawerType?.content.map((content: any, key) => (
                              // <img src={content?.image} onClick={() => handleChangeRoute(content.ID)} />
                              <>
                                <TextCom size="lg" as="p" onClick={() => handleChangeRoute(content.ID)}>{content?.name}</TextCom>
                                <div className='brand-mobile-divider'></div>
                              </>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </MobileDrawerCom>
            </>
          )
        }
      </Media>
    </HeaderContainerCom>
  )
}
