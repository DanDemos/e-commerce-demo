import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { StyledTabCon, StyledTabHeadCon, StyledTabHeadItemCon, StyledTabBodyCon, StyledTabBodyWrap } from 'theme'
import { TextCom } from '../typo'

interface NewTabComProps {
  children?: React.ReactNode
  defaultActiveKey?: string
  dataSource?: any
}
export const NewTabCom: React.FC<NewTabComProps> = ({ children, defaultActiveKey, ...props }) => {
  const [saveTabName, setSaveTabName] = useState(defaultActiveKey)

  useEffect(() => {
    document.getElementById(`ht_${defaultActiveKey}`)?.click()
  }, [defaultActiveKey])

  const openTab = (evt: any, tabname: string) => {
    var tabcontent = document.querySelectorAll('.tabcontent')
    var tabheaditem = document.querySelectorAll('.tabheaditem')
    for (let i = 0; i < tabcontent.length; i++) {
      const item = tabcontent[i]
      item.classList.remove('active')
    }
    for (let i = 0; i < tabheaditem.length; i++) {
      const item = tabheaditem[i]
      item.className = item.className.replace(' active', '')
    }
    document.getElementById(`bt_${tabname}`)?.classList.add('active')
    evt.currentTarget.className += ' active'
    setSaveTabName(tabname)
  }

  return (
    <StyledTabCon>
      {children ? (
        children
      ) : (
        <>
          <TabHeadCom activeTabName={saveTabName} openTab={openTab} {...props} />
          <TabBodyCom activeTabName={saveTabName} {...props} />
        </>
      )}
    </StyledTabCon>
  )
}

interface TabHeadComProps {
  children?: React.ReactNode
  openTab?: any
  dataSource?: any
  activeTabName?: any
  key?: any
  link?: any
  icon?: any
}
export const TabHeadCom: React.FC<TabHeadComProps> = ({ children, key, dataSource, openTab, activeTabName, ...props }) => {
  const checkData = () => {
    if (dataSource[0]?.desc) {
      for (let i = 0; dataSource?.length > i; i++) {
        if (dataSource[i]?.desc?.length > 0 && dataSource[i]?.desc !== 'false') {
          return 'underline'
        }
      }
    } else {
      return
    }
  }
  return (
    <StyledTabHeadCon className={`tab-head ${checkData()}`}>
      {children ? (
        <StyledTabHeadItemCon id={`ht_${key}`} className="tabheaditem" onClick={(e: any) => openTab(e, key)}>
          <div className={`def_title_wrap ${activeTabName === key ? 'active' : undefined}`}>{children}</div>
        </StyledTabHeadItemCon>
      ) : (
        dataSource?.length > 0 &&
        dataSource?.map((x: any, i: any) => (
          <StyledTabHeadItemCon id={`ht_${x?.key}`} className="tabheaditem" key={i} onClick={(e: any) => openTab(e, x.key)}>
            {x?.header_render ? (
              x?.header_render(x, i, activeTabName === x.key)
            ) : (
              <Link to={x.link || '#'}>
                <div className={`def_title_wrap ${activeTabName === x.key ? 'active' : undefined} d-flex align-items-center gap-2`}>
                  {x.icon && x.icon}
                  <TextCom textAlign="center">{x.title}</TextCom>
                </div>
              </Link>
            )}
          </StyledTabHeadItemCon>
        ))
      )}
    </StyledTabHeadCon>
  )
}

interface TabBodyComProps {
  dataSource?: any
  activeTabName?: any
  key?: any
  children?: React.ReactNode
}
export const TabBodyCom: React.FC<TabBodyComProps> = ({ children, activeTabName, key, dataSource, ...props }) => {
  const NewLineFunc = (desc: any) => {
    const NewLineFunc = desc?.split('\n')
    if (NewLineFunc && NewLineFunc[0] !== 'false') {
      return NewLineFunc?.map((item: any) => <TextCom key={item?.key}>{item}</TextCom>)
    }
  }
  return (
    <StyledTabBodyCon>
      {children ? (
        <StyledTabBodyWrap id={`bt_${key}`} className="tabcontent">
          {children}
        </StyledTabBodyWrap>
      ) : (
        dataSource?.length > 0 &&
        dataSource?.map((x: any, i: any) => (
          <StyledTabBodyWrap id={`bt_${x?.key}`} key={x?.key} className="tabcontent">
            {x?.body_render ? x?.body_render(x, i, activeTabName === x.key) : <TextCom {...x}>{NewLineFunc(x?.desc)}</TextCom>}
          </StyledTabBodyWrap>
        ))
      )}
    </StyledTabBodyCon>
  )
}

type TabPannelCom = {
  tabName: string
  children: any
}
export const TabPanelCom: React.FC<TabPannelCom> = ({ tabName, ...props }) => {
  return (
    <>
      <TabHeadCom {...props}>{tabName}</TabHeadCom>
      <TabBodyCom {...props}>{props?.children}</TabBodyCom>
    </>
  )
}
