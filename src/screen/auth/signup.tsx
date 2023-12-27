import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormContainerCom, ButtonCom, InputCom, TextCom } from 'components'
import { useHandleAuth, useHandleOther } from 'hook'
import { useOther } from 'hook'
import './style.scss'

type SignUpProps = {}

export const SignUp: React.FC<SignUpProps> = props => {
  const navigate = useNavigate()
  const { handleSignUp } = useHandleAuth(props)
  const { translate } = useHandleOther()
  const { langStore } = useOther()
  const [Checked, setChecked] = useState(false)

  let initialValues: any = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  const validationSchema = (yup: any) =>
    yup.object({
      name: yup.string().required(translate('name-is-required', 'Name is Required')),
      phone: yup.string().required(translate('phone-is-required', 'Phone is Required')),
      email: yup.string().email(translate('email-is-invalid', 'Email is Invalid')),
      password: yup.string().required(translate('password-is-required', 'Password is Required')),
      confirm_password: yup
        .string()
        .required(translate('confirm-password-is-required', 'Confirm password is required'))
        .oneOf([yup.ref('password'), null], translate('password-must-match', 'Password Must Match')),
    })

  const onDataSubmit = (values: any, actions: any) => {
    setTimeout(async () => {
      let post_data = {
        email: values.email,
        name: values.name,
        mobile: values.phone,
        password: values.password,
      }
      handleSignUp(post_data)
    }, 1000)
    actions.setSubmitting(false)
  }

  const handleRouteChange = (route?: any, params?: any) => {
    navigate(route)
  }

  return (
    <div className="sign-up-con">
      <div className="auth_con container">
        <div className="row">
          <div className="col-lg-6 form_wrap">
            <div className="form_card">
              <TextCom size="xxxxl" textAlign="center" weight="xl" className="title_txt">
                {translate('signup', 'Sign Up')}
              </TextCom>
              <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values: any, actions: any) => onDataSubmit(values, actions)}>
                {(formikProps: any) => (
                  <>
                    <InputCom label={translate('name', 'Name')} name="name" type="text" required />
                    <InputCom label={translate('phone', 'Phone')} name="phone" type="tel" required />
                    <InputCom label={translate('email', 'Email')} name="email" type="email" />
                    <InputCom label={translate('password', 'Password')} name="password" type="password" required />
                    <InputCom label={translate('confirm-password', 'Confirm Password')} name="confirm_password" type="password" required />

                    <div style={{ fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 500, color: '#4B5563' }}>
                      <input id="checkbox" type="checkbox" defaultValue="" required onClick={() => setChecked(!Checked)} style={{ marginRight: '0.5rem', marginBottom: '20px', borderRadius: '0.25rem', borderColor: '#D1D5DB', width: '1rem', height: '1rem', color: '#2563EB', backgroundColor: '#F3F4F6' }} />
                      {langStore?.code === 'en' ? (
                        <>
                          <span style={{ fontSize: '16px', cursor: 'default' }}>{translate('i-have-read-and-accept', "I've read and accept the")} </span>
                          <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/privacy_policy', 'blank')}>
                            {translate('privacy_policy', 'Privacy policy')}
                          </span>{' '}
                          {translate('and', 'and')}{' '}
                          <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/terms-conditions', 'blank')}>
                            {translate('terms-and-conditions', 'Terms & Conditions')}
                          </span>{' '}
                          *
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/privacy_policy', 'blank')}>
                            {translate('privacy_policy', 'Privacy policy')}
                          </span>{' '}
                          {translate('and', 'and')}{' '}
                          <span style={{ fontSize: '16px', cursor: 'pointer', lineHeight: '1.25rem', color: '#0491A4' }} onClick={() => window.open('/page/terms-conditions', 'blank')}>
                            {translate('terms-and-conditions', 'Terms & Conditions')}
                          </span>{' '}
                          <span style={{ fontSize: '16px', cursor: 'default' }}>{translate('i-have-read-and-accept', "I've read and accept the")} </span>*
                        </>
                      )}
                    </div>

                    <div className="form_foot_sec">
                      <div className="signup_btn">
                        <ButtonCom disabled={Checked ? false : true} type="submit" color="light" bgcolor="dark" btnBorderRadius="xxxs" text={formikProps.isSubmitting ? translate('signup...', 'Sign Up...') : translate('signup', 'Sign Up')} />
                      </div>
                      <div className="d-flex justify-content-center gap-3">
                        <TextCom>{translate(`already-have-an-account`, `Already have an account?`)}</TextCom>
                        <TextCom as="a" link color="primary" onClick={() => handleRouteChange('/user/signin')}>
                          {translate('signin', 'SIGN IN')}
                        </TextCom>
                      </div>
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
