import styled from 'styled-components'

export const StyledDetail = styled.div`
padding-top:40px;
.cu-card-width{
    width: calc(100% / 5);
    margin-bottom: 33px;
    @media(max-width:991px) {
        width: calc(100% / 2);
    }
}

.qty-btn-wrap{
  .center{
    .qty-input{
      position: unset;
    }
  }
}

.wishlist{
  svg{
    cursor: pointer;
  }
  &.active{
    svg{
      fill: ${props => props?.theme?.color?.typo?.dark};
    }
  }
}

.our-support{
  border: 1.5px dotted ${props => props?.theme?.color?.typo?.line};
  border-radius: 5px;
  background:  ${props => props?.theme?.color?.typo?.bg1};
  padding: 20px;
  @media(max-width: 991px){
    margin-bottom: 30px;
    padding-inline: 15px;
  }
}

.how-to-use{
  margin-top: 40px;
  margin-bottom: 30px;
  /* .tab-head{
    border-bottom: none;
  } */
  .tabheaditem{
    margin-right: 15px;
  }
  @media(max-width: 991px){
    margin-bottom: 20px;
  }
  @media(max-width: 768px){
    margin-top: 20px;
  }
  .collapse-con{
    margin-bottom: 30px;
    .collapse-item{
      border-bottom: 1px solid ${props => props?.theme?.color?.typo?.line || '#d9d9d9'}
    }
    .collapse-header-wrap{
    padding-block: 10px;
    }
    .collapse-content{
      padding-top: 0;
      p{margin-bottom: 10px;}
    }
  }
 
}

.video-con{ 
      margin-top: 30px;
      max-height: fit-content; 
      position: relative;
      cursor: pointer;
      margin-bottom:50px;
      iframe{
        width: 70%;
        height: 386px;
        @media(max-width: 991px){
          width: 100%;
          height: 250px;
        }
      }
      video{ 
        width: 80%;
        height: auto;
        margin-bottom: 0;
        display: block;
        object-fit: cover;
        @media(max-width: 991px){
          width: 100%;
        }
      }
      .poster{
        width: 80%;
        height: 100%;
        position: absolute;
        top: 0;
        left:0;
        opacity: 0.9;
      }
      .play-icon{
      width: 70px;
      height: 70px;
      position: absolute;
      top: calc(50% - 35px);
      left: calc(40% - 35px);
      opacity: 90%;
      @media(max-width: 768px){
        width: 54px;
        height: 54px;
      }
      @media(max-width: 991px){
        left: calc(50% - 25px);
      }
      }
    }

.slick-slide{
  padding: 10px;
}

.custom-button{
  .slick-track
{
    /* display: flex !important; */
}

.slick-slide
{
    /* height: inherit !important; */
    div{
      /* height: 100% !important; */
    }
}
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
                top:32%;
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
        &.slick-initialized .slick-slide{
            padding: 8px;
        }
    }
}
`