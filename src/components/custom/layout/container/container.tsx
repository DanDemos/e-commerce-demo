import React from 'react'

import { ContainerCom } from '../../../common'

type ContainerProps = {
  children?: any
  className?: any
  bgcolor?: any
  as?: any
  style?: any
  ref?: any
}
export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return <ContainerCom {...props}>{children}</ContainerCom>
}
