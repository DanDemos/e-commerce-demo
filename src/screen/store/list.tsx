import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TextCom, Container, CardCom, StaticSidebar } from 'components'
import { useOther, useHandleOther, useTheme } from 'hook'
import Icon from 'asset/icon/luxura'
import './style.scss'
import Image from 'asset/icon/luxura'
export type IStaticProps = {}
export const StaticPage: React.FC<IStaticProps> = props => {
  const navigate = useNavigate()
  const { translate } = useHandleOther()
  const { id } = useParams()
  const { getStoreByCityId_data, getAllCityListForStore_data, langStore, dispatch, OtherAction } = useOther()
  const { themeContext } = useTheme()
  const lang = langStore?.code
  useEffect(() => {
    dispatch(OtherAction.getAllCityListForStore({ lang }))
    if (id) dispatch(OtherAction.getStoreByCityId({ lang, city_id: id }))
  }, [lang, id])

  if (id === undefined && getAllCityListForStore_data) {
    navigate(`/our_store/${getAllCityListForStore_data[0]?.id}`)
  }
  let title = []
  if (getAllCityListForStore_data && getStoreByCityId_data) {
    title.push(getAllCityListForStore_data?.filter((item: any) => item.id === getStoreByCityId_data[0]?.city_id)[0])
  }
  return (
    <Container className="container-fluid storelist">
      <div className="row">
        <div className="col-md-12 col-lg-3">
          <TextCom size={lang === 'my' ? 'xxxl' : 30} color="dark" weight="lg" className="title">
            {translate('our-stores', 'Our Stores')}
          </TextCom>
          {getAllCityListForStore_data && getAllCityListForStore_data?.length > 0 && <StaticSidebar data={getAllCityListForStore_data} route="/our_store/" classname="side-bar" style={{ background: `${themeContext?.color?.typo?.bg1}` }} />}
        </div>
        {getAllCityListForStore_data && getAllCityListForStore_data?.length > 0 && (
          <div className="col-md-12 col-lg-9">
            <TextCom size="xxxl" color="dark" weight="lg">
              {translate(title[0]?.name, title[0]?.name)}
            </TextCom>
            <hr />
            <div className="col-md-12 location-info">
              <div className="container">
                <div className="row">
                  {getStoreByCityId_data &&
                    getStoreByCityId_data?.map((item: any) => (
                      <CardCom className="card col-md-6 col-12">
                        {/* <img className="main-img img-fluid mb-4" src={item.store_image || Image.DefaultDetailCard} alt="" /> */}
                        <div className="branch">
                          <TextCom weight="xl">{item.shop_name}</TextCom>
                          {item.address && (
                            <div className="address d-flex gap-2  mb-3 align-items-start mb-4 mt-3">
                              <img src={Icon.map} alt="" />
                              <TextCom color="textsecondary">{item.address}</TextCom>
                            </div>
                          )}
                          {item.phone && (
                            <div className="phone d-flex  mb-3 mt-2">
                              <img src={Icon.phone} alt="" />
                              {item.phone?.split(',').map((phone: any) => (
                                <TextCom as="a" link color="textsecondary" href={'tel:' + phone}>
                                  {phone}
                                </TextCom>
                              ))}
                            </div>
                          )}
                          {item.email && (
                            <div className="mail d-flex gap-2  mb-3">
                              <img src={Icon.mail} alt="" />
                              <TextCom as="a" link color="textsecondary" href={'mailto:' + `${item.email}`}>
                                {item.email}
                              </TextCom>
                            </div>
                          )}
                        </div>
                      </CardCom>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
