import styled from 'styled-components'

export const StyledGiftProduct = styled.div`
padding-block:30px;
-webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
.gift-product{
  .head-con{
    position: relative;
  }
  .text{
    @media(max-width: 991px){
      width: 80%;
    }
    @media(max-width: 425px){
      width: 70%;
    }
  }
  .point{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{margin-bottom: 0;}
    border: 1px solid ${props => props?.theme?.color?.form?.borderColor};
    width: 140px;
    height: 140px;
    border-radius: 100%;
  
    @media(max-width: 991px){
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      width: 90px;
      height: 90px;
      p{ font-size: 10px;}
      .title{ font-size: 18px; line-height: 20px;}
  
    }
  }
  .cu-card-width{
    width: calc(100% / 5);
    margin-bottom: 33px;
    @media(max-width:991px) {
        width: calc(100% / 2);
    }
}
  .gift-card{
    padding: 0;
    flex-direction: column;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    img{
      margin-bottom: 20px;
    }
    h2{
      color: ${props => props?.theme?.color?.form?.secondary};
    }
    em{
      color: ${props => props?.theme?.color?.form?.primary};
    }
    .count{
      margin: auto;
      position: relative;
      &.disable{
        opacity: 0.5;
      }
      .disable-layer{
        margin-top: 5px;
        position: absolute;
        background: ${props => props?.theme?.color?.typo?.border};
        opacity: 0.3;
        z-index: 99;
        width: 100%;
        height: 44px;
        top: 0;
        border-radius: 5px;
        display: none;
        &.active{
          display: block;
        }
      }
      .qty-com{
        max-width: 130px;
        border: 1px solid ${props => props?.theme?.color?.form?.borderColor};  
        border-radius: 5px;
        margin:5px 0 20px 0;
      
      .count-input{
        height: 42px;
        border-top: 0;
        border-bottom: 0;
        input{
          text-align: center;
        }
      }
      .text{
        min-width: 42px;
        text-align: center;
      }
      svg{
        margin: 13px;
      }
      }
    }
  }
  .confirm-table{
    max-width: 500px;
    margin-left: auto;
    .form{
      background: ${props => props?.theme?.color?.form?.bg1};
      border: 1px solid ${props => props?.theme?.color?.form?.light_gray2};
      padding: 0 30px 30px 30px;
      thead{
        border-bottom: none;
      }
    }
    tr{
      border: none!important;
    }
    button{
      width: 50%;
      text-transform: uppercase;
      &.skip-btn{
            width: 70%;
      }
    }
    .button-con{
      gap: 1rem;
      @media(max-width: 991px){
        button{
          width: 30%;
          min-width: auto;
          padding-inline: 5px;
          &.skip-btn{
            width: 70%;
          }
        }
      }
      @media(max-width: 500px){
        gap: 0.5rem;
        button{
          p{
            font-size: 12px;
          }
        }
      }
    }
  }
}
`