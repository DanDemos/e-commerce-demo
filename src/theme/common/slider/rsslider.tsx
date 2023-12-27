import styled from 'styled-components'
import Slider from 'react-slick'

export const StyledRSSlider = styled(Slider)`
  display: block;
  .slick-list {
    /* padding-bottom: 40px; */
  }

  .slick-slide {
    cursor: pointer;
  }

  .prev {
    left: -13px;
  }

  .next {
    right: -13px;
    top: 0;
  }

  .prev,
  .next {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    height: 100%;
    align-items: center;
    z-index: 99999;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;

    &:hover,
    &:focus {
      svg {
        opacity: 0.7;
      }
    }
    img{
      @media(max-width:473px){
        width: 20px;
      }
    }
  }

  .slick-arrow {
    &.slick-prev,
    &.slick-next {
      background-color: rgb(187, 184, 184);
      border-radius: 10px;

      &:hover,
      &:focus {
        background-color: rgb(187, 184, 184);
        border-radius: 10px;
      }
    }
  }

  &.slide-nav {
    .slick-list {
      padding-bottom: 0;
      margin: 0 13px;
      height: inherit !important;
    }

    .slick-slide {
      padding: 0 6px;
      cursor: pointer;

      img {
        border: 1px solid ${props => props?.theme?.color?.card?.bg1 || 'transparent'};
        border-radius: ${props => props?.theme?.RSVariable?.nav?.img_border_radius || 0}px;
      }
    }
  }
`
