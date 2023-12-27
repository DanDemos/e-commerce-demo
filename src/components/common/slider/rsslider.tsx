import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { StyledRSSlider } from 'theme'
import Image from 'asset/icon/luxura'

type RSSliderProps = {
  children?: any
  rimProps?: object
  rsProps?: object
  type?: string
  data?: any[]
  innerRef?: any
  leftArrowSvg?: any
  rightArrowSvg?: any
  renderLeftArrow?: any
  renderRightArrow?: any
  renderContent?: any
  asNavFor?: any
  className?: string
  route?: any
}
export const RSSliderCom: React.FC<RSSliderProps> = ({ children, rimProps, rsProps, type, data = [], innerRef, leftArrowSvg, rightArrowSvg, renderLeftArrow, renderRightArrow, renderContent, route, ...props }) => {
  const [hoverSrc, setHoverSrc] = useState(false)
  let img_media = ['500w', '779w', '1020w', '1200w', '1426w']

  let dataSource: any =
    data?.length > 0 &&
    data.map(x => ({
      ...x,
      srcSet: img_media.map(y => `${x.image || Image.DefaultCard} ${y}`).join(', '),
      small: x.image || x.promotion_highlight || x.highlight_image || Image.DefaultCard,
      large: x.image || x.promotion_highlight || x.highlight_image || Image.DefaultCard,
      link: x?.link,
    }))

  const navigate = useNavigate()

  const NextArrow = (props: any) => {
    const { className, onClick } = props
    return renderRightArrow ? (
      renderRightArrow(props)
    ) : (
      <div className={`next ${className.includes('slick-disabled') ? 'disabled' : undefined}`} onClick={onClick}>
        {rightArrowSvg || <img src={require('asset/icon/luxura/right.png')} />}
      </div>
    )
  }

  const PrevArrow = (props: any) => {
    const { className, onClick } = props
    return renderLeftArrow ? (
      renderLeftArrow(props)
    ) : (
      <div className={`prev ${className.includes('slick-disabled') ? 'disabled' : undefined}`} onClick={onClick}>
        {leftArrowSvg || <img src={require('asset/icon/luxura/left.png')} />}
      </div>
    )
  }

  let RSProps = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    ...rsProps,
  }

  let RIMProps = (src: any) => ({
    smallImage: {
      alt: '',
      isFluidWidth: true,
      src: src.small,
      srcSet: src.srcSet,
      // sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
    },
    largeImage: {
      src: src.large,
      width: 826,
      height: 800,
    },
    lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
    ...rimProps,
  })

  const handleRoute = (route: any, data: any) => {
    if (route) {
      navigate(`${route + data}`)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledRSSlider className="cu-slide" {...RSProps} {...props} ref={innerRef}>
        {children
          ? children
          : dataSource?.length > 0 &&
            dataSource.map((src: any, index: any) => {
              return (
                <div
                  onMouseMove={e => setHoverSrc(type === 'zoom' ? src : false)}
                  key={index}
                  onClick={() => {
                    src.link ? (window.location.href = src.link) : handleRoute(route, src.ID)
                  }}
                >
                  {/* <a href={src?.link ? src?.link : '#'}> */}
                  <img style={{ width: '100%' }} src={src.large} />
                  {renderContent && renderContent(src, index)}
                  {/* </a> */}
                </div>
              )
            })}
      </StyledRSSlider>
      {hoverSrc && (
        <div onMouseLeave={_ => setHoverSrc(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
          <ReactImageMagnify {...RIMProps(hoverSrc)} {...props} />
        </div>
      )}
    </div>
  )
}

RSSliderCom.defaultProps = {
  data: [],
  type: 'simple',
}
