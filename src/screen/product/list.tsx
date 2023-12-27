import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IoChevronUpOutline } from 'react-icons/io5'
import { FiInfo } from 'react-icons/fi'
import Media from 'react-media'

import { Container, SearchCom, TextCom, NewArrivalSlider, PaginationWrap, ProductSideBarFilter, InputCom, ProductCardMap, ButtonCom, RSSliderCom } from 'components'
import { useHandleOther, useProduct, useHandleProduct, useOther } from 'hook'
import { StyledProductListing } from 'theme'
import { moneyFormat } from 'utils'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

type ProductListProps = {}

let rsProps = {
  dots: true,
  // fade: true,
  arrows: true,
  adaptiveHeight: false,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export const ProductList: React.FC<ProductListProps> = props => {
  const location = useLocation()
  const brand_name = location?.state?.name
  const [current, setCurrent] = useState(1)
  const { getProduct_data, getPackageProduct_data, getProductGroup_data, getProductCategory_data, getBrandList_data, getCountryOrigin_data, ProductAction, dispatch } = useProduct()
  const { getWebsiteSlider_data, getWebsiteSliderMobile_data, OtherAction } = useOther()
  const { sort_by, sorting, setSorting, handleProductFilterChange } = useHandleProduct()
  const { translate, langStore } = useHandleOther()
  let langCode = langStore?.code

  let package_products_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'package-products')?.[0]

  let defaultPrice: any = {}

  const [clear, isClear] = useState(false)
  const [price, setPrice] = useState({
    min_price: '',
    max_price: '',
  })

  let rsProps1 = {
    dots: false,
    // fade: true,
    arrows: true,
    adaptiveHeight: true,
    infinite: false,
    slidesToShow: 9,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          // dots: true
        },
      },
    ],
  }

  let brand_id: any = []
  if (location.search.includes('brand')) {
    brand_id.push(location.search.split('=')[1])
  }

  let cate_id: any = []
  if (location.search.includes('category')) {
    cate_id.push(location.search.split('=')[1])
  }

  const toLowerCase = (text: any) => {
    let string = text
    const lowerCase = string?.toLowerCase().replaceAll(' ', '')
    return lowerCase
  }

  useEffect(() => {
    dispatch(OtherAction.getWebsiteSlider({ code: toLowerCase(brand_name), langCode }))
    dispatch(OtherAction.getWebsiteSliderMobile({ code: 'mobile-brand-banner', langCode }))
    dispatch(ProductAction.getProductGroup())
    dispatch(ProductAction.getPackageProduct())
  }, [])

  let minText: any = document.querySelector('.price-input .min-text')
  let maxText: any = document.querySelector('.price-input .max-text')
  // if (maxText) maxText.innerText = getProductCategory_data?.max_price

  useEffect(() => {
    if (clear === true) {
      setSorting('')
    } else {
      setSorting(sorting)
    }

    let req_obj = {
      lang: langCode,
      page_number: current,
      per_page: 12,
      category_id: getProductCategory_data?.selected_ids || Number(cate_id[0]) || '',
      brand_id: getBrandList_data?.selected_ids || Number(brand_id[0]) || '',
      country_id: getCountryOrigin_data?.selected_ids,
      min_price: defaultPrice?.min_price || price?.min_price || 0,
      max_price: defaultPrice?.max_price || price?.max_price || getProductCategory_data?.max_price || '',
      sort_by: sorting,
    }
    if (location?.search?.includes('category')) {
      dispatch(ProductAction.getProduct(req_obj))
    } else {
      dispatch(
        ProductAction.getProduct({
          brand_id: Number(brand_id[0]),
          lang: langCode,
          page_number: current,
          per_page: 12,
          sort_by: sorting,
        })
      )
      dispatch(ProductAction.getBrandList(''))
    }
    isClear(false)

    //for currency format display
    if (maxText) {
      minText.innerText = moneyFormat(Math.ceil(Number(defaultPrice?.min_price))) || moneyFormat(Math.ceil(Number(price?.min_price))) || 0
      maxText.innerText = moneyFormat(Math.ceil(Number(defaultPrice?.max_price))) || moneyFormat(Math.ceil(Number(price?.max_price))) || moneyFormat(Math.ceil(Number(getProductCategory_data?.max_price)))
    }
  }, [getCountryOrigin_data?.selected_ids, Number(brand_id[0]), getProductCategory_data?.max_price, getBrandList_data?.selected_ids, getProductCategory_data?.selected_ids, current, price, sorting, langCode])

  const onChangePaginate = (pagenumber: any) => {
    setCurrent(pagenumber)
    window.scroll(0, 0)
  }

  const handleSelectChange = (e: any) => {
    setSorting(e.target.value)
  }

  const onHandleChange = (filter_change_obj: any) => {
    handleProductFilterChange(filter_change_obj)
  }

  const handleClear = () => {
    isClear(true)
    onHandleChange({ type: 'clear_all' })
    let sort = document.querySelector('select')
    if (sort) {
      sort.value = ''
    }
    setPrice({
      ...price,
      min_price: '',
      max_price: '',
    })
    let rangemin = document.querySelector('input.range-min')
    let pricemin = document.querySelector('input#price-min')
    rangemin.value = 0
    pricemin.value = 0
    let rangemax = document.querySelector('input.range-max')
    let pricemax = document.querySelector('input#price-max')
    rangemax.value = getProductCategory_data?.max_price
    pricemax.value = getProductCategory_data?.max_price
  }

  let tmp: any = null
  const handlePriceChange = (data?: any) => {
    if (data.type === 'min_price') {
      let min_price: any = Number(data.value) || '0'
      clearTimeout(tmp)
      tmp = setTimeout(() => {
        setPrice({
          ...price,
          min_price,
        })
      }, 1000)
    } else if (data.type === 'max_price') {
      let max_price: any = Number(data.value) || getProductCategory_data.max_price || ''
      clearTimeout(tmp)
      tmp = setTimeout(() => {
        setPrice({
          ...price,
          max_price,
        })
      }, 1000)
    }
  }

  let min_input = document.querySelector('input#price-min')
  let max_input = document.querySelector('input#price-min')

  useEffect(() => {
    dispatch(ProductAction.getBrandList(getProductCategory_data?.selected_ids || ''))
  }, [getProductCategory_data?.selected_ids])

  return (
    <StyledProductListing>
      {location.search.includes('brand') && (
        <Media query={{ maxWidth: 991 }}>
          {matches =>
            matches
              ? getWebsiteSlider_data &&
                getWebsiteSlider_data.length > 0 && (
                  <>
                    <Container as="section">
                      <SearchCom placeholder={translate('search', 'Search')} />
                    </Container>
                    <Container as="section" className="hero-slider">
                      <RSSliderCom rsProps={rsProps} data={getWebsiteSliderMobile_data && getWebsiteSliderMobile_data.length > 0 && getWebsiteSliderMobile_data?.[0].slider_images} leftArrowSvg={<BsChevronLeft size={30} color="#fff" />} rightArrowSvg={<BsChevronRight size={30} color="#fff" />} />
                    </Container>
                  </>
                )
              : getWebsiteSlider_data &&
                getWebsiteSlider_data.length > 0 && (
                  <Container as="section" className="hero-slider">
                    <RSSliderCom rsProps={rsProps} data={getWebsiteSlider_data && getWebsiteSlider_data.length > 0 && getWebsiteSlider_data?.[0].slider_images} leftArrowSvg={<BsChevronLeft size={30} color="#fff" />} rightArrowSvg={<BsChevronRight size={30} color="#fff" />} />
                  </Container>
                )
          }
        </Media>
      )}
      <Media query={{ maxWidth: 991 }}>{matches => (matches ? <SearchCom placeholder={translate('search', 'Search')} /> : <></>)}</Media>
      {location.search.includes('category') && (
        <>
          {getPackageProduct_data && getPackageProduct_data?.product_list?.length > 0 && (
            <Container as="section" bgcolor="light_pink" className="slider">
              <Container className="container-fluid position-relative" bgcolor="transparent">
                <div className="row">
                  <NewArrivalSlider card_data={getPackageProduct_data ? getPackageProduct_data.product_list : ''} slidesToShow={4} dots={true} large_img={true} no_border={true} />
                </div>
              </Container>
            </Container>
          )}
        </>
      )}
      <Container className="container-fluid product">
        <div className="row">
          {location.search.includes('category') && (
            <div className="col-xl-2 col-lg-3 filter-con">
              <ButtonCom type="outline" bgcolor="transparent" onClick={() => handleClear()} className="clear-btn">
                {translate('clear-all', 'Clear all')}
              </ButtonCom>
              <ProductSideBarFilter priceVal={setPrice} handleprice={handlePriceChange} setprice={defaultPrice} />
            </div>
          )}
          <div className={location.search.includes('category') ? 'col-xl-10 col-lg-9 product-list-con' : 'col-xl-12 col-lg-12 product-list-con brand'}>
            {location.search.includes('category') ? (
              <div className="title-section">
                <TextCom size="xxxl" weight="xl" className="title">
                  {translate(getProduct_data?.product_list?.[0]?.categories?.length > 0 ? getProduct_data?.product_list[0]?.categories[0]?.name : 'All Product', getProduct_data?.product_list?.[0]?.categories?.length > 0 ? getProduct_data?.product_list[0]?.categories[0]?.name : 'All Product')}
                </TextCom>
                <div className="sort-by d-flex align-items-center">
                  <TextCom weight="xl">{translate('sort-by', 'Sort by')}:</TextCom>
                  <IoChevronUpOutline color="#707070" className="d-arrow" />
                  <InputCom isValidate={false} input_as="select" onChange={(e: any) => handleSelectChange(e)} className="select-input">
                    <option value="">{translate('all', 'All')}</option>
                    {sort_by?.map(item => {
                      return <option value={item?.value}>{item?.name}</option>
                    })}
                  </InputCom>
                </div>
              </div>
            ) : (
              <>
                {/* <Container as="section" className="brand">
                  <RSSliderCom rsProps={rsProps1} data={getBrandList_data ? getBrandList_data?.all_data : ''} route="/products?brand_id=" />
                </Container> */}
                <div className="title-section brand">
                  <TextCom size="xxxl" weight="xl" className="title">
                    {getProduct_data?.product_list[0]?.brand?.name || getBrandList_data?.all_data?.filter((brand: any) => brand?.ID === Number(brand_id[0]))[0].name || ''}
                  </TextCom>
                  <IoChevronUpOutline color="#707070" className="d-arrow" />
                  <div className="sort-by d-flex align-items-center">
                    <TextCom weight="xl">{translate('sort-by', 'Sort by')}:</TextCom>
                    <InputCom isValidate={false} input_as="select" onChange={(e: any) => handleSelectChange(e)}>
                      <option value="">{translate('all', 'All')}</option>
                      {sort_by?.map((item, i) => {
                        return (
                          <option key={i} value={item?.value}>
                            {item?.name}
                          </option>
                        )
                      })}
                    </InputCom>
                  </div>
                </div>
              </>
            )}
            <TextCom color="border">
              {translate('items', 'Items')} : {getProduct_data?.total_products || '0'}
            </TextCom>
            <div className="product-con">
              {location?.search?.includes('category') ? (
                // Number(location?.state) === Number(getProduct_data?.product_list[0]?.categories[0]?.id) ? (
                <div className="row">
                  {getProduct_data?.product_list?.length > 0 ? (
                    <ProductCardMap data={getProduct_data?.product_list} className="col-lg-3 col-sm-4 col-6 p-card" />
                  ) : (
                    <div className="no-item my-5">
                      <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                        <FiInfo size="60" color="#CBCBCB" />
                        <TextCom>{translate('no-product-found', `No Product Found`)}</TextCom>
                        <TextCom as="a" href="/" className="shopping" color="secondary">
                          {translate('continue-shopping', 'Continue Shopping')}
                        </TextCom>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // ) : (
                //   <div className="col-lg-9 d-flex justify-content-center text-center mt-5">
                //     {getProduct_data?.total_products > 0 ? (
                //       <></>
                //     ) : (
                //       <div className="no-item my-5">
                //         <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                //           <FiInfo size="60" color="#CBCBCB" />
                //           <TextCom>{translate('no-product-found', `No Product Found`)}</TextCom>
                //           <TextCom as="a" href="/" className="shopping" color="secondary">
                //             {translate('continue-shopping', 'Continue Shopping')}
                //           </TextCom>
                //         </div>
                //       </div>
                //     )}
                //   </div>
                // )
                <div className="row">
                  {getProduct_data?.product_list?.length > 0 ? (
                    <ProductCardMap data={getProduct_data?.product_list} className="col-lg-3 col-sm-4 col-6 p-card" />
                  ) : (
                    <div className="no-item my-5">
                      <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                        <FiInfo size="60" color="#CBCBCB" />
                        <TextCom>{translate('no-product-found', `No Product Found`)}</TextCom>
                        <TextCom as="a" href="/" className="shopping" color="secondary">
                          {translate('continue-shopping', 'Continue Shopping')}
                        </TextCom>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="pagination-con">
                <PaginationWrap onChange={onChangePaginate} current={current} total={getProduct_data?.total_products} defaultPageSize={12} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </StyledProductListing>
  )
}
