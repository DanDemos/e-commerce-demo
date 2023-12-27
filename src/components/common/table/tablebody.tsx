import React from 'react'

import { StyledTableBody, StyledTr, StyledTd } from 'theme'
import { TextCom } from '../typo'

type TableBodyComProps = {
  dataSource?: any
  StyledTableBody?: any
  StyledTr?: any
  Styledtd?: any
  columns?: any
  props?: any
}

export const TableBodyCom: React.FC<TableBodyComProps> = props => {
  return (
    <StyledTableBody {...props.StyledTableBody}>
      {props?.dataSource?.length > 0 &&
        props?.dataSource?.map((x: any, i: number) => (
          <StyledTr key={i}>
            {props?.columns?.length > 0 &&
              props?.columns?.map((y: any, index: number) => (
                <StyledTd key={index} {...y}>
                  {y?.render ? y?.render(x, y, i, index) : <TextCom {...y}>{x?.[y?.dataIndex]}</TextCom>}
                  {y?.promorender ? y?.promorender(x, y, i, index) : <TextCom {...y}>{x?.[y?.dataIndex]}</TextCom>}
                </StyledTd>
              ))}
          </StyledTr>
        ))}
    </StyledTableBody>
  )
}
