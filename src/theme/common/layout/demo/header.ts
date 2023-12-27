import styled from 'styled-components'
import { fontSize, fontWeight, generalGap } from '../../../attribute'

export const HeaderContainer = styled.div`
  width: 100%;
  box-shadow: 0 1px 3px ${props => props?.theme?.color?.header?.shadow};
  margin-bottom: 3px;
  z-index: 100;
`

export const SwitchWrapper = styled.div`
  .language-switch {
    position: relative;
    min-width: 115px;
    padding: ${generalGap.md}px;
    padding-right: 0;
    display: flex;
    gap: ${generalGap.sm}px;
    align-items: center;
    justify-content: space-between;
    img {
      width: 20px;
    }
    &:hover {
      .options {
        display: block;
      }
    }
  }
  .options {
    display: none;
    position: absolute;
    top: 45px;
    z-index: 99;
    background: ${props => props?.theme?.color?.header?.light};
    list-style: none;
    margin: 0;
    padding: 0;
    box-shadow: 2px 2px 5px ${props => props?.theme?.color?.header?.shadow};
    border-radius: ${generalGap.sm}px;
    li {
      display: flex;
      padding-block: ${generalGap.sm}px;
      padding-inline: ${generalGap.md}px;
      gap: ${generalGap.sm}px;
      &:first-child {
        border-radius: ${generalGap.sm}px ${generalGap.sm}px 0 0;
      }
      &:last-child {
        border-radius: 0 0 ${generalGap.sm}px ${generalGap.sm}px;
      }
      &:not(:last-child) {
        border-bottom: 1px solid ${props => props?.theme?.color?.header?.gray2};
      }
      &:not(.active) {
        cursor: pointer;
      }
      &:hover,
      &:focus {
        background: ${props => props?.theme?.color?.header?.primaryBackground};
      }
    }
  }
`

export const PrimaryNavContainer = styled.div`
  height: 50px;
  width: 100%;
  background: ${props => props?.theme?.color?.header?.gray};
  a {
    text-decoration: none;
  }
  .primary-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${generalGap.xxl}px;
    .contact,
    .user-language,
    .login-option {
      display: flex;
      gap: ${generalGap.xxl}px;
      align-items: center;
    }

    .contact {
      .call-to,
      .mail-to {
        a {
          display: flex;
          align-items: center;
          gap: 5px;
          color: ${props => props?.theme?.color?.typo?.text};
          font-size: ${fontSize.sm}px;
          font-weight: ${fontWeight.lg};
          text-decoration: none;
        }
      }
    }

    .user-language {
      gap: 0;
      .login-option {
        gap: 0;
        a {
          p {
            line-height: 100%;
          }
          border-right: 1px solid ${props => props?.theme?.color?.typo?.desc};
          padding-inline: ${generalGap.xxl}px;
        }
        .user-profile {
          display: flex;
          align-items: center;
          position: relative;
          a {
            padding-left: ${generalGap.sm}px;
          }
          .menu {
            opacity: 0;
            visibility: hidden;
            position: absolute;
            right: 10px;
            min-width: 170px;
            top: 100%;
            opacity: 1;
            background: ${props => props?.theme?.color?.header?.light};
            z-index: 98;
            border-radius: ${generalGap.xs}px;
            padding-inline: 0;
            box-shadow: 1px 1px 10px ${props => props?.theme?.color?.typo?.gray};
            overflow: hidden;
            li {
              display: flex;
              padding: ${generalGap.sm}px ${generalGap.xl}px ${generalGap.sm}px ${generalGap.xl}px;
              gap: ${generalGap.sm}px;
              align-items: center;
              cursor: pointer;
              &:last-child {
                border-bottom: none;
              }
              a {
                padding: 0;
                border-right: none;
              }
              &:hover {
                background: ${props => props?.theme?.color?.header?.primaryBackground};
              }
            }
          }
          &:hover {
            .menu {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
    }
  }
`

export const SecondaryNavContainer = styled.div`
  width: 100%;
  background: ${props => props?.theme?.color?.header?.light};
  padding-block: ${generalGap.xxl}px;
  a {
    text-decoration: none;
  }
  .secondary-nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    .logo-container {
      .logo {
        width: 180px;
      }
      img {
        width: 100%;
      }
    }
    .navigation {
      flex-grow: 1;
      transition: all 1s ease;
      ul {
        display: flex;
        margin: 0;
        padding: 0;
        gap: ${generalGap.xxl}px;
        justify-content: center;
        list-style: none;
        li {
          text-transform: uppercase;
          p {
            line-height: 22px;
          }
        }
      }
    }
    .shopping {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: ${generalGap.xxl}px;

      .search-con {
        .search-input {
          width: 150px;
        }
      }
      .shop-cart {
        margin-right: 15px;
        position: relative;
        cursor: pointer;
        a {
          color: ${props => props?.theme?.color?.header?.text};
        }
        .cart-badge {
          width: 23px;
          height: 23px;
          background: ${props => props?.theme?.color?.header?.primary};
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          position: absolute;
          right: -15px;
          top: -5px;
        }
        .cart-popup {
          opacity: 0;
          visibility: hidden;
          min-width: 350px;
          box-shadow: -2px 2px 10px ${props => props?.theme?.color?.header?.gray};
          border-radius: ${generalGap.sm}px;
          background: ${props => props?.theme?.color?.header?.light};
          position: absolute;
          right: -10px;
          top: 20px;
          z-index: 99;
          padding: 10px;
          ul {
            padding: 0;
            margin: 0;
          }
          img {
            width: 80px;
          }
          .cart-item {
            display: flex;
            gap: ${generalGap.xl}px;
            border-bottom: 1px solid ${props => props?.theme?.color?.header?.gray2};
            padding-block: ${generalGap.sm}px;
            position: relative;
            &:first-child {
              padding-top: 0;
            }
            &:last-child {
              border-bottom: none;
            }
            .content {
              p {
                margin-bottom: ${generalGap.sm}px;
              }
              .price {
                span {
                  &:first-child {
                    font-size: ${fontSize.sm}px;
                    font-weight: ${fontWeight.xl};
                    color: ${props => props?.theme?.color?.header?.primary};
                    margin-right: 5px;
                  }
                  &:last-child {
                    color: ${props => props?.theme?.color?.header?.desc};
                    font-size: ${fontSize.sm}px;
                  }
                }
                del {
                  display: inline-block;
                  color: ${props => props?.theme?.color?.header?.desc};
                  margin-right: 5px;
                  font-size: ${fontSize.sm}px;
                }
              }
            }
            .product-detail-link {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 100;
            }
            .remove-item {
              width: 30px;
              position: absolute;
              padding-block: 5px;
              padding-top: 0;
              z-index: 100;
              right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .summary {
            display: flex;
            justify-content: space-between;
            padding-top: ${generalGap.sm}px;
            padding-bottom: ${generalGap.xl}px;
          }
          .go-cart-btn {
            button {
              width: 100%;
            }
          }
        }
        &:hover,
        &:focus {
          .cart-popup {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
  }
  input {
    width: 0%;
    transition: width 0.5s ease;
    float: right;
    padding: 0;
    border: transparent;
    border-bottom: 0.5px solid transparent;
    box-shadow: none;
    border-radius: 0;
  }
  &.active {
    input {
      width: 100%;
      padding: ${generalGap.md}px;
      padding-left: 0;
      border-bottom: 0.5px solid #eee;
    }
  }
`

export const MobileTopNav = styled.nav`
  width: calc(100vw - 16px);
  height: 48px;
  background: ${props => props?.theme?.color?.header?.light};
  position: fixed;
  z-index: 101;
  top: 8px;
  left: 8px;
  box-shadow: 1px 1px 20px ${props => props?.theme?.color?.header?.gray2};
  border-radius: 5px;

  @media screen and (min-width: 992px) {
    display: none;
  }

  > .container-fluid {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .burger {
    width: 26px;
    height: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: left;
    span {
      width: 100%;
      height: 2.2px;
      background: ${props => props?.theme?.color?.header?.primary};
      &:nth-child(2) {
        width: 85%;
      }
      &:last-child {
        width: 68%;
      }
    }
    @media screen and (max-width: 480px) {
      width: 25px;
      height: 20px;
    }
  }
  .form {
    flex-grow: 1;
    margin-inline: ${generalGap.xxl}px;
    svg {
      width: 23px;
      height: 23px;
      color: ${props => props?.theme?.color?.header?.primary};
    }
  }
  .search-con {
    .search-input {
      width: 100%;
      margin-right: 10px;
    }
    input {
      width: 100%;
      height: 100%;
      padding: ${generalGap.md}px;
      border: 1px solid #eee;
      border-radius: ${generalGap.md}px;
      transition: none;
      float: left;
      margin: 0;
      font-size: ${fontSize.sm}px;
      padding-block: ${generalGap.sm}px;
    }
  }
  .shop-cart {
    width: 30px;
    svg {
      color: ${props => props?.theme?.color?.header?.primary};
    }
    a {
      text-decoration: none;
    }
    .cart-badge {
      width: 23px;
      height: 23px;
      background: ${props => props?.theme?.color?.header?.primary};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      position: absolute;
      right: 0;
      top: 0;
      p {
        margin-bottom: 0;
      }
    }
  }
`

export const MobileDrawer = styled.article`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 102;
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
    max-width: 360px;
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    background: #fff;
    transition: all 0.6s ease;
    visibility: hidden;
    opacity: 0;
    overflow: auto;
    background: ${props => props?.theme?.color?.header?.secondaryBgColor};
    .content-wrapper {
      background: #fff;
      padding: 16px;
      padding-bottom: ${generalGap.xxl}px;
    }
    .user {
      background: ${props => props?.theme?.color?.header?.primary};
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;
      svg {
        color: ${props => props?.theme?.color?.header?.light};
      }
      .profile {
        display: flex;
        gap: 7px;
        padding: 16px 0 16px 0;
        align-items: center;
        p {
          max-width: 90%;
          @media (max-width: 425px) {
            font-size: 12px;
          }
        }
        @media (max-width: 320px) {
          gap: 5px;
          padding: 12px 0 12px 0;
        }
      }
      p {
        margin-bottom: 0;
      }
      .logout-icon {
        transform: rotate(180deg);
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon {
        width: 30px;
        height: 30px;
        border: 1.5px solid ${props => props?.theme?.color?.header?.primaryBackground};
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 22px;
          color: ${props => props?.theme?.color?.header?.light};
        }
      }
    }
    .menu {
      padding-left: 0;
      padding-bottom: ${generalGap.xxl}px;
      margin: ${generalGap.xxl}px 0;
      border-bottom: 1px solid #efefef;
      list-style: none;
      li {
        border-radius: 5px;
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
        p {
          margin-bottom: 0;
        }
      }
    }
    .menu-secondary {
      padding-left: 0;
      list-style: none;
      margin: ${generalGap.xxl}px 0 0;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 12px;
        width: 100%;
      }
      p {
        margin-bottom: ${generalGap.sm + 2}px;
      }
    }
    .footer-section {
      padding: 16px;
      padding-block: ${generalGap.xxxxl - 4}px;
      padding-bottom: 0;
      .about {
        img {
          width: 100px;
          margin-bottom: ${generalGap.xxl}px;
        }
        p {
          line-height: 20px;
          margin-bottom: 0;
        }
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .social {
          display: flex;
          padding-left: 0;
          list-style: none;
          align-items: center;
          img {
            width: 18px;
            height: auto;
          }
          li {
            margin-left: 12px;
            &:first-child {
              img {
                width: 8px;
              }
            }
          }

          margin-bottom: 0;
        }
      }
      .hotline {
        display: flex;
        align-items: center;
        margin: ${generalGap.xxl + 4}px 0 ${generalGap.xxl}px 0;
        a {
          text-decoration: none;
        }
        svg {
          width: 25px;
          height: 25px;
          color: ${props => props?.theme?.color?.header?.primary};
          margin-right: ${generalGap.md}px;
        }
        ul {
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
          display: flex;
          align-items: center;
          li {
            margin-right: 5px;
            p {
              margin-bottom: 0;
              &:after {
                content: ',';
              }
            }
            &:last-child {
              p {
                &:after {
                  content: '';
                }
              }
            }
          }
        }
        .call-center {
          p {
            margin-bottom: ${generalGap.xs}px;
          }
          a {
            font-size: 12px;
            font-weight: ${fontWeight.lg};
            color: ${props => props?.theme?.color?.header?.primary};
          }
        }
        .call-center a::after {
          content: ', ';
        }
        .call-center a:last-child::after {
          content: '';
        }
      }
      .available-app {
        p {
          margin-bottom: 8px;
        }
        ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          li {
            margin-right: 12px;
            img {
              width: 100px;
            }
          }
        }
      }
      hr {
        height: 0.8px;
        margin: ${generalGap.xxxxl}px 0 ${generalGap.xxl}px 0;
        color: ${props => props?.theme?.color?.header?.desc};
      }
    }
    .copyright {
      margin-bottom: ${generalGap.md}px;
      p {
        margin-bottom: 0;
        font-size: 12px;
        line-height: 20px;
        a {
          font-weight: bold;
          color: ${props => props?.theme?.color?.header?.primary};
          text-decoration: none;
          display: block;
        }
      }
    }
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
      left: 0;
    }
  }
`
