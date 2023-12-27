import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'asset/icon/luxura/index'

type LoadingProps = {
  loadstate: any
}

export const Loading: React.FC<LoadingProps> = loadstate => {
  const SITE_DATA: any = useSelector(state => state)
  const [status, setStatus] = useState(false)
  useEffect(() => {
    for (const key in SITE_DATA) {
      if (Object.hasOwnProperty.call(SITE_DATA, key)) {
        if (SITE_DATA[key]?.isLoading === true || SITE_DATA[key]?.isLoading === undefined || SITE_DATA[key]?.isLoading !== false) {
          setStatus(true)
        } else {
          setTimeout(() => {
            setStatus(false)
          }, 500)
        }
      }
    }
  }, [SITE_DATA.auth?.isLoading, SITE_DATA.cart?.isLoading, SITE_DATA.other?.isLoading])
  return (
    <>
      {(loadstate?.loadstate || status) === true && (
        <div className="loading-com" style={{ position: 'fixed', zIndex: 211111111110000, transition: 'opacity .3s', backgroundColor: 'rgb(175 175 175 / 50%', margin: '0', top: '0', right: '0', bottom: ' 0', left: '0' }}>
          <img className="img-fluid coin-flip-animation" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} src={Icon.Loading} alt="" width="250px" height="250px" />
        </div>
      )}
    </>
  )
}
