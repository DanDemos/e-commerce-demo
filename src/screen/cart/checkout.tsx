import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

import { BsExclamationCircle, BsArrowLeft } from 'react-icons/bs'
import { FaPhoneAlt, FaBoxOpen } from 'react-icons/fa'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'

import { useHandleOther, useCart, useHandleCart, useAuth } from 'hook'
import { Container, TextCom, ModalCom, ButtonCom, TableCom, CardCom, InputCom } from 'components'
import { joinSpace, moneyFormat, splitedTime } from 'utils'
import { ShippingForm } from './shippingform'
import { StyledCheckout } from 'theme'
import moment from 'moment'

type checkoutProps = {
  guestForm?: any | undefined
}
export const Checkout: React.FC<checkoutProps> = props => {
  const navigate = useNavigate()
  const location = useLocation()

  const { translate, langStore } = useHandleOther()
  const { handleDeleteShippingAddress, handlePayNow, handleSelectShipping, handleEditShippingAddress } = useHandleCart()
  const { getShippingAddress_data, getPaymentList_data, getCart_data, createCart_data, getOrder_data, dispatch, CartAction, selectShippingAddress_data, createShippingAddress_data } = useCart()
  const { getProfile_data, signIn_data } = useAuth()
  const langCode = langStore?.code

  const [show, setShow] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [from, setFrom] = useState('')
  const [guestForm, setguestForm]: Array<any> = useState([])
  const [submitAddress, setSubmitaddress]: any = useState({
    key: '',
    radioPicked: '',
  })
  const [specialReq, setspecialReq] = useState('')
  const [successModal, setSuceessModal]: any = useState(null)
  const [orderid, setOrderid] = useState(null)
  const [alertAddressDelete, setalertAddressDelete] = useState(false)
  const [orderfail, setorderFail] = useState(false)
  const [order, setOrder] = useState({
    order_id: getCart_data?.sale_order_name,
    date: getCart_data?.create_Date,
  })
  const [ID, setid] = useState(0)
  const [paymentState, setPaymentState]: any = useState({})
  const [paymentLoading, setPaymentLoading]: any = useState(false)
  const [selectInfo, showSelectInfo] = useState(false)
  const [Checked, setChecked] = useState(false);
  useEffect(() => {
    dispatch(CartAction.getShippingAddress())
    dispatch(CartAction.getShippingLocations('MM'))
    dispatch(CartAction.getPaymentList())
    if (createCart_data) {
      setOrderid(createCart_data.order_id)
    }
    if (!getProfile_data && location?.pathname === '/order/payment') {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [getProfile_data, langCode, show, location, createCart_data])

  const onRouteChange = (route: any, from?: any) => {
    navigate(route, { state: { from } })
  }
  const handleModal = async (id?: number, from?: any) => {
    setFrom(from)
    if (from === 'edit') {
      // await dispatch(CartAction.getShippingAddressById(id))
      await handleSelectShipping({ id: id })
      setSubmitaddress({ ...submitAddress, key: id })
    }
    setIsModal(!isModal)
  }

  const onHandleDelete = async (from?: any, id?: any) => {
    if (from === 'delete' && id) {
      setid(id)
      setalertAddressDelete(prev => !prev)
    } else {
      handleDeleteShippingAddress(ID)
      setalertAddressDelete(prev => !prev)
    }
  }

  const SubmitForm = async (from?: string, id?: any, key?: number) => {
    if (from === 'selected-address') {
      await handleSelectShipping({ id })
      setSubmitaddress({ ...submitAddress, key: id })
      return
    } else if (from === 'payNow') {
      let select = document.querySelector('.select-info')
      if (submitAddress.radioPicked === '' || (!getProfile_data ? null : submitAddress?.key === '')) {
        showSelectInfo(true)
        // select?.setAttribute('style', 'opacity:1;visibility:visible;')
        setTimeout(() => {
          showSelectInfo(false)
          // select?.setAttribute('style', 'opacity:0;visibility:hidden;')
        }, 3000)
      } else {
        let obj = {
          payment_id: Number(submitAddress?.radioPicked),
          request: specialReq,
        }
        let res = await handlePayNow(obj)
        setPaymentState(res?.payload)
        let redirect: any = document.getElementById('payment-form')
        redirect?.submit()
        setTimeout('document.forms["payment-form"].submit()', 500)
        if (res == 'success') {
          setSuceessModal(true)
        } else if (res === 'fail') {
          setorderFail(true)
        } else if (res?.payload) {
          setPaymentLoading(true)
        }
      }
    }
  }
  if (submitAddress.key === '' && submitAddress.radioPicked === '') {
    if (!getCart_data || getCart_data?.order_lines?.length === 0) {
      navigate('/order/cart', { replace: true })
      return
    } else if (!getProfile_data && location?.pathname === '/order/checkout' && guestForm.length === 0) {
      navigate('/order/payment')
    }
  }

  const columns = [
    {
      title: 'PRODUCT',
      key: 'name',
      width: '500',
      render: (x: any, y: any) => <TextCom>{joinSpace(x.name)}</TextCom>,
      promorender: (x: any, y: any, key: any) => x?.promotion_lines && <TextCom className="mt-2">{x?.promotion_lines[0]?.reward_type === 'discount' ? x?.promotion_lines[0]?.remark : x?.promotion_lines[0]?.name}</TextCom>,
    },
    {
      title: 'QUANTITY',
      key: 'quantity',
      textAlign: 'center',
      width: '100',
      render: (x: any, y: any) => x?.reward_type === false && <TextCom textAlign="center">{x.quantity}</TextCom>,
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <TextCom textAlign="center" className="mt-2">
            {x?.promotion_lines[0]?.quantity}
          </TextCom>
        ),
    },
    {
      title: 'SUB TOTAL',
      key: 'price_subtotal',
      textAlign: 'right',
      width: '300',
      render: (x: any, y: any) => (
        <TextCom textAlign="right" weight="xl">
          {moneyFormat(x.price_subtotal)} {translate('ks', 'Ks')}
        </TextCom>
      ),
      promorender: (x: any, y: any, key: any) =>
        x?.promotion_lines && (
          <TextCom textAlign="right" weight="xl" className="mt-2">
            {x?.promotion_lines[0]?.price_subtotal} {translate('ks', 'Ks')}
          </TextCom>
        ),
    },
  ]
  return (
    <StyledCheckout>
      <Container>
        <Container className="container-fluid checkout">
          <div className="row d-flex justify-content-around">
            {show ? (
              <div className="col-lg-6">
                <div className="d-flex title-wrap justify-content-between align-items-center">
                  <TextCom weight="xl" size="xxxl" className="title">
                    {translate('shipping-address', 'Shipping Address')}
                  </TextCom>
                  <div className="d-flex gap-3">
                    <TextCom>{translate('already-have-an-account', 'Already have an account')}? </TextCom>
                    <TextCom as="a" link color="primary" onClick={() => onRouteChange('/user/signin', 'payment')}>
                      {' '}
                      {translate('login', 'Login')}
                    </TextCom>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3 register-remind">
                  <BsExclamationCircle color="#F27043" />
                  <TextCom color="secondary">{translate('only-register-member-can-get-reward-points', 'Only register member can get reward points')}</TextCom>
                </div>
                <ShippingForm type="guest" btn_name={translate('continue-to-payment', 'Continue To Payment')} route="/order/checkout" guestForm={setguestForm} />
              </div>
            ) : (
              <div className="col-lg-6 sign-in-user">
                {getProfile_data && (
                  <TextCom as="a" onClick={() => onRouteChange('/order/gift')} className="d-flex align-items-center mb-3">
                    <BsArrowLeft />
                    <TextCom>{translate('back-to-gift-product', 'Back To Gift Product')}</TextCom>
                  </TextCom>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <TextCom weight="xl" size="xxxl" className="title">
                    {translate('shipping-address', 'Shipping Address')}
                  </TextCom>
                  {getProfile_data && (
                    <TextCom as="a" className="d-flex align-items-center" onClick={() => (setIsModal(!isModal), setFrom('add'))}>
                      <AiOutlinePlusCircle />
                      {translate('add-address', 'ADD ADDRESS')}
                    </TextCom>
                  )}
                </div>
                <div className="shipping-address-con mb-4 hihi">
                  {getShippingAddress_data?.data?.length > 0
                    ? getShippingAddress_data?.data?.map((add: any, key: any) => {
                        return (
                          <div className={`address-con d-flex ${submitAddress?.key === add?.id ? 'active' : ''}`} key={key}>
                            <div className="info" onClick={() => SubmitForm('selected-address', add?.id, key)}>
                              <div className="d-flex align-items-center gap-2">
                                <TextCom as="input" type="radio" value={''} checked={submitAddress?.key === add?.id ? true : false} />
                                <div>
                                  <TextCom weight="lg" className="name">
                                    {add?.name}
                                  </TextCom>
                                  <TextCom color="paragraph">
                                    <MdLocationOn color="#0491A4" size={20} />
                                    {add?.address1 + ', ' + add?.township?.name + ', ' + add?.state?.name + ', ' + add?.country?.name}
                                  </TextCom>
                                  <TextCom color="paragraph" className="ph">
                                    <FaPhoneAlt color="#0491A4" size={14} />
                                    {add?.mobile}
                                  </TextCom>
                                </div>
                              </div>
                            </div>
                            <div className="btn d-flex flex-column justify-content-center align-items-center">
                              <ButtonCom type="outline" bgcolor="transparent" onClick={() => handleModal(add?.id, 'edit')}>
                                <FiEdit size={20} color="#444444" />
                              </ButtonCom>
                              {getProfile_data && (
                                <ButtonCom type="outline" bgcolor="transparent" onClick={() => onHandleDelete('delete', add?.id)}>
                                  <RiDeleteBin7Line size={20} color="#444444" />
                                </ButtonCom>
                              )}
                            </div>
                          </div>
                        )
                      })
                    : getProfile_data && (
                        <TextCom as="a" onClick={() => (setIsModal(!isModal), setFrom('add'))}>
                          <div className="no-address w-100 d-flex flex-column justify-content-center align-items-center gap-3">
                            <AiOutlinePlus size="23px" />
                            <TextCom>{translate('please-fill-shipping-address-here', 'Please fill shipping address here')}</TextCom>
                          </div>
                        </TextCom>
                      )}
                  {guestForm &&
                    !getProfile_data &&
                    guestForm?.map((add: any, key: any) => (
                      <div className={`address-con d-flex active`} key={key}>
                        <div className="info" onClick={() => SubmitForm('selected-address', createShippingAddress_data?.ID, key)}>
                          <div className="d-flex align-items-center gap-3">
                            <TextCom as="input" type="radio" value={''} checked={true} />
                            <div>
                              <TextCom weight="lg" className="name">
                                {add?.name}
                              </TextCom>
                              <TextCom color="paragraph">
                                <MdLocationOn color="#0491A4" size={20} />
                                {add?.address1 + ', ' + add?.township?.name + ', ' + add?.state?.name}
                              </TextCom>
                              <TextCom color="paragraph" className="ph">
                                <FaPhoneAlt color="#0491A4" size={14} />
                                {add?.mobile}
                              </TextCom>
                            </div>
                          </div>
                        </div>
                        <div className="btn d-flex flex-column justify-content-center align-items-center">
                          <ButtonCom type="outline" bgcolor="transparent" onClick={() => handleModal(add?.id, 'guest_edit')}>
                            <FiEdit size={20} color="#444444" />
                          </ButtonCom>
                        </div>
                      </div>
                    ))}
                </div>
                <TextCom size="xxxl" weight="xl">
                  {translate('payment', 'Payment')}
                </TextCom>
                <CardCom className="d-flex flex-column mb-4 radio-con">
                  <div role="group" aria-labelledby="my-radio-group">
                    {getPaymentList_data?.data &&
                      getPaymentList_data?.data?.map((item: any) => (
                        <TextCom as="label" className="d-flex gap-3 align-items-center">
                          <TextCom as="input" type="radio" value={item.id} name="payment" onClick={(e: any) => setSubmitaddress({ ...submitAddress, radioPicked: e.target.value })} />
                          {item.name}
                          {item?.icons && (
                            <div className="icons d-flex gap-2">
                              {item?.icons?.map((icon: any) => (
                                <img src={icon?.image} alt="icon" />
                              ))}
                            </div>
                          )}
                        </TextCom>
                      ))}
                  </div>
                </CardCom>
                <TextCom size="xxxl" weight="xl">
                  {translate('special-request', 'Special Request')}
                </TextCom>
                <TextCom className="mb-2">({translate('please-let-us-know-if-you-want-to-request', 'Please let us know if you want to request')})</TextCom>
                <TextCom name="address" type="text" as="textarea" rows="4" style={{ width: '100%' }} onChange={(e?: any) => setspecialReq(e.target.value)} />
                <TextCom color="danger" size="xs" className="select-info mb-2">
                  {/* select {submitAddress?.key === '' && submitAddress?.radioPicked === '' ? 'shipping address and payment' : submitAddress?.radioPicked === '' ? 'payment' : 'shipping address'} */}
                </TextCom>
                <div style={{ fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, color: '#4B5563' }}>
                  <input id="checkbox" type="checkbox" defaultValue="" required onClick={() => setChecked(!Checked)} style={{ marginRight: '0.5rem', marginBottom: '20px', borderRadius: '0.25rem', borderColor: '#D1D5DB', width: '1rem', height: '1rem', color: '#2563EB', backgroundColor: '#F3F4F6' }} />
                  {langStore?.code === 'en' ? (
                    <>
                      <span style={{ fontSize: '16px', cursor: 'default' }}>{translate('i-have-read-and-accept', "I've read and accept the")} </span>
                      <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/privacy_policy', 'blank')}>
                        {translate('privacy_policy', 'Privacy policy')}
                      </span>{' '}
                      {translate('and', 'and')}{' '}
                      <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/terms-conditions', 'blank')}>
                        {translate('terms-and-conditions', 'Terms & Conditions')}
                      </span>{' '}
                      *
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/privacy_policy', 'blank')}>
                        {translate('privacy_policy', 'Privacy policy')}
                      </span>{' '}
                      {translate('and', 'and')}{' '}
                      <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/terms-conditions', 'blank')}>
                        {translate('terms-and-conditions', 'Terms & Conditions')}
                      </span>{' '}
                      <span style={{ fontSize: '16px', cursor: 'default' }}>{translate('i-have-read-and-accept', "I've read and accept the")} </span>*
                    </>
                  )}
                </div>
                <div className="d-flex w-100 mb-3">
                  <ButtonCom disabled={Checked ? false : true} type="submit" className={`w-100 place-order-btn`} btnBorderRadius="xxxs" bgcolor="dark" onClick={() => SubmitForm('payNow')}>
                    <TextCom color="light">{translate('place-order', 'PLACE ORDER')}</TextCom>
                  </ButtonCom>
                </div>
                <ModalCom isModal={isModal} handleIsModal={setIsModal} isCloseBtn={true}>
                  <ShippingForm btn_name={translate('add-new-address', 'Add New Address')} modal={setIsModal} from={from} getGuestform={guestForm} guestForm={setguestForm} />
                </ModalCom>
              </div>
            )}
            <div className="col-lg-5 order-summary">
              <TextCom size="xxxl" weight="xl">
                {translate('order-summary', 'Order Summary')}
              </TextCom>
              <TableCom dataSource={getCart_data?.order_lines} columns={columns} />
              <hr />
              {getCart_data?.untax_amount ? (
                <>
                  <div className="d-flex justify-content-between mb-2 w-100">
                    <TextCom className="title">{translate('subtotal', 'Sub Total')}</TextCom>
                    <TextCom weight="xl">
                      {moneyFormat(getCart_data?.untax_amount)}
                      {translate('ks', 'Ks')}
                    </TextCom>
                  </div>
                </>
              ) : (
                <></>
              )}
              {getCart_data?.tax ? (
                <>
                  <div className="d-flex justify-content-between w-100 tax">
                    <TextCom className="title">{translate('tax', 'Tax')}</TextCom>
                    <TextCom weight="xl">
                      {moneyFormat(getCart_data?.tax)} {translate('ks', 'Ks')}
                    </TextCom>
                  </div>
                </>
              ) : (
                <></>
              )}
              {getCart_data?.redeem_discount ? (
                <>
                  <div className="d-flex justify-content-between w-100">
                    <TextCom className="title">{translate('redeemed-discount', 'Redeemed Discount')}</TextCom>
                    <TextCom weight="xl">
                      {moneyFormat(getCart_data?.redeem_discount)} {translate('ks', 'ks')}
                    </TextCom>
                  </div>
                </>
              ) : (
                ''
              )}
              {getCart_data?.discount_percent ? (
                <>
                  <div className="d-flex justify-content-between mb-2 w-100 discount-amount pb-4 mt-2">
                    <TextCom className="title">
                      {translate('discount-amount', 'Discount Amount')} ({moneyFormat(getCart_data?.discount_percent)}%)
                    </TextCom>
                    <TextCom weight="xl">
                      -{moneyFormat(getCart_data?.discount_amount)} {translate('ks', 'Ks')}
                    </TextCom>
                  </div>
                </>
              ) : (
                <></>
              )}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <TextCom size="xl" weight="lg" className="title">
                  {translate('total', 'Total')}
                </TextCom>
                <TextCom size="xl" weight="lg">
                  {moneyFormat(getCart_data?.total)} {translate('ks', 'Ks')}
                </TextCom>
              </div>
              {getCart_data?.gifts.length > 0 && (
                <TextCom size="xxxl" weight="xl">
                  {translate('gift', 'Gift')}
                </TextCom>
              )}
              {getCart_data?.gifts &&
                getCart_data?.gifts.map((item: any) => (
                  <>
                    <div className="d-flex justify-content-between w-100 tax">
                      <TextCom style={{ minWidth: '50%' }}>{item.gift_name}</TextCom>
                      <TextCom style={{ minWidth: '25%', textAlign: 'center' }}>{item.quantity}</TextCom>
                      <TextCom style={{ minWidth: '25%' }} textAlign="right">
                        {item.value_point} {translate('points', 'Points')}
                      </TextCom>
                    </div>
                  </>
                ))}
              {getCart_data?.gift_exchange_point !== 0 && (
                <>
                  <hr />
                  <div className="d-flex justify-content-between w-100 mt-3">
                    <TextCom size="xl" weight="xl">
                      {translate('total-exchange-points', 'Total Exchange Points')}
                    </TextCom>
                    <TextCom>
                      {getCart_data?.gift_exchange_point} {translate('points', 'Points')}
                    </TextCom>
                  </div>
                </>
              )}
              {getProfile_data && getCart_data?.reward_point > 0 ? (
                <>
                  <TextCom size="xxxl" weight="xl" className="mt-5">
                    {translate('reward-point-summary', 'Reward Point Summary')}
                  </TextCom>
                  {getCart_data?.reward_point > 0 && (
                    <div className="d-flex justify-content-between w-100 mt-2">
                      <TextCom>{translate('earned-point', 'Earned Point')}</TextCom>
                      <TextCom>
                        +{getCart_data?.reward_point} {translate('points', 'Points')}
                      </TextCom>
                    </div>
                  )}
                  {getCart_data?.redeem_point !== 0 && (
                    <div className="d-flex justify-content-between w-100 mt-2">
                      <TextCom>{translate('redeemed-point', 'Redeemed Point')}</TextCom>
                      <TextCom>
                        {getCart_data?.redeem_point} {translate('points', 'Points')}
                      </TextCom>
                    </div>
                  )}
                  {getCart_data?.gift_exchange_point !== 0 && (
                    <div className="d-flex justify-content-between w-100 mt-2">
                      <TextCom>{translate('gift-exchange', 'Gift exchange')}</TextCom>
                      <TextCom>
                        {getCart_data?.gift_exchange_point} {translate('points', 'Points')}
                      </TextCom>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
              <div className="d-flex align-items-center gap-2 mt-3 mb-3">
                <BsExclamationCircle color="#F27043" />
                <TextCom translate color="secondary">
                  delivery-fee-message
                </TextCom>
              </div>
            </div>
          </div>
          <div className="inner_modal_con order_success">
            <ModalCom isModal={successModal} handleIsModal={setSuceessModal}>
              <FaBoxOpen size={45} color="#FFBB00" className="d-flex justify-content-center align-items-center m-auto mb-4" />
              <TextCom className="mb-2">{translate('your-orders-have-been-placed-successfully', 'Your orders have been placed successfully!')}</TextCom>
              <div className="order d-flex flex-column mb-4">
                {/* should be order id */}
                <TextCom weight="lg">
                  <TextCom as="span" weight="sm" color="border">
                    {translate('order-id', 'Order ID')} :{' '}
                  </TextCom>
                  {order?.order_id}
                  {/* {moment(getOrder_data?.order?.filter((order: any) => order?.id === Number(orderid))).format('DD/MM/YYYY')} */}
                </TextCom>

                <TextCom weight="lg">
                  <TextCom as="span" weight="sm" color="border">
                    {translate('date', 'Date')} :{' '}
                  </TextCom>
                  {order?.date && moment(order?.date)?.format('DD/MM/YYYY')}
                </TextCom>
              </div>
              <Link to="/">
                <ButtonCom text={translate('continue-shopping', 'Continue Shopping')} bgcolor="dark" color="light" btnBorderRadius="xxxs" />
              </Link>
            </ModalCom>
          </div>
          <ModalCom isModal={alertAddressDelete} handleIsModal={setalertAddressDelete}>
            <TextCom size="sm" weight="lg" className="d-flex flex-column justify-content-center align-items-center gap-3">
              <BsExclamationCircle size={40} />
              {translate('are-you-sure-you-want-to-delete-this-shipping-address', 'Are you sure you want to delete this shipping Address')}?
              <div className="mt-4 d-flex justify-content-center align-items-center w-100 gap-3">
                <ButtonCom className="d-flex align-items-center justify-content-center" btnBorderRadius="xxxs" bgcolor="dark" color="light" text={translate('cancel', 'Cancel')} onClick={() => setalertAddressDelete(false)} />
                <ButtonCom className="d-flex align-items-center justify-content-center" btnBorderRadius="xxxs" bgcolor="dark" color="light" text={translate('continue', 'Continue')} onClick={() => onHandleDelete(true)} />
              </div>
            </TextCom>
          </ModalCom>
          <ModalCom isModal={orderfail} handleIsModal={setorderFail}>
            <TextCom size="sm" weight="lg" className="d-flex flex-column justify-content-center align-items-center gap-3">
              <BsExclamationCircle size={40} />
              {translate('your-order-was-not-success-please-contact-to-site-admin', 'Your Order Was Not Success.Please Contact To Site Admin')}
              <div className="mt-4 d-flex justify-content-center align-items-center w-100 gap-3">
                <ButtonCom className="d-flex align-items-center justify-content-center" btnBorderRadius="xxxs" bgcolor="dark" color="light" text={translate('cancel', 'Cancel')} onClick={() => setorderFail(false)} />
              </div>
            </TextCom>
          </ModalCom>
          <ModalCom isModal={selectInfo} handleIsModal={showSelectInfo}>
            <TextCom size="sm" weight="lg" className="d-flex flex-column justify-content-center align-items-center gap-3">
              <BsExclamationCircle size={40} />
              <TextCom size="sm" className="select-info mb-2">
                Please select {submitAddress?.key === '' && submitAddress?.radioPicked === '' ? 'shipping address and payment' : submitAddress?.radioPicked === '' ? 'payment' : 'shipping address'}
              </TextCom>
            </TextCom>
          </ModalCom>
          <div className="paymentNoti">
            <ModalCom isModal={paymentLoading} handleIsModal={setPaymentLoading}>
              <TextCom size="sm" weight="lg" className="d-flex flex-column justify-content-center align-items-center gap-3">
                <BsExclamationCircle size={40} />
                {translate('please-do-not-reload-your-page', 'please do not reload your page')}
                <br />
                {translate('we-are-redirecting-to-payment-gateway', 'We are Redirecting To Payment Gateway')}.....
              </TextCom>
            </ModalCom>
          </div>
        </Container>
      </Container>
      {paymentState?.payload && (
        <form id="payment-form" action={paymentState?.url} method="POST">
          <input type="hidden" name="merchant_id" value={paymentState?.payload?.merchant_id} />
          <input type="hidden" name="service_name" value={paymentState?.payload?.service_name} />
          <input type="hidden" name="email" value={paymentState?.payload?.email} />
          <input type="hidden" name="password" value={paymentState?.payload?.password} />
          <input type="hidden" name="amount" value={paymentState?.payload?.amount} />
          <input type="hidden" name="order_id" value={paymentState?.payload?.order_id} />
          <input type="hidden" name="paymentMethods" value={paymentState?.payload?.payment_method} />
          <input type="hidden" name="hashValue" id="hash" value={paymentState?.payload?.hashValue} />
        </form>
      )}
    </StyledCheckout>
  )
}
