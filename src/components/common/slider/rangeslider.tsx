import React from 'react'

import { InputCom, TextCom } from 'components'
import { useHandleOther, useProduct } from 'hook'
import './style.scss'
import { moneyFormat } from 'utils'

type RangeSliderProps = {
  min?: number
  max?: number
  change?: any
  price?: any
  setprice?: any
}

export const RangeSliderCom: React.FC<RangeSliderProps> = ({ min, max, change, setprice }) => {
  const { translate } = useHandleOther()
  const { getProductCategory_data } = useProduct()

  let rangeInput = document.querySelectorAll('.range-input input')
  let minprice: any = document.querySelector('.price-input input#price-min')
  let maxprice: any = document.querySelector('.price-input input#price-max')
  // let priceInput = document.querySelectorAll('input.priceinput')

  const default_max = getProductCategory_data?.max_price || '10000000'
  const default_min = 0
  let pricegap = Number(getProductCategory_data?.max_price / 10) || 10000

  //for curreny format
  let minText: any = document.querySelector('.price-input .min-text')
  let maxText: any = document.querySelector('.price-input .max-text')

  if (rangeInput) {
    rangeInput.forEach(input => {
      input.addEventListener('input', e => {
        let minVal = parseInt(rangeInput[0].value),
          maxVal = parseInt(rangeInput[1].value)
        if (maxVal - minVal <= pricegap - 10) {
          if (e.target.classList.contains('range-min')) {
            rangeInput[0].value = maxVal - pricegap
            minprice.value = default_max - pricegap
            minText.innerText = moneyFormat(Math.ceil(Number(default_max - pricegap))) //for currency format
          }
          if (e.target.classList.contains('range-max')) {
            rangeInput[1].value = minVal + pricegap
            maxprice.value = default_min + pricegap
            maxText.innerText = moneyFormat(Math.ceil(Number(default_min + pricegap))) //for currency format
          }
        } else {
          minText.innerText = moneyFormat(Math.ceil(Number(minVal))) //for currency format
          maxText.innerText = moneyFormat(Math.ceil(Number(maxVal))) //for currency format
          minprice.value = minVal
          maxprice.value = maxVal
        }
      })
    })
  }

  if (minprice && maxprice) {
    setprice.min_price = minprice.value
    setprice.max_price = maxprice.value
  }

  // if (priceInput) {
  //   priceInput.forEach(input => {
  //     input.addEventListener('input', e => {
  //       let minPrice = parseInt(minprice.value),
  //         maxPrice = parseInt(maxprice.value)

  //       if ((maxPrice - minPrice >= pricegap) && maxPrice <= rangeInput[1].max) {
  //         if (e.currentTarget.id === 'price-min') {
  //           rangeInput[0].value = minPrice
  //         }
  //         else {
  //           rangeInput[1].value = maxPrice
  //         }
  //       }
  //     })
  //   })
  // }

  return (
    <div className="range-slider-com">
      <div className="price-input d-flex">
        <TextCom className="min-text">Min</TextCom>
        <TextCom className="max-text">Max</TextCom>
        <InputCom
          isValidate={false}
          placeholder={translate('min', 'min')}
          type="number"
          className="priceinput"
          id="price-min"
          defaultValue=""
          disabled
          // onChange={(e: any) => change('min_price', e.value)}
        />
        <InputCom
          isValidate={false}
          placeholder={translate('max', 'max')}
          type="number"
          className="priceinput"
          id="price-max"
          defaultValue=""
          disabled
          // onChange={(e: any) => change('max_price', e.value)}
        />
      </div>
      <div className="range-slider">
        <div className="progress"></div>
      </div>
      <div className="range-input">
        <input type="range" className="range-min" min="0" max={String(getProductCategory_data?.max_price) || ''} defaultValue="0" step="10" onChange={e => change('min_price', minprice.value)} />
        <input type="range" className="range-max" min="0" max={`${getProductCategory_data?.max_price || 1000000}`} defaultValue={`${getProductCategory_data?.max_price || 1000000}`} step="10" onChange={e => change('max_price', maxprice.value)} />
      </div>
    </div>
  )
}
