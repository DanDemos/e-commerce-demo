import React, { useEffect } from 'react'
import Media from 'react-media'

import { TextCom, CardCom, ButtonCom, Container, NewsCard } from 'components'
import { useOther, useHandleOther } from 'hook'

import { BsCalendar4Event } from 'react-icons/bs'
import './style.scss'

export type IAboutUsProps = {}

export const AboutUs: React.FC<IAboutUsProps> = props => {
  const { dispatch, OtherAction, langStore, getPageCode_data, getNewsActivityList_data } = useOther()
  const { translate } = useHandleOther()
  const langCode = langStore?.code

  useEffect(() => {
    dispatch(OtherAction.getPageCode({ code: 'about-us', lang: langCode }))
    dispatch(OtherAction.getNewsActivityList({ lang: langCode }))
  }, [langCode])

  return (
    <Container className="container aboutus">
      <section className="row about-section">
        <div className="col-lg-6">
          <TextCom as="h1" size="xxxxl" weight="600">
            {getPageCode_data?.name}
          </TextCom>
          <TextCom dangerouslySetInnerHTML={{ __html: getPageCode_data?.description }} />
          {/* <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1xzGF6WYAZLVFjh6CYUr9xLoA2pZiNIw&ehbc=2E312F%22"  width="640" height="480"></iframe> */}

          <div style={{ width: '100%', height: '400px', overflow: 'hidden', marginTop: '30px' }}>
            <iframe style={{ marginTop: '-70px' }} referrerPolicy="" title="Google Map" width="100%" height="400" frameBorder="0" src="https://www.google.com/maps/d/u/0/embed?mid=1xzGF6WYAZLVFjh6CYUr9xLoA2pZiNIw&ehbc=2E312F%22&iwloc=nodisplay" allowFullScreen></iframe>
          </div>
        </div>
        <div className="col-lg-6">
          <img className="img-fluid border-radius" src={getPageCode_data?.image} alt="" />
        </div>
      </section>
      <section className="row mission-section">
        {getPageCode_data?.meta?.length > 0 &&
          getPageCode_data?.meta?.map((meta: any) => (
            <div className="col-lg-4">
              <CardCom className="card">
                <div className="d-flex flex-row flex-lg-column  align-items-center justify-content-lg-start align-items-lg-start gap-3 gap-lg-0">
                  <img className="img-fluid" src={meta?.image} alt="" />
                  <TextCom size="xxxl" weight="lg" color="dark" style={{ display: 'inline-block' }}>
                    {meta?.title}
                  </TextCom>
                </div>
                <TextCom color="paragraph">{meta?.message}</TextCom>
              </CardCom>
            </div>
          ))}
      </section>
      {getNewsActivityList_data && getNewsActivityList_data?.length > 0 && (
        <Media query={{ minWidth: 992 }}>
          {matches =>
            matches ? (
              <section className="row news-section">
                <TextCom as="h1" size="xxxxl" weight="xl">
                  {translate('latest-news-and-activity', 'Latest News and Activity')}
                </TextCom>
                {getNewsActivityList_data &&
                  getNewsActivityList_data?.news_activity_list?.slice(0, 3).map((data: any) => (
                    <div className="col-lg-4">
                      <NewsCard data={data} />
                    </div>
                  ))}
                <div style={{ display: 'flex', justifyContent: 'center' }} className="view-btn">
                  <ButtonCom as="a" href="/news_and_activity" btntype="outline" bgcolor="light" borderColor="dark" btnBorderRadius="xxxs" text={translate('view-more', 'View More')} />
                </div>
              </section>
            ) : (
              <></>
            )
          }
        </Media>
      )}
    </Container>
  )
}
