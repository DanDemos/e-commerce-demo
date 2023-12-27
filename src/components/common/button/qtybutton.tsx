import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import { StyledAddToCartBtnWrap, StyledAddToCartBtnLeft, StyledAddToCartBtnCenter, StyledAddToCartBtnRight } from 'theme'
import { InputCom } from '../form'

type QtyButtonComProps = {
  qty?: any
  setqty?: any
  rightBtnRender?: any
  leftBtnRender?: any
  rightBtnStyle?: any
  leftBtnStyle?: any
  bgcolor?: any
  color?: any
  type?: any
  inputwidth?: any
  btnbordercolor?: any
  disabled?: any
  className?: any
}

export const QtyButtonCom: React.FC<QtyButtonComProps> = props => {
  const { qty, setqty, className, rightBtnRender, leftBtnRender, rightBtnStyle, leftBtnStyle, disabled } = props

  const handleQty = (key: string) => {
    if (key === 'add') {
      let num = parseInt(qty)
      num += 1
      setqty(num)
    } else {
      if (parseInt(qty) > 1) {
        let num = parseInt(qty)
        num -= 1
        setqty(num)
      }
    }
  }

  return (
    <StyledAddToCartBtnWrap {...props} className={`qty-btn-wrap ${className}`} disable={disabled || false}>
      <StyledAddToCartBtnLeft {...props}>
        {rightBtnRender ? (
          <div className={leftBtnStyle || 'left_btn_wrap'} onClick={() => disabled !== true && handleQty('sub')} {...props}>
            {rightBtnRender}
          </div>
        ) : (
          <div className={leftBtnStyle || 'left_btn_wrap'} onClick={() => disabled !== true && handleQty('sub')} {...props}>
            <AiOutlineMinus />
          </div>
        )}
      </StyledAddToCartBtnLeft>

      <StyledAddToCartBtnCenter {...props} className="center">
        <InputCom className="qty-input" value={qty} onChange={(e: any) => setqty(e.target.value)} isValidate={false} {...props} />
      </StyledAddToCartBtnCenter>

      <StyledAddToCartBtnRight {...props}>
        {leftBtnRender ? (
          <div className={rightBtnStyle || 'right_btn_wrap'} onClick={() => disabled !== true && handleQty('add')} {...props}>
            {leftBtnRender}
          </div>
        ) : (
          <div className={rightBtnStyle || 'right_btn_wrap'} onClick={() => disabled !== true && handleQty('add')} {...props}>
            <AiOutlinePlus />
          </div>
        )}
      </StyledAddToCartBtnRight>
    </StyledAddToCartBtnWrap>
  )
}

QtyButtonCom.defaultProps = {
  bgcolor: 'primary',
  color: 'white',
  type: 'full',
  inputwidth: 60,
  qty: 1,
}
