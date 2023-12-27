import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiUser, FiHeart, FiFileText, FiExternalLink, FiInfo } from 'react-icons/fi'

import { TextCom, ButtonCom, Container, NewTabCom, CardCom, PaginationWrap } from 'components'
import { useOther, useHandleOther, useCart } from 'hook'
import { StyledOrderlistCon } from 'theme'
import Icon from 'asset/icon/luxura'
import { splitedTime } from 'utils'
import './style.scss'

type IOrderListProps = {}

export const OrderList: React.FC<IOrderListProps> = props => {
  const { translate } = useHandleOther()
  const { getContactUsPage_data, getMetaData_data } = useOther()
  const { getOrder_data, CartAction, dispatch } = useCart()
  const navigate = useNavigate()
  let [page, setPage] = useState({
    offset: 1,
    limit: 10,
  })

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
      icon: <FiFileText color="#262626" />,
    },
  ]

  useEffect(() => {
    dispatch(CartAction.getOrder({ offset: page.offset, limit: page.limit }))
  }, [page])

  const onChangePaginate = (pagenumber: any) => {
    setPage({ ...page, offset: pagenumber })
    window.scroll(0, 0)
  }

  return (
    <StyledOrderlistCon>
      <Container className="orderList-con container-fluid">
        <div className="row orderlist-row">
          <div className="col-md-11 col-12 tab">
            <NewTabCom defaultActiveKey="order-history" dataSource={dataSource} />
          </div>
          <div className="col-lg-8 col-12 order-history-content">
            <TextCom size="31" weight="lg" className="title">
              {translate('order-history', 'Order History')}
            </TextCom>
            {getOrder_data && getOrder_data?.order?.length > 0 ? (
              getOrder_data?.order?.map((order: any, key: any) => (
                <CardCom className="order-card" key={key}>
                  <div className="order-title d-flex">
                    <TextCom size="lg" weight="xl">
                      {translate('order-no', 'Order No')}. {order?.name || 'S-123456789'}
                    </TextCom>
                    <TextCom size="sm" color="light" className="status">
                      {translate(order?.status, order?.status) || translate('pending', 'Pending')}
                    </TextCom>
                  </div>
                  <div className="order-detail d-flex">
                    <div className="detail">
                      <div className="d-flex">
                        <div>
                          <div className="detail-info">
                            <div>
                              <TextCom color="border" weight="sm">
                                {translate('order_date', 'Order Date')}
                              </TextCom>
                              <TextCom color="border" weight="sm">
                                {translate('total_amount', 'Total Amount')}
                              </TextCom>
                            </div>
                            <div>
                              <TextCom weight="xl" color="text" style={{ display: 'inline-block' }}>
                                {splitedTime(order?.date)}
                              </TextCom>
                              <TextCom weight="xl" color="text">
                                {order?.amount + ' '}
                                {translate('ks', 'Ks')}
                              </TextCom>
                            </div>
                          </div>
                        </div>
                        <div className="point">
                          {order?.reward_point !== 0 && (
                            <TextCom className="point" color="secondary">
                              {translate('point-earned', 'Point earned')} : {order?.reward_point}
                            </TextCom>
                          )}
                          {order?.use_point !== 0 && (
                            <TextCom className="point" color="secondary">
                              {translate('point-redeemed', 'Point redeemed')} : {order?.use_point}
                            </TextCom>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="detail-btn">
                      <ButtonCom type="outline" bgcolor="transparent" onClick={() => navigate(`../user/my_orders/${order.id}`)}>
                        <FiExternalLink size={20} color="#444444" />
                        {translate('detail', 'Detail')}
                      </ButtonCom>
                    </div>
                  </div>
                </CardCom>
              ))
            ) : (
              <div className="no-item">
                <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                  <FiInfo size="60" color="#CBCBCB" />
                  <TextCom>{translate('empty-order-information', `There's no Order History`)} !</TextCom>
                  <TextCom as="a" href="/" className="shopping" color="secondary">
                    {translate('continue-shopping', 'Continue Shopping')}
                  </TextCom>
                </div>
              </div>
            )}
            {getOrder_data && (
              <div className="pagination-con">
                <PaginationWrap onChange={onChangePaginate} current={page.offset} total={getOrder_data?.total_count} defaultPageSize={page?.limit} />
              </div>
            )}
          </div>
          {getContactUsPage_data && (
            <div className="col-lg-3 col-12 side-bar">
              <div className="title d-flex">
                <img src={Icon.help} alt="logo" />
                <TextCom size="31" weight="xl">
                  {translate('need-help', 'Need help')}?
                </TextCom>
              </div>
              <TextCom size="lg" weight="xl">
                {translate('hotline-service-during-office-hours', 'Hotline service during office hours')}
              </TextCom>
              <TextCom weight="xl">
                {translate('phone', 'Phone')} :{' '}
                <TextCom as="a" href={`tel: ${getContactUsPage_data ? getContactUsPage_data?.hotline || getContactUsPage_data?.branches[0]?.phone : ''}`} weight="md" color="primary">
                  {getContactUsPage_data ? getContactUsPage_data?.hotline || getContactUsPage_data?.branches[0]?.phone : ''}
                </TextCom>
              </TextCom>
              <TextCom weight="xl">
                {translate('email', 'Email')} : <TextCom as="a" href={`mailto: ${getContactUsPage_data ? getContactUsPage_data?.branches[0]?.email : ''}`} color="disabled"></TextCom>
                <TextCom as="a" href={`mailto: ${getContactUsPage_data ? getContactUsPage_data?.email || getContactUsPage_data?.branches[0]?.email : ''}`} weight="md" color="primary">
                  {getContactUsPage_data ? getContactUsPage_data?.email || getContactUsPage_data?.branches[0]?.email : ''}
                </TextCom>
              </TextCom>
              <br />
              <TextCom weight="xl">{translate('hotline-operating-hours', 'Hotline Operating Hours')}</TextCom>
              <TextCom>{getMetaData_data && getMetaData_data['hotline-operating-hours'] && getMetaData_data['hotline-operating-hours'].text_one}</TextCom>
            </div>
          )}
        </div>
      </Container>
    </StyledOrderlistCon>
  )
}
