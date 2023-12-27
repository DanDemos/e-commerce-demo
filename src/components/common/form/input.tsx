import React from 'react'
import { useField } from 'formik'

import { StyledInput } from 'theme'
import { FieldWrapperCom } from './fieldwrapper'

type InputComProps = {
  require?: boolean
  isNumber?: boolean
  isValidate?: boolean
  id?: any
  name?: string
  label?: string
  className?: any
  value?: any
  input_as?: any
  onChange?: any
  placeholder?: any
  type?: string
  required?: any
  onKeyPress?: (e: any) => false | void
  rows?: any
  defaultValue?: any
  children?: any
  onKeyUp?: (e: any) => false | void
  min?: any
  onInput?: any
  disabled?: boolean
}

export const InputCom: React.FC<InputComProps> = ({ isValidate = true, ...props }) => {
  return isValidate ?
    <ValidateInput {...props} />
    :
    <FieldWrapperCom {...props}>
      <StyledInput
        // id={props?.id || props?.name}
        as={props?.input_as}
        {...props}
      />
    </FieldWrapperCom>
}

export const ValidateInput = (props: any) => {
  const [field, meta] = useField(props)

  let fieldWrapperComProps = {
    ...props,
    field,
    meta,
  }

  return (
    <FieldWrapperCom className='vlc_con' {...fieldWrapperComProps}>
      <StyledInput id={props?.id || props?.name} className={`${meta.touched && meta.error ? 'error' : ''}`} as={props?.input_as} {...field} {...props} />
    </FieldWrapperCom>
  )
}