import styled from 'styled-components'
import { rgba } from 'polished'

import { generalGap } from '../../attribute'

interface StyledModalProps {
  props?: any,
  modalWidth?: any
}

export const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  background-color: ${props => rgba(props?.theme?.color?.modal?.line || '#D9D9D9', 0.65)};
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: all 0.15s ease;
  &.show {
    visibility: visible;
    opacity: 1;
    > {
      &:first-child {
        transform: translateY(0);
      }
    }
  }
  &.fade {
    &.show {
      > {
        &:first-child {
        }
      }
    }
  }
  .success-btn {
    button {
      margin-right: 12px;
    }
  }
`

export const StyledModalDialog = styled.div < StyledModalProps > `
  padding: 15px;
  position: relative;
  z-index: 1;
  /* min-width: ${props => window?.screen?.width / (props?.modalWidth || 2)}px; */
  min-width: 30vw;
  transition: all 0.3s ease;
  @media(min-width: 1440px){
    min-width: 20vw;
  }
`

export const StyledModalContent = styled.div`
  background-color: ${props => props?.theme?.color?.modal?.light};
  outline: 0;
  border: 0;
  border-radius: ${props => props?.theme?.generalGap?.xs || 0}px;
  /* border-radius: ${generalGap.xl}px; */
  box-shadow: 0 5px 11px 0 ${props => rgba(props?.theme?.color?.modal?.line || '#D9D9D9', 0.18)}, 0 4px 15px 0 ${props => rgba(props?.theme?.color?.modal?.line || '#D9D9D9', 0.15)};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 30px;
  p {
    text-align: center;
  }
`

export const StyledCloseOutside = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const StyledModalClose = styled.div`
  background-color: ${props => rgba(props?.theme?.color?.modal?.dark || '#000', 1)};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  svg {
    color: ${props => props?.theme?.color?.modal?.light || '#fff'};
  }
`
