import React from 'react'

import { StyledPrimaryFooterCon, StyledPrimaryFooterContent } from 'theme'
import { TextCom } from '../../typo'

type PrimaryFooterProps = {
  children?: any
}
export const PrimaryFooterCom: React.FC<PrimaryFooterProps> = ({ children, ...props }) => {
  return (
    <StyledPrimaryFooterCon {...props}>
      {children ?
        <StyledPrimaryFooterContent {...props}>{children}</StyledPrimaryFooterContent>
        :
        <TextCom>Required Footer Container Component</TextCom>
      }
    </StyledPrimaryFooterCon>
  )
}