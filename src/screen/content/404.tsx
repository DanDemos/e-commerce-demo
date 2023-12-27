import React from 'react'

import { Container, TextCom } from 'components'
import Icon from 'asset/icon/luxura'
import { useHandleOther } from 'hook'

export const NotFoundPage = () => {
  const { translate } = useHandleOther()
  return (
    <Container className="container not-found-page d-flex flex-column justify-content-center align-items-center">
      <img src={Icon.notfound} alt="" className="img-fluid" />
      <TextCom weight="lg" size="xxl">
        {translate('page-not-found', 'Oops! That page can’t be found.')}
      </TextCom>
    </Container>
  )
}
