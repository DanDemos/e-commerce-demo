import React from 'react'

import { FooterContainerCom } from '../../../common'
import { PrimaryFooter } from './primaryfooter'
import { SecondaryFooter } from './secondaryfooter'

export type FooterProps = {}
export const FooterCom: React.FC<FooterProps> = props => {
  return (
    <FooterContainerCom>
      <PrimaryFooter {...props} />
      <SecondaryFooter {...props} />
    </FooterContainerCom>
  )
}
