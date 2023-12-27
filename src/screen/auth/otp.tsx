import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FormContainerCom, ButtonCom, InputCom, TextCom } from 'components'
import { useInterval, useHandleAuth, useHandleOther, useAuth } from 'hook'
import './style.scss'
import Icon from 'asset/icon/luxura'

type OtpProps = {}

export const Otp: React.FC<OtpProps> = props => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const { translate } = useHandleOther()
  const { handleOtpVerify, handleIsExistUser } = useHandleAuth(props)
  const [timer, setTimer] = useState(60)
  const [type, setType]: any = useState(null)
  useInterval(() => {
    timer !== 0 && setTimer(timer - 1)
  }, 1000)

  let initialValues: any = {
    code: '',
  }

  const validationSchema = (yup: any) =>
    yup.object({
      code: yup.string().required(translate('verify-code-required', 'Verify Code Required')),
    })

  const onDataSubmit = (values?: any, actions?: any) => {
    // actions.setSubmitting(true)
    // setType('signup_success')
    // navigate('/user/signup/success', { replace: true })
    setTimeout(async () => {
      let post_data = {
        mobile: location?.state?.mobile,
        otp: values.code,
      }
      let res = await handleOtpVerify(post_data)
      if (res?.payload?.status === 'success') {
        if (location?.state?.from === 'signup') {
          setType('signup_success')
        }
      }
      actions.setSubmitting(false)
    }, 1000)
  }

  const handleResend = () => {
    setTimer(60)
    let postData = { mobile: location?.state?.mobile }
    handleIsExistUser(postData)
  }

  const handleRouteChange = (route?: any, params?: any) => {
    navigate(route)
  }

  return (
    <div className="container">
      <div className="auth_con">
        <div className="row">
          <div className="col-lg-6 form_wrap">
            {type === 'signup_success' || location?.state?.from === 'reset' ? (
              <div className="signup_success_con">
                <div className="icon_wrap">
                  <img className="animation" src={Icon.MaskGpSvg} />
                  <div className="pos_tick">
                    <img src={Icon.IconTickSvg} />
                  </div>
                </div>
                <TextCom size="xl" weight="xl" textAlign="center" className="wel_txt">
                  {translate('welcome', 'Welcome')}
                </TextCom>
                <TextCom textAlign="center" className="desc_txt">
                  {location?.state?.title || translate('your-registration-has-been-successful!', 'Your registration has been successful!')}{' '}
                </TextCom>
                <div className="btn_wrap">
                  <ButtonCom color="light" bgcolor="dark" btnBorderRadius="xxxs" text={translate('signin', 'Sign in')} onClick={() => handleRouteChange('/user/signin')} />
                </div>
              </div>
            ) : (
              <div className="form_card">
                <TextCom size="xxxxl" textAlign="center" weight="xl" className="title_txt">
                  {translate('verification', 'Verification')}
                </TextCom>
                <TextCom textAlign="center" className="desc_txt">
                  {translate('enter-the-otp-code-we-just-sent-you-on-your-phone', 'Enter the OTP code we just sent you on your phone')}
                </TextCom>
                <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values?: any, actions?: any) => onDataSubmit(values, actions)}>
                  {(formikProps: any) => (
                    <>
                      <InputCom label={translate('verify-code', 'Verify Code')} name="code" type="text" required />
                      <div className="form_foot_sec">
                        {timer === 0 ? (
                          <ButtonCom text={translate('send-code-again', 'Send code again')} color="primary" bgcolor="light" className="send_btn" onClick={handleResend} link />
                        ) : (
                          <TextCom weight="lg" className="timer_txt">
                            {timer} s
                          </TextCom>
                        )}
                        <ButtonCom color="light" bgcolor="dark" btnBorderRadius="xxxs" text={formikProps.isSubmitting ? translate('verifying', 'Verifying') : translate('verify', 'verify')} />
                      </div>
                    </>
                  )}
                </FormContainerCom>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
