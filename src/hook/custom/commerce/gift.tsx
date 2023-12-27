import { useEffect } from 'react'

import { useCart, useAuth, showToast, useHandleOther } from 'hook'
import { useNavigate } from 'react-router-dom'

export const useHandleGift = () => {
  const { translate, langStore } = useHandleOther()
  const navigate = useNavigate()
  const { getGiftProduct_data, getPointRate_data, setGiftQty, getCart_data, createCart_data, CartAction, dispatch } = useCart()
  const { getProfile_data } = useAuth()
  const langCode = langStore?.code

  useEffect(() => {
    dispatch(CartAction.getGiftProduct({ page_no: 1, per_page: 100, lang: langCode }))
  }, [langCode])
  /// ---------------------------------Gift Page----------------------------------
  const handleGiftClaim = async (from?: 'claim' | 'cancel') => {
    let gift_lines: any = []
    if (getGiftProduct_data) {
      getGiftProduct_data?.gift_item?.map((item: any) => {
        if (item?.quantity && item?.quantity > 0) {
          gift_lines.push({
            gift_id: item?.id,
            gift_qty: item?.quantity,
          })
        }
      })
    }

    let pos_data: any = {
      order_id: createCart_data?.order_id,
    }
    if (from === 'claim') {
      pos_data.gift_lines = gift_lines
      await dispatch(CartAction.updateGift(pos_data))
    } else {
      if (getCart_data?.gifts.length > 0) {
        pos_data.gift_lines = []
        await dispatch(CartAction.updateGift(pos_data))
      }
    }
    await navigate('/order/checkout')
  }
  let total = 0
  getGiftProduct_data?.gift_item?.map((item: any) => {
    if (item?.quantity) {
      total += item?.quantity * item?.point_value
    }
  })
  const handleGiftQty = (key: 'add' | 'sub' | 'input', id: number, value?: any) => {
    let checkGiftStock: any = getGiftProduct_data?.gift_item[id]?.quantity || 0
    let num = checkGiftStock
    if (key === 'add') {
      if (total + getGiftProduct_data?.gift_item[id]?.point_value <= getProfile_data?.point + getCart_data?.redeem_point) {
        num += 1
        if (num <= getGiftProduct_data?.gift_item[id]?.stock) dispatch(CartAction.setGiftQty({ id, quantity: num, profile_point: getProfile_data?.point }))
      } else {
        showToast({
          type: 'error',
          title: `${translate(`you-don't-have-enough-points`, `You don't have enough points`)}`,
          placement: 'bottom',
        })
      }
    } else if (key === 'sub') {
      if ((checkGiftStock || 0) > 0) {
        num -= 1
        dispatch(CartAction.setGiftQty({ id, quantity: num, profile_point: getProfile_data?.point }))
      }
    } else {
      num = Number(value)
      if (total + getGiftProduct_data?.gift_item[id].point_value * num <= getProfile_data?.point + getCart_data?.redeem_point) {
        dispatch(CartAction.setGiftQty({ id, quantity: num, profile_point: getProfile_data?.point }))
      } else {
        showToast({
          type: 'error',
          title: `${translate(`you-don't-have-enough-points`, `You don't have enough points`)}`,
          placement: 'bottom',
        })
        dispatch(CartAction.setGiftQty({ id, quantity: 0, profile_point: getProfile_data?.point }))
      }
    }
  }
  //----------------------------------End------------------------------------------

  //----------------------------------Point Redeem in order/cart Page-------------------
  let pointbalance = getProfile_data?.point
  let totalKyatBalance = pointbalance * getPointRate_data?.ks_per_point_redeem
  let FormatUntaxAmount = getCart_data?.untax_amount
  let discount_amount: any = getCart_data?.discount_amount
  let MaximumRedeemablePoint = Math.floor(totalKyatBalance < Number(FormatUntaxAmount) - (discount_amount || 0) ? pointbalance : (Number(FormatUntaxAmount) - (discount_amount || 0)) / getPointRate_data?.ks_per_point_redeem)

  const onHandlePointSubmit = async (value: any) => {
    let pos_obj = {
      redeem_point: value?.point,
    }
    let res = await dispatch(CartAction.postRedeemPointToOrder(pos_obj))
    if (res?.payload?.status === 'success') {
    } else {
      let error_msg = document.querySelector('.error')
      if (error_msg) {
        error_msg?.setAttribute(
          'style', `display:block;`
        )
        setTimeout(() => {
          error_msg?.setAttribute(
            'style', `display:none;`
          )
        }, 4000)
      }
    }
  }

  //----------------------------------End------------------------------------------------
  return {
    pointbalance,
    totalKyatBalance,
    FormatUntaxAmount,
    discount_amount,
    MaximumRedeemablePoint,
    total,
    onHandlePointSubmit,
    handleGiftClaim,
    handleGiftQty
  }
}

