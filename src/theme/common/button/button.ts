import styled from 'styled-components'
import { rgba } from 'polished'

interface StyledButtonProps {
  props?: any,
  btnBorderRadius?: any,
  btnWidth?: number,
  btnHeight?: number,
  bgcolor?: any,
  type?: any,
  btntype?: any,
  borderColor?: any,
  hoverColor?: any,
  disabled?: any
}

//* start button component
export const StyledButton = styled.button < StyledButtonProps > `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border-radius: ${props => props?.theme?.buttonVariable?.borderRadius?.[props?.btnBorderRadius] || props?.btnBorderRadius || props?.theme?.buttonVariable?.borderRadius.md}px;
  padding: 10px 15px;
  min-width: ${props => props.btnWidth || 150}px;
  min-height: ${props => props.btnHeight || 50}px;
  background-color: ${props => props?.theme?.color?.button?.[props?.bgcolor] || props?.bgcolor || props?.theme?.color?.button?.primary};
  border: ${props => (props?.type === 'outline' ? 1 : 0)}px solid ${props => props?.theme?.color?.button[props?.borderColor || 'transparent'] || props?.borderColor};
  border: ${props => (props?.btntype === 'outline' ? 1 : 0)}px solid ${props => props?.theme?.color?.button[props?.borderColor || 'transparent'] || props?.borderColor};
  transition: background-color 0.15s ease-in-out;
  gap: 10px;
  &:hover {
    background-color: ${props => {
    if (props?.type === 'outline') {
      return props?.theme?.color?.button?.[props?.hoverColor] || props?.hoverColor || props?.theme?.color?.button?.gray3
    } else {
      return rgba(props?.theme?.color?.button?.[props?.bgcolor] || props?.bgcolor || props?.theme?.color?.button?.primary, 0.7)
    }
  }};
  }
  &.btn-disabled {
  }
  &.btn-link {
    background: transparent;
    min-width: 0;
    min-height: 0;
  }
  opacity: ${props => props?.disabled === true ? '0.5' : '1'};
`

export const StyledBtnSvgL = styled.div`
  margin-right: 15px;
`

export const StyledBtnSvgR = styled.div`
  /* margin-right: 15px; */
`
//* end button component

//* addToCart Btn
interface StyledAddToCartBtnWrapProps extends StyledButtonProps {
  btnbordercolor?: any,
  btnBorderRadius?: any,
  leftbtnbgcolor?: any,
  rightbtnbgcolor?: any
  disable?: any
}
export const StyledAddToCartBtnWrap = styled.div < StyledAddToCartBtnWrapProps > `
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props?.btnbordercolor || props?.theme?.color?.button?.[props.btnbordercolor || 'borderColor'] || props?.theme?.color?.button?.border};
  padding: 0 2px;
  border-radius: ${props => props?.btnBorderRadius || props?.theme?.buttonVariable?.borderRadius?.xxxs}px;
  max-width: 135px;
  opacity: ${props => props?.disable === true ? '0.5' : '1'};
`

export const StyledAddToCartBtnLeft = styled.div < StyledAddToCartBtnWrapProps > `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  .left_btn_wrap {
    background-color: ${props => props?.leftbtnbgcolor || props?.theme?.color?.button?.[props.leftbtnbgcolor || 'borderColor']};
    border-radius: 50px;
    width: 30px;
    height: 30px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transaction: background-color 0.3s ease-in-out;

    :hover {
      background-color: ${props => rgba(props?.theme?.color?.button?.bg1, 0.6)};
    }
  }
`

export const StyledAddToCartBtnCenter = styled.div`
  flex: 1;
  border-left: 1px solid ${props => props?.btnbordercolor || props?.theme?.color?.button?.[props.btnbordercolor || 'borderColor'] || props?.theme?.color?.button?.border || '#707070'};
  border-right: 1px solid ${props => props?.btnbordercolor || props?.theme?.color?.button?.[props.btnbordercolor || 'borderColor'] || props?.theme?.color?.button?.border || '#707070'};
  /* border-right: 1px solid ${props => props?.theme?.color?.button?.border || '#707070'}; */
`

export const StyledAddToCartBtnRight = styled.div < StyledAddToCartBtnWrapProps > `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  .right_btn_wrap {
    background-color: ${props => props?.rightbtnbgcolor || props?.theme?.color?.button?.[props.rightbtnbgcolor || 'borderColor']};
    border-radius: 50px;
    width: 30px;
    height: 30px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transaction: background-color 0.3s ease-in-out;

    :hover {
      background-color: ${props => rgba(props?.theme?.color?.button?.bg1, 0.6)};
    }
  }
`
//* end addToCart Btn