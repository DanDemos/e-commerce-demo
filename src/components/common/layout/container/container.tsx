import React from 'react'

import { StyledContainer } from 'theme'
import { TextCom } from '../../typo'

type ContainerComProps = {
  children: any
}
export const ContainerCom: React.FC<ContainerComProps> = ({children, ...props}) => {
  return <StyledContainer {...props}>{children || <TextCom>Need Ui Component</TextCom>}</StyledContainer>
}
