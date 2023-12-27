import React from 'react'

import { StyledHeaderCon } from 'theme'
import { TextCom } from '../../typo'

type HeaderContainerProps = {
  children: any
}
export const HeaderContainerCom: React.FC<HeaderContainerProps> = props => {
  return <StyledHeaderCon {...props}>{props?.children || <TextCom>Required Header Container Component</TextCom>}</StyledHeaderCon>
}
