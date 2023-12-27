import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { TbCrown } from 'react-icons/tb'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaQuestion } from 'react-icons/fa'
import Media from 'react-media'

import { Loading, TextCom, ButtonCom, Container, NewTabCom, TableCom, ModalCom, QtyButtonMod, FormContainerCom, InputCom, StockVariantMsgMod } from 'components'
import { useHandleOther, useProduct, useHandleGift, useAuth, useCart, useOther } from 'hook'
import { joinSpace, moneyFormat } from 'utils'
import { StyledCartCon } from 'theme'
import Image from 'asset/icon/luxura'

type IShoppingCartProps = {}

export const ShoppingCart: React.FC<IShoppingCartProps> = props => {
  const navigate = useNavigate()
  const { translate } = useHandleOther()
  const { pointbalance, totalKyatBalance, FormatUntaxAmount, discount_amount, MaximumRedeemablePoint, onHandlePointSubmit } = useHandleGift()
  const { getProfile_data } = useAuth()
  const { getCart_data, createCart_data, getPointRate_data, postRedeemPointToOrder_data, dispatch, CartAction } = useCart()
  const { langStore } = useOther()
  let langCode = langStore.code
  const [isexceedPoint, setIsexceedPoint] = useState(false)
  const [isModal, setIsModal]: any = useState({
    visible: false,
    type: '',
  })
  useEffect(() => {
    dispatch(CartAction.getCart())
    dispatch(CartAction.getPointRate())
  }, [])
  const columns = [
    {
      title: translate('product', 'Product'),
      key: 'name',
      width: 400,
      render: (x: any, y: any) => (
        <div className="product_name_wrap d-flex" onClick={() => navigate(x?.product_type === 'service' ? `#` : `../product/${x?.product_template_id}`)}>
          {x?.is_delivery_line === true ? <img src={Image.Delivery} /> : <img src={x?.product_image ? x?.product_image : Image.DefaultCard || (x?.reward_type === 'product' ? x?.product_image : Image.PromotionTag)} />}

          <div>
            <TextCom weight="xl">{joinSpace(x?.name)}</TextCom>
            {<StockVariantMsgMod item={getCart_data?.order_lines[getCart_data?.order_lines?.indexOf(x)]} from="other" />}
            {x?.code && x?.is_delivery_line !== true && (
              <TextCom weight="xl">
                SKU: <span>{x?.code}</span>
              </TextCom>
            )}
            {x?.package_items?.length > 0 && x?.package_items?.map((item: any, key: any) => <TextCom weight="">{joinSpace(item?.name)}</TextCom>)}
          </div>
        </div>
      ),
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <div className="product_name_wrap d-flex promo product" onClick={() => navigate(x?.product_type === 'service' ? `#` : `../product/${x?.product_template_id}`)}>
            {x?.promotion_lines[0]?.is_delivery_line === true ? <img src={Image.Delivery} /> : <img src={x?.promotion_lines[0]?.reward_type === 'product' ? x?.promotion_lines[0]?.product_image : Image.PromotionTag} />}
            <div style={{ maxWidth: '50%' }}>
              {x?.promotion_lines[0]?.reward_type === 'product' && (
                <TextCom weight="xl" className="mb-0">
                  {x?.promotion_lines[0]?.name}
                </TextCom>
              )}
              <TextCom>{x?.promotion_lines[0]?.remark}</TextCom>
            </div>
          </div>
        ),
    },
    {
      title: translate('price', 'Price'),
      key: 'price',
      width: 150,
      render: (x: any, y: any) => (
        <div className="price-wrap" style={x?.promotion_lines ? { top: '3%' } : { top: '10%' }}>
          {x?.product_type !== 'service' && (
            <TextCom weight="xl" size="lg" textAlign="center" color="secondary">
              {moneyFormat(x?.price_unit)} {translate('ks', 'Ks')}
            </TextCom>
          )}
        </div>
      ),
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <div className={`promo price ${x?.promotion_lines[0]?.reward_type === 'product' ? 'product-free' : ''}`} style={x?.promotion_lines[0]?.reward_type === 'product' ? { opacity: '1' } : { opacity: '0' }}>
            <TextCom weight="lg" size="md" textAlign="center" color="secondary">
              {translate('free', 'Free')}
            </TextCom>
          </div>
        ),
    },
    {
      title: translate('quantity', 'Quantity'),
      key: 'qty',
      width: 150,
      render: (x: any, y: any) =>
        x?.product_type !== 'service' && x?.is_delivery_line !== 'true' ? (
          <div className="qty-wrap d-flex justify-content-center align-items-center" style={x?.promotion_lines ? { top: '3%' } : { top: '10%' }}>
            <QtyButtonMod type="cartlist" c_index={getCart_data?.order_lines?.indexOf(x)} item={x} />
          </div>
        ) : (
          x?.reward_type === 'discount' && <TextCom textAlign="center">{x?.quantity}</TextCom>
        ),
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <div className="promo qty">
            <TextCom style={x?.promotion_lines[0]?.reward_type === 'product' ? { opacity: '1' } : { opacity: '0' }}>{x?.promotion_lines[0]?.quantity}</TextCom>
          </div>
        ),
    },
    {
      title: translate('subtotal', 'Subtotal'),
      key: 'sub-total',
      width: 150,
      render: (x: any, y: any) =>
        x?.price_subtotal > 0 && (
          <TextCom weight="xl" size="lg" textAlign="center" color="dark" className="subtotal-wrap" style={x?.promotion_lines ? { top: '3%' } : { top: '10%' }}>
            {moneyFormat(x?.price_subtotal)} {translate('ks', 'Ks')}
          </TextCom>
        ),
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <div className="promo subtotal">
            {x?.promotion_lines[0]?.price_subtotal !== 0 ? (
              <TextCom weight="xl" size="lg" textAlign="center" color="dark">
                {x?.promotion_lines[0]?.price_subtotal}
                {translate('ks', 'Ks')}
              </TextCom>
            ) : (
              ''
            )}
          </div>
        ),
    },
    {
      key: 'action',
      width: 50,
      placement: 'right',
      render: (x: any, y: any) =>
        x?.product_type !== 'service' &&
        x?.is_delivery_line !== 'true' && (
          <div className="cancel_btn" onClick={() => handleDelete('one', true, x?.product_id, x?.package_info)}>
            <AiFillCloseCircle color="#707070" size={25} />
          </div>
        ),
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <div className="promo delete">
            <TextCom weight="xl" size="lg" textAlign="center" color="dark">
              {''}
            </TextCom>
          </div>
        ),
    },
  ]
  const mb_columns = [
    {
      key: 'name',
      textAlign: 'left',
      render: (x: any, y: any) => (
        <>
          <div className="product_name_wrap d-flex mb" onClick={() => navigate(x?.product_type === 'service' ? `#` : `../product/${x?.product_template_id}`)}>
            {x?.is_delivery_line === true ? <img src={Image.Delivery} /> : <img src={x?.product_image ? x?.product_image : Image.DefaultCard || (x?.reward_type === 'product' ? x?.product_image : Image.PromotionTag)} />}

            <div>
              <TextCom weight="xl">{joinSpace(x?.name)}</TextCom>
              {<StockVariantMsgMod item={getCart_data?.order_lines[getCart_data?.order_lines?.indexOf(x)]} from="other" />}
              {x?.code && x?.is_delivery_line !== true && (
                <TextCom weight="xl">
                  SKU: <span>{x?.code}</span>
                </TextCom>
              )}
              {x?.package_items?.length > 0 &&
                x?.package_items?.map((item: any, key: any) => (
                  <>
                    <TextCom weight="">
                      {key + 1} : {joinSpace(item?.name)}
                    </TextCom>
                    {<StockVariantMsgMod item={getCart_data?.order_lines[getCart_data?.order_lines?.indexOf(x)]} from="other" />}
                  </>
                ))}
              {x?.product_type !== 'service' && x?.is_delivery_line !== 'true' && (
                <div className="cancel_btn" onClick={() => handleDelete('one', true, x?.product_id)}>
                  <AiFillCloseCircle color="#707070" size={25} />
                </div>
              )}
            </div>
          </div>
          <div className="btn-con d-flex">
            <TextCom weight="xl" size="lg" color="secondary">
              {moneyFormat(x?.price_unit)} {translate('ks', 'Ks')}
            </TextCom>
            {/* <TextCom color='paragraph'><del>1,500{translate('ks', 'Ks')}</del></TextCom> */}
            {x?.product_type !== 'service' && x?.is_delivery_line !== 'true' && (
              <div className="qty-wrap">
                <QtyButtonMod type="cartlist" c_index={getCart_data?.order_lines?.indexOf(x)} item={x} />
              </div>
            )}
          </div>
          {x?.promotion_lines && (
            <>
              <div className="product_name_wrap d-flex mobile-promo">
                {x?.promotion_lines[0]?.is_delivery_line === true ? <img src={Image.Delivery} /> : <img src={x?.promotion_lines[0]?.reward_type === 'product' ? x?.promotion_lines[0]?.product_image : Image.PromotionTag} />}

                <div className="mt-2 d-flex">
                  <div style={{ width: '80%' }}>
                    <TextCom weight="xl">{x?.name}</TextCom>
                    {x?.promotion_lines[0]?.code && (
                      <TextCom weight="xl">
                        SKU: <span>{x?.promotion_lines[0]?.code}</span>
                      </TextCom>
                    )}
                    <TextCom>{x?.promotion_lines[0]?.remark}</TextCom>
                    {x?.promotion_lines[0]?.package_items?.length > 0 &&
                      x?.promotion_lines[0]?.package_items?.map((item: any, key: any) => (
                        <TextCom weight="">
                          {key + 1} : {joinSpace(item?.name)}
                        </TextCom>
                      ))}
                  </div>
                  <TextCom weight="lg" size="sm" textAlign="center" color="secondary" className={x?.promotion_lines[0]?.reward_type === 'product' ? 'product-free' : ''} style={x?.promotion_lines[0]?.reward_type === 'product' ? { opacity: '1' } : { opacity: '0' }}>
                    {translate('free', 'Free')}
                  </TextCom>
                  {/* </div> */}
                </div>
                <div className="qty-wrap mt-2 promo">
                  <TextCom>{x?.promotion_lines[0]?.quantity}</TextCom>
                </div>
              </div>
              <div className="btn-con d-flex" style={{ marginLeft: '15px' }}>
                {x?.promotion_lines[0]?.price_subtotal > 0 ? (
                  <TextCom weight="xl" size="lg" color="secondary">
                    {moneyFormat(x?.promotion_lines[0]?.price_subtotal)} {translate('ks', 'Ks')}
                  </TextCom>
                ) : (
                  <TextCom weight="xl" size="lg" color="secondary">
                    {' '}
                  </TextCom>
                )}
              </div>
            </>
          )}
        </>
      ),
    },
  ]

  const handleDelete: any = async (type?: string, handle?: boolean, id?: number, package_type?: any) => {
    if (type === 'delete-one-item') {
      await dispatch(CartAction.deleteCart({ order_id: createCart_data?.order_id, product_id: isModal?.id, type: isModal?.package_type ? isModal?.package_type : '' }))
    }
    if (type === 'delete-all-item') {
      await dispatch(CartAction.deleteAllInCart({ order_id: createCart_data?.order_id }))
    }
    setIsModal({
      ...isModal,
      visible: handle,
      type: `delete-${type}-item`,
      id,
      package_type,
    })
  }
  const initialValues = {
    point: '',
  }

  const Checkout = () => {
    if (getCart_data?.total < getCart_data?.redeem_discount) {
      setIsexceedPoint(true)
    } else {
      setIsexceedPoint(false)
      navigate(getProfile_data?.name ? `/order/gift` : `/order/payment`)
    }
  }

  const cart_state = useSelector((state: any) => state.cart)

  return (
    <>
      <Loading loadstate={{ loadstate: cart_state?.isLoading }} />
      <StyledCartCon>
        <Container className="shopping-cart-con container-fluid">
          {cart_state?.isLoading === false ? (
            <div className="row cart-row">
              {getCart_data?.order_lines?.length > 0 ? (
                <>
                  <div className="col-lg-8 cart-table">
                    <TextCom size="xxxl" weight="xl" className="title">
                      {translate('shopping-bag', 'Shopping Bag')}
                    </TextCom>
                    <Media query={{ minWidth: 992 }}>{matches => <TableCom dataSource={getCart_data?.order_lines} columns={matches ? columns : mb_columns} />}</Media>
                    {getCart_data?.order_lines?.length > 0 && <ButtonCom text={translate('remove-all', 'REMOVE ALL')} type="outline" bgcolor="transparent" btnBorderRadius="xxxs" onClick={() => handleDelete('all', true)} />}
                  </div>
                  <div className="col-lg-4 cart-total">
                    {getProfile_data?.name ? (
                      <>
                        {getCart_data?.isRoyaltyProgram && (
                          <>
                            <TextCom weight="xl" className="title">
                              {translate('redeem-reward-points-here', 'Redeem reward points here')}
                            </TextCom>
                            <TextCom weight="xl">
                              {translate('point-balance', 'Point Balance')} : {pointbalance} {translate('pts', 'Pts')} ({totalKyatBalance} {translate('ks', 'Ks')})
                            </TextCom>

                            <TextCom size="sm" color="secondary">
                              {translate('maximum-points-redeemable', 'Maximum points redeemable')} : {MaximumRedeemablePoint}
                            </TextCom>
                            {getCart_data?.redeem_point === 0 && (
                              <div className="point-input">
                                <FormContainerCom
                                  initialValues={initialValues}
                                  validationSchema={(yup: any) =>
                                    yup.object({
                                      point: yup.number().max(MaximumRedeemablePoint, 'your redemmable limit is exceed.').min(0, 'Redeem point must greater than 0').integer('Redeem point must be Integer'),
                                    })
                                  }
                                  onSubmit={(value: any) => value?.point > 0 && onHandlePointSubmit(value)}
                                >
                                  {(formikProps: any) => {
                                    return (
                                      <div className="d-flex">
                                        <InputCom placeholder={translate('point-to-redeem', 'point to redeem')} name="point" type="number" />
                                        <ButtonCom type="submit" text={translate('redeem', 'Redeem')} bgcolor="dark" color="light" btnBorderRadius="xxxs" />
                                      </div>
                                    )
                                  }}
                                </FormContainerCom>
                                <TextCom className="error" size="xs" color="danger">
                                  {postRedeemPointToOrder_data?.message}
                                </TextCom>
                              </div>
                            )}
                          </>
                        )}
                        <div className="sub-total d-flex">
                          <TextCom size="xl" weight="xl">
                            {translate('subtotal', 'Sub Total')}
                          </TextCom>
                          <TextCom size="xl" weight="xl">
                            {FormatUntaxAmount}
                            {translate('ks', 'Ks')}
                            <AiFillCloseCircle color="#707070" size={35} style={{ paddingLeft: '8px', opacity: '0' }} />
                          </TextCom>
                        </div>
                        <div className="tax d-flex justify-content-between">
                          <TextCom size="xl" weight="xl">
                            {translate('tax', 'Tax')}
                          </TextCom>
                          <TextCom size="xl" weight="xl">
                            {moneyFormat(getCart_data?.tax)}
                            {translate('ks', 'Ks')}
                            <AiFillCloseCircle color="#707070" size={35} style={{ paddingLeft: '8px', opacity: '0' }} />
                          </TextCom>
                        </div>

                        {getCart_data?.isRoyaltyProgram && getCart_data?.redeem_discount < 0 && (
                          <div className="redeem d-flex align-items-center">
                            <TextCom size="xl" weight="xl">
                              {translate('redeem-discount', 'Redeem Discount')}
                            </TextCom>
                            <TextCom size="xl" weight="xl" style={{ flexWrap: 'wrap' }}>
                              {getCart_data?.redeem_discount}
                              {translate('ks', 'Ks')}
                              <AiFillCloseCircle color="#707070" size={35} style={{ paddingLeft: '8px', cursor: 'pointer' }} onClick={() => onHandlePointSubmit({ point: 0 })} />
                            </TextCom>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="total d-flex">
                          <TextCom size="xxl" weight="xl">
                            {translate('subtotal', 'Subtotal')}
                          </TextCom>
                          <TextCom size="xxl" weight="xl">
                            {FormatUntaxAmount}
                            {translate('ks', 'Ks')}
                          </TextCom>
                        </div>
                        <div className="tax d-flex justify-content-between">
                          <TextCom size="xl" weight="xl">
                            {translate('tax', 'Tax')}
                          </TextCom>
                          <TextCom size="xl" weight="xl">
                            {moneyFormat(getCart_data?.tax)}
                            {translate('ks', 'Ks')}
                          </TextCom>
                        </div>
                      </>
                    )}
                    {getCart_data?.isRoyaltyProgram && getCart_data?.discount_percent > 0 && (
                      <div className="tax d-flex justify-content-between">
                        <TextCom size="xl" weight="xl">
                          {translate('discount-amount', 'Discount Amount')}({getCart_data?.discount_percent}%)
                        </TextCom>
                        <TextCom size="xl" weight="xl">
                          -{moneyFormat(discount_amount)}
                          {translate('ks', 'Ks')}
                          {getProfile_data && <AiFillCloseCircle color="#707070" size={35} style={{ paddingLeft: '8px', opacity: '0' }} />}
                        </TextCom>
                      </div>
                    )}
                    <hr />
                    <div className="total d-flex mb-3">
                      <TextCom size="xxxl" weight="xl">
                        {translate('total', 'Total')}
                      </TextCom>
                      <TextCom size="xxxl" weight="xl">
                        {moneyFormat(getCart_data?.total)}
                        {translate('ks', 'Ks')}
                      </TextCom>
                    </div>
                    {getCart_data?.isRoyaltyProgram && getProfile_data?.name && (
                      <div className="point-earned d-flex">
                        <div className="d-flex align-items-center">
                          <TbCrown size={30} color="#F27043" fill="#F27043" />
                          <TextCom color="secondary" weight="xl">
                            {translate('points-earned', 'Points earned')}
                          </TextCom>
                        </div>
                        <TextCom color="light" weight="xl" className="point">
                          {getCart_data?.reward_point}
                        </TextCom>
                      </div>
                    )}
                    {getProfile_data && getCart_data?.isRoyaltyProgram && langCode === 'en' ? <TextCom size="xs">1 point will be awarded for every transaction of {getPointRate_data?.ks_per_point} kyats</TextCom> : getProfile_data && getCart_data?.isRoyaltyProgram && <TextCom size="xs">Transaction အားလုံးကို ၁ပွိုင့်လျှင် {getPointRate_data?.ks_per_point}ကျပ် ဖြင့်သတ်မှတ်ပါသည်။</TextCom>}

                    <ButtonCom color="light" bgcolor="dark" text={translate('proceed-to-checkout', 'PROCEED TO CHECKOUT')} btnBorderRadius="xxxs" onClick={() => Checkout()} />
                  </div>
                </>
              ) : (
                <div className="no-item">
                  <TextCom size="xxxl" weight="xl" className="title">
                    {translate('shopping-bag', 'Shopping Bag')}
                  </TextCom>
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={Image.EmptyCart} alt="empty-bag" className="img-fluid" />
                    <TextCom size="xl" weight="xl">
                      {translate('sorry', `Sorry`)}!
                    </TextCom>
                    <TextCom>{translate('bag-empty', `Your bag is empty.`)}</TextCom>
                    <ButtonCom text={translate('continue-shopping', 'Continue Shopping')} bgcolor="dark" color="light" onClick={() => navigate('/')} btnBorderRadius="xxxs" />
                  </div>
                </div>
              )}
              <ModalCom isModal={isModal.visible} handleIsModal={setIsModal}>
                <div className="inner_modal_con">
                  <FaQuestion size={30} />
                  <TextCom className="desc_txt">{isModal?.type === 'delete-all-item' ? <>{translate('are-you-sure-you-want-to-clear-all-cart-items', 'Are you sure you want to clear all cart items')}?</> : <> {translate('are-you-sure-you-want-to-delete-this-item', 'Are you sure you want to delete this item')}?</>}</TextCom>
                  <div className="modal_btn_con d-flex">
                    <ButtonCom text="Cancel" bgcolor="light" color="dark" type="outline" onClick={() => setIsModal(false)} btnBorderRadius="xxxs" />
                    <ButtonCom color="light" bgcolor="dark" text="Delete" btnBorderRadius="xxxs" onClick={() => handleDelete(`${isModal?.type}`, false)} />
                  </div>
                </div>
              </ModalCom>
              <ModalCom isModal={isexceedPoint} handleIsModal={setIsexceedPoint} isCloseBtn={true}>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                  <BsExclamationCircle size={40} style={{ marginBottom: '10px' }} />
                  <TextCom>{translate('redeem-point-must-not-greater-than-total-amount', 'Redeem point must not greater than Total amount')}</TextCom>
                  <ButtonCom className="d-flex align-items-center justify-content-center" btnBorderRadius="xxxs" bgcolor="dark" color="light" text="Ok" onClick={() => setIsexceedPoint(false)} />
                </div>
              </ModalCom>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </StyledCartCon>
    </>
  )
}
