import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FormContainerCom,
  CardCom,
  ButtonCom,
  InputCom,
  TextCom,
} from 'components'
import { useHandleAuth, useHandleOther } from 'hook'
import './style.scss'

type ForgotPassProps = {}

export const ForgotPass: React.FC<ForgotPassProps> = props => {
  const navigate = useNavigate()
  const { translate } = useHandleOther()
  const { handleIsExistUser } = useHandleAuth(props)

  let initialValues: any = {
    phone: '',
  }

  const validationSchema = (yup: any) =>
    yup.object({
      phone: yup
        .string()
        .required(translate('phone-is-required', 'Phone is Required')),
    })

  const onDataSubmit = (values?: any, actions?: any) => {
    actions.setSubmitting(true)
    setTimeout(async () => {
      let post_data = {
        mobile: values?.phone,
        from: 'forgot'
      }
      handleIsExistUser(post_data)
      // navigate('/user/change_password')
      actions.setSubmitting(false)
    }, 1000)
  }

  const handleRouteChange = (route?: any, params?: any) => {
    navigate(route)
  }

  return (
    <div className="container">
      <div className="auth_con">
        <div className="row">
          <div className="col-lg-6 form_wrap">
            <div className="form_card">
              <TextCom
                size="xxxl"
                textAlign="center"
                weight="xl"
                className="mb-4"
              >
                {' '}
                {translate('forgot-password', 'Forgot Password')}
              </TextCom>
              <TextCom textAlign="center" className="desc_txt mb-5">
                {translate(
                  'enter-phone-number-associated-with-your-account',
                  'Enter phone number associated with your account'
                )}{' '}
              </TextCom>
              <FormContainerCom
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values?: any, actions?: any) => onDataSubmit(values, actions)}
              >
                {(formikProps?: any) => (
                  <>
                    <InputCom
                      label={translate('phone', 'Phone')}
                      name="phone"
                      type="tel"
                      required
                    />
                    <div className="form_foot_sec">
                      <ButtonCom
                        color="light"
                        bgcolor="dark"
                        btnBorderRadius="xxxs"
                        text={
                          formikProps.isSubmitting
                            ? translate('submit...', 'Submit...')
                            : translate('submit', 'Submit')
                        }
                      />
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
