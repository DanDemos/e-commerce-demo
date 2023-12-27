import styled from 'styled-components'

export const StyledMainFooter = styled.div`
  padding: 50px 0px 0px 0px;
  background: #333333 !important;
  a {
    text-decoration: none;
    &:hover,
    &:focus {
      color: ${props => props?.theme?.color?.footer?.primary};
    }
  }
  @media (max-width: 991px) {
    display: none;
  }
  p {
    /* color: #707070; */
  }

  .footer-flex {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    h6 {
      margin-bottom: 0px;
    }
    &.phone {
      a {
        text-decoration: none;
        cursor: pointer;
        /* color: #707070; */
        &:not(:last-child) {
          &::after {
            content: ',';
          }
        }
      }
    }
    p {
      line-height: 24px;
    }
    .payment-type {
      margin-left: 20px;
      img {
        &:not(:last-child) {
          margin-right: 12px;
        }
      }
    }
    .footer-information h6 {
      margin-bottom: 12px;
    }
  }
  .footer-header {
    p {
      /* color: #dddddd; */
    }

    font-weight: 600;
    margin-bottom: 30px;
  }

  .container-fluid {
    background: #272727;
    p {
      /* color: #707070; */
    }

    padding-top: 20px;
    .social-image {
      list-style-type: none;
      display: flex;
      gap: 40px;
      padding: 0px;
    }
    .copyright-block {
      display: flex;
      justify-content: space-between;
    }
  }
`
