import React, { useRef, useState } from 'react'
// Import Swiper React components
import ReactImageMagnify from 'react-image-magnify'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './style.scss'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper'

type SliderProps = {
  rimProps: any
}
export const SliderCom: React.FC<SliderProps> = ({ rimProps, ...props }) => {
  const [thumbsSwiper, setThumbsSwiper]: any = useState(null)

  let RIMProps = (src: any) => ({
    smallImage: {
      alt: 'Wristwatch by Versace',
      isFluidWidth: true,
      src: src.image,
      srcSet: src.image,
      sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
    },
    largeImage: {
      src: src.image,
      width: 1426,
      height: 2000,
    },
    lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
    ...rimProps,
  })

  let data = [
    {
      image: 'https://swiperjs.com/demos/images/nature-1.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-2.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-4.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-5.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-6.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-7.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-8.jpg',
    },
    {
      image: 'https://swiperjs.com/demos/images/nature-9.jpg',
    },
  ]

  let StyleConfig: any = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  }

  return (
    <div className="swiper-con">
      <Swiper
        style={StyleConfig}
        loop={true}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data?.map((x, i) => (
          <SwiperSlide>
            <ReactImageMagnify {...RIMProps(x)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={5} navigation={true} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
