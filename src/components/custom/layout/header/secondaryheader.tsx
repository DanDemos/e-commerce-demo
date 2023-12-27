import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiChevronDown, FiMenu } from 'react-icons/fi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

import { useHandleOther, useHandleProduct, useOther, useProduct } from 'hook'
import Icon from 'asset/icon/luxura'
import { SecondaryHeaderCom, TextCom } from '../../../common'

type secondMenuProps = {
  data: any
}
const SecondMenu: React.FC<secondMenuProps> = props => {
  const { handleProductFilterChange } = useHandleProduct(props)
  const navigate = useNavigate()
  const onHandleChange = (filter_change_obj: any) => {
    handleProductFilterChange(filter_change_obj)
  }

  const handleCategoryChange = (item?: any) => {
    navigate(`/products?category_ids=${item.category_id}`, { replace: true, state: item?.category_id })
    let mega_menu = document.querySelector('.mega-menu-container .mega-menu')
    window.location.reload()
    onHandleChange({ type: 'category', key: item?.key, max_price: item?.price_filter_max })
  }

  const [subCategory, setSubcategory]: Array<any> = React.useState([
    {
      category_id: null,
      data: null,
    },
  ])
  useEffect(() => {
    setSubcategory({
      category_id: null,
      data: null,
    })
  }, [props?.data])

  return (
    <>
      <div className={`right-menu ${props?.data?.length !== undefined ? 'active' : ''}`}>
        <ul>
          {props?.data?.map((item: any) => (
            <li
              onMouseOver={() => {
                setSubcategory({ category_id: item?.category_id, data: item?.sub_category })
              }}
              onClick={() => (item?.sub_category?.length <= 0 ? handleCategoryChange(item) : '')}
              style={item?.sub_category?.length > 0 ? { cursor: 'text' } : { cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <TextCom weight="xl" color={subCategory?.category_id === item?.category_id ? 'primary' : 'text'}>
                  {item.category_name}
                </TextCom>
                {item?.sub_category?.length > 0 && <MdOutlineKeyboardArrowRight color={subCategory?.category_id === item?.category_id ? '#0491A4' : '#707070'} size="25px" />}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ThirdMenu data={subCategory} />
    </>
  )
}

type ThirdMenuProps = {
  data: any
}
const ThirdMenu: React.FC<ThirdMenuProps> = props => {
  const { handleProductFilterChange } = useHandleProduct(props)
  const navigate = useNavigate()
  const onHandleChange = (filter_change_obj: any) => {
    handleProductFilterChange(filter_change_obj)
  }

  const handleCategoryChange = (item?: any) => {
    navigate(`/products?category_ids=${item.category_id}`, { replace: true, state: item?.category_id })
    let mega_menu = document.querySelector('.mega-menu-container .mega-menu')
    window.location.reload()
    onHandleChange({ type: 'category', key: item?.key, max_price: item?.price_filter_max })
  }

  return (
    <div className={`third-menu ${props?.data?.data?.length > 0 ? 'active' : ''}`}>
      <ul>
        {props?.data?.data?.map((item: any) => (
          <li onClick={() => handleCategoryChange(item)}>
            <TextCom weight="xl">{item?.category_name}</TextCom>
          </li>
        ))}
      </ul>
    </div>
  )
}

type SecondaryHeaderProps = {
  secondMenu: any
}

export const SecondaryHeader: React.FC<SecondaryHeaderProps> = props => {
  const { getProductCategory_data, getBrandList_data, ProductAction, dispatch } = useProduct()
  const { translate } = useHandleOther()
  const location = useLocation()
  const { getContactUsPage_data, getMetaData_data, OtherAction, langStore } = useOther()
  const navigate = useNavigate()
  let langCode = langStore?.code
  const [activeCategory, setActiveCategory]: Array<any> = React.useState([
    {
      category_id: null,
      subcategory: null,
    },
  ])

  //nav-mega-menu
  let nav = document.querySelector('.left-con .navigation')
  let menu_dropdown = document.querySelector('.nav-mega-menu')

  if (nav) {
    let nav_li = nav.querySelectorAll('li')
    for (let j = 0; j < nav_li.length; j++) {
      let navMega = nav_li[j].querySelector('.nav-mega-menu')
      nav_li[j].addEventListener('mouseenter', _ => {
        navMega?.classList.add('active')
      })
      // nav_li[j].addEventListener('mouseleave', _ => {
      //   navMega?.classList.remove('active')
      // })

      // menu_dropdown &&
      //   menu_dropdown.addEventListener('mouseenter', _ => {
      //     navMega?.classList.add('active')
      //   })
      menu_dropdown &&
        menu_dropdown.addEventListener('mouseleave', _ => {
          navMega?.classList.remove('active')
        })
    }
  }

  useEffect(() => {
    dispatch(ProductAction.getBrandList(''))
  }, [langCode])

  const [route, setRoute] = useState('')

  const handleRouteChange = (route: any, name: any = null) => {
    navigate(route, { replace: true, state: { name } })
    window.location.reload()
    setRoute(route)
  }

  if (location.pathname === '/products' && location.search === '') {
    navigate(route, { replace: true })
  }

  return (
    <SecondaryHeaderCom>
      <div className="container-fluid secondary-header-con">
        <div className="left-con">
          <div className="mega-menu-container">
            <div className="menu">
              <FiMenu color="white" size={25} />
              <TextCom color="light" size="lg" weight="xl">
                {translate('categories', 'Categories')}
              </TextCom>
              <FiChevronDown color="white" size={25} className="down" />
            </div>
            <div className="mega-menu">
              <ul className="mega-menu-left">
                {getProductCategory_data?.data?.map((item: any, i: any) => {
                  return (
                    <li
                      key={i}
                      onMouseOver={() => {
                        setActiveCategory({ subcategory: item?.sub_category, category_id: item?.category_id })
                      }}
                      className={activeCategory?.category_id === item?.category_id ? 'active' : ''}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <TextCom weight="xl">{item.category_name}</TextCom>
                        {item?.sub_category?.length > 0 && <MdOutlineKeyboardArrowRight color={activeCategory?.category_id === item?.category_id ? '#0491A4' : '#707070'} size="25px" />}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <SecondMenu data={activeCategory?.subcategory} />
            </div>
          </div>
          <div className="navigation">
            <ul>
              <li>
                <Link to="/" onClick={() => handleRouteChange('/')}>
                  <TextCom className="navlink" color={location?.pathname === '/' ? 'primary' : 'light'} size="lg" weight="lg">
                    {translate('home', 'Home')}
                  </TextCom>
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={() => handleRouteChange('/aboutus')}>
                  <TextCom className="navlink" color={location?.pathname === '/aboutus' ? 'primary' : 'light'} size="lg" weight="lg">
                    {translate('about-us', 'About us')}
                  </TextCom>
                </Link>
              </li>
              <li>
                <Link to="/promotion" onClick={() => handleRouteChange('/promotion')}>
                  <TextCom className="navlink" color={location?.pathname.includes('/promotion') ? 'primary' : 'light'} size="lg" weight="lg">
                    {translate('promotion', 'Promotion')}
                  </TextCom>
                </Link>
              </li>
              <li className="brand">
                <TextCom className="navlink" color={location.search.includes('brand_id') ? 'primary' : 'light'} size="lg" weight="lg">
                  {translate('brand', 'Brand')}
                </TextCom>
                <div className="nav-mega-menu d-flex">
                  <div className="content">
                    <TextCom size="lg" weight="xl" className="title">
                      {translate('all-brand', 'All brand')}
                    </TextCom>
                    <ul className="brand-list d-flex flex-column">
                      {getBrandList_data?.all_data?.length > 0 &&
                        getBrandList_data?.all_data?.map((brand: any, index: number) => (
                          <li key={index} onClick={() => handleRouteChange(`/products?brand_id=${brand?.ID}`, brand?.name)}>
                            {/* <img src={brand?.image} alt="brand-img" /> */}
                            <TextCom size="lg">{brand?.name}</TextCom>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* <div className="banner">{getMetaData_data && getMetaData_data?.['product-banner'] && <img src={getMetaData_data?.['product-banner'].image} alt="brand-img" />}</div> */}
                </div>
              </li>
              <li>
                <Link to="/our_store" onClick={() => handleRouteChange(`/our_store`)}>
                  <TextCom className="navlink" color={location.pathname.includes('/our_store') ? 'primary' : 'light'} size="lg" weight="lg">
                    {translate('our-store', 'Our store')}
                  </TextCom>
                </Link>
              </li>
              <li>
                <Link to="/news_and_activity" onClick={() => handleRouteChange(`/news_and_activity`)}>
                  <TextCom className="navlink" color={location?.pathname.includes('/news_and_activity') ? 'primary' : 'light'} size="lg" weight="lg">
                    {translate('news-activity', 'News & Activity')}
                  </TextCom>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-con d-flex">
          <img src={Icon.hotLineIcon} alt="hotline" />
          <TextCom color="light" size="lg" weight="lg">
            {translate('call-us', 'Call Us')}: <a href={`tel: ${getContactUsPage_data ? getContactUsPage_data?.hotline : ''}`}>{getContactUsPage_data ? getContactUsPage_data?.hotline : ''}</a>
          </TextCom>
        </div>
      </div>
    </SecondaryHeaderCom>
  )
}
