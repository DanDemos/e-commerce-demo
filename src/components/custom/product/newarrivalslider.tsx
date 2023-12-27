import React, { useState, useEffect } from 'react'

import { RSSliderCom } from '../../common'
import { ProductCard, ProductCardMap } from './productcard'
import { StyledNewArrivalSlider } from 'theme'
type NewArrivalSliderProps = {
  data?: any
  slidesToShow?: any
  dots?: boolean
  large_img?: boolean
  no_border?: boolean
  card_data?: any
  leftArrowSvg?: any
  rightArrowSvg?: any
  type?: any
  route?: any
  style?: any
  className?: any
}

export const NewArrivalSlider: React.FC<NewArrivalSliderProps> = ({ style, dots, data, slidesToShow, card_data, large_img, no_border, type, route, ...props }) => {
  let rs_props = {
    dots: dots || false,
    arrows: true,
    // adaptiveHeight: true,
    infinite: false,
    slidesToShow: slidesToShow || 5,
    slidesToScroll: 2,
    swipeToSlide: true,
    swipe: false,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          // infinite: true
        },
      },
      {
        breakpoint: 768,
        settings: {
          swipe: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  }

  // console.log(card_data);

  return (
    <StyledNewArrivalSlider className={`${large_img ? 'large-card-slider' : 'aa'}`} style={style}>
      <RSSliderCom rsProps={rs_props} {...props}>
        {data && data?.map((x: any, i: any) => <ProductCard data={x} no_border={no_border || true} key={i} />)}
        {card_data &&
          card_data?.map((item: any, i: any) => {
            const is_product_promo = item?.promotion !== null && item?.promotion[0]?.promotion_type === 'product'
            const is_same_product = is_product_promo ? (item?.id || item?.product_id) === item?.promotion[0].reward_product[0]?.product_template_id : false
            return (
              <>
                <ProductCard
                data={{
                  item_name: item.name,
                  main_img: item.product_image ? item.product_image : item.image,

                  item_price: item.list_price,
                  discount_price: item.promo_price,
                  discount_percent: item.cal_discount_percent || (item?.promotion && item?.promotion[0]?.discount_percent) || '',
                  discount_type: item?.promotion?.[0]?.discount_type || null,
                  promo_data: is_product_promo && is_same_product === false ? [item?.promotion?.[0].buy_product?.[0]?.min_qty, item?.promotion?.[0].reward_product?.[0]?.reward_qty, item?.promotion?.[0].reward_product?.[0]?.reward_image] : '',
                  promo_text: is_product_promo && is_same_product === true ? [item?.promotion[0].buy_product[0].min_qty, item?.promotion[0].reward_product[0].reward_qty] : '',

                  route: item.id ? `/product/${item.id}` : `/product/${item.product_id}`,
                  replace: false,
                  item,
                }}
                has_item={item?.in_stock === false ? 'false' : 'true'}
                no_border={!no_border ? no_border : true}
                key={i}
                />
              </>
            )
          })}
      </RSSliderCom>
    </StyledNewArrivalSlider>
  )
}
