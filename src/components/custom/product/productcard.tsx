import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { TiArrowSortedDown } from 'react-icons/ti'
import { BsEye } from 'react-icons/bs'
import { GoTriangleRight } from 'react-icons/go'

import { useHandleOther, useProduct, usePreview } from 'hook'
import { CardCom, TextCom, SkeletonWrap } from 'components'
import { moneyFormat, en2mm_num } from 'utils'
import { StyledProductCardCom } from 'theme'

import Image from 'asset/icon/luxura'
import { resolve } from 'path'

type ProductCardProps = {
  children?: any
  className?: any
  style?: any
  data?: any
  key?: any
  bgcolor?: any
  has_item?: string
  no_border?: boolean
  replace?: boolean
  hideName?: boolean
  onClick?: any
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, has_item, no_border, hideName }) => {
  const { main_img, item_name, item_price, discount_percent, discount_type, promo_text, promo_img, promo_data, route, replace, discount_price, item } = data
  const { showPreview } = usePreview()
  const navigate = useNavigate()
  const { ProductAction, dispatch } = useProduct()
  const { translate, langStore } = useHandleOther()
  const langCode = langStore?.code
  const loc = useLocation()

  const handleRouteChange = (route: any, e: any) => {
    navigate(route, { replace: replace })
  }

  const PreviewHandler = async (item: any) => {
    await dispatch(ProductAction.getProductById({ id: item?.id ? item?.id : item?.product_id || item?.ID, langCode }))
    await showPreview()
  }

  const BreakWithBr = () => {
    if (item_name?.includes(`\\n`)) {
      let sentence = item_name
      let returnval: any = []
      sentence = sentence.split(`\\n`)
      sentence.map((item: string, i: any) => (
        <React.Fragment key={i}>
          {returnval.push(item)}
          {returnval.push(sentence.length === i + 1 ? '' : <br key={`br-${i}`} />)}
        </React.Fragment>
      ))
      return returnval
    } else {
      return item_name
    }
  }

  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <StyledProductCardCom className={`${no_border ? 'slider-card' : ''}`}>
      <CardCom className="product-card">
        {route && <a className="route" onClick={e => handleRouteChange(route, e)} />}

        {has_item === 'false' && (
          <>
            <div className="no-item" onClick={e => handleRouteChange(route, e)}></div>
            <TextCom className="out-of-stock" textAlign="center" color="light" size="sm">
              {translate('out-of-stock', 'out of stock')}{' '}
            </TextCom>
          </>
        )}

        <div className="image-promo" ref={cardRef}>
          <SkeletonWrap minHeight="200px" maxHeight="250px">
            <img src={main_img || Image.DefaultCard} width="100%" alt="" />
            {promo_text ? (
              <CardCom bgcolor="status" className="gift-text-1">
                {langCode === 'en' ? (
                  <TextCom textAlign="center" color="white" className="m-auto" size="xs">
                    Buy {en2mm_num(promo_text[0], langCode)} Get {en2mm_num(promo_text[1], langCode)}
                  </TextCom>
                ) : (
                  <TextCom textAlign="center" color="white" className="m-auto" size="xs">
                    {en2mm_num(promo_text[0], langCode)}ခု ဝယ် {en2mm_num(promo_text[1], langCode)}ခု လက်ဆောင်
                  </TextCom>
                )}
              </CardCom>
            ) : (
              <></>
            )}
            {promo_data ? (
              <CardCom className="gift-main-con" bgcolor="status">
                <div className="gift-text">
                  {langCode === 'en' ? (
                    <TextCom as="h6" textAlign="center" color="white" size="xs" className="display-center receive-text">
                      Buy {en2mm_num(promo_data[0], langCode)} Get {en2mm_num(promo_data[1], langCode)}
                    </TextCom>
                  ) : (
                    <TextCom as="h6" textAlign="center" color="white" size="xs" className="display-center receive-text">
                      {en2mm_num(promo_data[0], langCode)}ခု ဝယ် {en2mm_num(promo_data[1], langCode)}ခု လက်ဆောင်
                    </TextCom>
                  )}
                  <div className="arrow">
                    <GoTriangleRight />
                  </div>
                </div>
                <div className="free-gift">
                  <img src={promo_data[2] || Image.DefaultCard} alt="logo" />
                  <TextCom as="h4" className="free-item" color="light" size="xs">
                    +{en2mm_num(promo_data[1], langCode)}
                  </TextCom>
                </div>
              </CardCom>
            ) : (
              <></>
            )}
            {discount_percent ? (
              discount_type === 'fixed_price' ? (
                <div className="display-center percent-dis" style={{ paddingInline: '5px', width: 'fit-content', borderRadius: '10px' }}>
                  <TextCom as="h4" color="light" size="xs">
                    - {en2mm_num(discount_percent, langCode)} {translate('ks', 'Ks')}
                  </TextCom>
                </div>
              ) : (
                <div className="display-center percent-dis">
                  <TextCom as="h4" color="light" size="xs">
                    {en2mm_num(discount_percent, langCode)}%
                  </TextCom>
                </div>
              )
            ) : (
              <></>
            )}
            {!no_border && !loc.pathname.includes('/product/') && (
              <div className="display-center active eye-con">
                <BsEye size="5px" className="eye" onClick={() => PreviewHandler(item)} />
                <div className="eye d-text">
                  <TextCom color="dark" size="sm">
                    {translate('preview', 'Preview')}
                  </TextCom>
                </div>
              </div>
            )}
          </SkeletonWrap>
        </div>

        <div className="description">
          {!hideName && item_name && (
            <SkeletonWrap wrapperRef={cardRef} style={{ marginBottom: '10px', borderRadius: '5px' }}>
              <TextCom className={`px-2 product-name`} textAlign="center" size="md" weight="lg">
                {BreakWithBr()}
              </TextCom>
            </SkeletonWrap>
          )}
          <SkeletonWrap wrapperRef={cardRef} style={{ marginBottom: '10px', borderRadius: '5px' }}>
            <div>
              <TextCom className="brand_id pe-none" textAlign={'center'} size="md" color='primary' weight="sm">
                {item?.brand?.name}
              </TextCom>
            </div>
          </SkeletonWrap>
          <SkeletonWrap wrapperRef={cardRef} style={{ maxWidth: '80%', borderRadius: '5px' }}>
            <div className="d-flex price align-items-center  justify-content-center gap-3">
              {discount_price ? (
                <>
                  <TextCom textAlign="center" color="secondary" size="lg">
                    {moneyFormat(Math.ceil(discount_price, langCode))}
                    {translate('ks', 'Ks')}
                  </TextCom>
                  <TextCom textDecoration="line-through" textAlign="center">
                    {moneyFormat(Math.ceil(item_price), langCode)}
                    {translate('ks', 'Ks')}
                  </TextCom>
                </>
              ) : (
                item_price && (
                  <TextCom textAlign="center" color="secondary" size="lg">
                    {moneyFormat(Math.ceil(item_price, langCode))}
                    {translate('ks', 'Ks')}
                  </TextCom>
                )
              )}
            </div>
          </SkeletonWrap>
        </div>
      </CardCom>
    </StyledProductCardCom>
  )
}
export const ProductCardMap: React.FC<ProductCardProps> = ({ className, data, has_item, no_border }) => {
  return data?.map((item: any, key: any) => {
    const is_product_promo = item?.promotion !== null && item?.promotion[0]?.promotion_type === 'product'
    const is_same_product = is_product_promo ? (item?.product_id || item?.id) === item?.promotion[0].reward_product[0]?.product_template_id : false
    return (
      <div className={className} key={key}>
        <ProductCard
          data={{
            item_name: item.name,
            main_img: item.product_image || item.image || null,
            item_price: item.list_price || item.price || null,
            discount_price: item.promo_price,
            discount_percent: item.cal_discount_percent || (item?.promotion && item?.promotion[0]?.discount_percent),
            discount_type: item?.promotion?.[0]?.discount_type || null,
            promo_data: is_product_promo && is_same_product === false ? [item?.promotion?.[0].buy_product?.[0]?.min_qty, item?.promotion?.[0].reward_product?.[0]?.reward_qty, item?.promotion?.[0].reward_product?.[0]?.reward_image] : '',
            promo_text: is_product_promo && is_same_product === true ? [item?.promotion[0].buy_product[0].min_qty, item?.promotion[0].reward_product[0].reward_qty] : '',
            item,
            route: item.product_id ? `/product/${item.product_id}` : `/product/${item.id}` || `/products?brand_ids=${item.ID}`,
            // replace: true,
          }}
          has_item={item?.in_stock === false ? 'false' : item?.in_stock === 'false' ? 'false' : 'true'}
          no_border={no_border ? no_border : no_border}
          key={key}
        />
      </div>
    )
  })
}
