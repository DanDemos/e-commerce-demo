import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BsCalendar4Event, BsArrowLeft } from 'react-icons/bs'
import { FaYoutube } from 'react-icons/fa'
import moment from 'moment'

import { TextCom, CardCom, ButtonCom, Container, NewsCard, RSSliderCom } from 'components'
import { useOther, useHandleOther } from 'hook'
import './style.scss'

type INewsActivityDetailProps = {}

export const NewsActivityDetail: React.FC<INewsActivityDetailProps> = props => {
  const param = useParams()
  const { getNewsActivityDetail_data, getNewsActivityList_data, OtherAction, dispatch } = useOther()
  const { translate, langStore } = useHandleOther()

  const langCode = langStore?.code

  useEffect(() => {
    dispatch(OtherAction.getNewsActivityList({ lang: langCode, page_no: 1, per_page: getNewsActivityList_data?.total_count }))
    dispatch(OtherAction.getNewsActivityDetail({ id: param?.id, lang: langCode }))
  }, [langCode])

  let array: any = null
  if (getNewsActivityList_data) {
    array = [...getNewsActivityList_data?.news_activity_list]
  }

  // let reversed_arr = array.reverse()

  let rsProps = {
    dots: false,
    fade: true,
    arrows: true,
    adaptiveHeight: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  let split_video: any = ''
  const videosrc = () => {
    if (getNewsActivityDetail_data?.youtube) {
      if (getNewsActivityDetail_data?.youtube?.includes('=')) {
        split_video = getNewsActivityDetail_data?.youtube?.split('=')[1]
        return `https://www.youtube.com/embed/${split_video}`
      } else if (getNewsActivityDetail_data?.youtube?.includes('https://youtu.be/')) {
        split_video = getNewsActivityDetail_data?.youtube?.split('https://youtu.be/')[1]
        return `https://www.youtube.com/embed/${split_video}`
      } else {
        return `https://www.youtube.com/embed/${getNewsActivityDetail_data?.youtube}`
      }
    }
  }

  return (
    <Container className="news-activity-detail container-fluid">
      <div className="row">
        <div className="news-content col-lg-7">
          <div className="slider-con">{getNewsActivityDetail_data?.gallery.length === 0 ? <img src={getNewsActivityDetail_data?.feature_image} /> : <RSSliderCom rsProps={rsProps} data={getNewsActivityDetail_data?.gallery.length > 0 ? getNewsActivityDetail_data?.gallery : ''} />}</div>
          <div className="d-flex gap-2">
            <BsCalendar4Event />
            <TextCom>{getNewsActivityDetail_data && moment(getNewsActivityDetail_data?.date).format('DD/MM/YYYY')}</TextCom>
          </div>
          <TextCom weight="xxl" size="xl">
            {translate(getNewsActivityDetail_data && getNewsActivityDetail_data?.title, getNewsActivityDetail_data && getNewsActivityDetail_data?.title)}
          </TextCom>
          <TextCom as="div" dangerouslySetInnerHTML={{ __html: getNewsActivityDetail_data?.description }} className="mb-4" />

          {getNewsActivityDetail_data?.youtube !== false && <iframe width="100%" height="400" src={videosrc()} title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}

          {/* -------video autoplay ----------*/}
          {/* <div className='video-con' onClick={handlePlayVideo}> */}
          {/* <img className='poster' src={require('asset/img/demo/news3.png')} alt="poster-image" /> */}

          {/* <video ref={vidRef}>
              <source src='https://www.youtube.com/watch?v=7rwxq1CmZhI' type="video/mp4" />
            </video> */}
          {/* <FaYoutube className='play-icon' />
          </div> */}

          <Link to="/news_and_activity">
            <ButtonCom
              type="outline"
              bgcolor="transparent"
              btnBorderRadius="5"
              text={
                <>
                  <BsArrowLeft />
                  {translate('back-to-list', 'Back To List')}
                </>
              }
            />
          </Link>
        </div>
        {getNewsActivityList_data && (
          <div className="sidebar col-lg-4">
            <TextCom size="xxxl" weight="xl">
              {translate('latest-news', 'Latest News')}
            </TextCom>
            <hr />

            {getNewsActivityList_data?.news_activity_list?.slice(0, 6).map((item: any) => {
              return <NewsCard landscape data={item} />
            })}
          </div>
        )}
      </div>
    </Container>
  )
}
