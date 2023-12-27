import React from 'react'

import { StyledTableHead, StyledTr, StyledTh } from 'theme'
import { TextCom } from '../typo'

type TableHeadProps = {
  StyledTableHead?: any
  StyledTr?: any
  dataSource?: any
  columns?: any
  Styledth?: any
}

export const TableHeadCom: React.FC<TableHeadProps> = props => {
  return (
    <StyledTableHead {...props.StyledTableHead}>
      <StyledTr {...props.StyledTr}>
        {props?.columns?.length > 0 &&
          props?.columns?.map((x: any, i: number) => (
            <StyledTh key={i} {...x}>
              <TextCom weight="xl" {...x}>
                {x?.title}
              </TextCom>
            </StyledTh>
          ))}
      </StyledTr>
    </StyledTableHead>
  )
}

TableHeadCom.defaultProps = {
  dataSource: [],
  columns: [],
}
