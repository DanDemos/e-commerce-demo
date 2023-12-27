import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FormContainerCom, ButtonCom, InputCom, TextCom } from 'components'
import { useHandleAuth, useOther, useHandleOther, useAuth } from 'hook'
import './style.scss'

type SignInProps = {}

export const SignIn: React.FC<SignInProps> = props => {
  const navigate = useNavigate()
  const { langStore } = useOther()
  const { handleSignIn } = useHandleAuth(props)
  const { translate } = useHandleOther()
  const { getProfile_data } = useAuth()
  const [alreadyLogin, setalreadyLogin] = useState(getProfile_data ? getProfile_data : null)

  useEffect(() => {
    if (alreadyLogin) {
      navigate(-1)
    }
  }, [])

  let langCode = langStore?.code
  let initialValues: any = {
    phone: '',
    password: '',
  }

  const validationSchema = (yup: any) =>
    yup.object({
      phone: yup.string().required(translate('enter-your-phone-number', 'Enter Your Phone Number')),
      password: yup.string().required(translate('password-is-required', 'Password is Required')),
    })

  const onDataSubmit = async (values?: any, actions?: any) => {
    actions.setSubmitting(true)
    let post_data: any = {
      langCode,
      headers: {
        login: values?.phone,
        password: values?.password,
      },
    }
    await handleSignIn(post_data)
    actions.setSubmitting(false)
    actions.resetForm()
  }

  const handleRouteChange = (route?: any, params?: any) => {
    navigate(route)
  }

  return (
    <div className="log-in-con">
      <div className="auth_con container">
        <div className="row">
          <div className="col-lg-6 form_wrap">
            <div className="form_card">
              <TextCom size="xxxxl" textAlign="center" weight="xl" className="title_txt">
                {translate('signin', 'Sign in')}
              </TextCom>
              <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values?: any, actions?: any) => onDataSubmit(values, actions)}>
                {(formikProps?: any) => (
                  <>
                    <InputCom label={translate('phone', 'Phone')} name="phone" type="tel" required />
                    <InputCom label={translate('password', 'Password')} name="password" type="password" required />
                    <div className="form_foot_first">
                      <TextCom link color="primary" onClick={() => handleRouteChange('/user/forgot_password')}>
                        {translate('forgot-password', 'Forgot password')}?
                      </TextCom>
                    </div>
                    <div className="form_foot_sec">
                      <ButtonCom type="submit" color="light" bgcolor="dark" btnBorderRadius="xxxs" text={formikProps.isSubmitting ? translate('signin....', 'Sign In....') : translate('signin', 'Sign In')} />
                    </div>
                    <div className="d-flex justify-content-center gap-3 mt-5">
                      <TextCom>{translate(`dont-have-a-account`, `Don't have a account `)}?</TextCom>
                      <TextCom as="a" link color="primary" onClick={() => handleRouteChange('/user/signup')}>
                        {translate('signup', 'Sign Up')}
                      </TextCom>
                    </div>
                  </>
                )}
              </FormContainerCom>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
