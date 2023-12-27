import { useHandleOther } from 'hook'
import React from 'react'

import { StyledText } from 'theme'

type TextComProps = {
  children?: any
  size?: any
  weight?: any
  textAlign?: any
  className?: string
  color?: string
  link?: boolean | undefined
  onClick?: any
  as?: string
  href?: string | undefined
  style?: any
  dangerouslySetInnerHTML?: any
  onChange?: any
  textDecoration?: any
  type?: any
  value?: any
  id?: any
  htmlFor?: any
  checked?: any
  name?: string
  family?: string
  target?: any
  rows?: any
  title?: any
  translate?: any
}
export const TextCom: React.FC<TextComProps> = ({ children, ...props }: any) => {
  const { translate } = useHandleOther()
  return <StyledText {...props}>
    {props.translate ? translate(children, children) : children}
  </StyledText>
}
