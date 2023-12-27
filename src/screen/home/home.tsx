import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Media from 'react-media'
import { ImPlay3 } from 'react-icons/im'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'

import { Container, TextCom, ProductCardMap, RSSliderCom, NewArrivalSlider, InputCom, ButtonCom, SearchCom } from 'components'
import { useProduct, useOther, useHandleOther, useTheme } from 'hook'
import { StyledHome } from 'theme'
type HomeProps = {}

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
let rsPromotion = {
  dots: false,
  arrows: true,
  adaptiveHeight: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerMode: true,
      },
    },
  ],
}

let rsBrandPromotion = {
  dots: false,
  arrows: true,
  adaptiveHeight: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

export const Home: React.FC<HomeProps> = props => {
  const { getProductGroup_data, getHighLightBrandList_data, getBrandList_data, dispatch, ProductAction, getPromotion_data } = useProduct()
  const { getWebsiteSlider_data, getWebsiteBanner_data, getWebsiteSliderMobile_data, getMetaData_data, OtherAction } = useOther()
  const { translate, langStore } = useHandleOther()
  const { themeContext } = useTheme()
  let langCode = langStore?.code
  const navigate = useNavigate()

  let [productName, setProductName] = useState('')
  let [search_active, setSearch_active] = useState(false)

  useEffect(() => {
    dispatch(OtherAction.getWebsiteSlider({ code: 'homebanner', langCode }))
    dispatch(OtherAction.getWebsiteSliderMobile({ code: 'home-mobile-banner', langCode }))

    dispatch(ProductAction.getBrandList(''))
    dispatch(ProductAction.getProductGroup())
    dispatch(ProductAction.getHighLightBrandList())
    dispatch(ProductAction.getPromotion(langCode))
    dispatch(OtherAction.getWebsiteBanner({ langCode, id: 'B1' }))
  }, [langCode])

  let bestdata_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'bestseller')?.[0]
  let new_arrival_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'newarrival')?.[0]
  let package_products_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'packageproducts')?.[0]
  let promotion_Items_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'promotionitems')?.[0]
  let week_trendy_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'weektrendy')?.[0]
  let spotlight_obj = getProductGroup_data?.data?.filter((x: any) => x.code === 'skincarespotlight')?.[0]

  const product_display = (data?: any) => {
    if (data?.display === 'slider') {
      return (
        <>
          <Media query={{ maxWidth: 1440 }}>{matches => (matches ? <NewArrivalSlider className="cu-product-card" card_data={getProductGroup_data ? data.item : ''} slidesToShow={4} dots={true} large_img={true} no_border={false} /> : <NewArrivalSlider className="cu-product-card" card_data={getProductGroup_data ? data.item : ''} slidesToShow={5} dots={true} large_img={true} no_border={false} />)}</Media>
        </>
      )
    } else {
      return <Media query={{ maxWidth: 1440 }}>{matches => (matches ? <ProductCardMap data={getProductGroup_data ? data?.item : ''} className="col-lg-3 col-sm-4 col-6 p-card" /> : <ProductCardMap data={getProductGroup_data ? data?.item : ''} className="col-lg-3 col-sm-4 col-6 cu-card-width p-card" />)}</Media>
    }
  }

  const handleSearch = (e: any) => {
    productName !== '' && navigate(`/search/${encodeURI(productName)}`)
    setSearch_active(!search_active)
    setProductName('')
  }

  return (
    <StyledHome>
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
      {getBrandList_data && (
        <section className="bg-section">
          <Container className="container-fluid custom-button brand-custom">
            <Container as="section" className="brand">
              <RSSliderCom rsProps={rsProps1} data={getBrandList_data ? getBrandList_data?.all_data : ''} route="/products?brand_id=" />
            </Container>
          </Container>

          {new_arrival_obj?.item?.length > 0 && (
            <Container as="section" bgcolor={getProductGroup_data ? new_arrival_obj.theme : ''} className={`custom-button special-sec new-arrival  ${getProductGroup_data && new_arrival_obj?.theme}`}>
              <Container className="container-fluid new-arrival " bgcolor="transparent">
                <div className="main-header">
                  <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="righteous" textAlign="center" className="card-header first">
                    {getProductGroup_data && new_arrival_obj.name}
                  </TextCom>
                  <ImPlay3 size={45} className="left-svg" />
                  <ImPlay3 size={45} className="right-svg" />
                </div>
                <div className={`row justify-content-center`} style={{ rowGap: '20px' }}>
                  {product_display(new_arrival_obj)}
                </div>
              </Container>
            </Container>
          )}
        </section>
      )}

      {package_products_obj?.item?.length > 0 && (
        <Container as="section" style={{ marginTop: '-40px', paddingBottom: '20px' }} bgcolor={getProductGroup_data ? package_products_obj.theme : ''}>
          <Container className={`container-fluid special-sec ${getProductGroup_data && package_products_obj?.theme} package-product`} bgcolor="transparent">
            <div className="main-header">
              <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="rye" textAlign="center" className="card-header first">
                {getProductGroup_data && package_products_obj.name}
              </TextCom>
              <ImPlay3 size={45} className="left-svg" color="#A77867" />
              <ImPlay3 size={45} className="right-svg" color="#A77867" />
            </div>
            <div className={`row justify-content-center`} style={{ rowGap: '20px' }}>
              {product_display(package_products_obj)}
              {/* <NewArrivalSlider card_data={package_products_obj ? package_products_obj.item : ''} slidesToShow={4} dots={true} large_img={true} no_border={true} /> */}
            </div>
          </Container>
        </Container>
      )}

      {promotion_Items_obj?.item?.length > 0 && (
        <Container as="section" style={{ marginTop: '-40px' }} bgcolor={getProductGroup_data ? promotion_Items_obj?.theme : ''}>
          <Container className={`container-fluid special-sec ${getProductGroup_data && promotion_Items_obj?.theme}`} bgcolor="transparent">
            <div className="main-header">
              <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="righteous" textAlign="center" className="card-header first">
                {getProductGroup_data && translate('promotion-items', 'Promotion Items')}
              </TextCom>
              <ImPlay3 size={45} className="left-svg" />
              <ImPlay3 size={45} className="right-svg" />
            </div>
            <div className={`row justify-content-center`} style={{ rowGap: '20px' }}>
              {getProductGroup_data && product_display(promotion_Items_obj)}
            </div>
          </Container>
        </Container>
      )}

      {getPromotion_data && (
        <Container className={`promo-slider-section custom-button container-fluid pt-3`} style={{ paddingBottom: '45px', margin: 'auto' }}>
          <Container as="section">
            {getPromotion_data && (
              <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="righteous" textAlign={'center'}>
                {langCode === 'en' ? 'Monthly Promotion' : 'လစဉ်လျော့စျေး'}
              </TextCom>
            )}
            {getPromotion_data && <br />}
            <RSSliderCom rsProps={rsPromotion} data={getPromotion_data} route="/promotion/" />
          </Container>
        </Container>
      )}

      {bestdata_obj?.item?.length > 0 && (
        <Container as="section" style={{ marginTop: '-40px' }} bgcolor={getProductGroup_data ? bestdata_obj.theme : ''}>
          <Container className={`container-fluid position-relative special-sec ${getProductGroup_data && bestdata_obj.theme}`} bgcolor="transparent">
            <div className="main-header">
              <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="architects" textAlign="center" className="card-header first">
                {translate('best-seller', 'Best Seller')}
              </TextCom>
              <ImPlay3 size={45} className="left-svg" />
              <ImPlay3 size={45} className="right-svg" />
            </div>

            <div className={`row justify-content-center`} style={{ rowGap: '20px' }}>
              {getProductGroup_data && product_display(bestdata_obj)}
            </div>
          </Container>
        </Container>
      )}

      {week_trendy_obj && week_trendy_obj?.item?.length > 0 && (
        <Container as="section" style={{ marginTop: '-40px' }} bgcolor={getProductGroup_data ? week_trendy_obj?.theme : ''}>
          <Container className={`container-fluid position-relative special-sec ${getProductGroup_data && week_trendy_obj?.theme}`} bgcolor="transparent">
            <div className="main-header">
              <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="architects" textAlign="center" className="card-header first">
                {translate('week_trendy', 'This Week Trendy')}
              </TextCom>
              <ImPlay3 size={45} className="left-svg" />
              <ImPlay3 size={45} className="right-svg" />
            </div>

            <div className={`row justify-content-center`} style={{ rowGap: '20px' }}>
              {getProductGroup_data && product_display(week_trendy_obj)}
            </div>
          </Container>
        </Container>
      )}

      {/* ---------------Banner sections ------------ */}
      {getWebsiteBanner_data && getWebsiteBanner_data?.length > 0 && (
        <div className={`banner-section container-fluid ${getProductGroup_data && week_trendy_obj?.theme === ('white' || false) ? '' : 'pt-3'}`} style={{ paddingBottom: '40px', position: 'relative' }}>
          <a style={{ position: 'absolute', left: '0', right: '0', width: '100%', height: '100%', zIndex: '3' }} href={getWebsiteBanner_data[0]?.weblink} target="_blank"></a>
          <Media query={{ minWidth: 992 }}>{matches => (matches ? <img src={getWebsiteBanner_data[0]?.desktop_image} alt="banner-img" style={{ width: '100%' }} /> : <img src={getWebsiteBanner_data[0]?.mobile_image} alt="banner-img" style={{ width: '100%' }} />)}</Media>
        </div>
      )}

      {spotlight_obj && spotlight_obj?.item?.length > 0 && (
        <Container as="section" style={{ marginTop: '-40px' }} bgcolor={getProductGroup_data ? spotlight_obj?.theme : ''}>
          <Container className={`container-fluid position-relative special-sec ${getProductGroup_data && spotlight_obj?.theme} ${spotlight_obj?.display === 'slider' ? 'pb-5' : 'pb-3'}`} bgcolor="transparent">
            <div className="main-header">
              <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="righteous" textAlign="center" className="card-header first">
                {translate('skin_care_sportlight', 'Skin Care Spotlight')}
              </TextCom>
              <ImPlay3 size={45} className="left-svg" />
              <ImPlay3 size={45} className="right-svg" />
            </div>

            <div className={`row justify-content-center ${spotlight_obj?.display === 'slider' ? '' : ''}`}>{getProductGroup_data && product_display(spotlight_obj)}</div>
          </Container>
        </Container>
      )}
      {getHighLightBrandList_data && getHighLightBrandList_data?.length > 0 && (
        <Container className={`promo-slider-section custom-button container-fluid ${getProductGroup_data && spotlight_obj?.theme === ('white' || false) ? '' : 'pt-3'}`} style={{ paddingBottom: '45px', margin: 'auto' }}>
          <Container as="section" className="brand">
            <TextCom size={langCode === 'en' ? 'xxxxl' : 'custom'} weight={langCode === 'en' ? 'md' : 'lg'} family="architects" textAlign="center">
              {translate('highlight-brand', 'Highlight Brand')}
            </TextCom>
            <RSSliderCom rsProps={rsBrandPromotion} data={getHighLightBrandList_data} route="/products?brand_id=" />
          </Container>
        </Container>
      )}
    </StyledHome>
  )
}
