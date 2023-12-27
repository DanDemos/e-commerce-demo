import React, { useState } from 'react'
import toArray from 'rc-util/lib/Children/toArray'

import { StyledCollapse } from 'theme'
import type { CollapseProps } from './interface'
import { useProduct } from 'hook'
const getActiveKeysArray = (activeKey: React.Key | React.Key[]) => {
  let currentActiveKey = activeKey
  if (!Array.isArray(currentActiveKey)) {
    const activeKeyType = typeof currentActiveKey
    currentActiveKey =
      activeKeyType === 'number' || activeKeyType === 'string' ? [currentActiveKey] : []
  }

  return currentActiveKey.map((key) => String(key))
}

export const CollapseCom: React.FC<CollapseProps> = ({ children, defaultActiveKey, handleChange, ...props }) => {
  let currentActiveKey: any = defaultActiveKey
  const [activeKey, setActiveKey] = useState(getActiveKeysArray(currentActiveKey))

  const getNewChild = (child: React.ReactElement, index: number) => {
    if (!child) return null

    const { prefixCls, accordion, collapsible, showArrow, item, expandIcon } = props
    const key: any = child.key || String(index)
    const { header, headerClass, collapsible: childCollapsible } = child.props
    let isActive = false
    if (accordion) {
      isActive = activeKey[0] === key
    } else {
      isActive = activeKey.indexOf(key) > -1
    }

    const mergeCollapsible = childCollapsible ?? collapsible

    const Props: any = {
      key,
      panelKey: key,
      header,
      headerClass,
      isActive,
      prefixCls,
      showArrow,
      expandIcon,
      item,
      children: child.props.children,
      onItemClick: mergeCollapsible === 'disabled' ? null : onClickItem,
      collapsible: mergeCollapsible,
    }

    if (typeof child.type === 'string') {
      return child
    }

    Object.keys(Props).forEach(propName => {
      if (typeof Props[propName] === 'undefined') {
        delete Props[propName]
      }
    })

    return React.cloneElement(child, Props)
  }

  const onClickItem = (key: React.Key, hasChildren: boolean, itemProps: any) => {
    let tmp: any = activeKey
    if (props.accordion) {
      tmp = tmp[0] === key ? [] : [key]
    } else {
      tmp = [...tmp]
      const index = tmp.indexOf(key)
      const isActive = index > -1
      if (isActive) {
        // remove active state
        tmp.splice(index, 1)
      } else {
        tmp.push(key)
      }
    }
    if (!hasChildren) {
      setActiveKey(tmp)
    }
    handleChange(itemProps)
  }

  const getItems = () => {
    return toArray(children).map(getNewChild)
  }


  return (
    <StyledCollapse className='collapse-con'>
      {getItems()}
    </StyledCollapse>
  )
}

CollapseCom.defaultProps = {
  prefixCls: 'collapse'
}