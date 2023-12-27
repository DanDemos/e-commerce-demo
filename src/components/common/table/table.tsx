import React from 'react'

import { StyledTableContainer } from 'theme'
import { TableHeadCom } from './tablehead'
import { TableBodyCom } from './tablebody'
import { TableFootCom } from './tablefoot'

type TableComProps = {
  pagination?: any,
  StyledTableContainerProps?: any,
  dataSource?: any,
  columns?: any,
  TableFootCom?: any
}

export const TableCom: React.FC<TableComProps> = ({ pagination, StyledTableContainerProps, ...props }) => {
  return (
    <StyledTableContainer {...StyledTableContainerProps}>
      <TableHeadCom {...props} />
      <TableBodyCom {...props} />
      {pagination && <TableFootCom {...props} />}
    </StyledTableContainer>
  )
}
