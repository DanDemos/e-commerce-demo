import React from 'react'

import { StyledPrimaryHeaderCon, StyledPrimaryHeaderContent } from 'theme'
import { TextCom } from '../../typo'

type PrimaryHeaderProps = {
  children?: any
}
export const PrimaryHeaderCom: React.FC<PrimaryHeaderProps> = ({ children, ...props }) => {
  return (
    <StyledPrimaryHeaderCon {...props}>
      {children ?
        <StyledPrimaryHeaderContent {...props}>
          {children}
        </StyledPrimaryHeaderContent>
        :
        <TextCom>Required Header Container Component</TextCom>
      }
    </StyledPrimaryHeaderCon>
  )
}
