

import type * as React from 'react'

export type CollapsibleType = 'header' | 'disabled'

export interface CollapseProps {
  prefixCls?: string | undefined
  activeKey?: React.Key | React.Key[]
  defaultActiveKey?: React.Key | React.Key[]
  onChange?: (key: React.Key | React.Key[]) => void
  accordion?: boolean
  className?: string
  style?: object
  destroyInactivePanel?: boolean
  expandIcon?: (props: object) => React.ReactNode
  collapsible?: CollapsibleType
  children?: React.ReactNode
  showArrow?: any
  handleChange?: any
  item?: any
}

export interface CollapsePanelProps {
  id?: string
  header?: any | string | React.ReactNode
  prefixCls?: string
  headerClass?: any
  showArrow?: boolean
  className?: string
  style?: object
  isActive?: boolean
  destroyInactivePanel?: boolean
  accordion?: boolean
  forceRender?: boolean
  extra?: string | React.ReactNode
  onItemClick?: (panelKey?: string | number, hasChildren?: boolean, onItemClick?: any) => void
  expandIcon?: (props: object) => React.ReactNode
  panelKey?: string | number
  role?: string
  collapsible?: CollapsibleType
  children?: React.ReactNode
  route?: any
  item?: any
}