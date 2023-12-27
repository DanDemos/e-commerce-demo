import React from 'react'

import { StyledFieldWrapper, StyledInputContainer, StyledLabel } from 'theme'
import { TextCom } from '../typo'

type FieldWrapperComProps = {
  children?: React.ReactNode
  meta?: any
  required?: boolean
  label?: string
}
export const FieldWrapperCom: React.FC<FieldWrapperComProps> = ({ children, meta, label, required, ...props }) => {
  return (
    <StyledFieldWrapper {...props}>
      {label && (
        <StyledLabel {...props}>
          <TextCom className="label_txt">{label}</TextCom>
          {required && <TextCom color="dander">*</TextCom>}
        </StyledLabel>
      )}
      <StyledInputContainer {...props}>{children}</StyledInputContainer>
      {meta?.touched && meta?.error && (
        <TextCom className="err_msg" color="danger" size="xs">
          {meta?.error}
        </TextCom>
      )}
    </StyledFieldWrapper>
  )
}
