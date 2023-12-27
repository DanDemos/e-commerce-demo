import styled from 'styled-components'
import { handleFontFamily } from '../typo'

interface StyledFormProps {
  props: any,
  size: any,
  weight: any,
  inputBgColor: any,
  inputTxtColor: any,
  inputBorderWidth: any,
  inputBorderColor: any,
}

export const StyledFieldWrapper = styled.div`
  position: relative;
  &.vlc_con {
    margin-bottom: 20px;
  }

  textarea {
    height: auto;
  }

  &[type='checkbox'] {
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;


    .label_txt{
      position: absolute;
      left: 20px; 
      margin: 0;
    }
  }

  .err_msg {
    position: absolute;
    bottom: 10;
    min-height: 18px;
    margin-left: 10px;
  }

  .label_txt {
    margin-right: 5px;
  }
`

export const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledInputContainer = styled.div``

export const StyledInput = styled.input < StyledFormProps > `
  display: block;
  width: 100%;
  height: 40px;
  padding: ${props => props?.theme?.formVariable?.padding || '7px 15px'};
  font-size: ${props => props.theme.fontSize[props?.size] || props.size || props.theme.fontSize.md}px;
  font-weight: ${props => props.theme.fontWeight[props?.weight] || props?.weight || props.theme.fontWeight.md};
  color: ${props => props.theme.color.typo[props?.inputTxtColor] || props?.inputTxtColor || props.theme.color.typo.text};
  background-color: ${props => props.theme.color.form[props?.inputBgColor] || props?.inputBgColor || props.theme.color.form.inputBgColor};
  background-clip: padding-box;
  border: ${props => props?.inputBorderWidth || 1}px solid ${props => props?.theme?.color?.form?.[props?.inputBorderColor] || props?.inputBorderColor || props?.theme?.color?.form?.borderColor};
  border-radius: ${props => props?.theme?.formVariable?.borderRadius}px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: 0;
  font-family: ${props => {
    let res = handleFontFamily(props)
    return res
  }};

  &.qty-input {
    border-width: 0;
    padding: 0;
    text-align: center;
  };

  &:disabled {
    background: ${props => props?.theme?.color?.form?.bg1};
  };

  &.error {
    border: 1px solid ${props => props?.theme?.color?.form?.danger};
  };

  &:focus {
    border-color: ${props => props?.theme?.color?.form?.borderColor};
  };

  &:placeholder {
    opacity: 0.3;
    font-weight: 400;
  };

  &[type='checkbox']{
    cursor: pointer;
    padding: 0;
    appearance: none;
    background-color: ${props => props?.theme?.color?.form?.light || '#fff'};
    margin: 0;
    width: 15px;
    height: 15px;
    border: 1px solid ${props => props?.theme?.color?.form?.gray || '#DDDD'};

    display: grid;
    place-content: center;

    &:before{
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
      border-radius: 0.15rem;
      width: 15px;
      height: 15px;
    }
  }

  &[type='checkbox']:checked::before{
    content: '';
    position: absolute;
    top: -3px;
    bottom: 0;
    margin: auto;
    left: 5px;
    width: 5px;
    height: 10px;
    border: 1px solid ${props => props?.theme?.color?.form?.dark || '#000'};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`