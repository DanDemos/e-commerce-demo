import styled from 'styled-components'

export const StyledAddtoCartCon = styled.div`
  position: relative;
  .disable-layer{
        position: absolute;
        background: ${props => props?.theme?.color?.typo?.border}!important;
        opacity: 0.1!important;
        z-index: 99;
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: 5px;
      }
`