import styled from "styled-components";

export const StyledWishlistCon = styled.div`
  .inner_modal_con{
      padding-block: 30px;
      gap: 20px;
      svg{
        margin-bottom: 5px;
      }
      .modal_btn_con{
        gap: 10px;
        justify-content: center!important;
        }
  }
  padding-block: 50px;
  @media(max-width: 991px){
    padding-block: 30px;
  }
  button{ p{ text-transform: uppercase;}}
  .tab{ 
    padding: 0; 
    margin-bottom: 25px; 
    p{ text-transform: uppercase; width: auto;}
    .def_title_wrap{
      a{ display: flex;
         gap: 5px;
         align-items: center;
      }
    }
    @media(max-width: 768px){
      .tab-head{ gap: 0;}
      .def_title_wrap{ 
        padding: 5px;
        p{ font-size: 14px;}
        }
    }

    .tab-body{ display: none;}
  }

  .title{
      line-height: 46px; 
      margin-bottom: 20px;
      @media(max-width: 768px){
        font-size: 22px;
      }
  }
  .row{ 
    display: flex; 
    justify-content: center; 
    // align-items: center;
    margin: auto;
    width: 95%;
    @media(max-width: 1200px){
      margin: 0;
      width: 100%;
    }
  }
  .wishlist-con{
    .tab{
      margin-bottom: 0;
      }
    table{
      thead{ display: none;}
    }
    .product_name_wrap, .mb_product_name_wrap{
      align-items: center;
      padding-right: 10px;
      img{
        max-width: 200px;
        @media(max-width: 1440px){
          max-width: 100px;
        }
      }
      p{
        padding-left: 20px;
        text-transform: unset;
        span{ font-weight: 400; color: ${props => props?.theme?.color?.typo?.dark};}
        margin-bottom: 14px;
        @media(max-width: 991px){
          padding-left: 10px;
        }
      }
      @media(max-width: 992px){
        img{max-width: 100px;}
        align-items: flex-start;
        p{ margin-bottom: 0;}
      }
    }
    .cancel_btn{
      cursor: pointer;
    }
    .price-wrap{
      p{ margin-bottom: 7px;}
      padding-right: 30px;
      @media(max-width: 991px){
        p{margin-bottom: 0;}
      }
    }
    .qty-wrap{
      display: flex;
      justify-content: center;
      align-items: center;
      .qty-btn-wrap{
        border-radius: 5px;
        input{ height: 48px; min-width:30px;}
      }
      margin-inline: 10px;
    }
    .btn-wrap{
      display: flex;
      justify-content: center;
      align-items: center;
      button{ 
        min-width: 70%; 
        p{
          text-align: center;
          text-transform: uppercase;
        }
        
      }
      margin-inline: 10px;
      &.buynow{
        button{
          border: 1px solid ${props => props?.theme?.color?.typo?.text || '#262626'};
        }
      }
    }
    @media(max-width: 1200px){
      padding-inline: 0;
      .wishlist-table{
        padding-inline: 0;
      }
    }
    @media(max-width: 991px){
      
      .title{ margin-bottom: 0;}
      .product_name_wrap{
        margin-bottom: 10px;
        position: relative;
        }
      .btn-con{
        gap: 10px;
      }
      .qty-wrap{
        width: 30%;
        justify-content: flex-start;
        margin-inline: 0;
        .left_btn_wrap,.right_btn_wrap{
          width: auto;
          max-width: 50px;
        }
        input{
          max-width: 50px;
        }
        .qty-btn-wrap{
          height: 38px;
          overflow: hidden;
        }
      }
      button{ 
        min-width: 30%;
        padding: 5px;
        min-height: 36px!important;
        p{ font-size: 12px; text-align: center;}
      }
      .cancel_btn{
        position: absolute;
        top: 0;
        right: -5px;
      }
    }

    @media(max-width: 375px){
      .btn-con{
        gap: 5px;
        .qty-wrap{
          justify-content: flex-start;
        }
        /* button{ width: 25%;} */
      }
    }
    .no-item{
    padding-block: 50px;
   }
  }
  .btn-con{
    gap: 10px;
    button{
      min-width: 30%;
    }
    @media(max-width: 768px){
      gap: 5px;
      .qty-wrap{
        margin: 0;
        .qty-btn-wrap{
          max-width: 115px;
          .left_btn_wrap,.right_btn_wrap{
            width: 20px;
          }
        }
      }
      button{
      min-width: 20%;
      p{ font-size: 14px;}
    }
    }
    @media(max-width: 425px){
      button{
        min-height: 36px;
        p{ font-size: 12px;}
        padding: 8px;
      }
     .qty-wrap{
        .qty-btn-wrap{
          max-width: 100px;
        }
      }
  }
}
.no-item{
    a:hover{
      color: ${props => props?.theme?.color?.typo?.primary || '#333'}
    }
 }
`