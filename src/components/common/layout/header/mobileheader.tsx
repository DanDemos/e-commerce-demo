import React from 'react'

import { StyledMobileHeaderCon, StyledMobileHeaderContent } from 'theme'
import { TextCom } from '../../typo'

type MobileHeaderProps = {
  children?: any
}
export const MobileHeaderCom: React.FC<MobileHeaderProps> = ({ children, ...props }) => {

  return (
    <StyledMobileHeaderCon {...props}>
      {children ?
        <StyledMobileHeaderContent {...props}>
          {children}
        </StyledMobileHeaderContent>
        :
        <TextCom>Required Mobile Head Container Component</TextCom>
      }
    </StyledMobileHeaderCon>
  )
}
