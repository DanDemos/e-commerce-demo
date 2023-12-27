import React from 'react'

import { QtyButtonCom } from '../../common'
import { useHandleQty } from 'hook'

type QtyButtonModProps = {
  type?: string
  item?: any
  w_index?: number
  c_index?: number
  disabled?: boolean
  btnbordercolor?: any
  className?: any
}
export const QtyButtonMod: React.FC<QtyButtonModProps> = ({ type = 'productbyid', item, w_index = 0, c_index = 0, ...props }) => {
  const [handleQty, handleQtyFun] = useHandleQty({
    type,
    item,
    w_index,
    c_index,
  })

  return <QtyButtonCom qty={handleQty} setqty={(qty: any) => handleQtyFun(+qty)} {...props} />
}
