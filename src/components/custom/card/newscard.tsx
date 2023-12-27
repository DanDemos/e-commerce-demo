import React, { useRef } from 'react'
import { BsCalendarEvent } from 'react-icons/bs'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import moment from 'moment'
import { CardCom, TextCom, SkeletonWrap } from 'components'
import './style.scss'
import { useHandleOther } from 'hook'
import Icon from '../../../asset/icon/luxura'
type NewsCardProps = {
  data?: any
  landscape?: boolean
}

export const NewsCard: React.FC<NewsCardProps> = ({ data, landscape, ...props }) => {
  const { translate } = useHandleOther()

  const imgRef = useRef<HTMLDivElement>(null)

  return (
    <CardCom className={landscape ? 'landscape' : 'news-card'} {...props}>
      <a className="link" href={'/news_and_activity_detail/' + (data?.news_activity_id ? data?.news_activity_id : data?.id)} />
      <div className="img" ref={imgRef}>
        {!landscape ? (
          <SkeletonWrap>
            <img className="img-fluid" src={data?.feature_image || Icon.NewDefaultImg} alt="" />
          </SkeletonWrap>
        ) : (
          <img className="img-fluid" src={data?.feature_image || Icon.NewDefaultImg} alt="" />
        )}
      </div>
      <div className="content">
        {data?.date !== false &&
          (!landscape ? (
            <SkeletonWrap wrapperRef={imgRef} borderRadius="5px">
              <div className="d-flex gap-2 align-items-center">
                <BsCalendarEvent />
                <TextCom>{moment(data?.date).format('DD/MM/YYYY')}</TextCom>
              </div>
            </SkeletonWrap>
          ) : (
            <div className="d-flex gap-2 align-items-center">
              <BsCalendarEvent />
              <TextCom>{moment(data?.date).format('DD/MM/YYYY')}</TextCom>
            </div>
          ))}
        {!landscape ? (
          <SkeletonWrap wrapperRef={imgRef} borderRadius="5px">
            <TextCom weight="xxl" size="xl">
              {data?.title || data?.name}
            </TextCom>
          </SkeletonWrap>
        ) : (
          <TextCom weight="xxl" size="xl">
            {data?.title || data?.name}
          </TextCom>
        )}
        {!landscape && (
          <SkeletonWrap wrapperRef={imgRef} borderRadius="5px">
            <>
              <TextCom as="div" className="desc" dangerouslySetInnerHTML={{ __html: data?.description }} />
              <TextCom link color="primary" className="d-flex gap-2 readmore">
                {translate('read-more', 'Read More')}
                <HiOutlineArrowNarrowRight color="#0491A4" />
              </TextCom>
            </>
          </SkeletonWrap>
        )}
      </div>
    </CardCom>
  )
}
