import React, { useState, useEffect, RefObject, useRef } from 'react'
import './style.scss'
//skeleton Loading hook
export const useOnLoadImg = (ref: RefObject<HTMLElement>) => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const updateStatus = (images: HTMLImageElement[]) => {
      setStatus(images.map(image => image.complete).every(item => item === true))
    }

    if (!ref?.current) {
      return
    }

    const imagesLoaded: any = Array.from(ref?.current.querySelectorAll('img'))

    if (imagesLoaded.length === 0) {
      setStatus(true)
      return
    }

    imagesLoaded.forEach((image: any) => {
      image.addEventListener('load', () => updateStatus(imagesLoaded), {
        // once: true,
      })
      image.addEventListener('error', () => updateStatus(imagesLoaded), {
        // once: true,
      })
    })
    return
  }, [ref])

  return status
}

//skeleton component
type SkeletonWrapProps = {
  children?: React.ReactNode
  wrapperRef?: any
  style?: any
  minHeight?: any
  maxHeight?: any
  borderRadius?: any
}
export const SkeletonWrap: React.FC<SkeletonWrapProps> = ({ wrapperRef, children, minHeight, maxHeight, borderRadius, style }) => {
  const wrapper = useRef<HTMLDivElement>(null)
  let imagesLoaded = useOnLoadImg(wrapperRef ? wrapperRef : wrapper)

  return (
    <div
      className="skeleton-wrap"
      style={!imagesLoaded ? (style ? style : minHeight && maxHeight ? { minHeight: minHeight, maxHeight: maxHeight } : minHeight ? { minHeight: minHeight } : maxHeight ? { maxHeight: maxHeight } : borderRadius ? { borderRadius: borderRadius } : {}) : {}}
      // style={!imagesLoaded && minHeight ? { minHeight: minHeight } : {}}
      ref={wrapper}
    >
      <div className="skeleton" style={imagesLoaded ? { display: 'none' } : {}}></div>
      {children}
    </div>
  )
}
