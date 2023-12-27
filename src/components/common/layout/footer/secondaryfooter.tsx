import React from 'react'

import { StyledSecondaryFooterCon, StyledSecondaryFooterContent } from 'theme'
import { TextCom } from '../../typo'

type SecondaryFooterProps = {
  children: any
}
export const SecondaryFooterCom: React.FC<SecondaryFooterProps> = ({ children, ...props }) => {
  return (
    <StyledSecondaryFooterCon {...props}>
      {children ?
        <StyledSecondaryFooterContent {...props}>
          {children}
        </StyledSecondaryFooterContent>
        :
        <TextCom>Required Footer Container Component</TextCom>
      }
    </StyledSecondaryFooterCon>
  )
}