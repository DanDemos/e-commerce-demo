import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { cartStore } from 'service'
import { showToast, useAuth, useCart, useHandleOther } from 'hook'
import { authStore } from 'service'
import { RouteConfig } from './config'
import { PreviewCardCom, ToastCom } from 'components'

export const PrivateRoute = ({ children, protect }: any) => {
  if (!authStore.getAuth()?.user_id) {
    if (typeof protect === 'string') {
      return <Navigate to={protect} />
    } else {
      return <Navigate to="/" />
    }
  }
  return children
}
export const GuestRoute = ({ children, guestonly, ...props }: any,) => {
  if (authStore.getAuth()?.user_id) {
    if (typeof guestonly === 'string') {
      return <Navigate to={guestonly} />
    } else {
      return <Navigate to="/" />
    }
  }
  return children
}
// protect -> public user cannot enter
// guestonly -> login user cannot enter 
const RouteList = () => {
  return (
    <Routes>
      {RouteConfig.map(({ path, element, protect, guestonly }: any, key) => {
        return (
          <Route
            path={path}
            key={key}
            element={protect ? <PrivateRoute protect={protect}>{element}</PrivateRoute> : guestonly ? <GuestRoute guestonly={guestonly}>{element}</GuestRoute> : element}
          />
        )
      })}
    </Routes>
  )
}

{
  /* <Loading pageLoading={true} /> */
}

export default function AppRoute() {
  const location = useLocation()
  const { CartAction, dispatch } = useCart()
  const { getProfile_data, AuthAction } = useAuth()
  const { translate } = useHandleOther()
  const [CheckToken, setCheckToken] = useState(true)

  let date = new Date()?.toJSON()?.split('T')[0];
  let created_Cart = cartStore?.getCart()
  if (created_Cart !== null) {
    if (date !== created_Cart) {
      dispatch(CartAction.resetCart())
      cartStore.removeCart()
    }
  }
  useEffect(() => {
    if (authStore.getAuth()?.user_id && CheckToken === true) {
      dispatch(AuthAction.getProfile())
      setCheckToken(false)
    }
    if (getProfile_data?.error === 'access token is expired or invalid') {
      showToast({
        title: translate('access-token-expire-or-invalid', 'access-token-expire-or-invalid'),
        titleStyle: { textAlign: 'center' },
        placement: 'bottom',
        btnText: translate('sign-in', 'Sign In'),
        route: '/user/signin',
        alway: true
      })
      dispatch(AuthAction.signOut())
    }
  }, [getProfile_data?.error])

  React.useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'instant' })
  }, [location])
  return (
    <>
      <Suspense fallback={null}>
        <PreviewCardCom />
        <ToastCom />
        <RouteList />
      </Suspense>
    </>
  )
}