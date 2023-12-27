import React, { useEffect, useState } from 'react'

import { TextCom, Container, NewsCard, PaginationWrap } from 'components'
import { useHandleOther, useOther } from 'hook'
import './style.scss'

type NewsActivityListProps = {}

export const NewsActivity: React.FC<NewsActivityListProps> = props => {
  const { translate, langStore } = useHandleOther()
  const { getPageCode_data, getNewsActivityList_data, OtherAction, dispatch } = useOther()
  const langCode = langStore?.code
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    dispatch(OtherAction.getNewsActivityList({ lang: langCode, page_no: current, per_page: 12 }))
    window.scrollTo({ left: 0, top: 0, behavior: 'instant' })
  }, [current, langCode])

  const onChangePaginate = (pagenumber: any) => {
    setCurrent(pagenumber)
  }

  return (
    <Container className="container-fluid news-and-activity">
      <TextCom className="title" size="xxxxxl" weight="xl">
        {translate('news-activity', 'News & Activity')}
      </TextCom>
      <div className="row">
        {getNewsActivityList_data &&
          getNewsActivityList_data?.news_activity_list?.map((item: any) => {
            return (
              <div className="col-lg-4 col-sm-6 col-12">
                <NewsCard data={item} />
              </div>
            )
          })}
      </div>
      <div className="pagination-con">
        <PaginationWrap onChange={onChangePaginate} current={current} total={getNewsActivityList_data?.total_count} defaultPageSize={12} />
      </div>
    </Container>
  )
}
