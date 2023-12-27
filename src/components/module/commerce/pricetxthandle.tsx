import React from 'react'

import { TextCom } from '../../common'
import { moneyFormat, en2mm_num } from 'utils'
import { useProduct, useHandleOther } from 'hook'

type PricehandleModProps = {
  style?: any
}
export const PriceHandleMod: React.FC<PricehandleModProps> = props => {
  const { langStore, translate } = useHandleOther()
  const { getProductById_data } = useProduct()
  let langCode = langStore.code

  return getProductById_data?.promo_price ? (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {Number(getProductById_data?.promo_price) > 0 && (
        <TextCom weight="lg" color="secondary" size="xxxl" style={{ marginRight: 10 }}>
          {moneyFormat(getProductById_data?.promo_price, langCode)} {translate('ks', 'Ks')}
        </TextCom>
      )}
      <TextCom color="desc" style={{ textDecorationLine: 'line-through', marginRight: 10 }}>
        {moneyFormat(getProductById_data?.extra_price_for_variant || getProductById_data?.price, langCode)} {translate('ks', 'Ks')}
      </TextCom>
      <div
        style={{
          paddingTop: 2,
          paddingRight: 5,
          paddingBottom: 2,
          paddingLeft: 5,
          borderRadius: 5,
        }}
      >
        <div className="save-money">
          <TextCom size="sm" color="light">
            Save {moneyFormat(Number((getProductById_data?.price - getProductById_data?.promo_price).toFixed(2)), langCode)} Ks
          </TextCom>
        </div>
        {/* <TextCom size='xxs' weight='lg'>-{en2mm_num(data?.cal_discount_percent, langCode)}%</TextCom> */}
      </div>
    </div>
  ) : (
    <>
      {Number(getProductById_data?.price) > 0 && (
        <TextCom weight="lg" color="secondary" size="xxxl" style={props.style}>
          {moneyFormat(getProductById_data?.extra_price_for_variant || getProductById_data?.price, langCode)} {translate('ks', 'Ks')}
        </TextCom>
      )}
    </>
  )
}
