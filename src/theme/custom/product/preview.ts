import styled from "styled-components";


export const StyledPreview = styled.div`
  /* position: relative; */
  @media(max-width: 991px){
    position: relative;
  }
  .preview-content{
    gap: 20px;
    @media(max-width: 768px){
      flex-direction: column;
    }
  }
  &.preview{
    width: 60vw;
    gap: 20px;
    max-height: 70vh;
    /* overflow-y: scroll; */
    .button-con{
      button{
        padding-inline: 8px;
      }
    }
    @media(max-width: 1200px){
      width: 80vw;
    }
    .preview-content{
      padding: 30px 30px 0 30px;
      @media(max-width: 768px){
        padding: 20px 20px 0 20px;
      }
      /* .gift-main-con{
        top: 46%;
      } */
    }
  }
  .detail{
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      text-decoration: underline;
      cursor: pointer;
    }
    margin-bottom: 15px;
  }
  
  hr{
    height: 1px;
    /* width: 100%; */
    background: ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
    margin-bottom: 15px;
    opacity: 0.2;
  }
/*   
  .stock-msg{
    opacity: 1;
    visibility: visible;
    &.hide{
      opacity: 0;
      visibility: hidden;
    }
  } */

.remind{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props?.theme?.color?.modal?.light_green};
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  margin: 10px 30px;
  .mx-3{
    cursor: pointer;
  }
  p{
      margin-inline: 20px;
      width: 100%;
      position: relative;
    }
  &.active{
    height: fit-content;
    padding: 20px 0;
  }
  svg{
      width: 20px;
      position: absolute;
      right: -3px;
      top: 5px;
    }
  @media(max-width: 991px){
    position: fixed;
    width: 100%;
    left: 0%;
    right: 0%;
    z-index: 10000;
    margin-inline: 0;
    background: transparent;
    justify-content: center;
    transition:all 1s ease;
    padding-inline: 18px;
    /* padding-block: 5px; */
    opacity: 0;
    visibility: hidden;
    p{
      height: fit-content;
      background: ${props => props?.theme?.color?.modal?.light_green};
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0!important;
    }
    
    p{
      padding-inline: 15px;
      padding-block: 5px;
    }
   
    &.active{
      height: fit-content;
      /* padding-block: 5px; */
      padding-inline: 18px;
      opacity: 1;
      visibility: visible;
      transition: all 1s ease;
    }
  }
}

.view-detail{
  padding-top: 15px;
  border-top: 1px solid ${props => props?.theme?.color?.line || '#d9d9d9'};
  position: absolute;
  bottom: 0;
  width: 100%;
  background: ${props => props?.theme?.color?.typo?.light || '#fff'};
}

  &.preview{
    .content-wrap{
      min-height: 60vh;
      max-height: 65vh;
      overflow-y: scroll;
      padding-bottom: 70px;
      ::-webkit-scrollbar {display:none;}
      .desc{
        margin-bottom: 1px;
      }
      .price-mod{
        p{
          margin-bottom: 0px!important;
        }
      }
    }
  }

  /* slick-slide set background for transparent images (zoom image transparent issue)*/
  .preview-content{
    .image_wrap{
      .slick-slide{
        background: white;
      }
      .slide-con{
        img{
          background: white;
        }
      }
    }
  }

`
export const ImageWrap = styled.div`
  width: 40%;
  margin-bottom: 30px;
  position: relative;
  img{ width: 100%;}
  .skeleton-wrap{
    overflow: unset!important;
  }
  .slide-con{
    /* border: 1px solid red; */
    /* max-height: 400px; */
    /* overflow: hidden; */
    img{
      
    }
  }
  .slide-nav{
    /* margin-top: 38px; */
    .prev,.next{
            padding-bottom: 6px;
    }
      .slick-list{
        .slick-track{
          
          img{
            border: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
            border-radius: 3px;
          }
          .slick-current{
            img{
            border: 1px solid ${props => props?.theme?.color?.typo?.dark || '#000'};
            border-radius: 3px;
            }
          }
        }
      }
  }
  .slide-con{
    .slick-slide{
      padding: 0;
    }
    margin-bottom: 10px;
  }
  @media(max-width: 768px){
      width: 100%;
      margin-bottom: 0;
  }
  .percent-dis{
      position: absolute;
      top: 20px;
      right: 20px;
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
      pointer-event: none;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .gift-main-con{
      width: 100%;
      border:none;
      padding: 0;
      margin-top: -10px;
      margin-bottom: 15px;
      height: 45px;
      /* position: absolute;
      top: 58%; */
      .gift-text{
        display: flex;
        flex-direction: row; 
        align-items: center;
        justify-content: space-between;
        border-radius: 0px;
        padding: 0px;
        width: 100%;
        align-items: unset;
        h6{
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 16px;
          width: 100%;
        }
        .arrow{
          display: flex;
          align-items: center;
          background: ${props => props?.theme?.color?.typo?.text || '#262626'};
          transform: translateX(6px);
          /* height: 100%;  */
            svg{
              fill: ${props => props?.theme?.color?.typo?.status};
              transform: scale(2.9) rotate(-89deg) translateX(0px) translateY(-1.5px);
            }
          }
      }
      h6{padding-left: 10px;}
      .free-gift{
        position: relative;
        display: flex;
        background: ${props => props?.theme?.color?.typo?.text || '#262626'};
        width: 100px;
        align-items: center;
        z-index: 9999;
        h5{
          margin-left: 20px;
          text-transform: uppercase;
        }
          img{
            position: absolute;
            top: -50%;
            right: 0;
            width: 74px; 
            height: 74px;
            border: 1px solid ${props => props?.theme?.color?.typo?.dark}; 
            border-radius: 50%;
             }
        .free-item{
          display: flex; 
          position: absolute;
          right: 0; 
          top: -12px;
          align-items: center; 
          justify-content: center;
          border-radius: 50%;
          background: ${props => props?.theme?.color?.typo?.danger};
          width: 22px; 
          height: 22px; 
        }
      }
    }
`
export const ContentWrap = styled.div`
  width: 60%;
  padding-top: 10px;
  padding-right: 10px;
  
  @media(max-width: 768px){
    max-height: unset;
    min-height: unset;
      width: 100%;
  }
  p{ 
    text-align: left;
  }
  .desc{
    margin-bottom: 15px;
    @media(max-width: 991px){
      margin-bottom: 10px;
    }
  }
  .qty-btn-wrap{
    .center{
      @media(max-width: 375px){
          max-width: 40px;
        }
      .qty-input{
        position: unset;
      }
    }
  }
  .qty-text{
    @media(max-width: 1400px){
      font-size: ${props => props?.theme?.fontSize?.sm}px;
    }
    @media(max-width: 1024px){
      display: none;
    }
  }
  .save-money{
  display: inline-block;
  background: ${props => props?.theme?.color?.typo?.status};
  padding: 2px 5px;
  border-radius: 5px;
  }
  
  /* .package-variant:not(:last-of-type){
      border-bottom: 1px solid red!important;
  } */

  .button-con{
    @media(max-width: 375px){
      gap: 0!important;
      .btns{
        gap: 10px !important;
      }
    }
    position: relative;
    .disable-layer{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: ${props => props?.theme?.color?.typo?.gray};
      opacity: 0.5;
    }
    button{
      min-width: fit-content;
      p{ 
        text-transform: uppercase;
        text-align:center;
      }
      @media(max-width: 1400px){
        padding-inline: 8px;
        p{
          font-size: 14px;
        }
      }
      @media(max-width: 425px){
        p{
          font-size: 12px;
          text-align: center;
        }
        min-width: 20%;
        padding-block: 5px;
      }
    }
    .qty-btn-wrap{
      .left_btn_wrap,.right_btn_wrap{
          @media(max-width: 1200px){
          width: fit-content;
          }
        }
        input{
          @media(max-width: 1200px){
            /* max-width: 40px; */
          }
        }
        @media(max-width: 1200px){
          max-width: 120px;
        }
      @media(max-width: 425px){
        width: 50%;
      }
      @media(max-width: 375px){
        width: 30%;
      }
    }
  }
  .wishlist-btn{
    width: fit-content;
    margin-bottom: 10px;
  }
  .discount-con{
    width: 70%;
    @media(max-width: 425px){
      width: 90%;
    }
    @media(max-width: 360px){
      width: 100%;
    }
    padding-right: 13px !important;
    .percent{
      font-size: 20px!important;
    }
    .promotion-name{
      margin-left: 9px;
    }
    img{
      margin-left: 25px;
      border: 1px solid ${props => props?.theme?.color?.typo?.line || '#d2d2d2'};
      border-radius: 5px;
      width: 30%;
      margin-top: 5px;
    }
  }
  .price-mod{
    @media(max-width: 991px){
      p{
        margin-bottom: 0px!important;
      }
    }
  }
`