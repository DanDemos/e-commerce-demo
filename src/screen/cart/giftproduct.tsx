import React from 'react'

import { TbCrown } from 'react-icons/tb'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import { useHandleOther, useAuth, useHandleGift, useCart, useOther } from 'hook'
import { Container, TextCom, CardCom, TableCom, ButtonCom, InputCom } from 'components'
import { StyledGiftProduct } from 'theme'

type giftProductProps = {
  props?: any
}

export const GiftProduct: React.FC<giftProductProps> = props => {
  const { translate, langStore } = useHandleOther()
  const { getMetaData_data } = useOther()
  const { handleGiftClaim, total, handleGiftQty } = useHandleGift()
  const { getProfile_data } = useAuth()
  const { getGiftProduct_data, getCart_data } = useCart()
  const langCode = langStore?.code

  const columns = [
    {
      key: 'name',
      width: 400,
      textAlign: 'left',
      render: (x: any, y: any) => (x?.quantity && x?.quantity > 0 ? <TextCom>{x?.name}</TextCom> : ''),
    },
    {
      key: 'amount',
      width: 100,
      textAlign: 'center',
      render: (x: any, y: any) => (x?.quantity && x?.quantity > 0 ? <TextCom weight="lg">x {x?.quantity < x?.stock ? x?.quantity : x?.stock}</TextCom> : ''),
    },
    {
      key: 'point_charge',
      width: 100,
      textAlign: 'center',
      render: (x: any, y: any) =>
        x?.quantity && x?.quantity > 0 ? (
          <TextCom textAlign="right" weight="lg">
            {x?.quantity * x?.point_value} {translate('points', 'Points')}
          </TextCom>
        ) : (
          ''
        ),
    },
  ]
  return (
    <StyledGiftProduct>
      <Container>
        <Container className="container-fluid gift-product">
          <div className="d-flex justify-content-between mb-4 head-con">
            <div className="text">
              <TextCom size="xxxl" weight="xl">
                {translate('gift-product', 'Gift Product')}
              </TextCom>
              {getMetaData_data && getMetaData_data['gift-info'] && <TextCom>{getMetaData_data['gift-info'].text_one}</TextCom>}
            </div>
            <div className="point">
              <TbCrown size={30} color="#F27043" fill="#F27043" />
              <TextCom size="xl" weight="lg" className="title">
                {getProfile_data?.point - (getCart_data?.redeem_point || 0)}
              </TextCom>
              <TextCom color="secondary">{translate('point', 'Point')}</TextCom>
            </div>
          </div>
          <Container as="section">
            <div className="row">
              {getGiftProduct_data?.gift_item?.map((item: any, id: number) => {
                return (
                  <div className="cu-card-width" key={id}>
                    <CardCom className="gift-card d-flex">
                      <img src={item.image} alt="" />
                      <TextCom as="h1" textAlign="center" size="lg" weight="xl">
                        {item.name}
                      </TextCom>
                      <TextCom as="h2" textAlign="center" size="xxxl">
                        {item.point_value} {translate('points', 'Points')}
                      </TextCom>
                      {(item.stock < 10 || item.stock === item.quantity || item.quantity > item.stock) && (
                        <TextCom as="em" textAlign="center">
                          {langCode === 'my' ? `${item.stock} ခုသာကျန်သည်` : `Only ${item.stock} left`}
                        </TextCom>
                      )}
                      <div className={`count ${item?.point_value > getProfile_data?.point ? 'disable' : ''}`}>
                        <div className={`disable-layer ${item?.point_value > getProfile_data?.point ? 'active' : ''}`}></div>
                        <div className="d-flex justify-content-center align-items-center qty-com">
                          <div onClick={() => handleGiftQty('sub', id)} style={{ cursor: 'pointer' }}>
                            <AiOutlineMinus />
                          </div>
                          <InputCom className="count-input" value={item?.quantity || 0} onChange={(e: any) => handleGiftQty('input', id, e.target.value)} isValidate={false} />
                          <div onClick={() => handleGiftQty('add', id)} style={{ cursor: 'pointer' }}>
                            <AiOutlinePlus />
                          </div>
                        </div>
                      </div>
                    </CardCom>
                  </div>
                )
              })}
            </div>
          </Container>
          <Container as="section" className="confirm-table">
            {total > 0 && (
              <div className="form">
                <TableCom dataSource={getGiftProduct_data?.gift_item} columns={columns} />
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <TextCom weight="xl">{translate('total-redeem-points', 'Total Redeem Points')}</TextCom>
                  <TextCom weight="xl">
                    {total} {translate('points', 'Points')}
                  </TextCom>
                </div>
              </div>
            )}
            <div className="button-con d-flex align-items-center w-100 mt-3">
              <ButtonCom className="skip-btn" btntype="outline" btnBorderRadius="xxxs" bgcolor="light" text={translate('i-wont-claim-this-time', 'I Wont Claim This Time')} onClick={() => handleGiftClaim('cancel')} borderColor="primary" color="primary" style={{ textAlign: 'center' }} />
              <ButtonCom btnBorderRadius="xxxs" bgcolor="dark" color="light" text={translate('claim', 'Claim')} onClick={() => handleGiftClaim('claim')} disabled={total === 0} />
            </div>
          </Container>
        </Container>
      </Container>
    </StyledGiftProduct>
  )
}
