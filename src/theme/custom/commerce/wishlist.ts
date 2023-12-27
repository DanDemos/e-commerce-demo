import styled from 'styled-components'

export const StyledHeadCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

export const StyledHeadWrap = styled.div`
 display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  min-height: 40px;
  /* border-radius: 20px; */
  /* border: 1px solid ${props => props?.theme?.color?.card?.borderColor}; */
  transition: .3s ease-in-out;
  margin-right: 7px;
    
  &:hover{
    border-color: #707070;
  }

  img{
    width: 20px;
  }
`