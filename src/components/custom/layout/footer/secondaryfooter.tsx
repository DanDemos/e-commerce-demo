import React from 'react'

import { SecondaryFooterCom, TextCom } from '../../../common'

type SecondaryFooterProps = {}
export const SecondaryFooter: React.FC<SecondaryFooterProps> = props => {
  const current_year = document.querySelector('.current_year')
  if (current_year) {
    current_year.innerHTML = ' ' + new Date().getFullYear()
  }

  return (
    <SecondaryFooterCom>
      <div className="container-fluid copyright-block">
        <TextCom size="sm" color="disabled">
          Copyright © Innovix Shop Co.,Ltd@ <span className="current_year"> </span>. Powered by{' '}
          <TextCom as="a" color="primary" href="https://www.innovixdigital.com/" target='_blank'>
            Innovix Digital.
          </TextCom>
        </TextCom>
      </div>
    </SecondaryFooterCom>
  )
}
