import React from 'react'

import { StyledSecondaryHeaderCon, StyledSecondaryHeaderContent } from 'theme'
import { TextCom } from '../../typo'

type SecondaryHeaderCon = {
  children?: any
}
export const SecondaryHeaderCom: React.FC<SecondaryHeaderCon> = ({ children, ...props }) => {
  return (
    <StyledSecondaryHeaderCon {...props}>
      {children ?
        <StyledSecondaryHeaderContent {...props}>
          {children}
        </StyledSecondaryHeaderContent>
        :
        <TextCom>Required Header Container Component</TextCom>
      }
    </StyledSecondaryHeaderCon>
  )
}
