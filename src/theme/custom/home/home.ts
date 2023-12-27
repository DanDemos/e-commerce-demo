import styled from 'styled-components'
import Image from '../../../asset/icon/luxura'

export const StyledHome = styled.div`
    .bg-section{
        margin-top: -7px;
        padding-top: 20px;
        margin-top: -7px;
        background-image: url('${Image.Background}');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: top;
    }
    .brand-custom{
        background: transparent;
    }
    .cu-product-card{
        .image-promo{
            /* margin-bottom: 0; */
        }
    }
  .custom-button{
    .slick-track{
    display: flex !important;
    }
    .brand{
        background: transparent;
        img{
            box-shadow: 0px 0px 10px ${props => props?.theme?.color?.typo?.disabled || '#eee'};
            border-radius: 5px;
        }
        .prev,.next{
            img{
                box-shadow: none;
            }
        }
    }
    .slick-slide{
        height: inherit !important;
        > div:first-child{
        height: 100% !important;
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
        @media(max-width: 768px){
            .prev,.next{
                img{ 
                    width: 25px;
                    height: 25px;
                }
            }
        }
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
.cu-card-width{
    width: calc(100% / 5);
    margin-bottom: 33px;
    @media(max-width:991px) {
        width: calc(100% / 3);
    }
    @media(max-width:768px){
        width: calc(100% / 2);
        padding: 0;
        margin-bottom: 13px;
        &:nth-child(odd){
            padding-right: 5px;
        }
    }

}
.p-card{
    @media(max-width: 768px){
        padding-inline: 12px;
    }
    @media(max-width: 425px){
        padding-inline: 8px;
    }
}
.card-header{
    /* background:${props => props?.theme?.color?.card?.yellow}; */
    display: inline-flex;
    padding-inline: 17px;
    border-radius: 0px 0px 10px 10px !important;
    position: absolute;
    top: -3%;
    left: 50%;
    transform: translate(-50%,3%);
    z-index: 3;
    width: 100%;
    justify-content: center;
    &.first{
        /* background: ${props => props?.theme?.color?.card?.pink}; */
    }
    @media(max-width:390px) {
        width:78vw;
    }
}
.special-sec{
    padding-block: 80px;
    margin-top: 40px;
    position: relative;
    /* padding-bottom: 0; */
    .pb-5{
        @media(max-width: 991px){
            padding-bottom: 0px!important;
        }
    }
    .large-card-slider{
        .slick-list{
            .slick-slide {
                padding-inline: 15px;
                @media(max-width: 425px){
                    padding-inline: 8px;
                }
                .slider-card{
                    padding-inline: 0px!important;
                }
                .product-card{
                
                    /* border: none!important; */
                    /* padding-inline: 20px; */
                }
            }
        }
    }
    @media(max-width: 425px){
        padding-top: 30px;
        padding-bottom:40px;
    }
    .new-arrival{
        .prev{
            left: -8px;
        }
        .next{
            right: -8px;
        }
    }
    .main-header{
        position: absolute;
         top: -29px; 
         min-width: 435px; 
         /* width: 100%; */
         left: 50%; 
         transform: translate(-50%);
         .card-header{
            z-index: 3;
         }
         @media(max-width: 425px){
            .card-header.first{
                line-height: 40px;
            }
         }
    }
    .left-svg{
        position: absolute; top: -0.9%; left: -4.3%; transform: rotate(32deg);padding-top: 2px;

    }
    .right-svg{
        position: absolute; top: -0.9%; right: -5.8%; transform: rotate(32deg);padding-top: 2px;

    }
    @media(max-width:593px) {
        .left-svg{
            left: -3.3vw;
        }
        .right-svg{
            right: -4.5vw;
        }
        .main-header{
            min-width: 81vw;
        }
    }
    @media(max-width:499px) {
        .left-svg{
            left: -4vw;
        }
        .right-svg{
            right: -5.5vw;
        } 
    }
    @media (max-width:459px){
        .left-svg{
            left: -4.2vw;
        }
        .right-svg{
            right: -6.3vw;
        } 
        .large-card-slider .slick-slider .next svg{
        right: -6px;
        }
    }
    @media (max-width:387px){
        .left-svg{
            left: -3.7vw;
        }
        .right-svg{
            right: -5.6vw;
        }  
    }
    &.white,&.false{
        background: transparent;
        margin-top:70px;
        padding-bottom: 50px;
        &.new-arrival{
            margin-top: 40px;
        }
        .container-fluid {
            padding: 0 !important;
        }
        .card-header.first{
            background:transparent;
        }
        .left-svg,.right-svg{
            fill:  transparent ;
        }
    }
    &.pink{
        .card-header.first{
            background: ${props => props?.theme?.color?.card?.pink};
        }
        .left-svg,.right-svg{
            fill:  ${props => props?.theme?.color?.card?.dark_pink} ;

        }
    }
    &.mellow{
        .card-header.first{
            background: ${props => props?.theme?.color?.card?.yellow};
        }
        .left-svg,.right-svg{
            fill:  ${props => props?.theme?.color?.typo?.dark_mellow} ;
        }
    }
    &.green{
        .card-header.first{
            background: ${props => props?.theme?.color?.card?.light_green};
        }
        .left-svg,.right-svg{
            fill:  ${props => props?.theme?.color?.typo?.dark_green} ;
        }
    }
}
.brand{
    .slick-list{
        margin-inline: 13px;
    }
}
.highlight-brand-section{
    p{
        padding-block: 10px;
    }
}

.large-card-slider{
    @media(max-width: 768px){
        padding-bottom: 0px!important;
    }
}
.special-sec{
    .pb-5{
        @media(max-width: 425px){
            /* padding-bottom: 0!important; */
        }
    }
    .large-card-slider{
            @media(max-width: 425px){ 
                padding-bottom: 0px!important;
            }
    }
    &.package-product{
        .large-card-slider{
            @media(max-width: 425px){
                .slick-list{
                    .product-card{
                        .description{
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
}
.promo-slider-section{
    padding: 0;
    margin: 0;
    width: 100vw;
        .slick-list{
            margin: 0;
        }
        .slick-slider{
            .prev{
                left: -20px;
            }
            .next{
                right: -20px;
            }
            @media(max-width: 991px){
                .prev{
                    left: -5px;
                    img{
                        width: 25px;
                        height: 25px;
                    }
                }
                .next{
                    right: -5px;
                }
            }
        }
    }
    img{
        /* border-radius: 15px; */
    }

    .special-sec{
        .slick-slider{
        .slick-track
            {
                display: flex !important;
            }
        .slick-slide
            {
                height: inherit !important;
                div:first-child{
                    /* height: 100%; */
                }
            }
        }
    }
`