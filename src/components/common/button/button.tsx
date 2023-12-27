import React from 'react'

import { StyledButton, StyledBtnSvgL, StyledBtnSvgR } from 'theme'
import { TextCom } from '../typo'

interface ButtonComProps {
  children?: React.ReactNode
  SVGL?: any
  SVGR?: any
  text?: any
  onClick?: any
  bgcolor?: any
  color?: any
  type?: any
  btnBorderRadius?: any
  className?: any
  link?: any
  borderColor?: any
  style?: any
  btnHeight?: any
  as?: any
  href?: any
  btntype?: any
  disabled?: any
}
export const ButtonCom: React.FC<ButtonComProps> = ({ children, SVGL, SVGR, text, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children ? (
        children
      ) : (
        <>
          {SVGL && <StyledBtnSvgL {...props}>{SVGL}</StyledBtnSvgL>}
          <TextCom {...props}>{text}</TextCom>
          {SVGR && <StyledBtnSvgR {...props}>{SVGR}</StyledBtnSvgR>}
        </>
      )}
    </StyledButton>
  )
}

ButtonCom.defaultProps = {
  bgcolor: 'primary',
  color: 'text',
  type: 'full',
}
