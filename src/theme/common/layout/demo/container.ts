import styled from 'styled-components'

interface StyledMainContainerProps {
  bgcolor: any
}

export const StyledMain = styled.main`
  min-height: 70vh;
  padding-bottom: 100px;
  @media (max-width: 991px) {
    margin-top: 57px;
  }
`

export const StyledContainer = styled.div < StyledMainContainerProps > `
  background: ${props => props?.theme?.color?.container?.[props?.bgcolor] || props?.bgcolor || props?.theme?.color?.container?.light};
`
