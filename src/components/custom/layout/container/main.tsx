import React from 'react'

import { MainCom } from '../../../common'

type MainComProps = {
  children?: any
}
export const Main: React.FC<MainComProps> = ({children, ...props}) => {
  return <MainCom {...props}>{children}</MainCom>
}
