import styled from 'styled-components'

interface StyledCardContainerProps {
  props?: any,
  borderColor?: any,
  cardBorderRadius?: any,
  bgcolor?: any
}
export const StyledCardContainer = styled.div<StyledCardContainerProps>`
  display: flex;
  padding: 15px;
  border: 1px solid ${props => props?.theme?.color?.card?.[props?.borderColor] || props?.borderColor || props?.theme?.color?.card?.line};
  border-radius: ${props => props?.theme?.cardVariable?.borderRadius?.[props?.cardBorderRadius] || props?.theme?.cardVariable?.borderRadius?.initial}px;
  background-color: ${props => props?.theme?.color?.card?.[props?.bgcolor] || props?.bgcolor || props?.theme?.color?.card?.light};
`
