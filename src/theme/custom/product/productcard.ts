import styled from 'styled-components'

export const StyledProductCardCom = styled.div`
transition: box-shadow 0.4s ease;
height: 100%;
cursor: pointer;
.skeleton-wrap{
  @media(max-width: 991px){
    min-height: unset!important;
  }
}
.price{
  @media (max-width:1440px){
    flex-direction: column !important;
    gap: 0px !important;
  }
}
.white-space{
  white-space: pre;
}
.route{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  
}
&:not(.slider-card):hover{
  box-shadow: 0px 0px 25px #0000001c;
}
&.slider-card{
  div{
    border: none;
    background: transparent;
  }
    .image-promo img{
      /* border-radius:15px ; */
    }
    .gift-main-con{
      /* display: none !important; */
    }
  }
  .product-card{
    height: 100%;
    position: relative;
    border: 1px solid ${props => props?.theme?.color?.typo?.gray};
    .no-item{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(203 203 203 / 50%);
    z-index: 100001;
    }
    .out-of-stock{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      border-radius: 25px;
      background: ${props => props?.theme?.color?.typo?.out_stock};
      z-index: 100001;
      width: max-content;
      padding-inline: 20px;
      @media(max-width: 1200px){
        font-size: 12px;
        padding-inline: 8px;
      }
    }
    .route{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
    }
    .description{
      padding-inline: 8px;
      .px-2{
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; */
      }
    }
    @media(max-width: 375px){
      .image-promo{
        /* margin-bottom: 5px; */
      }
      p.px-2{
        line-height: 20px;
      }
      .description{
        margin-bottom: 5px;
      }
      .out-of-stock{
        top: 42%;
        line-height: 15px;
      }
    }
  }
div{
  padding: 0;
  &:first-child{
    /* height: 100%; */
    flex-direction: column;
    /* justify-content: center; */
    overflow: hidden;
    border-radius: ${props => props?.theme?.buttonVariable?.borderRadius.xxxs}px;
  }
  
  .image-promo,.description{
    position: relative;
    margin-bottom: 20px;
    /* padding-bottom: 20px; */
    .display-center{
      display: flex;
      align-items: center; 
      justify-content: center; 
      &.eye-con{
        @media (max-width:768px){
          display: none;
        }
      }
    }
    .eye{
      position: absolute;
      right: 15px;
      top: 15px;
      padding: 8px;
      background: ${props => props?.theme?.color?.typo?.line};
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      transition: all 0.7s ease;
      z-index: 5;
      &.d-text{
        display: none;
        right: 46px;
        width: auto;
        height: auto;
        background: none;
      }
    }

    .active{
      &:hover{
        .eye{
          background: ${props => props?.theme?.color?.typo?.dark};
          fill: ${props => props?.theme?.color?.typo?.light} !important;
        }
        .eye.d-text{
          background: none;
          display: block !important;
        }
      }
    }
    .percent-dis{
      position: absolute;
      top: 15px;
      left: 15px;
      background: ${props => props?.theme?.color?.typo?.danger}; 
      width: 30px;
      height: 30px;
      border-radius: 50%; 
      border: 1px dashed ${props => props?.theme?.color?.typo?.light};
      @media(max-width:562px) {
        h4{
          font-size: 10px;
        }
      }
    }
    .gift-text-1{
      position: absolute;
      width: 100%;
      bottom: 0;
      border:none;
      height: 32px;
      @media(max-width: 425px){
          p{font-size: 12px;}
      }
      @media(min-width: 1400px){
          p{font-size: 14px;}
      }
    }
    
    .gift-main-con{
      width: 100%;
      position: absolute;
      bottom: 0;
      border:none;
      height: 32px;
      background: ${props => props?.theme?.color?.typo?.dark};
      .gift-text{
        display: flex;
        flex-direction: row; 
        align-items: center;
        justify-content: space-between;
        border-radius: 0px;
        padding: 0px;
        width: 100%;
        align-items: unset;
        position: relative;
        background: ${props => props?.theme?.color?.typo?.status};
        overflow: initial;
        .arrow{
          position: absolute;
          top: -5px;
          right: -28px;
          z-index: 2;
          svg{
            color: ${props => props?.theme?.color?.typo?.status};
            width: 42px;
            height: 42px;
          }
          }
          /* height: 100%;  */
            /* svg{
              fill: ${props => props?.theme?.color?.typo?.status};
                transform: scale(2.3) rotate(-89deg) translateX(0px) translateY(-3px)
            } */
          
      }
      h6{
        padding-left: 10px;
        width: 100%;
        &.receive-text{
          line-height: 13px;
        }
        @media(min-width: 1400px){
          font-size: 14px;
        }
        /* font-size: 13px; */
        @media(max-width: 425px){
          font-size: 10px;
          margin-left: -7px;
        }
      }
      .free-gift{
        position: relative;
        display: flex;
        background: ${props => props?.theme?.color?.typo?.dark};
        width: 110px;
        align-items: center;
        /* padding-left: 20px; */
        @media(max-width: 600px){
          width: 120px;
        }
        @media(max-width: 425px){
          /* width: 115px; */
        }
        img{
          position: absolute;
          top: -26px;
          right: 0;
          width: 60px; 
          height: 60px;
          border: 1px solid ${props => props?.theme?.color?.typo?.dark}; 
          border-radius: 50%; 
          @media(max-width: 1300px){
            top: -15px;
            width: 50px; 
            height: 50px;
          }
        }
        .free-item{
          display: flex; 
          position: absolute;
          right: 0; 
          top: -22px;
          align-items: center; 
          justify-content: center;
          border-radius: 50%;
          background: ${props => props?.theme?.color?.typo?.danger};
          width: 22px; 
          height: 22px; 
          @media(max-width: 425px){
            top: -16px;
          }
        }
        @media(max-width: 425px){
          h5{
            font-size: 11px;
          }
        }
      }
    }
  }
}
`
