import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiUser, FiHeart, FiFileText, FiExternalLink } from 'react-icons/fi'
import { TbCrown } from 'react-icons/tb'
import { BsArrowLeft } from 'react-icons/bs'
import Media from 'react-media'
import { Container, TextCom, ButtonCom, NewTabCom, CardCom, TableCom } from 'components'
import { useHandleOther, useOther, useCart } from 'hook'
import { StyledOrderDetailCon } from 'theme'
import Icon from 'asset/icon/luxura'
import { splitedTime, moneyFormat } from 'utils'
import Image from 'asset/icon/luxura'
import './style.scss'

type OrderDetailProps = {}

export const OrderDetail: React.FC<OrderDetailProps> = props => {
  const { translate } = useHandleOther()
  const { getContactUsPage_data, dispatch } = useOther()
  const { getOrder_data, CartAction, getOrderById_data } = useCart()
  const { orderId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(CartAction.getOrderById(orderId))
  }, [])

  const dataSource = [
    {
      title: translate('profile', 'profile'),
      key: 'profile',
      desc: ' ',
      link: '/user/profile',
      icon: <FiUser color="#262626" />,
    },
    {
      title: translate('wishlist', 'Wishlist'),
      key: 'wishlist',
      link: '/user/wishlist',
      icon: <FiHeart color="#262626" />,
    },
    {
      title: translate('order-history', 'Order History'),
      key: 'order-history',
      link: '/user/my_orders',
      icon: <FiFileText color="#262626" />,
    },
  ]

  // let subtotal = 0
  // let pointredeemed = 1000
  // let pointearned = 40
  // let totalexpoint = 0

  // getOrderById_data?.order_lines?.map((order: any) => {
  //   subtotal += order?.total_price
  // })

  //---------order-line-table-------------
  const columns = [
    {
      key: 'name',
      width: 400,
      render: (x: any, y: any) => (
        <div className="product_name_wrap d-flex">
          {x?.product?.image !== false ? <img src={x?.product?.image || Image.DefaultCard} /> : <>{x?.product?.reward_type === 'discount' ? <img src={Image.PromotionTag} /> : x?.product?.is_delivery_line === true ? <img src={Image.Delivery} /> : <img src={Image.DefaultCard} />}</>}
          <div>
            <TextCom weight="xl">{x?.product?.name || 'Product Name'}</TextCom>
            {x?.product?.code && x?.product?.is_delivery_line !== true && (
              <TextCom weight="xl">
                {translate('sku', 'SKU')}: <span>{x?.product?.code}</span>
              </TextCom>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      width: 100,
      render: (x: any, y: any) => (
        <div className="price_wrap">
          {x?.product?.is_delivery_line === false && (
            <TextCom weight="xl" color="secondary" size="lg" textAlign="right">
              {moneyFormat(x?.price_unit)}
              {translate('ks', 'Ks')}
            </TextCom>
          )}
        </div>
      ),
    },
    {
      key: 'qty',
      width: 100,
      render: (x: any, y: any) => (
        <div className="qty_wrap">
          {x?.product?.is_delivery_line === false && (
            <TextCom color="border" textAlign="right">
              {translate('qty', 'Qty')} : {x?.quantity || '1'}
            </TextCom>
          )}
        </div>
      ),
    },
    {
      key: 'total',
      width: 100,
      render: (x: any, y: any) => (
        <div className="total_price_wrap">
          <TextCom weight="xl" size="xl" textAlign="right">
            {moneyFormat(x?.total_price)}
            {translate('ks', 'Ks')}
          </TextCom>
        </div>
      ),
    },
  ]

  const mb_columns = [
    {
      key: 'name',
      width: 200,
      render: (x: any, y: any) => (
        <div className="product_name_wrap">
          <TextCom weight="xl">{x?.product?.name || 'Product Name'}</TextCom>
          {x?.product?.code && x?.product?.is_delivery_line !== true && (
            <TextCom weight="xl">
              {translate('sku', 'SKU')} : <span>{x?.product?.code}</span>
            </TextCom>
          )}
        </div>
      ),
    },
    {
      key: 'qty',
      width: 100,
      render: (x: any, y: any) => (
        <div className="qty_wrap">
          {x?.product?.is_delivery_line === false && (
            <TextCom color="border" textAlign="right">
              {translate('qty', 'Qty')} : {x?.quantity || '1'}
            </TextCom>
          )}
        </div>
      ),
    },
    {
      key: 'total',
      width: 100,
      render: (x: any, y: any) => (
        <div className="total_price_wrap">
          <TextCom weight="xl" size="xl" color="secondary" textAlign="right">
            {moneyFormat(x?.total_price)}
            {translate('ks', 'Ks')}
          </TextCom>
        </div>
      ),
    },
  ]

  //---------gift-table-------------------
  const giftcolumns = [
    {
      key: 'name',
      width: 300,
      render: (x: any, y: any) => (
        <div className="product_name_wrap d-flex">
          <img src={x?.image || Image.DefaultCard} />
          <div>
            <TextCom weight="xl">{x?.gift_name || 'Product Name'}</TextCom>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      width: 200,
      render: (x: any, y: any) => (
        <div className="price_wrap">
          <TextCom weight="xl" color="secondary" size="lg" textAlign="right">
            {x?.value_point || '0'} {translate('points', 'points')}
          </TextCom>
        </div>
      ),
    },
    {
      key: 'qty',
      width: 200,
      render: (x: any, y: any) => (
        <div className="qty_wrap">
          <TextCom color="border" textAlign="center">
            {translate('qty', 'Qty')} : {x?.quantity || '1'}
          </TextCom>
        </div>
      ),
    },
    {
      key: 'total',
      width: 100,
      render: (x: any, y: any) => (
        <div className="total_price_wrap">
          <TextCom weight="xl" size="xl" textAlign="right">
            {x?.value_point * x?.quantity || '0'} {translate('points', 'points')}
          </TextCom>
        </div>
      ),
    },
  ]

  const giftmb_columns = [
    {
      key: 'name',
      width: 200,
      render: (x: any, y: any) => (
        <div className="product_name_wrap">
          <TextCom weight="xl">{x?.gift_name || 'Product Name'}</TextCom>
        </div>
      ),
    },
    {
      key: 'qty',
      width: 100,
      render: (x: any, y: any) => (
        <div className="qty_wrap">
          <TextCom color="border" textAlign="right">
            {translate('qty', 'Qty')} : {x?.quantity || '1'}
          </TextCom>
        </div>
      ),
    },
    {
      key: 'total',
      width: 100,
      render: (x: any, y: any) => (
        <div className="total_price_wrap">
          <TextCom weight="xl" size="xl" textAlign="right">
            {x?.value_point * x?.quantity || '0'}
            {translate('points', 'points')}
          </TextCom>
        </div>
      ),
    },
  ]

  return (
    <StyledOrderDetailCon>
      <Container className="orderDetail-con container-fluid">
        <div className="row orderlist-row">
          <div className="col-md-11 col-12 tab">
            <NewTabCom defaultActiveKey="order-history" dataSource={dataSource} />
          </div>
          <div className="col-lg-8 col-12 order-detail-content">
            <TextCom size="31" weight="lg" className="title">
              {translate('order-detail', 'Order Detail')}
            </TextCom>
            {getOrderById_data && (
              <CardCom className="order-detail-card">
                <div className="order-title">
                  <TextCom size="lg" weight="xl">
                    {translate('order-no', 'Order No')}. {getOrderById_data?.order_id}
                  </TextCom>
                  <TextCom size="lg" weight="xl">
                    {translate('order_date', 'Order Date')} : {splitedTime(getOrderById_data?.date)}
                  </TextCom>
                  <TextCom size="lg" weight="xl">
                    {translate('deliver-to', 'Deliver To')} : {getOrderById_data?.shipping_info?.customer_name}, {getOrderById_data?.shipping_info?.mobile}, {getOrderById_data?.shipping_info?.street}, {getOrderById_data?.shipping_info?.township?.name || 'township'}, {getOrderById_data?.shipping_info?.state?.name || 'state'}, {getOrderById_data?.shipping_info?.country?.name || 'country'}
                  </TextCom>
                  <TextCom size="lg" className="status" color="light">
                    {translate(getOrderById_data?.status, getOrderById_data?.status) || translate('pending', 'Pending')}
                  </TextCom>
                </div>
                <div className="order-table">
                  <Media query={{ minWidth: 992 }}>{matches => <TableCom dataSource={getOrderById_data?.order_lines} columns={matches ? columns : mb_columns} />}</Media>
                </div>
                <div className="sub-total d-flex">
                  <div>
                    <TextCom size="xl" weight="xl">
                      {translate('subtotal', 'Subtotal')}
                    </TextCom>
                    {getOrderById_data?.tax > 0 && (
                      <TextCom size="xl" weight="xl">
                        {translate('tax', 'Tax')}
                      </TextCom>
                    )}
                    {getOrderById_data?.use_point !== 0 && (
                      <TextCom size="xl" weight="xl">
                        {translate('point-redeemed', 'Point redeemed')}
                      </TextCom>
                    )}
                    {getOrderById_data?.discount_percent > 0 && (
                      <TextCom size="xl" weight="xl">
                        {translate('discount-amount', 'Discount Amount')} ({getOrderById_data?.discount_percent}%)
                      </TextCom>
                    )}
                  </div>
                  <div>
                    <TextCom size="xl" weight="xl" textAlign="right">
                      {moneyFormat(getOrderById_data?.subtotal)} {translate('ks', 'Ks')}
                    </TextCom>
                    {getOrderById_data?.tax > 0 && (
                      <TextCom size="xl" weight="xl" textAlign="right">
                        {moneyFormat(getOrderById_data?.tax)} {translate('ks', 'Ks')}
                      </TextCom>
                    )}
                    {getOrderById_data?.use_point !== 0 && (
                      <TextCom size="xl" weight="xl" textAlign="right">
                        {getOrderById_data?.use_point}
                      </TextCom>
                    )}
                    {getOrderById_data?.discount_percent > 0 && (
                      <TextCom size="xl" weight="xl" textAlign="right">
                        -{getOrderById_data?.discount_amount}
                      </TextCom>
                    )}
                  </div>
                </div>
                <div className="total d-flex">
                  <div>
                    <TextCom size="xxxl" weight="xl">
                      {translate('total', 'Total')}
                    </TextCom>
                    <div className="d-flex point">
                      <TbCrown size={30} color="#F27043" fill="#F27043" />
                      <TextCom color="secondary">{translate('points-earned', 'Points earned')}</TextCom>
                    </div>
                  </div>
                  <div>
                    <TextCom size="xxxl" weight="xl" textAlign="right">
                      {moneyFormat(getOrderById_data?.total)} {translate('ks', 'Ks')}
                    </TextCom>
                    <TextCom textAlign="right" className="point-earn" color="light">
                      {getOrderById_data?.reward_point}
                    </TextCom>
                  </div>
                </div>
              </CardCom>
            )}
            {getOrderById_data?.gifts?.length > 0 && (
              <>
                <TextCom size="xxxl" weight="lg">
                  {translate('gift', 'Gift')}
                </TextCom>
                <CardCom className="gift-card">
                  <div className="gift-table">
                    <Media query={{ minWidth: 992 }}>{matches => <TableCom dataSource={getOrderById_data?.gifts} columns={matches ? giftcolumns : giftmb_columns} />}</Media>
                  </div>
                  <div className="total d-flex">
                    <TextCom size="xxxl" weight="xl">
                      {translate('total-exchange-points', 'Total Exchange Points')}
                    </TextCom>
                    <TextCom size="xxxl" weight="xl">
                      {getOrderById_data?.use_point} {translate('points', 'points')}
                    </TextCom>
                  </div>
                </CardCom>
              </>
            )}
            <ButtonCom
              type="outline"
              bgcolor="transparent"
              className="back-btn"
              onClick={() => {
                navigate(`../user/my_orders`)
              }}
            >
              <BsArrowLeft /> {translate('go-to-order-list', 'Go To Order List')}
            </ButtonCom>
          </div>
          <div className="col-lg-3 col-12 side-bar">
            <div className="title d-flex">
              <img src={Icon.help} alt="logo" />
              <TextCom size="31" weight="xl">
                {translate('need-help', 'Need help')}?
              </TextCom>
            </div>
            {getContactUsPage_data && (
              <>
                <TextCom size="lg" weight="xl">
                  {translate('hotline-service-during-office-hours', 'Hotline service during office hours')}
                </TextCom>
                <TextCom weight="xl">
                  {translate('phone', 'Phone')} :{' '}
                  <TextCom as="a" href={`tel:${getContactUsPage_data ? getContactUsPage_data?.branches[0]?.phone : ''}`} weight="md" color="primary">
                    {getContactUsPage_data ? getContactUsPage_data?.branches[0]?.phone : '(+95) 09xxxxxxxx'}
                  </TextCom>
                </TextCom>
                <TextCom weight="xl">
                  {translate('email', 'Email')} :{' '}
                  <TextCom as="a" href={`mailto:${getContactUsPage_data[0] ? getContactUsPage_data?.branches[0]?.email : ''}`} weight="md" color="primary">
                    {getContactUsPage_data ? getContactUsPage_data?.branches[0]?.email : 'xxx@xxxxx.com'}
                  </TextCom>
                </TextCom>
                <br />
                <TextCom weight="xl">{translate('hotline-operating-hours', 'Hotline Operating Hours')} :</TextCom>
                <TextCom>Monday to Sunday (8.00 am - 9.30 pm)</TextCom>
              </>
            )}
          </div>
        </div>
      </Container>
    </StyledOrderDetailCon>
  )
}
