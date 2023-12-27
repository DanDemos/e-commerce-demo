import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { HeaderCom, FooterCom, Main } from 'components'
import { GlobalStyle } from 'theme'

import AppRoute from './router'


type AppLayoutProps = {}
const AppLayout: React.FC<AppLayoutProps> = (props) => {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <HeaderCom />
      <Main>
        <AppRoute />
      </Main>
      <FooterCom />
    </BrowserRouter>
  )
}

export default AppLayout
