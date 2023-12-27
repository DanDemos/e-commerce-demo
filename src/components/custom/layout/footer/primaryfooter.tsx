import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { PrimaryFooterCom, TextCom } from '../../../common'
import { useOther, useHandleOther } from 'hook'
import Icon from 'asset/icon/luxura'

type PrimaryFooterProps = {}
export const PrimaryFooter: React.FC<PrimaryFooterProps> = props => {
  const { getContactUsPage_data, getMetaData_data } = useOther()
  const { translate } = useHandleOther()
  const navigate = useNavigate()
  const location = useLocation()

  const [route, setRoute] = useState('')

  const handleRouteChange = (route: any) => {
    setRoute(route)
  }

  if (location.pathname === '/products' && location.search === '') {
    navigate(route, { replace: true })
  }

  let address_arr = getContactUsPage_data?.branches[0]?.address?.split('\n')

  return (
    <PrimaryFooterCom>
      <div className="container-fluid">
        <div className="row">
          <div className="company-info col-lg-5 col-12" style={{ paddingRight: '40px' }}>
            <a href="#">
              <img src={require('../../../../asset/icon/luxura/innovix-shop.png')} className="logo" alt="logo" />
            </a>
            {/* Info text */}
            <TextCom color="disabled" className="info-text" weight="sm">
              {(getMetaData_data && getMetaData_data['footer-info']?.text_one) || ''}
            </TextCom>
            {getContactUsPage_data?.social_links?.length > 0 && (
              <div className="social">
                {getContactUsPage_data?.social_links?.map((social: any, i: any) => {
                  return (
                    <a key={i} href={social?.link} target="_blank">
                      <img src={social?.social_image || Icon.Facebook} alt="social-logo" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
          <div className="contact col-lg-4 col-md-12 col-12">
            <TextCom size="xl" color="light" weight="xl" className="title">
              {translate('contact', 'Contact')}
            </TextCom>
            <div className="d-flex address">
              <img src={Icon.LocationSvg} alt="" />
              <TextCom color="disabled">
                {address_arr &&
                  address_arr?.map((add: any,i : any) => (
                    <p className="mb-0" key={i}>
                      {add}
                    </p>
                  ))}
              </TextCom>
            </div>
            <div className="d-flex email">
              <img src={Icon.Mail} alt="" />
              {getContactUsPage_data?.branches[0]?.email &&
                getContactUsPage_data?.branches[0]?.email?.split(',').map((mail: any,i: any) => (
                  <TextCom as="a" color="disabled" href={'mailto:' + mail} key={i}>
                    {mail}
                  </TextCom>
                ))}
            </div>
            <div className="d-flex phone">
              <img src={Icon.Telephone} alt="" />
              {getContactUsPage_data?.branches[0]?.phone &&
                getContactUsPage_data?.branches[0]?.phone?.split(',').map((phone: any, i: any) => (
                  <TextCom as="a" color="disabled" href={'tel:' + phone} key={i}>
                    {phone}
                  </TextCom>
                ))}
            </div>
          </div>
          <div className="information col-lg-3 col-md-12 col-12">
            <TextCom size="xl" color="light" weight="xl" className="title">
              {translate('information', 'Information')}
            </TextCom>
            <Link to="/aboutus">
              <TextCom color="disabled" onClick={() => handleRouteChange('/aboutus')}>
                {translate('about-us', 'About us')}
              </TextCom>
            </Link>
            <Link to="/contactus">
              <TextCom color="disabled" onClick={() => handleRouteChange('/contactus')}>
                {translate('contact-us', 'Contact us')}
              </TextCom>
            </Link>
            <Link to="/our_store">
              <TextCom color="disabled" onClick={() => handleRouteChange('/our_store')}>
                {translate('our-store', 'Our store')}
              </TextCom>
            </Link>
            <Link to="/news_and_activity">
              <TextCom color="disabled" onClick={() => handleRouteChange('/news_and_activity')}>
                {translate('news-activity', 'News & Activity')}
              </TextCom>
            </Link>
            <Link to="/page/privacy_policy">
              <TextCom color="disabled" onClick={() => handleRouteChange('/page/privacy_policy')}>
                {translate('privacy_policy', 'Privacy policy')}
              </TextCom>
            </Link>
            <Link to="/page/terms_and_condition">
              <TextCom color="disabled" onClick={() => handleRouteChange('/page/terms_and_condition')}>
                {translate('terms-conditions', 'Terms & Conditions')}
              </TextCom>
            </Link>
          </div>
        </div>
      </div>
    </PrimaryFooterCom>
  )
}
