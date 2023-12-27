import styled from 'styled-components'

export const StyledTabCon = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledTabHeadCon = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 20px; */
  /* overflow: scroll; */
  overflow: unset;
  &.underline{
    border-bottom: 1px solid ${props => props?.theme?.color?.header?.line};
  }
  ::-webkit-scrollbar {
    display: none;
  }
`

export const StyledTabHeadItemCon = styled.div`
  margin-right: 15px;
  margin-bottom: -1px;
  cursor: pointer;
  a{ text-decoration: none;}
  &.active {
    border-bottom: 2.5px solid ${props => props?.theme?.color?.header?.primary};
  }

  .def_title_wrap {
    padding: 10px;
    transition: opacity 0.3s ease-in-out;
    a{ text-decoration: none;}
    :not(.active) {
      &:hover {
        opacity: 0.5;
      }
    }
  }
  &.active{
    p{
      color: ${props => props?.theme?.color?.typo?.primary}
    }
  }
`

export const StyledTabBodyCon = styled.div`
  padding: 20px 0;
`

export const StyledTabBodyWrap = styled.div`
  display: none;

  &.active {
    display: block;
  }
`
