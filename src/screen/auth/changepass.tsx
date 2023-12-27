import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { FormContainerCom, ButtonCom, InputCom, TextCom } from 'components'
import { useHandleAuth, useHandleOther } from 'hook'
import './style.scss'

type ChangePassProps = {}

export const ChangePass: React.FC<ChangePassProps> = (props: any) => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const { translate } = useHandleOther()
  const { handleResetPassword, handleChangePassword } = useHandleAuth(props)

  let initialValues: any = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  }

  let validate_obj = (yup?: any) => {
    let obj = {
      old_password: yup.string().required(translate('old-password-is-required', 'Old Password is Required')),
      new_password: yup.string().required(translate('new-password-is-required', 'New Password is Required')),
      confirm_password: yup
        .string()
        .required(translate('confirm-password-is-required', 'Confirm Password is Required'))
        .oneOf([yup.ref('new_password'), null], translate('password-must-match', 'Password Must Match')),
    }

    if (location?.state?.from === 'forgot') {
      delete obj.old_password
    }

    return obj
  }

  const validationSchema: any = (yup: any) => yup.object(validate_obj(yup))
  const onDataSubmit = (values?: any, actions?: any) => {
    actions.setSubmitting(true)
    setTimeout(async () => {
      if (location?.state?.from === 'forgot') {
        handleReset(values)
      } else {
        handleChange(values)
      }
      actions.setSubmitting(false)
    }, 1000)
  }

  const handleReset = (values?: any) => {
    let post_data = {
      otp: location?.state?.otp,
      mobile: location?.state?.mobile,
      password: values?.new_password,
    }
    handleResetPassword(post_data)
  }

  const handleChange = (values?: any) => {
    let post_data = {
      old_password: values?.old_password,
      new_password: values?.new_password,
    }
    handleChangePassword(post_data)
  }

  const handleRouteChange = (route?: any, params?: any) => {
    navigate(route)
  }

  return (
    <div className="container">
      <div className="auth_con" style={{ paddingBlock: '30px' }}>
        <div className="row">
          <div className="col-lg-6 form_wrap">
            <div className="form_card">
              <TextCom size="xxxxl" textAlign="center" weight="xl" className="title_txt">
                {translate('change-password', 'Change Password')}
              </TextCom>
              <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values?: any, actions?: any) => onDataSubmit(values, actions)}>
                {(formikProps?: any) => (
                  <>
                    {location?.state?.from !== 'forgot' && <InputCom label={translate('old-password', 'Old Password')} name="old_password" type="password" required />}
                    <InputCom label={translate('new-password', 'New Password')} name="new_password" type="password" required />
                    <InputCom label={translate('confirm-password', 'Confirm Password')} name="confirm_password" type="password" required />
                    <div className="form_foot_sec">
                      <ButtonCom color="light" bgcolor="dark" btnBorderRadius="xxxs" text={formikProps.isSubmitting ? translate('saving', 'Saving') : translate('save', 'Save')} />
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
