import React, { useState, useEffect } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'

import { RSSliderCom } from '../../common'
import { useProduct, useHandleOther } from 'hook'
import { CardCom, TextCom } from 'components'
import Image from 'asset/icon/luxura'
import { en2mm_num } from 'utils'

type GallerySliderProps = {
  data?: any
  rightArrowSvg?: any
  leftArrowSvg?: any
}

let slider1: any = []
export const ProductGallerySlider: React.FC<GallerySliderProps> = props => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const { getProductById_data } = useProduct()
  const { translate, langStore } = useHandleOther()
  const langCode = langStore?.code

  useEffect(() => {
    setNav1(slider1)
  }, [])

  let body_rs_props = {
    dots: false,
    arrows: false,
    adaptiveHeight: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  let foot_rs_props = {
    swipeToSlide: true,
    focusOnSelect: true,
    adaptiveHeight: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  }

  return (
    <>
      <RSSliderCom asNavFor={nav2} innerRef={(slider: any) => (slider1 = slider)} rsProps={body_rs_props} {...props} className="slide-con" type="zoom" />
      {getProductById_data && getProductById_data?.promotion[0]?.promotion_type === 'discount' ? (
        <>
          {getProductById_data?.promotion[0]?.discount_type === 'fixed_price' ? (
            <div className="display-center percent-dis" style={{ width: 'fit-content', borderRadius: '10px', paddingInline: '5px' }}>
              <TextCom as="h4" color="light" size="xs">
                - {en2mm_num(getProductById_data?.cal_discount_percent, langCode)} {translate('ks', 'Ks')}
              </TextCom>
            </div>
          ) : (
            <div className="display-center percent-dis">
              <TextCom as="h4" color="light" size="xs">
                {en2mm_num(getProductById_data?.cal_discount_percent, langCode)}%
              </TextCom>
            </div>
          )}
        </>
      ) : (
        getProductById_data?.promotion[0]?.promotion_type === 'product' && (
          <CardCom className="gift-main-con" bgcolor="status">
            {getProductById_data?.promotion[0]?.promotion_type === 'product' && getProductById_data?.product_id !== getProductById_data?.promotion[0].reward_product[0]?.product_template_id ? (
              <>
                <div className="gift-text">
                  {langCode === 'en' ? (
                    <TextCom as="h6" textAlign="center" color="white" className="display-center" weight="sm">
                      Buy {en2mm_num(getProductById_data?.promotion?.[0].buy_product?.[0]?.min_qty, langCode)} Get {en2mm_num(getProductById_data?.promotion[0]?.reward_product[0]?.reward_qty, langCode)}
                    </TextCom>
                  ) : (
                    <TextCom as="h6" textAlign="center" color="white" className="display-center" weight="sm">
                      {en2mm_num(getProductById_data?.promotion?.[0].buy_product?.[0]?.min_qty, langCode)}ခု ဝယ် {en2mm_num(getProductById_data?.promotion[0]?.reward_product[0]?.reward_qty, langCode)}ခု လက်ဆောင်
                    </TextCom>
                  )}
                  <div className="arrow">
                    <TiArrowSortedDown size="28px" />
                  </div>
                </div>
                <div className="free-gift">
                  <img src={getProductById_data?.promotion[0]?.reward_product[0]?.reward_image || Image.DefaultDetailCard} alt="logo" />
                  <TextCom as="h4" className="free-item" color="light" size="xs">
                    +{en2mm_num(getProductById_data?.promotion[0]?.reward_product[0]?.reward_qty, langCode)}
                  </TextCom>
                </div>
              </>
            ) : (
              <TextCom as="h5" textAlign="center" weight="sm" color="white" className="d-flex justify-content-center align-items-center w-100">
                {translate('buy', 'Buy')} {en2mm_num(getProductById_data?.promotion[0]?.buy_product[0]?.min_qty, langCode)} {translate('get', 'Get')} {en2mm_num(getProductById_data?.promotion[0]?.reward_product[0]?.reward_qty, langCode)}
              </TextCom>
            )}
          </CardCom>
        )
      )}
      <RSSliderCom className="slide-nav" asNavFor={nav1} innerRef={setNav2} rsProps={foot_rs_props} {...props} />
    </>
  )
}
