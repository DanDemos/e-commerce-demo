import styled, { createGlobalStyle } from 'styled-components'
import { handleFontFamily } from '../typo'

interface StyledGlobalProps {
  props?: any,
  theme?: any,
  size?: any,
  weight?: any
}

export const GlobalStyle = createGlobalStyle < StyledGlobalProps > `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  ::selection {
    background-color: ${props => props?.theme?.color?.container?.primary || '#fff'};
    color: ${props => props?.theme?.color?.container?.light || '#fff'};
  }

  html {
    scroll-behavior: smooth;
  }
  .container-fluid{ 
    max-width: calc( 100% - 150px);
    @media(max-width: 771px){
      max-width: calc( 100% - 20px);
    }
  }
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${props => {
    let res = handleFontFamily(props)
    return res
  }};
    font-size: ${props => props.theme.fontSize[props?.size] || props.size || props.theme.fontSize.md}px;
    line-height: 1.5;
    font-weight: ${props => props.theme.fontWeight[props?.weight] || props.theme.fontWeight.md};
    text-align: left;
    background-color: ${props => props?.theme?.color?.container?.light || '#fff'};
    /* transition: transform .3s ease; */

    &.open-drawer {
      transform: translateX(-250px);
      height: 100vh;
      min-height: 100vh;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      .menu-btn {
        border: 2px solid ${props => props?.theme?.color?.button?.light || '#fff'} !important;
        border-radius: 50% !important;
        .menu-icon {
          transform: translateX(-50px) !important;
          background: transparent !important;
          &:before,
          &:after {
            right: 6px !important;
            width: 18px !important;
          }
          &:before {
            transform: rotate(45deg) translate(35px, -35px) !important;
            background: ${props => props?.theme?.color?.button?.light || '#fff'} !important;
          }

          &:after {
            transform: rotate(-45deg) translate(35px, 35px) !important;
            background: ${props => props?.theme?.color?.button?.light || '#fff'} !important;
          }
        }
      }
    }
    .opacity0 {
      opacity: 0;
    }
  }
`
