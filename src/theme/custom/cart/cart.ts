import styled from "styled-components";

export const StyledCartCon = styled.div`
  min-height: 50vh;
  .inner_modal_con{
      padding-block: 30px;
      gap: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      aling-items: center;
      svg{
        margin: auto;
      }
      .modal_btn_con{
        gap: 10px;
        justify-content: center!important;
        }
  }
  .shopping-cart-con{
     /* margin-block: -70px; */
    .cart-table{
      padding-block: 50px;
      padding-right: 20px;
      position: relative;
      @media(max-width: 991px){
        padding-top: 30px;
        padding-right: 12px;
      }
      @media(max-width: 375px){
        padding-inline: 0;
      }
      table{
        thead{
          text-transform: uppercase;
          th{
            p{text-align: center;}
          }
          th:first-child{
            p{text-align: left;}
            }
          @media(max-width: 991px){
            display: none;
          }
        }
        tr{
          border-bottom: 1px solid #e2e2e2;
        }
        td{
          position: relative;
          padding-block: 12px;
        }
      }
      .price-wrap,.qty-wrap,.subtotal-wrap{
        @media(min-width: 992px){
          padding-block: 25px;
        }
        @media(min-width: 1440px){
          padding-block: 50px;
        }
      }
      .qty-wrap{
        margin-top: -10px;
      }
      
      .promo{
        width: 100%;
        margin-top: 10px;
        &.product{
          height: 100%;
          img{
            width: 85px;
            margin-left: 15px;
            @media(min-width: 1441px){
              width: 150px;
              margin-left: 50px;
            }
          }
          p{
            padding-left: 28px;
            @media(max-width: 1200px){
              padding-left: 20px;
            }
            @media(min-width: 1441px){
              padding-left: 30px;
            }
          }
        }
        &.price,&.qty,&.subtotal,&.delete{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-block: 25px;
        }
        &.qty{
          margin-top: -10px;
        }
        &.price{
          &.product-free{
            p{
              border: 1px solid ${props => props?.theme?.color?.typo?.secondary || '#F27043'};
              background: #f2704338;
              border-radius: 26px;
              line-height: 20px;
              padding-inline: 8px;
            }
          }
        }
      }
      .btn-con{
        margin-bottom: 10px!important;
      }
      .mobile-promo{
        img{
          max-width: 80px!important;
          margin-left: 20px;
        }
        .product-free{
              border: 1px solid ${props => props?.theme?.color?.typo?.secondary || '#F27043'};
              background: #f2704338;
              border-radius: 26px;
              line-height: 16px;
              padding-inline: 6px;
              height: fit-content;
              margin-top: 3px;
              margin-right: 20px;
        }
      }

      .title{ margin-bottom: 10px;}
      .cancel_btn{
          cursor: pointer;
          margin-top: -5px;
          @media(min-width: 1400px){
            margin-top: -20px;
          }
          @media(max-width: 991px){
            margin-top: 0;
          }
      }
      .product_name_wrap, .mb_product_name_wrap{
        align-items: center;
        cursor: pointer;
        position: relative;
        img{
          max-width: 200px;
          @media(max-width: 1200px){
            max-width: 130px;
          }
        }
        p{
          padding-left: 30px;
          text-transform: unset;
          span{ 
            font-weight: 400; 
            color: ${props => props?.theme?.color?.typo?.dark};
          }
          margin-bottom: 14px;
          @media(max-width: 1200px){
            padding-left: 20px;
          }
          @media(max-width: 375px){
            padding-left: 10px;
          }
        }
        @media(max-width: 1440px){
          img{max-width: 100px;}
        }
        @media(max-width: 992px){
          align-items: flex-start;
          p{ margin-bottom: 0;}
        }
        .cancel_btn{
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .product_name_wrap{
        &.mb{
         
          p:first-child{
            @media(max-width: 375px){
              width: 90%;
            }
          }
        }
      }

      .btn-con{
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        p{
          margin-left: 120px;
          @media(max-width: 375px){
            margin-left: 110px;
          }
        }
      }
      .qty-wrap{
          .qty-btn-wrap{
            border-radius: 5px;
            input{ height: 48px; min-width:30px;}
            .center{ border-color: ${props => props?.theme?.color?.typo?.line};}
            border-color: ${props => props?.theme?.color?.typo?.line};
          }
          @media(max-width: 1200px){
            input{ max-height: 40px;}
          }
          &.promo{
            position: absolute;
            right: 0;
            width: fit-content;
          }
          @media(max-width: 375px){
            .left_btn_wrap,.right_btn_wrap{
              max-width: 20px;
            }
            .qty-input{
              max-width: 38px;
            }
          }
      }
      button{
        float: right;
        border: 1px solid ${props => props?.theme?.color?.typo?.text || '#262626'};
        /* position: absolute;
        right: 20px;
        bottom: 70px; */
        margin-top: 10px;
        &:hover,&:focus{
          background: ${props => props?.theme?.color?.typo?.line};
        }
      }
    }
  
    .cart-total{
      padding-block: 50px;
      padding-inline: 20px;
      background: ${props => props?.theme?.color?.typo?.bg1};
      border: 1px solid ${props => props?.theme?.color?.typo?.line};
      min-height: 70vh;
      .title{
        text-transform: uppercase;
      }
      p{ margin-bottom: 10px;}
      
      .point-input{
        .vlc_con{ 
          width: 75%;
          input{ width: 100%; height: 45px;}
          margin-bottom: 0;
          .vlc_con{ width: 95%;}
        }
        button{
        padding-inline: 5px;
        min-width: 25%; min-height: 45px;
        }
        margin-bottom: 40px;
      }

      .sub-total,.redeem{
        justify-content: space-between;
      }
      .redeem{ 
        margin-bottom: 10px;
        position: relative;
        .error-msg{
          position: absolute;
          right: 0;
          top: 55%;
        }
      }

      .total{
        justify-content: space-between;
        p{ margin-bottom: 0;}
        hr{ 
          width: 100%; 
          height: 1px; 
          color: ${props => props?.theme?.color?.typo?.line}
        }
      }
      .point-earned{
        justify-content: space-between;
        padding-bottom: 10px;
        /* margin-bottom: 25px; */
        /* border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line}; */
        svg{margin-right: 10px;}
        p{ margin: 0;}
        .point{
          background: ${props => props?.theme?.color?.typo?.secondary};
          padding-block: 5px;
          padding-inline: 7px;
          border-radius: 70%;
        }
      }
      button{ 
        min-width: 100%;
        p{font-weight: 400; text-align: center; margin: 0; text-transform: uppercase;}
      }
      @media(max-width: 991px){
        margin-bottom: 30px;
        padding-inline: 10px;
      }
    }

    .no-item{
      padding-block: 50px;
      .d-flex{
        margin-top: 30px;
        padding: 50px;
        flex-direction: column;
        gap: 10px;
        p,a{ text-align: center;}
        svg{
          margin-bottom: 30px;
        }
        a:hover,a:focus{
          color: #F27043;
          opacity: 0.8;
        }
      }
      button{
        min-width: 25%;
        margin-top: 10px;
      }
    }
  .price-wrap,.qty-wrap,.subtotal-wrap{
    @media(min-width: 992px){
      position: absolute;
      top: 10%;
      left: 0;
      right: 0;   
    }
  }
  .promo{
    &.price,&.qty,&.subtotal{
      @media(min-width: 992px){
        position: absolute;
        bottom: 18%;
        height: auto!important;
      }
    }
  }
}
`