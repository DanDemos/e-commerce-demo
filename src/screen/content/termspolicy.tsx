import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { TextCom, Container, StaticSidebar } from 'components'
import { useOther, useHandleOther } from 'hook'
import './style.scss'

export type IStaticProps = {}
export const TermsPolicy: React.FC<IStaticProps> = props => {
  const { translate } = useHandleOther()
  const { id } = useParams()
  const { getPageCode_data, langStore, dispatch, OtherAction } = useOther()
  const langCode = langStore?.code

  useEffect(() => {
    dispatch(
      OtherAction.getPageCode({
        code: id === 'privacy_policy' ? '	privacy_policy' : 'terms_and_condition',
        lang: langCode,
      })
    )
  }, [id, langCode])
  const static_data = [
    {
      name: translate('privacy_policy', 'Privacy Policy'),
      id: 'privacy_policy',
      route: '/page/privacy_policy',
    },
    {
      name: translate('terms_and_condition', 'Terms & Condition'),
      id: 'terms_and_condition',
      route: '/page/terms_and_condition',
    },
  ]
  return (
    <Container className="container" style={{ paddingBlock: '30px' }}>
      <div className="row">
        <div className="col-md-12 col-lg-3">
          <StaticSidebar data={static_data} route="/page/" />
        </div>
        <div className="col-md-12 col-lg-9">
          <TextCom as="h1" size="xxxl" weight="xxl">
            {getPageCode_data?.name}
          </TextCom>
          <TextCom dangerouslySetInnerHTML={{ __html: getPageCode_data?.description }} />
        </div>
      </div>
    </Container>
  )
}
