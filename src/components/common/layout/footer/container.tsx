import React from 'react'

import { StyledFooterCon } from 'theme'
import { TextCom } from '../../typo'

type FooterContainerProps = {
  children: any
}
export const FooterContainerCom: React.FC<FooterContainerProps> = props => {
  return <StyledFooterCon {...props}>{props?.children || <TextCom>Required Footer Container Component</TextCom>}</StyledFooterCon>
}
