import styled from 'styled-components'

interface StyledMainContainerProps {
  props?: any,
  bgcolor?: any
}

export const StyledMain = styled.main`
  /* min-height: 70vh; */
  margin-top: 157px;
  @media (max-width: 991px) {
    margin-top: 60px;
  }
`

export const StyledContainer = styled.div < StyledMainContainerProps > `
  background: ${props => props?.theme?.color?.container?.[props?.bgcolor] || props?.bgcolor || props?.theme?.color?.container?.light};
`
