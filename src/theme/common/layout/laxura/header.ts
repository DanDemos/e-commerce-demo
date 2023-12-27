import styled from 'styled-components'
import { General } from '../../../attribute'

interface StyledHeaderProps {
  props?: any
  hpBgColor?: any
  hsBgColor?: any
  mbhBgColor?: any
}

export const StyledHeaderCon = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
`

export const StyledPrimaryHeaderCon = styled.div<StyledHeaderProps>`
  min-height: 90px;
  width: 100%;
  background: ${props => props?.theme?.color?.header?.[props?.hpBgColor] || props?.hpBgColor || props?.theme?.color?.header?.hpBgColor};
`

export const StyledPrimaryHeaderContent = styled.div`
  padding-block: 20px;
  .primary-header-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      margin: 0;
      padding: 0;
    }
    a {
      text-decoration: none;
    }

    .left-con {
      display: flex;
      text-transform: uppercase;
      align-items: center;
      hr {
        width: 1px;
        height: 15px;
        background: ${props => props?.theme?.color?.typo?.border};
        margin-inline: 20px;
      }
      .user {
        margin-right: 16px;
        position: relative;
        .user_icon {
          cursor: pointer;
        }
        .user-menu {
          &.active {
            display: block;
          }
        }
      }
      @media (max-width: 1300px) {
        p {
          font-size: 16px;
        }
        hr {
          margin-inline: 13px;
        }
      }
      @media (max-width: 1024px) {
        hr {
          margin-inline: 8px;
        }
      }
      .user-menu {
        display: none;
        border: 1px solid ${props => props?.theme?.color?.typo?.line};
        position: absolute;
        top: 85%;
        z-index: 80;
        background: ${props => props?.theme?.color?.typo?.light};
        padding: 20px;
        box-shadow: 0.5px 0.5px 2px ${props => props?.theme?.color?.typo?.disabled};
        li {
          list-style: none;
          text-transform: uppercase;
          border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line};
          align-items: center;
          display: flex;
          gap: 15px;
          &:not(:first-child) {
            cursor: pointer;
          }
          img {
            cursor: default;
          }
          p,
          .profile_icon {
            cursor: pointer;
          }
          .name,
          .phone {
            text-transform: none;
            cursor: default;
          }
          a {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          &:first-child {
            align-items: flex-start;
            padding-top: 0;
            p {
              margin-bottom: 5px;
            }
          }
          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
            cursor: pointer;
          }
          padding-block: 18px;
          button {
            width: max-content;
            text-transform: uppercase;
            padding-block: 8px;
            padding-inline: 15px;
            border-radius: 5px;
            p {
              padding: 0;
              margin-bottom: 0 !important;
            }
          }
        }
        @media (max-width: 1300px) {
          p {
            font-size: 14px;
          }
        }
      }
      .language-switch {
        display: flex;
        padding: 6px;
        border: 1px solid ${props => props?.theme?.color?.typo?.disabled};
        border-radius: 18px;
        background: ${props => props?.theme?.color?.typo?.light};
        li {
          list-style: none;
          &:first-child {
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid ${props => props?.theme?.color?.typo?.disabled};
            @media (max-width: 1300px) {
              padding-right: 5px;
              margin-right: 5px;
            }
          }
          &.active {
            cursor: not-allowed;
          }
          &:not(.active) {
            cursor: pointer;
            opacity: 0.25;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }

    .center-con {
    }

    .center-con img {
      height: 40px;
    }

    .right-con {
      display: flex;
      gap: 20px;
      .search-con {
        position: relative;
        input {
          min-width: 350px;
          height: 45px;
          border-color: ${props => props?.theme?.color?.typo?.line};
          border-radius: 5px;
          @media (max-width: 1300px) {
            min-width: auto;
            height: 40px;
          }
        }
        svg {
          position: absolute;
          top: 8.5px;
          right: 10px;
        }
        @media (max-width: 1024px) {
          max-width: 200px;
        }
      }
      @media (max-width: 1300px) {
        gap: 10px;
      }
      .cart {
        position: relative;
        cursor: pointer;
        img {
          @media (max-width: 1300px) {
            width: 35px;
            height: 35px;
          }
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -10px;
          background: ${props => props?.theme?.color?.typo?.primary};
          width: 28px;
          height: 28px;
          border-radius: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`

export const StyledSecondaryHeaderCon = styled.div<StyledHeaderProps>`
  width: 100%;
  min-height: 60px;
  background: ${props => props?.theme?.color?.header?.[props?.hsBgColor] || props?.hsBgColor || props?.theme?.color?.header?.dark || '#000'};
`

export const StyledSecondaryHeaderContent = styled.div`
  background: ${props => props?.theme?.color?.header?.[props?.hsBgColor] || props?.hsBgColor || props?.theme?.color?.header?.dark || '#000'};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .secondary-header-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
  .left-con {
    display: flex;
    align-items: center;
    position: relative;
    .mega-menu-container:hover {
      .down {
        transform: rotate(180deg);
      }
      .mega-menu {
        height: 65vh;
        @media (max-width: 1440px) {
          height: 75vh;
        }
      }
    }
    .mega-menu-container {
      padding-block: 20px;
      min-width: 225px;
      background: ${props => props?.theme?.color?.typo?.dark || '#000'};
      .menu {
        display: flex;
        position: relative;
        justify-content: space-between;
        text-transform: uppercase;
        border-right: 1px solid ${props => props?.theme?.color?.typo?.line || '#000'};
        padding-right: 20px;
      }
      .mega-menu {
        height: 0vh;
        overflow: hidden;
        /* width: 80vw; */
        position: absolute;
        top: 100%;
        display: flex;
        padding: 0;
        transition: height 0.3s ease;
        z-index: 10000;
        &.active {
        }
        ul {
          padding: 0;
        }
        li {
          list-style: none;
        }
        .mega-menu-left {
          height: 100%;
          min-width: 300px;
          background: ${props => props?.theme?.color?.typo?.background};
          transition: height 0.3s ease;
          padding-inline: 20px;
          padding-block: 10px;
          border: 1px solid ${props => props?.theme?.color?.typo?.line || '#ddd'};
          border-right: none;
          li {
            padding: 15px 0 15px 0;
            text-transform: uppercase;
            border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line || '#ddd'};
            P:hover {
              color: ${props => props?.theme?.color?.typo?.primary || '#0491A4'};
            }
            position: relative;
            .indicator {
              display: none;
              position: absolute;
              top: 20px;
              right: -39px;
            }
            &.active {
              .indicator {
                display: block;
              }
            }
            &.active {
              p {
                color: ${props => props?.theme?.color?.typo?.primary || '#0491A4'};
              }
            }
          }
        }
        &.right-active {
          .right-menu {
            border: 1px solid ${props => props?.theme?.color?.typo?.line || '#eee'};
            width: 300px;
            transition: width 0.3s ease;
            @media (max-width: 1300px) {
              width: 250px;
            }
          }
        }
        .right-menu {
          width: 0%;
          height: 100%;
          /* overflow-y: scroll; */
          transition: width 0.3s ease;
          background: ${props => props?.theme?.color?.typo?.light || '#fff'};

          ul {
            li {
              padding-block: 5px;
              svg {
                margin-right: -5px;
              }
            }
          }
          border-right: 1px solid ${props => props?.theme?.color?.border || '#ddd'};
          border-bottom: 1px solid ${props => props?.theme?.color?.border || '#ddd'};
          &.active {
            width: 300px;
            padding: 25px 30px;
            @media (max-width: 1300px) {
              width: 250px;
            }
          }
        }
        .third-menu {
          /* padding: 30px;
          width: 300px; */
          padding: 0;
          width: 0;
          background: ${props => props?.theme?.color?.typo?.light || '#fff'};
          transition: width 0.3s ease;
          overflow: hidden;
          ul {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          li {
            cursor: pointer;
            padding-block: 5px;
          }
          &.active {
            width: 300px;
            padding: 25px 30px;
            border-right: 1px solid ${props => props?.theme?.color?.border || '#ddd'};
            border-bottom: 1px solid ${props => props?.theme?.color?.border || '#ddd'};
            @media (max-width: 1300px) {
              width: 250px;
            }
            ul {
              li:hover {
                p {
                  color: ${props => props?.theme?.color?.typo?.primary || '#333'};
                }
              }
            }
          }
        }
        .mega-menu-right {
          /* height: 100%; */
          /* display: flex;
          column-gap: 6rem;
          row-gap: 0;
          flex-wrap: wrap;
          width: 0%;
          overflow: hidden; */
          /* transition: width 1s ease;
          background: ${props => props?.theme?.color?.typo?.light}; */
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          /* flex-wrap: wrap; */
          gap: 0;
          border: none;
          transition: width 0.1s ease;
          padding: 30px;
          .products {
            display: inline-block;
            /* width: 30%; */
          }
          li {
            text-transform: uppercase;
            background: #fff;
            padding-block: 5px;
            /* height: fit-content; */

            p {
              &.sub-cate {
                margin-bottom: 0;
                /* cursor: pointer; */
              }
              margin-bottom: 8px;
            }
            a {
              p {
                color: ${props => props?.theme?.color?.typo?.dark || '#000'};
              }
            }
          }
          ul.sub-products {
            li:hover {
              transform: translateX(5px);
              transition: all 0.5s ease;
              -webkit-transition: all 0.5s ease; /** Chrome & Safari **/
              -moz-transition: all 0.5s ease; /** Firefox **/
              -o-transition: all 0.5s ease; /** Opera **/
              p {
                font-weight: 400;
                color: ${props => props?.theme?.color?.typo?.primary || '#0491A4'};
                cursor: pointer;
              }
            }
          }
          /* border: 1px solid ${props => props?.theme?.color?.typo?.line || '#ddd'}; */
        }
      }
    }
  }
  .navigation {
    ul {
      li.brand:hover {
        /* .nav-mega-menu{ display: block;} */
      }
    }
    ul {
      display: flex;
      gap: 30px;
      margin: 0;
      li {
        text-transform: uppercase;
        list-style: none;
        cursor: pointer;
        &:hover,
        a:hover {
          p.navlink {
            color: ${props => props?.theme?.color?.typo?.primary};
          }
        }
        text-transform: uppercase;
        list-style: none;
        p {
          text-align: left;
        }
      }
      @media (max-width: 1500px) {
        gap: 15px;
        p {
          font-size: 16px !important;
        }
      }
    }
    .nav-mega-menu {
      position: absolute;
      top: 100%;
      left: 50%;
      width: 20vw;
      max-height: 0%;
      overflow-y: auto;

      // /* For webkit-based browsers */
      ::-webkit-scrollbar {
        width: 5px;
        background-color: lightgray;
      }

      ::-webkit-scrollbar-thumb {
        background-color: darkgray;
      }

      ::-webkit-scrollbar-track {
        background-color: white;
      }

      // /* For Firefox */
      ::-moz-scrollbar {
        width: 5px;
        background-color: lightgray;
      }

      ::-moz-scrollbar-thumb {
        background-color: darkgray;
      }

      ::-moz-scrollbar-track {
        background-color: white;
      }

      background: ${props => props?.theme?.colors?.light || '#ffff'};
      box-shadow: 0px 0px 30px ${props => props?.theme?.colors?.paragraph || '#ddd'};
      transition: height 0.5s ease;
      z-index: 98;
      @media (max-width: 1400px) {
        width: 20vw;
      }
      &.active {
        max-height: calc(100vh - 200px);
      }
      .content {
        padding: 30px 0 30px 30px;
        width: 100%;
        .title {
          margin-bottom: 20px;
          text-align: left;
          margin-left: 5px;
        }
        .brand-list {
          flex-wrap: wrap;
          padding: 0;
          padding-right: 30px;
          row-gap: 2rem;
          gap: 8px;
          padding-bottom: 20px;
          li {
            cursor: pointer;
            width: 95%;
            border-radius: 5px;
            @media (min-width: 1440px) {
              margin-right: 50px;
            }
            // img {
            //   width: 100%;
            //   border: 1px solid ${props => props?.theme?.color?.typo?.line2 || '#d9d9d9'};
            //   border-radius: 5px;
            //   box-shadow: 0px 1px 6px ${props => props?.theme?.color?.typo?.line2 || '#d9d9d9'};
            // }
          }
        }
      }
      // .banner {
      //   margin: 30px 30px 30px 0;
      //   max-width: 30%;
      //   img {
      //     width: 100%;
      //   }
      // }
    }
  }
  .right-con {
    align-items: center;
    a {
      color: unset;
      &:hover {
        color: ${props => props?.theme?.color?.typo?.primary};
      }
    }

    img {
      margin-right: 10px;
    }
  }

  /* menu font-size responsive */
  .left-con {
    .menu,
    .navigation {
      p {
        /* border: 1px solid red; */
        @media (max-width: 1500px) {
          font-size: 16px;
        }
        /* @media(max-width: 1380px){
          font-size: 15px;
        }
        @media(max-width: 1300px){
          font-size: 13px;
        } */
      }
    }
    .navigation {
      ul {
        @media (max-width: 1300px) {
          padding-left: 10px;
        }
      }
    }
    .mega-menu-container {
      @media (max-width: 1300px) {
        min-width: 200px;
        .mega-menu {
          .mega-menu-left {
            min-width: 250px;
          }
        }
      }
    }
  }
  .right-con {
    p {
      @media (max-width: 1500px) {
        font-size: 17px !important;
      }
      @media (max-width: 1380px) {
        font-size: 15px !important;
      }
    }
    @media (max-width: 1500px) {
      img {
        width: 25px;
        height: 25px;
        margin-right: 8px;
      }
    }
  }
  .mega-menu {
    position: relative;
    .scroll {
      position: absolute;
      bottom: 0;
      left: 60%;
      opacity: 0;
      visibility: hidden;
    }
    &.right-active {
      .scroll {
        opacity: 1;
        visibility: visible;
        img {
          animation: down 1.5s infinite;
          animation-timing-function: ease-in-out;
          webkit-animation-timing-function: ease-in-out;
        }
      }
    }
  }
  @keyframes down {
    0% {
      margin-bottom: 5px;
    }
    50% {
      margin-bottom: 0px;
    }
  }
`

export const StyledMobileHeaderCon = styled.div<StyledHeaderProps>`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${props => props?.theme?.color?.header?.[props?.mbhBgColor] || props?.mbhBgColor || props?.theme?.color?.header?.dark};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`

export const StyledMobileHeaderContent = styled.div`
  width: 100%;
  a {
    text-decoration: none;
  }
  .mb_header_content {
    display: flex;
    flex-directions: row;
    justify-content: space-between;
    align-items: center;

    .left_con {
      display: flex;
      width: 50%;
      img {
        width: 100%;
      }
      @media (min-width: 425px) {
        width: 30%;
      }
    }

    .right_con {
      display: flex;
      justify-content: flex-end;
      position: relative;
      gap: 15px;
      align-items: center;
      @media (max-width: 425px) {
        /* gap: 5px; */
      }
      .cart {
        position: relative;
        img {
          @media (max-width: 1300px) {
            width: 25px;
            height: 25px;
            /* border: 1px solid #fff; */
          }
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: ${props => props?.theme?.color?.typo?.primary};
          width: 20px;
          height: 20px;
          border-radius: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .menu_icon {
        color: ${props => props?.theme?.color?.header?.light};
        font-size: 25px;
        cursor: pointer;
      }
      .user {
        .user_icon {
          cursor: pointer;
        }
        .user-menu {
          &.active {
            display: block;
          }
        }
      }
      .user-menu {
        display: none;
        border: 1px solid ${props => props?.theme?.color?.typo?.line};
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 99;
        background: ${props => props?.theme?.color?.typo?.light};
        padding: 20px;
        box-shadow: 0.5px 0.5px 2px ${props => props?.theme?.color?.typo?.disabled};
        ul {
          padding: 0;
        }
        li {
          list-style: none;
          text-transform: uppercase;
          border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line};
          align-items: center;
          p {
            cursor: pointer;
          }
          .profile_icon {
            cursor: pointer;
          }
          .name,
          .phone {
            text-transform: none;
            cursor: default;
          }
          display: flex;
          gap: 15px;
          a {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          &:first-child {
            align-items: flex-start;
            padding-top: 0;
            p {
              margin-bottom: 5px;
            }
          }
          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
            cursor: pointer;
          }
          padding-block: 18px;
          button {
            text-transform: uppercase;
            padding-block: 8px;
            padding-inline: 15px;
            border-radius: 5px;
            p {
              padding: 0;
              margin-bottom: 0 !important;
            }
          }
        }
        @media (max-width: 1300px) {
          p {
            font-size: 14px;
          }
        }
        .welcome {
          margin: 0;
          li {
            flex-direction: column;
            p.title {
              font-size: 16px !important;
              margin: 0;
              text-transform: initial;
            }
            hr {
              margin: 0;
              width: 100%;
              height: 1px;
              color: ${props => props?.theme?.color?.typo?.border};
            }
            .d-flex {
              gap: 10px;
              button {
                min-width: 120px !important;
              }
            }
          }
        }
      }
    }
  }
`

export const StyledMobileDrawerCon = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  .drawer-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    visibility: hidden;
    opacity: 0;
  }
  .drawer-content {
    max-width: 90vw;
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    right: -100%;
    transition: all 0.6s ease;
    visibility: hidden;
    opacity: 0;
    overflow: auto;
    background: ${props => props?.theme?.color?.header?.light};
  }
  &.active {
    visibility: visible;
    opacity: 1;
    .drawer-wrapper,
    .drawer-content {
      visibility: visible;
      opacity: 1;
    }
    .drawer-content {
      right: 0;
    }
  }
`

export const StyledMobileDrawerContent = styled.div`
  a {
    text-decoration: none;
  }
  position: relative;

  .mobile-drawer {
    .head {
      align-items: center;
      gap: 15px;
      padding-inline: 20px;
      padding-block: 12px;
      background: ${props => props?.theme?.color?.typo?.background || '#ddd'};
      .close-icon {
        cursor: pointer;
      }
      .search-con {
        position: relative;
        flex-grow: 1;
        input {
          display: flex;
          width: 100% !important;
          height: 45px;
          border-color: ${props => props?.theme?.color?.typo?.line || '#ddd'};
          border-radius: 5px;
          @media (max-width: 1300px) {
            min-width: auto;
            height: 40px;
          }
        }
        svg {
          position: absolute;
          top: 6px;
          right: 10px;
        }
      }
      .sub-drawer {
        min-height: 40px;
        svg {
          margin-right: 10px;
        }
        p {
          text-transform: uppercase;
        }
      }

      /* .product {
        display: none;
        align-items: center;
        text-transform: uppercase;
        svg {
          margin-left: -10px;
          margin-right: 20px;
        }
      } */
    }
    .content {
      padding: 20px;
      button {
        border: none;
        padding: 0;
        justify-content: unset;
        gap: 10px;
        text-transform: uppercase;
        min-height: fit-content;
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
        margin-bottom: 25px;
        text-transform: uppercase;
        display: flex;
        gap: 10px;
        a {
          text-transform: uppercase;
          display: flex;
          gap: 10px;
          color: unset;
          width: 100%;
          .d-flex {
            svg {
              margin-right: 10px;
            }
          }
        }
        p {
          width: fit-content;
        }
        .arrow {
          position: absolute;
          right: 20px;
        }
      }
      hr {
        margin-block: 20px;
      }
      .language-switch {
        width: 85px;
        display: flex;
        justify-content: space-between;
        padding: 6px;
        border: 1px solid ${props => props?.theme?.color?.typo?.disabled};
        border-radius: 18px;
        background: ${props => props?.theme?.color?.typo?.light};
        li {
          margin: 0;
          list-style: none;
          &:first-child {
            border-right: 1px solid ${props => props?.theme?.color?.typo?.disabled};
            padding-right: 8px;
          }
          &:not(.active) {
            opacity: 0.25;
          }
          &.active {
            cursor: not-allowed;
          }
          &:not(.active) {
            cursor: pointer;
            opacity: 0.25;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
      .call {
        align-items: center;
        a {
          color: unset;
        }
      }

      .collapse-con {
        /* border-left: 1px solid ${props => props?.theme?.color?.typo?.line || '#ddd'}; */
        .name-wrap {
          justify-content: center;
          align-items: center;
          .line {
            width: 10px;
            height: 1px;
            background: ${props => props?.theme?.color?.typo?.line || '#ddd'};
            margin-right: 8px;
          }
          &.sub-cate {
            /* background: pink; */
          }
        }
        .sub-panel {
          .line {
            width: 14px;
          }
          .collapse-header-wrap {
            margin-bottom: 5px;
          }
          .sub-panel {
            .collapse-con {
              margin-left: 15px;
              border-left: 1px solid ${props => props?.theme?.color?.typo?.line || '#ddd'};
            }
            /* .line{
              width: 20px;
            } */
          }
        }
        .collapse-item {
          padding-bottom: 10px;
          margin-bottom: 5px;
          .collapse-header-wrap {
            p {
              text-transform: uppercase;
            }
          }
          .collapse-content {
            border-left: 1px solid ${props => props?.theme?.color?.typo?.line || '#ddd'};
            /* .collapse-con{
              border-left: none;
            } */
          }

          &:last-child {
            border-bottom: 0;
            padding-bottom: 0;
            margin-bottom: 0;
          }
        }
      }

      .brand {
        p {
          margin: 10px 0;
        }
        .brand-mobile-divider {
          width: 100%;
          height: 0.5px;
          background-color: #c4c4c4;
        }
      }
    }
  }
`
