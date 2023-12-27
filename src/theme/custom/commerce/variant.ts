import styled from 'styled-components'

export const StyledVariantCon = styled.div`
`

export const StyledVariantItemCon = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  .card_wrap{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    min-height: 40px;
    border-radius: 20px;
    padding: 3px 10px;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: .3s ease-in-out;
    
    &:hover{
      border-color: #707070;
    }
  }
`