import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Loading } from 'components'
import { useTheme, useOther } from 'hook'
import AppLayout from './router'

type AppProps = {}
const App: React.FC<AppProps> = props => {
  const { baseTheme } = useTheme()
  const { langStore } = useOther()

  let BaseTheme = {
    ...baseTheme,
    langStore,
  }
  return (
    <ThemeProvider theme={BaseTheme}>
      <Loading />
      <AppLayout />
    </ThemeProvider>
  )
}

export default App
