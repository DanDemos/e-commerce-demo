import React from 'react'

import { StyledTf } from 'theme'

type TableProps = {
  StyledTf?: any,
  dataSource?: any
}

export const TableFootCom: React.FC<TableProps> = props => {
  return <StyledTf {...props.StyledTf}>This is Table Footer</StyledTf>
}
