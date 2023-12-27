import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import moment from 'moment'

import { Container, TextCom, ButtonCom } from 'components'
import { StyledPayRes } from 'theme'
import { useHandleOther, useCart } from 'hook'
import Icon from 'asset/icon/luxura'

type PaymentResultProps = {}
export const PaymentResult: React.FC<PaymentResultProps> = () => {
  const location = useLocation()
  const { translate } = useHandleOther()
  const { getCart_data } = useCart()
  const [order, setOrder] = useState({
    order_id: getCart_data?.sale_order_name,
    date: getCart_data?.create_Date,
  })

  const windowUrl = window.location.search
  const param: any = new URLSearchParams(windowUrl)

  return (
    <StyledPayRes>
      <Container className="container">
        <div className="res-con d-flex flex-column justify-content-center align-items-center">
          <img src={Icon.accept} />
          <TextCom className="mt-3 mb-3" size="xxxl">
            {translate('order-successful', 'Your Order was successful.')}
          </TextCom>
          <TextCom weight="lg">
            <TextCom as="span" weight="sm" color="border">
              {translate('order-no', 'Order No')} :{' '}
            </TextCom>
            {param.get('order_id')}
            {/* {moment(getOrder_data?.order?.filter((order: any) => order?.id === Number(orderid))).format('DD/MM/YYYY')} */}
          </TextCom>
          <TextCom weight="lg" style={{ display: 'flex', gap: '5px' }}>
            <TextCom as="span" weight="sm" color="border">
              {translate('payment-status', 'Payment Status')} :{' '}
            </TextCom>
            {param.get('status') === 'success' ? (
              <TextCom color="#4bae4f" style={{ textTransform: 'capitalize' }}>
                {param.get('status')}
              </TextCom>
            ) : (
              <TextCom color="danger" style={{ textTransform: 'capitalize' }}>
                {param.get('status')}
              </TextCom>
            )}
          </TextCom>
          <Link to="/" className="mt-3">
            <ButtonCom text={translate('continue-shopping', 'Continue Shopping')} bgcolor="dark" color="light" btnBorderRadius="xxxs" />
          </Link>
        </div>
      </Container>
    </StyledPayRes>
  )
}
