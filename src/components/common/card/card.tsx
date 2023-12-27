import React from 'react'

import { StyledCardContainer } from 'theme'
import { TextCom } from '../typo'

type CardComProps = {
  children?: React.ReactNode
  className?: any
  bgcolor?: any
  for?: any
  borderColor?: any
  cardBorderRadius?: any
  style?: any
  onClick?: any
  title?: any
  ref?: any
}
export const CardCom: React.FC<CardComProps> = ({ children, ...props }) => {
  return <StyledCardContainer {...props}>{children ? children : <TextCom weight="lg" textAlign="center"></TextCom>}</StyledCardContainer>
}
