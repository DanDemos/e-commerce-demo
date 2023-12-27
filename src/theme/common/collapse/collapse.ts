import styled from 'styled-components'

interface StyledCollapseType {
  expanded?: boolean
  isActive?: boolean
  className?: any
}
export const StyledCollapse = styled.div < StyledCollapseType > `
   width: 100%;
`

export const StyledCollapsePanel = styled.div < StyledCollapseType > `
`

export const StyledCollapseHeader = styled.div < StyledCollapseType > `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .collapse-header-wrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .collapse-expand-icon{
      margin-right: 2px;
      .arrow{
        display: block;
        /* width: 8px;
        height: 8px; */
        /* border-top: 1px solid ${props => props?.theme?.color?.typo?.text};
        border-left: 1px solid ${props => props?.theme?.color?.typo?.text}; */
        transform: ${props => !props?.['aria-expanded'] ? 'rotate(180deg)' : 'rotate(0)'};
        transition: all .2s ease-in-out;
      }
    }
  }
`

export const StyledCollapseContent = styled.div < StyledCollapseType > `
  height: ${props => props.isActive ? 'inherit' : '0'};
  overflow: hidden;
  padding: ${props => props.isActive ? '10px 0px' : '0'};
  transition: all .2s ease;
`