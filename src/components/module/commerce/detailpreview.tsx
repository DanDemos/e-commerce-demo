import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillTagsFill } from 'react-icons/bs'
import { BiXCircle } from 'react-icons/bi'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'

import { Loading, SkeletonWrap, CardCom, ProductGallerySlider, TextCom, AttributeButtonMod, AddToCartButtonMod, StockVariantMsgMod, QtyButtonMod, WishlistButtonMod, PriceHandleMod } from 'components'
import { useHandleOther, useProduct, useTheme, hidePreview } from 'hook'
import { StyledPreview, ImageWrap, ContentWrap } from 'theme'
import { en2mm_num, joinSpace } from 'utils'
import Image from 'asset/icon/luxura'

export type DetailPreviewProps = {
  alert?: any
  props?: any
}

const handleText = (text: any) => {
  const textWithoutNewlines = text.split('\\n').join('');

  return <span>{textWithoutNewlines}</span>;
};

export const DetailPreview: React.FC<DetailPreviewProps> = ({ alert, props }) => {
  const navigate = useNavigate()
  const { translate, langStore } = useHandleOther()
  const { getProductById_data, isLoading } = useProduct()
  const { CreatePreview_data, themeContext } = useTheme()
  const [showremind, setShowRemind] = useState(false)
  const [loadstate, setLoadState] = useState(false)
  let ispreview = CreatePreview_data?.PreviewModalVisible
  const langCode = langStore?.code
  if (showremind === true) {
    setTimeout(() => {
      setShowRemind(false)
    }, 3000)
  }

  let imagearr = [{ image: getProductById_data?.image || Image.DefaultDetailCard }]

  const handleDetail = () => {
    navigate(`/product/${getProductById_data?.product_id}`)
    hidePreview()
  }

  //check all variants are selected or not
  let selected: any = null
  let variants: any = []
  let checkvariant: any = []

  getProductById_data?.package_products?.data?.map((item: any) => {
    if (item?.attributes?.data?.length > 0) {
      checkvariant.push(item)
    }
    if (item?.attributes?.selected_variant_ids) {
      if (item?.attributes?.selected_variant_ids.length === item?.attributes?.data?.length) {
        variants.push(item?.attributes?.selected_variant_ids)
      }
    }
  })

  if (getProductById_data?.package_product_type === true) {
    selected = variants.length === checkvariant.length
  } else {
    // selected = getProductById_data?.check_stock?.desc ? false : true
  }
  // let stock_msg = document.querySelector('.stock-msg')
  // let stock = document.querySelector('.stock_msg')
  // if (stock_msg) {
  //   setTimeout(() => {
  //   stock?.setAttribute('style', 'display:none !important')
  //   }, 3000)
  // }

  const galleryRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Loading loadstate={loadstate} />
      <StyledPreview className={ispreview === true ? 'preview' : undefined}>
        <div className={`remind ${showremind ? 'active' : ''}`}>
          <TextCom>
            " {joinSpace(getProductById_data?.name)} " has been added to your cart.
            <BiXCircle size={20} className="mx-2" onClick={() => setShowRemind(!showremind)} />
          </TextCom>
        </div>
        <div className="d-flex preview-content" ref={galleryRef}>
          <ImageWrap className="image_wrap">
            <SkeletonWrap wrapperRef={galleryRef} style={{ borderRadius: '5px', minHeight: '400px' }}>
              {getProductById_data?.gallery?.length > 0 ? <ProductGallerySlider data={getProductById_data?.gallery} rightArrowSvg={<FiChevronRight style={{ strokeWidth: '2px', width: '2rem', height: '2rem' }} />} leftArrowSvg={<FiChevronLeft style={{ strokeWidth: '2px', width: '2rem', height: '2rem' }} />} /> : <ProductGallerySlider data={imagearr} rightArrowSvg={<FiChevronRight style={{ strokeWidth: '2px', width: '2rem', height: '2rem' }} />} leftArrowSvg={<FiChevronLeft style={{ strokeWidth: '2px', width: '2rem', height: '2rem' }} />} />}
            </SkeletonWrap>
          </ImageWrap>
          <ContentWrap className="content-wrap">
            <SkeletonWrap wrapperRef={galleryRef} style={{ borderRadius: '5px', marginBottom: '10px' }}>
              <TextCom size="xl" className="mb-2" color="dark" weight="lg">
                {joinSpace(getProductById_data?.name)}
              </TextCom>
            </SkeletonWrap>

            {getProductById_data?.summary && (
              <SkeletonWrap wrapperRef={galleryRef} style={{ borderRadius: '5px', marginBottom: '10px' }}>
                <TextCom color="paragraph" className="desc">
                  {getProductById_data?.summary}
                </TextCom>
              </SkeletonWrap>
            )}
            <SkeletonWrap wrapperRef={galleryRef} style={{ borderRadius: '5px', marginBottom: '10px' }}>
              <div className="price-mod">
                <PriceHandleMod style={{ marginBottom: 25 }} />
              </div>

              {getProductById_data?.brand?.name && (
                <div className="d-flex gap-4  mt-1 align-items-center">
                  <TextCom weight="xl" style={{ marginBottom: 5, minWidth: '125px' }}>
                    {translate('brand', 'Brand')}:
                  </TextCom>
                  <TextCom color="primary" style={{ marginBottom: 5, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate(`/products?brand_id=${getProductById_data?.brand?.id}`)}>
                    {getProductById_data?.brand?.name || ''}
                  </TextCom>
                </div>
              )}
              {getProductById_data?.country_origin?.name && (
                <div className="d-flex gap-4  mt-1 align-items-center">
                  <TextCom weight="xl" style={{ marginBottom: 5, minWidth: '125px' }}>
                    {translate('country-of-origin', 'Country of origin')}:
                  </TextCom>
                  <TextCom style={{ marginBottom: 5 }}>{getProductById_data?.country_origin?.name || ''}</TextCom>
                </div>
              )}
              {getProductById_data?.code && getProductById_data?.code !== false && (
                <div className="d-flex gap-4 mt-1 align-items-center">
                  <TextCom weight="xl" style={{ marginBottom: 5, minWidth: '125px' }}>
                    {translate('sku', 'SKU')}:
                  </TextCom>
                  <TextCom style={{ marginBottom: 5 }}>{getProductById_data?.code}</TextCom>
                </div>
              )}
              {getProductById_data?.attributes?.data?.length > 0 ? (
                <AttributeButtonMod />
              ) : (
                getProductById_data?.package_products?.data?.length > 0 && (
                  <div className="package-con mt-2 mb-2">
                    <TextCom size="xxl" weight="lg" className="mb-2">
                      {translate('included-products', 'Included Products')}
                    </TextCom>
                    {getProductById_data?.package_products?.data?.map((x: any, i: number) => (
                      <React.Fragment key={i}>
                        <div className="package-variant" key={i} style={{ display: 'flex', flexDirection: 'column', borderBottomWidth: getProductById_data?.package_products?.data?.length - 1 === i ? 0 : 1, borderBottomColor: themeContext?.color?.card?.line2 }}>
                          <TextCom weight="xl">
                            {i + 1}. {handleText(x?.product_name)}
                          </TextCom>
                          {x?.attributes?.data?.length > 0 && (
                            <div className="variant-con" style={{ marginTop: 15 }}>
                              <AttributeButtonMod variant_type="package_product" package_product_index={i} data={x} />
                            </div>
                          )}
                        </div>
                        <hr />
                      </React.Fragment>
                    ))}
                  </div>
                )
              )}

              <div className="button-con d-flex gap-2 align-items-center mt-2 mb-3">
                <TextCom className="qty-text" weight="xl">
                  {translate('quantity', 'quantity')} :
                </TextCom>
                <QtyButtonMod type="productbyid" disabled={selected === false ? true : false} btnbordercolor="#D9D9D9" />
                <div className={`d-flex btns ${ispreview === true ? 'mx-1 gap-2' : 'mx-2 gap-3'}`}>
                  <AddToCartButtonMod setLoadState={setLoadState} disabled={selected === false || (getProductById_data?.package_product_type !== true && getProductById_data?.check_stock?.desc) || getProductById_data?.check_stock?.available_qty === 0 ? true : false} htmlFor="productbyid" type="buynow" navigate={navigate} params={getProductById_data?.product_id} bgcolor="light" btntype="outline" color="dark" btnBorderRadius="xxxs" borderColor="dark" text={translate('buy-now', 'BUY NOW')} />
                  <AddToCartButtonMod setLoadState={setLoadState} disabled={selected === false || (getProductById_data?.package_product_type !== true && getProductById_data?.check_stock?.desc) || getProductById_data?.check_stock?.available_qty === 0 ? true : false} htmlFor="productbyid" type="addtocart" navigate={navigate} params={getProductById_data?.product_id} type_for={getProductById_data?.package_product_type === true ? 'package_product' : ''} bgcolor="dark" color="light" btnBorderRadius="xxxs" text={translate('add-to-bag', 'ADD TO BAG')} set={setShowRemind} />
                </div>
              </div>
              <div className="stock_msg" style={{ fontStyle: 'italic', marginTop: '-10px', marginBottom: '10px' }}>
                <StockVariantMsgMod />
                {getProductById_data?.package_product_type === true && selected === false && (
                  <TextCom color="danger" className="" size="sm">
                    {translate('select-variant-each-attribute', 'Select Variant Each Attribute')}
                  </TextCom>
                )}
              </div>

              {getProductById_data?.package_products?.length === 0 && <WishlistButtonMod product_id={getProductById_data?.product_id} />}
              {getProductById_data?.promotion?.length > 0 &&
                getProductById_data?.promotion.map((promotion_item: any, i: number) => (
                  <CardCom className="discount-con flex-column p-2 mb-2 rounded-1" borderColor="status" cardBorderRadius="xxxs" key={i}>
                    <div className="d-flex align-items-center gap-2">
                      {promotion_item?.promotion_type === 'discount' && (
                        <>
                          <BsFillTagsFill color="#FF4200" />
                          {promotion_item?.discount_type === 'fixed_price' ? (
                            <TextCom className="percent" color="status" size="xl" weight="lg">
                              {promotion_item?.discount} Ks OFF
                            </TextCom>
                          ) : (
                            <TextCom className="percent" color="status" size="xl" weight="lg">
                              {promotion_item?.discount}% OFF
                            </TextCom>
                          )}
                        </>
                      )}
                      {promotion_item?.promotion_type === 'product' && promotion_item?.buy_product[0]?.product_template_id === promotion_item.reward_product[0]?.product_template_id ? (
                        <>
                          <BsFillTagsFill color="#FF4200" />
                          <TextCom className="percent" color="status" size="xl" weight="lg">
                            {translate('buy', 'Buy')} {promotion_item?.buy_product[0]?.min_qty} {translate('get', 'Get')} {promotion_item?.reward_product[0]?.reward_qty}
                          </TextCom>
                        </>
                      ) : (
                        promotion_item?.promotion_type === 'product' && (
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-center gap-2">
                              <BsFillTagsFill color="#FF4200" />
                              {langCode === 'en' ? (
                                <TextCom className="percent" color="status" size="xl" weight="lg">
                                  {translate('buy', 'Buy')} {promotion_item?.buy_product[0]?.min_qty} {translate('received', 'Received')} {promotion_item?.reward_product[0]?.reward_qty} {translate('free-gift', 'Free Gift')}
                                </TextCom>
                              ) : (
                                <TextCom className="percent" color="status" size="xl" weight="lg">
                                  {en2mm_num(promotion_item?.buy_product[0]?.min_qty, langCode)} ခုဝယ်လျှင် {en2mm_num(promotion_item?.reward_product[0]?.reward_qty, langCode)} ခုလက်ဆောင်
                                </TextCom>
                              )}
                            </div>
                            <div className="d-flex">
                              <BsFillTagsFill color="white" />
                              <TextCom color="border" className="promotion-name" size="sm">
                                {promotion_item?.name}
                              </TextCom>
                            </div>
                            <img src={getProductById_data?.promotion[0]?.reward_product[0]?.reward_image || Image.DefaultDetailCard} alt="" width="175px" />
                          </div>
                        )
                      )}
                    </div>
                    {(promotion_item?.promotion_type === 'discount' || promotion_item?.buy_product[0]?.product_template_id === promotion_item.reward_product[0]?.product_template_id) && (
                      <div className="d-flex align-items-center gap-2">
                        <BsFillTagsFill color="transparent" />
                        <TextCom color="border">{promotion_item?.name}</TextCom>
                      </div>
                    )}
                  </CardCom>
                ))}
            </SkeletonWrap>
          </ContentWrap>
        </div>
        {ispreview === true && (
          <div className="view-detail">
            <div className="detail">
              <TextCom as="a" color="primary" onClick={() => handleDetail()}>
                {translate('view-full-detail', 'View Full Detail')}
              </TextCom>
            </div>
          </div>
        )}
      </StyledPreview>
    </>
  )
}
