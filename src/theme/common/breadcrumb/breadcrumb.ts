import styled from 'styled-components'

interface StyledBreadCrumbProps {
  bgcolor?: any,
  size?: any,
  route?: any
}

export const StyledBreadcrumbCon = styled.div<StyledBreadCrumbProps>`
  padding: 15px;
  margin-bottom: 20px;
  background-color: ${props => props?.theme?.color?.breadcrumb?.[props?.bgcolor] || props?.bgcolor || props?.theme?.color?.breadcrumb?.bg2};
  @media (max-width: 991px) {
    padding: 10px;
  }
`

export const StyledBreadcrumbItemCon = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const StyledBreadcrumbItem = styled.li<StyledBreadCrumbProps>`
  font-size: ${props => props.theme.fontSize[props?.size] || props.size || props.theme.fontSize.sm}px;
  position: relative;
  display: flex;
  align-items: center;
  a {
    color: ${props => props?.theme?.color?.typo?.text};
    text-decoration: none;
    opacity: ${props => (props?.route ? 'auto' : 0.7)};
    pointer-events: ${props => (props?.route ? 'auto' : 'none')};
    cursor: ${props => (props?.route ? 'pointer' : 'default')};
    transition: all 0.3s ease;

    :hover {
      color: ${props => props?.theme?.color?.typo?.primary};
    }
  }
  svg {
    margin-inline: 2px;
    color: ${props => props?.theme?.color?.typo?.text};
  }

  :last-child {
    svg {
      display: none;
    }
  }
`
