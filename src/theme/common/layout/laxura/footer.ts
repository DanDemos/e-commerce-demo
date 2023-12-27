import styled from 'styled-components'

interface StyledFooterProps {
  props?: any,
  footerBgColor?: any,
}

export const StyledFooterCon = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledPrimaryFooterCon = styled.div < StyledFooterProps > `
  background: ${props => props?.theme?.color?.footer?.[props?.footerBgColor] || props?.footerBgColor || props?.theme?.color?.footer?.dark};
`

export const StyledPrimaryFooterContent = styled.div`
  padding-block: 10px;
  a:hover {
    color: ${props => props?.theme?.color?.typo?.primary};
  }
  .row {
    align-items: flex-start;
    gap: 0;
    /* @media (min-width: 1200px) {
      gap: 60px;
    } */
    .company-info {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .logo {
        max-width: 60%;
        @media (max-width: 991px) {
          max-width: 40%;
        }
      }
      .social {
        display: flex;
        gap: 40px;
        a {
          text-decoration: none;
        }
        img {
          max-width: 24px;
          /* margin-right: 15px; */
        }
      }
      padding-top: 30px;
    }
    .contact {
      img {
        margin-right: 20px;
      }
      .d-flex {
        margin-bottom: 15px;
        &.address {
          align-items: flex-start;
        }
        &.phone,&.email{
          a{
            &:not(:last-child)::after{
              content: ',';
            }
          }
    }
      }
    }
    .information {
      a,p {
        display: block;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover, &:focus{
          color: ${props => props?.theme?.color?.typo?.primary || '#0491A4'};
        }
      }
      a{
        text-decoration: none;
        @media(max-width: 991px){
          display: inline-block;
          border-right: 1px solid ${props => props?.theme?.color.typo?.paragraph || '#ddd'};
          padding-right: 12px;
          margin-right: 12px;
          p{
            margin-bottom: 0;
            line-height: 15px;
          }
        }
        &:last-child{
          border-right: none;
        }
      }
    }
    .contact,
    .information {
      @media (min-width: 1440px) {
        margin-top: 6rem !important;
      }
      @media (max-width: 1439px) {
        margin-top: 3rem !important;
      }
    }
    .title {
      margin-bottom: 20px;
      text-transform: uppercase;
    }
  }
  .info-text{
    line-height: 32px;
  }
`

export const StyledSecondaryFooterCon = styled.div < StyledFooterProps > `
  background: ${props => props?.theme?.color?.footer?.[props?.footerBgColor] || props?.footerBgColor || props?.theme?.color?.footer?.dark};
`

export const StyledSecondaryFooterContent = styled.div`
  padding-block: 20px;
  background: ${props => props?.theme?.color?.dark2 || '#0A0A0A'};
  a {
    opacity: 0.8;
  }
  a:hover {
    opacity: 1;
    color: ${props => props?.theme?.color?.typo?.primary};
  }
`
