import React from 'react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

interface IProps {
  initialValues?: any
  children?: any
  validationSchema?: any
  onSubmit?: any
}
export const FormContainerCom: React.FC<IProps> = ({ children, validationSchema, ...props }: any) => {
  return (
    <Formik enableReinitialize validationSchema={() => validationSchema(yup)} {...props}>
      {(formikProps: any) => <Form style={{ width: '100%' }}>{children(formikProps)}</Form>}
    </Formik>
  )
}