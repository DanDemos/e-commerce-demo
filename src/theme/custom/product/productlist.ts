import styled from 'styled-components'

type StyledProductListingProps = {}

export const StyledProductListing = styled.div < StyledProductListingProps > `
 padding-bottom: 70px;
 .p-card{
  @media(max-width: 425px){
    padding-inline: 8px;
  }
 }
 .hero-slider{
  .slick-slider{
      background: transparent;
      .prev{
      left: 10px!important;
      }
      .next{
      right: 10px!important;
      svg{
          margin-top: -3px;
      }
      }
      .prev,.next{
          svg{
              @media(max-width: 991px){
                      width: 25px;
                      height: 25px;
                  }
          }
      }
  }
  .slick-dots {
          display: flex;
          justify-content: center;
          list-style-type: none;
          bottom: 10px;
        li {
          margin: 0 0.25rem;
          width: 25px;
          height: 0px;
          transition: all 0.4s ease;
          margin-left: -1px;
        }
        button {
          transition: all 0.4s ease;
          padding-inline: 5px;
          font-size: 0;
          display: block;
          width: 25px;
          height: 3px;
          padding: 0;
          border: none;
          background-color: ${props => props?.theme?.color?.typo?.dark};
          opacity: 25%;
          border-radius: 0;
          text-indent: -9999px;
          &:before{
            color:transparent;
            opacity: 0;
          }
        }
        li.slick-active {
          transition: all 0.4s ease;
          margin-right: 12px;
          button {
            opacity: 75%;
            width: 30px;
          }
        }
    
      }
  /* margin-bottom: 20px; */
}
 .slider{
   padding-block: 70px;
   .large-card-slider{
      .slider-card{
        padding-inline: 10px;
        .product-card{
          gap: 20px;
          .description{
            /* p{ height: auto;} */
          }
        }
      }
   }
   .prev,.next{
    top:-7%;
   }
   @media(max-width: 768px){
    padding-top: 30px;
    padding-bottom: 10px;
    .prev,.next{
      top: -40px;
      img{ 
        width: 30px;
        height: 30px;
      }
    }
   }
 }
 .product{
    .row{
      padding-block: 70px;
      position: relative;
      @media(max-width: 991px){
        padding-block: 30px;
      }
    .filter-con{
      position: relative;
      .filter-btns{
          button{
            min-width: fit-content;
            border-color: ${props => props?.theme?.color?.typo?.border};
            @media(min-width: 992px){
              display: none;
            }
            img{
              width: 27px;
              height: 27px;
            }
            svg{ margin-right: 10px;}
            border-color: ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
            min-height: 45px;
            p{
              text-transform: uppercase;
              @media(max-width: 425px){
                font-size: ${props => props?.theme?.fontSize?.md}px;
              }
            }
            @media(max-width: 425px){
              padding: 8px;
            }
          }
          @media(max-width: 991px){
            position: relative;
            margin-bottom: 0px;
            button{
              border: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
            }
          }
      }

      .clear-btn{
        position: absolute;
        top: 2px;
        right: 12px;
        min-width: fit-content;
        min-height: fit-content;
        text-transform: unset!important;
        padding: 0;
        color: ${props => props?.theme?.color?.border || '#707070'};
        @media(max-width: 991px){
          top: 70px;
          display: none;
        }
        @media(max-width: 1400px){
          font-size: ${props => props?.theme?.fontSize?.sm}px;
        }
      }

      .filter-by{
        justify-content: space-between;
        .d-flex{
          align-items: center;
          svg{ margin-right: 10px;}
          p{ 
            text-transform: uppercase;
          }
          img{ 
              width: 27px;
              height: 27px;
            }
          @media(max-width: 1400px){
            svg{ 
              margin-right: 5px;
            }
            p{
              font-size: ${props => props?.theme?.fontSize?.sm + 1}px;}
          }
        }
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
        @media(max-width: 991px){
          display: none!important;
          margin-top: 20px;
        }
        button{
          border: none;
          min-width: fit-content;
          padding: 0;
          color: ${props => props?.theme?.color?.typo?.border || '#d9d9d9'};
        }
      }

      .collapse-con{
        hr{
          width: 100%;
          height: 1px;
          color: ${props => props?.theme?.color?.typo?.border || '#d9d9d9'};
        }
        .collapse-item{
          padding-left: 10px;
          .collapse-content{
            padding: 0!important;
          }
        }
        .collapse-header{
          padding-block: 5px ;
          .collapse-header-wrap{
            a{ 
              color: ${props => props?.theme?.color?.typo?.text || '#333'};
              text-decoration: none;
            };
            .collapse-expand-icon .arrow{
              /* border-top: 2px solid #262626;
              border-left: 2px solid #262626; */
            }
          }
        }

        .multi-collapse{
          margin-block: 5px;
          button{
            padding-inline: 10px;
            padding-block: 8px;
            min-width: fit-content;
            min-height: 35px;
            display: inline-block;
            border: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
            margin-right: 10px;
            margin-bottom: 10px;
            p{ line-height: 0;}
            &.selected{
              border-color: ${props => props?.theme?.color?.typo?.primary || '#0491A4'};
            }
          }
        }
        .price-collapse{
          margin-block: 5px;
        }

        @media(max-width: 991px){
          display: none;
        }
      }
      &.open{
        .collapse-con{
          display: block!important;
        }
        .filter-by{
          display: flex!important;
        }
        .clear-btn{
          display: block;
        }
      }
    }
    .product-list-con{
      @media(min-width: 992px){
        position: relative;
      }
      @media(min-width: 1200px){
        padding-left: 50px;
      }
      .prev,.next{
        img{
          box-shadow: none!important;
          border-radius: 0px!important;
        }
      }
      .title-section{
        min-height: 50px;
        .sort-by{
          /* position: relative; */
          @media(max-width: 991px){
            margin-right: 12px;
          }
          .select-input{
            position: relative;
            width: 150px;
          }
          select {
            padding-right: 20px;
            -webkit-appearance: none;
            -moz-appearance: none;
            text-indent: 1px;
            text-overflow: '';
            background: transparent;
            position: absolute!important;
            top: -20px;
            z-index: 2;
            cursor: pointer;
          }
          .d-arrow{
            position: absolute;
            right: 5px;
            z-index: 1;
            transform: ${props => !props?.['aria-expanded'] ? 'rotate(180deg)' : 'rotate(0)'};
            transition: all .2s ease-in-out;
          }
          @media(max-width: 991px){
            top: 40px;
          }
          @media(max-width: 360px){
            top: 30px;
          }
        }
        &.brand{
          position: relative;
          .sort-by{
            @media(max-width: 991px){
              top: 10px;
            }
        }
        }
      }
      .title{
        @media(min-width: 992px){
          margin-top: -12px;
        }
      }
      .sort-by{
            position: absolute;
            top: 10px;
            right: 0;
            gap: 8px;
            p{ 
              min-width: fit-content;
              @media(max-width: 425px){
                margin-right: -30px;
              }
              @media(max-width: 375px){
                opacity: 0;
                visibility: hidden;
              }
            }
            select{
              border-radius: 5px;
              min-height: 45px;
              @media(max-width: 425px){
                max-width: 120px;
                margin-left: 30px;
              }
            }
            @media(max-width: 359px){
              flex-direction: column;
              margin-top: -10px;
              align-items: flex-end!important;
            }
            svg{
              top: 8px;
              @media(max-width: 359px){
                top: 27px!important;
              }
            }
      }
      &.brand{
        section.brand{
          margin-bottom: 30px;
          @media(min-width: 1024px){
            margin-bottom: 50px;
          }
          img{
              box-shadow: 0px 0px 5px ${props => props?.theme?.color?.typo?.line || '#eee'};
              border-radius: 5px;
          }
          .slick-slider.slick-initialized .slick-slide{
            padding: 8px;
          }
        }
        .title-section.brand{
          position: relative;
          .d-arrow{
              position: absolute;
              top: 18px;
              right: 10px;
              transform: ${props => !props?.['aria-expanded'] ? 'rotate(180deg)' : 'rotate(0)'};
              transition: all .2s ease-in-out;
              @media(max-width: 991px){
                right: 25px;
              }
              @media(max-width: 360px){
                top: 28px;
              }
            } 
          .sort-by{
            width: fit-content;
            right: 150px;
            select{
              width: 150px;
              background: transparent;
            }
          }
        }
        @media(min-width: 992px){
          .prev{
          left: -30px;
          }
          .next{
            right: -30px;
          }
        }
        @media(max-width: 991px){
          .prev,.next{
            img{
              width: 30px;
              height: 30px;
            }
          }
        }
      }
      .product-con{
        margin-top: 20px;
        .row{
          row-gap: 20px;
          padding-block: 0;
        }
      }
      .pagination-con{
        /* border: 1px solid red;
        position: absolute;
        bottom: -80px; */
        @media(max-width: 991px){
          display: none;
        }
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