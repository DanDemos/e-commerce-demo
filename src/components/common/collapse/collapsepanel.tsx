import React from 'react'
import classNames from 'classnames'

import { StyledCollapsePanel, StyledCollapseHeader, StyledCollapseContent } from 'theme'
import type { CollapsePanelProps } from './interface'
import Icon from '../../../asset/icon/luxura'

export const CollapsePanel: React.FC<CollapsePanelProps> = ({ children, accordion, headerClass, collapsible, prefixCls, route, ...props }) => {
  const disabled = collapsible === 'disabled'
  const collapsibleHeader = collapsible === 'header'

  const onItemClick: any = () => {
    const { onItemClick, panelKey } = props

    if (typeof onItemClick === 'function') {
      onItemClick(panelKey, !children, props)
    }
  }

  const renderTitle = () => {
    const { header } = props

    return (
      <div className={`${prefixCls}-header-wrap`} onClick={collapsible === 'header' ? onItemClick : null}>
        {header(props?.isActive, props)}
        {renderIcon()}
      </div>
    )
  }

  const renderIcon = () => {
    const { showArrow, expandIcon } = props
    if (!showArrow) {
      return null
    }

    const iconNode = typeof expandIcon === 'function' ? expandIcon(props) : <img src={Icon.ArrowDown} alt="icon" className="arrow" />

    return (
      iconNode && (
        <div className={`${prefixCls}-expand-icon`} onClick={collapsible === 'header' ? onItemClick : null}>
          {children && iconNode}
        </div>
      )
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onItemClick()
    }
  }

  const headerCls = classNames(`${prefixCls}-header`, {
    [headerClass]: headerClass,
    [`${prefixCls}-header-collapsible-only`]: collapsibleHeader,
  })

  const headerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: headerCls,
    'aria-expanded': props?.isActive,
    'aria-disabled': disabled,
    onKeyPress: handleKeyPress,
  }

  if (!collapsibleHeader) {
    headerProps.onClick = onItemClick
    headerProps.role = accordion ? 'tab' : 'button'
    headerProps.tabIndex = disabled ? -1 : 0
  }

  return (
    <StyledCollapsePanel className="collapse-item" {...props}>
      <StyledCollapseHeader {...headerProps}>{renderTitle()}</StyledCollapseHeader>
      <StyledCollapseContent className="collapse-content" {...props}>
        {children}
      </StyledCollapseContent>
    </StyledCollapsePanel>
  )
}

CollapsePanel.defaultProps = {
  showArrow: true,
  headerClass: '',
}
