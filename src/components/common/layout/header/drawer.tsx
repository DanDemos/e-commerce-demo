import React from 'react'

import { StyledMobileDrawerCon, StyledMobileDrawerContent } from 'theme'
import { TextCom } from '../../typo'

type MobileDrawerProps = {
  isOpen: boolean
  drawerHandler: any
  children: any
}

export const MobileDrawerCom: React.FC<MobileDrawerProps> = ({ drawerHandler, isOpen, ...props }) => {
  return (
    <StyledMobileDrawerCon className={isOpen ? 'active' : undefined} {...props}>
      <div className="drawer-wrapper" onClick={drawerHandler} />
      <div className="drawer-content" {...props}>
        {props?.children ? <StyledMobileDrawerContent {...props}>{props?.children}</StyledMobileDrawerContent> : <TextCom>Required Drawer Container Component</TextCom>}
      </div>
    </StyledMobileDrawerCon>
  )
}
