import React from 'react'
import Pagination from 'rc-pagination'

import { StyledPagination } from 'theme'

export type PaginationProps = {
  onChange?: any
  current?: number
  total?: any
  defaultPageSize?: any
}

export const PaginationWrap: React.FC<PaginationProps> = ({ total, onChange, current, defaultPageSize, ...props }) => {
  return (
    <StyledPagination className={`${total > defaultPageSize ? '' : 'hide'}`}>
      {/* <Pagination showLessItems={true} showTitle={false} {...props} /> */}
      <Pagination onChange={onChange} current={current} total={total} showLessItems={true} showTitle={false} {...props} pageSize={defaultPageSize} />
    </StyledPagination>
  )
}
