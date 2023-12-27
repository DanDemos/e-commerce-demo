import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Container, TextCom, ProductCard, ProductCardMap } from 'components'
import './style.scss'
import { useProduct, useHandleOther } from 'hook'
export type IPromoListProps = {}

export const PromoList: React.FC<IPromoListProps> = props => {
  const { getPromotion_data, ProductAction, getPromotionById_data, dispatch } = useProduct()
  const { translate, langStore } = useHandleOther()
  const param = useParams()
  const langCode = langStore?.code

  useEffect(() => {
    dispatch(ProductAction.getPromotion(langCode))
    dispatch(ProductAction.getPromotionById({ id: param?.promoId ? param?.promoId : '', langCode }))
  }, [langCode])

  console.log(getPromotion_data);

  return (
    <Container className="promolist">
      <Container className="container-fluid">
        {param?.promoId && getPromotionById_data?.name ? (
          <>
            <section className="promo-section">
              {getPromotionById_data?.promotion_banner && (
                <div className="promotion-banner">
                  <img className="img-fluid" src={getPromotionById_data?.promotion_banner} alt="" />
                </div>
              )}
              <div className="promotion-desc">
                <TextCom as="h1" size="xxxxl" textAlign="center" weight="xl">
                  {translate(getPromotionById_data?.name, getPromotionById_data?.name)}
                </TextCom>
                <TextCom as="h2" textAlign="center">
                  {translate(getPromotionById_data?.description, getPromotionById_data?.description)}
                </TextCom>
              </div>
              <div className="promotion-products">
                <div className="row justify-content-center">{getPromotionById_data?.product_list?.length > 0 && <ProductCardMap data={getPromotionById_data?.product_list} no_item={false} className="cu-card-width" />}</div>
              </div>
            </section>
          </>
        ) : (
          getPromotion_data &&
          getPromotion_data?.map((promotion: any, i: any) => (
            <section className="promo-section" key={i}>
              {promotion?.promotion_banner && (
                <div className="promotion-banner">
                  <img className="img-fluid" src={promotion?.promotion_banner} alt="" />
                </div>
              )}
              <div className="promotion-desc">
                <TextCom as="h1" size="xxxxl" textAlign="center" weight="xl">
                  {translate(promotion?.name, promotion?.name)}
                </TextCom>
                <TextCom as="h2" textAlign="center">
                  {translate(promotion?.description, promotion?.description)}
                </TextCom>
              </div>
              <div className="promotion-products">
                <div className="row justify-content-center">
                  <ProductCardMap data={promotion?.product_list} no_item={false} className="cu-card-width" />
                </div>
              </div>
            </section>
          ))
        )}

        {/* <TextCom as='h1' size='xxxxl' textAlign='center' weight='xl'>Package Promotion</TextCom>
        <Container className='container-fluid'>
          <div className='row justify-content-center'>
            <ProductCardMap data={slide_data} no_item={false} no_border={true} className='col-md-3 col-sm-6 col-6' />
          </div>
        </Container> */}
      </Container>
    </Container>
  )
}
