import styled from 'styled-components'
import Icon from 'asset/icon/luxura'

const imgUrl: any = {
  leftArrow: Icon.LeftArrowBlack,
  rightArrow: Icon.RightArrowBlack,
}

interface TableInterFaceProps {
  props?: any,
  width?: any,
  placement?: any,
}

interface TableProps extends TableInterFaceProps {
  StyledTableContainerProps?: any
}
export const StyledTableContainer = styled.table < TableProps > `
  width: 100%;
  border-radius: ${props => props?.theme?.TableVariable?.borderRadius}px;
`

export const StyledTableHead = styled.thead`
 border-bottom: ${props => `${props?.theme?.TableVariable?.borderBottomWidth || 1}px solid ${props?.theme?.color?.table?.line}`};
`

interface TableTrProps extends TableInterFaceProps {
}
export const StyledTr = styled.tr < TableTrProps > `
  border-bottom: ${props => `${props?.theme?.TableVariable?.borderBottomWidth || 1}px solid ${props?.theme?.color?.table?.gray2}`};
`

interface TableThProps extends TableInterFaceProps {
}
export const StyledTh = styled.th < TableThProps > `
  width: ${props => `${props?.width}px` || 'auto'};
  text-align: ${props => `${props?.placement || 'auto'}`};
  padding: 10px 0;
`

export const StyledTableBody = styled.tbody``

interface TableTdProps extends TableInterFaceProps {
}
export const StyledTd = styled.td < TableTdProps > `
  width: ${props => `${props?.width}px` || 'auto'};
  text-align: ${props => `${props?.placement || 'auto'}`};
  padding: 10px 0;
`

export const StyledTf = styled.tfoot``

interface TablePaginationProps extends TableInterFaceProps {
}
export const StyledPagination = styled.div < TablePaginationProps > `
  margin-top: 50px;
  &.hide {
    display: none;
  }
  .rc-pagination {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    li {
      cursor: pointer;
      &:focus {
        outline: none;
      }
      a,
      button {
        text-decoration: none;
        position: relative;
        display: block;
        padding: 0.5rem;
        margin: 0 3px;
        line-height: 1.25;
        background-color: transparent;
        color: ${props => props?.theme?.color?.table?.border};
        font-weight: 500;
        transition: all 0.2s;
        /* border-radius: 10px; */
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid ${props => props?.theme?.color?.typo?.line};
        &:hover {
          background-color: ${props => props?.theme?.color?.table?.primary};
          color: ${props => props?.theme?.color?.typo.light};
        }
      }
      &.rc-pagination-disabled {
        a,
        button {
          background-color: transparent;
          cursor: default;
        }
      }
      button {
        &:focus {
          outline: none;
        }
        &:before {
          content: '';
          width: 30px;
          height: 10px;
          display: inline-block;
        }
      }
      &.rc-pagination-item-active {
        a {
          color: ${props => props?.theme?.color?.typo?.primary};
          border: 1px solid ${props => props?.theme?.color?.table?.primary};
          &:hover{
            background-color: ${props => props?.theme?.color?.table?.primary};
            color: ${props => props?.theme?.color?.typo.light};
          }
        }
      }
      &.rc-pagination-prev {
        button {
          margin: 0;
          margin-right: 3px;
          border: 1px solid ${props => props?.theme?.color?.typo?.line};
          /* border-radius: 10px; */
          &:before {
            background: url(${imgUrl.leftArrow}) no-repeat center/cover;
          }
          &:hover {
            background: transparent;
            &:before {
              /* background: url(${imgUrl.leftArrow}) no-repeat center/cover; */
            }
          }
        }
      }
      &.rc-pagination-prev.rc-pagination-disabled {
        button {
          &:hover {
            &:before {
              background: url(${imgUrl.leftArrow}) no-repeat center/cover;
            }
          }
          &:before {
            opacity: 0.4;
          }
        }
      }
      &.rc-pagination-next.rc-pagination-disabled {
        button {
          &:hover {
            &:before {
              background: url(${imgUrl.rightArrow}) no-repeat center/cover;
              opacity: 0.5;
            }
          }
          &:before {
            opacity: 0.4;
          }
        }
      }
      &.rc-pagination-next {
        button {
          /* border-radius: 10px; */
          margin: 0;
          margin-left: 3px;
          &:before {
            background: url(${imgUrl.rightArrow}) no-repeat center/cover;
          }
          &:hover {
            background: transparent;
            &:before {
              background: url(${imgUrl.rightArrow}) no-repeat center/cover;
            }
          }
        }
      }
      &.rc-pagination-jump-prev,
      &.rc-pagination-jump-next {
        button {
          &:before {
            content: '...';
          }
        }
      }
      &.rc-pagination-next, &.rc-pagination-prev{
        button{
          &:hover{
              border: 1px solid ${props => props?.theme?.color?.typo?.primary}!important;
          }
        }
      }
    }
  }
`