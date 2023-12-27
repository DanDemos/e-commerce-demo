import { useNavigate, useLocation } from 'react-router-dom'

import { CardCom, TextCom, ButtonCom } from 'components'
import { useAuth, showToast, hideToast, useCart, useHandleOther } from 'hook'

type PropsType = {}
export const useHandleAuth = (props?: PropsType) => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const { createCart_data, CartAction } = useCart()
  const { AuthAction, dispatch } = useAuth()
  const { translate } = useHandleOther()

  type SignInPostData = {
    langCode: string
    headers: {
      login: string
      password: string
    }
    then: any
  }
  const handleSignIn = async (data: SignInPostData) => {
    let res = await dispatch(AuthAction.signIn(data))

    if (res?.payload?.type === 'need_to_verify_otp') {
      /**
       * * show need to verify otp
       */
      showToast({
        alway: true,
        render: (
          <CardCom>
            <div style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <TextCom textAlign="center" style={{ marginBottom: 20 }}>
                {translate('you-need-to-verify-the-phone-number-before-login', 'You need to verify the phone number before login')}.
              </TextCom>
              <div>
                <ButtonCom
                  text={translate('verify-now', 'Verify Now')}
                  color="light"
                  bgcolor="dark"
                  btnBorderRadius="xxxs"
                  style={{ margin: 'auto' }}
                  onClick={() => {
                    hideToast()
                    handleIsExistUser({
                      mobile: data?.headers?.login,
                      from: 'signup',
                    })
                  }}
                />
              </div>
            </div>
          </CardCom>
        ),
      })
    } else if (res?.payload?.type === 'access_denied') {
      /**
       * * show res?.payload?.message
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    } else if (res?.payload?.type === 'need_to_approve_by_admin') {
      /**
       * * show res?.payload?.message
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    } else {
      if (res?.payload?.access_token) {
        /**
         * * go to App
         */
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1000)
        if (createCart_data) {
          dispatch(CartAction.updateCustomer({ order_id: createCart_data?.order_id }))
        }
        let res = await dispatch(AuthAction.getProfile())
        if (res?.meta?.requestStatus === "fulfilled") {
          if (location?.state?.from === 'payment') {
            await navigate('/order/checkout')
          } else {
            navigate(-1)
          }
        }
      } else {
        /**
         * * show res?.payload?.message
         */
        showToast({
          type: 'error',
          titleStyle: { color: 'dark' },
          title: res?.payload?.message || 'Something wrong! Please try again.',
          placement: 'bottom',
        })
      }
    }
  }

  type SignUpPostData = {
    email: string
    name: string
    mobile: string
    password: string
  }
  const handleSignUp = async (data: SignUpPostData) => {
    let res = await dispatch(AuthAction.signUp(data))
    if (res?.payload?.status === 'fail') {
      /**
       * * show res?.payload?.message
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    } else {
      /**
       * * go to Otp
       * @params { from: 'signup', mobile: values.user_phone }
       */
      navigate('/user/otp', { state: { from: 'signup', mobile: data.mobile } })
    }
  }

  type SignOutPostData = {}
  const handleSignOut = async (data: SignOutPostData) => {
    await dispatch(AuthAction.signOut())
    if (createCart_data?.order_id) {
      // await dispatch(CartAction.deleteAllInCart({ order_id: createCart_data?.order_id }))
      await dispatch(CartAction.resetCart())
    }
  }
  type IsExistUserPostData = {
    mobile?: string
    from?: string
  }
  const handleIsExistUser = async (data: IsExistUserPostData) => {
    let { from, ...field } = data
    let res = await dispatch(AuthAction.existUser(field))
    if (res?.payload?.exist || res?.payload?.status === 'success') {
      /**
       * * go to Otp
       * @params { from: 'signup', mobile: values.user_phone }
       */
      if (from) {
        navigate('/user/otp', { state: { mobile: field.mobile, from } })
      }
    } else {
      /**
       * * show res?.payload?.message || 'user does not exist.'
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'user does not exist.',
        placement: 'bottom',
      })
    }
  }

  type ResetPasswordPostData = {
    otp: string
    mobile: string
    password: string
  }
  const handleResetPassword = async (data: ResetPasswordPostData) => {
    let res = await dispatch(AuthAction.resetPassword(data))
    if (res?.payload?.status === 'success') {
      /**
       * * show reset_password_success message
       */
      // showToast({
      //   type: 'success',
      //   title: translate('reset_password_success', 'Successfully reset password.'),
      //   placement: 'bottom',
      // })
      navigate('/user/reset_password/success', { state: { from: 'reset', title: translate('reset_password_success', 'Successfully reset password.') } })
    } else {
      /**
       * * show res?.payload?.message
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    }
  }

  type ChangePasswordPostData = {
    old_password: string
    new_password: string
  }
  const handleChangePassword = async (data: ChangePasswordPostData) => {
    let res = await dispatch(AuthAction.changePassword(data))
    if (res?.payload?.status === 'success') {
      /**
       * * show change_password_success message
       */
      showToast({
        type: 'success',
        title: translate('change_password_success', 'Successfully change password.'),
        placement: 'bottom',
      })
      navigate(-1)
    } else {
      /**
       * * show res?.payload?.message
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    }
  }

  type OtpVerifyPostData = {
    mobile: string
    otp: string
  }
  const handleOtpVerify = async (data: OtpVerifyPostData) => {
    let res = await dispatch(AuthAction.otpVerify(data))
    if (res?.payload?.status === 'success') {
      if (location?.state?.from === 'forgot') {
        /**
         * * go to ChangePassword
         * @params { ...location?.state?.from, otp: data?.otp }
         */
        navigate('/user/reset_password', {
          state: { ...location?.state, otp: data?.otp },
        })
      }
      if (location?.state?.from === 'signup') {
        /**
         * * show signup_success view
         */
        // showToast({ type: 'success', title: 'Successfully register.', placement: 'bottom' })
      }
    } else {
      showToast({
        type: 'error',
        title: res?.payload?.message || res?.payload?.error || 'Something wrong.',
        placement: 'bottom',
      })
    }
    return res
  }

  type UpdateProfilePostData = {
    name?: string
    street?: string
    state_id?: number
    township_id?: number
    phone?: string
    mobile?: string
    email?: string
  }
  const handleUpdateProfile = async (data: UpdateProfilePostData) => {
    let res = await dispatch(AuthAction.updateProfile(data))
    if (res?.payload?.status === 'success') {
      /**
       ** show successfully profile update
       */
      showToast({
        type: 'success',
        title: translate('profile_edit_success', 'Successfully update profile.'),
        placement: 'bottom',
      })
      await navigate('/user/profile')
    } else {
      /**
       ** show res?.payload?.message
       */
      showToast({
        type: 'error',
        title: res?.payload?.message || 'Something wrong! Please try again.',
        placement: 'bottom',
      })
    }
  }

  return {
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleIsExistUser,
    handleResetPassword,
    handleChangePassword,
    handleOtpVerify,
    handleUpdateProfile,
  }
}
