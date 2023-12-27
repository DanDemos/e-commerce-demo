import React from 'react'

import { StyledMain } from 'theme'
import { TextCom } from '../../typo'

type MainComProps = {
  children: any
}
export const MainCom: React.FC<MainComProps> = props => {
  return <StyledMain {...props}>{props?.children || <TextCom>Need Ui Component</TextCom>}</StyledMain>
}
