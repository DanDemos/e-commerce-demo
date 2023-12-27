import styled from 'styled-components'

export const StyledNewArrivalSlider = styled.div`
&.large-card-slider{
    .slick-slider{
        .prev,.next{
            svg{
                position: absolute;
                background: ${props => props?.theme?.color?.typo?.border};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                padding: 3px;
                fill: ${props => props?.theme?.color?.typo?.light};
                top:38%;
                opacity: 0.8;
            }
            &:hover{
                opacity: 1;
            }
            &.disabled{
                opacity: 0.3;
                cursor:default;
            }
            
        }
        .prev svg{left: 3px;}
        .slick-dots {
            display: flex;
            justify-content: center;
            list-style-type: none;
            bottom: -30px;
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
}
.slider-card{
  &:first-child{
    padding-left: 20px;
  }
  .image-promo,.description{
    padding: 0px;
  }
  padding-inline: 10px;
  .product-card{
    gap: 20px;
    .description{
      /* p{ height: auto;} */
    }
  }
}
}
.filter-con{
  margin-top: 70px;
  padding-right: 50px;
  @media(max-width: 1200px){
    padding-right: 0;
  }
  .filter-by{
    justify-content: space-between;
    .d-flex{
      align-items: center;
      svg{ margin-right: 10px;}
      p{ text-transform: uppercase;}
    }
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'}
  }
  .collapse-con{
    hr{
      width: 100%;
      height: 1px;
      color: ${props => props?.theme?.color?.typo?.border || '#d9d9d9'}
    }
    .collapse-item{
      padding-left: 10px;
    }
    .collapse-header{
      padding-block: 5px ;
      .collapse-header-wrap{
        /* border: 1px solid red; */
      }
    }
    .category-collapse{
      /* margin-block: 5px; */
    }
    .multi-collapse{
      margin-block: 5px;
      button{
        padding-inline: 10px;
        padding-block: 8px;
        min-width: fit-content;
        min-height: 35px;
        display: inline-block;
        border-color: ${props => props?.theme?.color?.typo?.line || '#d9d9d9'};
        margin-right: 10px;
        margin-bottom: 10px;
        p{ line-height: 0;}
        &:hover,&.active{
          border-color: ${props => props?.theme?.color?.typo?.primary || '#0491A4'};
        }
      }
    }
    .price-collapse{
      margin-block: 5px;
    }
  }
}
.product-list-con{
  margin-top: 50px;
  @media(max-width: 1200px){
    padding-left: 30px;
  }
  .product-con{
    margin-top: 20px;
    .row{
      row-gap: 30px;
    }
  }
}
`