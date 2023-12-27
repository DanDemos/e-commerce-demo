import styled from 'styled-components'

export const lineHeight = (fontSize: any, props: any) => {
  // const multiplier = (fontSize > 20) ? (props.theme?.langStore?.code === 'en' ? 1 : 1.88) : (props.theme?.langStore?.code === 'en' ? 0.5 : 0.88);
  const multiplier = fontSize > 20 ? 1 : 0.5

  return parseInt(fontSize + fontSize * multiplier, 10)
}

export const handleFontFamily = (props: any) => {
  let lang_data: any = {
    my: `'Urbanist', sans-serif`,
    en: `'Urbanist', sans-serif`,
  }
  let tmp = lang_data[props.theme.langStore.code || 'en']
  return tmp
}

type StyledTextProps = {
  size?: any,
  weight?: any,
  color?: any,
  textAlign?: any,
  textDecoration?: any,
  link?: any,
  props?: any,
  family?: any
}
export const StyledText = styled.p < StyledTextProps > `
  /* line-height: ${props => (props.theme.fontSize[props?.size] || props.theme.fontSize.md) * 1.7}px; */
  line-height: ${props => lineHeight(props.theme.fontSize[props?.size] || props?.size || props.theme.fontSize.md, props)}px;
  /* font-size: ${props => {
    let size = props.theme.fontSize[props?.size] || props.size || props.theme.fontSize.md
    return size
    return size
    return Dimensions.get('window').width < 550 ? size / 1.1 : size
  }}px; */
  @media(min-width: 320px) and (max-width: 1023px){
    font-size: calc(${props => props.theme.fontSize.sm}px + (${props => props.theme.fontSize[props?.size] || props.size || props.theme.fontSize.md} - ${props => props.theme.fontSize.sm}) * ((100vw - 100px) / (1023 - 100)));
  }

  @media(min-width: 1024px) {
    font-size: ${props => props.theme.fontSize[props?.size] || props.size || props.theme.fontSize.md}px;
  }
  font-weight: ${props => props.theme.fontWeight[props?.weight] || props?.weight || props.theme.fontWeight.md};
  color: ${props => props.theme.color.typo[props?.color] || props?.color || props.theme.color.typo.text};
  text-align: ${props => props.textAlign || 'left'};
  /* font-family: ${props => {
    let res = handleFontFamily(props)
    return res
  }}; */
  font-family: ${props => props?.theme?.fontFamily[props?.family] || props?.theme?.fontFamily?.initial};
  margin: 0;
  text-decoration: ${props => props?.textDecoration || (props?.link ? 'underline' : 'auto')};
  text-decoration-color: ${props => (props?.link ? props.theme.color.typo[props?.color] || props?.color || props.theme.color.typo.text : 'auto')};

  &.middle_txt {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${props => props?.theme?.color?.typo?.gray};
    line-height: 0.1em;
    margin: 20px 0;

    span {
      background: #fff;
      padding: 0 30px;
    }
  }
`