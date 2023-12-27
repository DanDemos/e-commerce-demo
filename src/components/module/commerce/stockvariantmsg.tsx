import React, { useState } from 'react'

import { TextCom } from '../../common'
import { useOther, useProduct, useHandleOther } from 'hook'

type StockVariantMsgProps = {
  from?: string
  item?: any
}

export const StockVariantMsgMod: React.FC<StockVariantMsgProps> = props => {
  const { from, item } = props
  const { getProductById_data } = useProduct()
  const { translate } = useHandleOther()
  const { langStore } = useOther()
  let langCode = langStore.code
  let from_data = from === 'cartlist' ? item : getProductById_data

  let buy_limit_msg = getProductById_data?.check_stock?.qty_cart + getProductById_data?.check_stock?.available_qty === getProductById_data?.buy_limit ? true : false
  return from === 'other' ? (
    <>
      {item?.check_stock?.desc ? (
        <TextCom color="danger" size="xs">
          {translate(item?.check_stock?.desc, item?.check_stock?.desc)}
        </TextCom>
      ) : item?.check_stock?.available_qty > 0 ? (
        item?.check_stock?.available_qty < 10 ? (
          <TextCom color="danger" size="xs">
            {langCode === 'en' ? `Only ${item?.check_stock?.available_qty} left in stock` : `${item?.check_stock?.available_qty} ခုသာ ကျန်ပါတော့သည်`}
          </TextCom>
        ) : (
          item?.check_stock?.status === false && (
            <TextCom color="danger" size="xs">
              {langCode === 'en' ? `Only ${item?.check_stock?.available_qty} left in stock` : `${item?.check_stock?.available_qty} ခုသာ ကျန်ပါတော့သည်`}
            </TextCom>
          )
        )
      ) : item?.check_stock?.instock === false || item?.check_stock?.in_stock === false ? (
        <TextCom color="danger" size="xs">
          {translate('out_of_stock', 'Out of Stock')}
        </TextCom>
      ) : (
        item?.check_stock?.status === false && (
          <TextCom color="danger" size="xs">
            {item?.check_stock?.error}
          </TextCom>
        )
      )}
    </>
  ) : (
    <>
      {getProductById_data?.package_product_type === false && getProductById_data?.check_stock?.desc ? (
        <TextCom color="danger" size="sm" className="">
          {translate(getProductById_data?.check_stock?.desc, getProductById_data?.check_stock?.desc)}
        </TextCom>
      ) : // getProductById_data?.check_stock?.stock_balance < 10 ? (
        //   <TextCom color="danger" size="xs" className="">
        //     {langCode === 'en' ? `Only ${getProductById_data?.check_stock?.stock_balance} left in stock` : `${getProductById_data?.check_stock?.stock_balance} ခုသာ ကျန်ပါတော့သည်`}
        //   </TextCom>
        // ) : (
        //   getProductById_data?.check_stock?.in_stock === false && (
        //     <TextCom color="danger" size="xs" className="">
        //       {langCode === 'en' ? `Only ${getProductById_data?.check_stock?.stock_balance} left in stock` : `${getProductById_data?.check_stock?.stock_balance} ခုသာ ကျန်ပါတော့သည်`}
        //     </TextCom>
        //   )
        // )
        getProductById_data?.check_stock?.available_qty < 10 && getProductById_data?.check_stock?.available_qty !== 0 ? (
          <TextCom color="danger" size="sm" className="stock-msg">
            {buy_limit_msg === false && langCode === 'en' ? `Only ${getProductById_data?.check_stock?.available_qty} left in stock` : buy_limit_msg === false && `${getProductById_data?.check_stock?.available_qty} ခုသာ ကျန်ပါတော့သည်`}
            {buy_limit_msg === true && langCode === 'en' ? `Your buy limit is ${getProductById_data?.check_stock?.available_qty} items.` : buy_limit_msg === true && `အများဆုံး ${getProductById_data?.check_stock?.available_qty} ခုသာ ၀ယ်ယူခွင့်ရှိပါသည်။`}
          </TextCom>
        ) : getProductById_data?.check_stock?.error === 'buy limit is reached!' ? (
          <TextCom color="danger" size="sm" className="stock-msg">
            {translate(getProductById_data?.check_stock?.error, getProductById_data?.check_stock?.error)}
          </TextCom>
        ) : (
          getProductById_data?.check_stock?.status === false && (
            <TextCom color="danger" size="sm" className="stock-msg">
              {translate('out_of_stock', 'out_of_stock')}
            </TextCom>
          )
        )}
    </>
  )
}
