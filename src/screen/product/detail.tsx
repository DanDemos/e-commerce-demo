import React, { useEffect, useRef } from 'react'
import Media from 'react-media'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { FaYoutube } from 'react-icons/fa'
import { IoPlayCircleOutline } from 'react-icons/io5'

import { DetailPreview, NewArrivalSlider, Container, TextCom, NewTabCom, CollapseCom, CollapsePanel, SearchCom, SkeletonWrap, Loading } from 'components'
import { useOther, useHandleOther, useProduct, useAuth } from 'hook'
import { colors, StyledDetail } from 'theme'

export type IProductDetailProps = {
  ref?: any
}
export const ProductDetial: React.FC<IProductDetailProps> = props => {
  const params = useParams()
  const navigate = useNavigate()
  const { getMetaData_data, langStore, OtherAction, dispatch } = useOther()
  const { getProductById_data, ProductAction } = useProduct()
  const { translate } = useHandleOther()
  const langCode = langStore?.code

  let GetDetailItem = Number(params?.id)
  useEffect(() => {
    dispatch(ProductAction.getProductById({ id: GetDetailItem, langCode }))
  }, [GetDetailItem, langCode])

  const dataSource = [
    {
      title: translate('detail', 'Detail'),
      desc: `${getProductById_data?.description?.detail}`,
      key: 'detail',
      header_render: (x: any, y: any, i: any, active: any) => {
        return (
          getProductById_data?.description?.detail.length > 0 && (
            <div className={`title_wrap ${active ? 'active' : undefined} mb-3`}>
              <TextCom textAlign="center" color={active ? 'primary' : 'text'} weight="xl">
                DETAIL
              </TextCom>
            </div>
          )
        )
      },
    },
    {
      title: translate('how-to-use', 'How To Use'),
      desc: `${getProductById_data?.description?.howtouse}`,
      key: 'howtouse',
      header_render: (x: any, y: any, i: any, active: any) => {
        return (
          getProductById_data?.description?.howtouse.length > 0 && (
            <div className={`title_wrap ${active ? 'active' : undefined} mb-3`}>
              <TextCom textAlign="center" color={active ? 'primary' : 'text'} weight="xl">
                HOW TO USE
              </TextCom>
            </div>
          )
        )
      },
    },
    {
      title: translate('benefits', 'Benefits'),
      desc: `${getProductById_data?.description?.benefits}`,
      key: 'benefits',
      header_render: (x: any, y: any, i: any, active: any) => {
        return (
          getProductById_data?.description?.benefits.length > 0 && (
            <div className={`title_wrap ${active ? 'active' : undefined} mb-3`}>
              <TextCom textAlign="center" color={active ? 'primary' : 'text'} weight="xl">
                BENEFITS
              </TextCom>
            </div>
          )
        )
      },
    },
    {
      title: translate('result', 'Result'),
      desc: `${getProductById_data?.description?.result}`,
      key: 'result',
      header_render: (x: any, y: any, i: any, active: any) => {
        return (
          getProductById_data?.description?.result.length > 0 && (
            <div className={`title_wrap ${active ? 'active' : undefined} mb-3`}>
              <TextCom textAlign="center" color={active ? 'primary' : 'text'} weight="xl">
                RESULT
              </TextCom>
            </div>
          )
        )
      },
    },
  ]

  const collapse_data = [
    {
      title: translate('detail', 'Detail'),
      desc: getProductById_data?.description?.detail,
    },
    {
      title: translate('howtouse', 'How to use'),
      desc: getProductById_data?.description?.howtouse,
    },
    {
      title: translate('benefits', 'Benefits'),
      desc: getProductById_data?.description?.benefits,
    },
    {
      title: translate('result', 'Result'),
      desc: getProductById_data?.description?.result,
    },
  ]

  let split_video: any = ''
  const videosrc = () => {
    if (getProductById_data?.youtube !== false) {
      if (getProductById_data?.youtube?.includes('=')) {
        split_video = getProductById_data?.youtube?.split('=')[1]
        return `https://www.youtube.com/embed/${split_video}`
      } else if (getProductById_data?.youtube?.includes('https://youtu.be/')) {
        split_video = getProductById_data?.youtube?.split('https://youtu.be/')[1]
        return `https://www.youtube.com/embed/${split_video}`
      } else if (getProductById_data?.youtube?.includes('embed/')) {
        split_video = getProductById_data?.youtube?.split('embed/')[1]
        return `https://www.youtube.com/embed/${split_video}`
      } else {
        return `https://www.youtube.com/embed/${getProductById_data?.youtube}`
      }
    }
  }

  let play_icon = document?.querySelector('.play-icon')
  let poster = document?.querySelector('.poster')
  const vidRef: any = useRef(null)

  const handlePlayVideo = () => {
    if (vidRef.current.paused) {
      vidRef.current.play()
      play_icon?.setAttribute('style', 'display: none')
      // poster?.setAttribute('style', 'display: none')
    } else {
      vidRef.current.pause()
      play_icon?.setAttribute('style', 'display: block')
      // poster?.setAttribute('style', 'display: block')
    }
  }

  //wrapper elements to set loading images
  const alternativeRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Media query={{ maxWidth: 991 }}>{matches => (matches ? <SearchCom placeholder={translate('search', 'Search')} /> : <></>)}</Media>
      {Number(params?.id) === getProductById_data?.product_id ? (
        <StyledDetail>
          <Container>
            <Container className="container-fluid">
              <div className="row">
                <div className="col-lg-9 product-detail-gallery" ref={galleryRef}>
                  <DetailPreview />
                  {
                    <div className="how-to-use">
                      <Media query={{ minWidth: 769 }}>
                        {matches =>
                          matches ? (
                            <>
                              <SkeletonWrap wrapperRef={galleryRef} style={{ minHeight: '150px', borderRadius: '5px' }}>
                                <NewTabCom defaultActiveKey={dataSource?.filter((item: any) => item?.desc !== 'false')?.[0]?.key || ''} dataSource={dataSource} />
                              </SkeletonWrap>
                            </>
                          ) : (
                            <SkeletonWrap wrapperRef={galleryRef}>
                              <CollapseCom accordion defaultActiveKey="0">
                                {collapse_data?.map((data: any, key: any) => {
                                  return (
                                    data?.desc && (
                                      <CollapsePanel header={(isActive: any) => <TextCom weight="xl">{translate(data?.title, data?.title)}</TextCom>} key={key.toString()}>
                                        {/* {handleNestedRenderCategory(category)} */}
                                        <TextCom color="paragraph" weight="sm">
                                          {translate(data?.desc, data?.desc)}
                                        </TextCom>
                                      </CollapsePanel>
                                    )
                                  )
                                })}
                              </CollapseCom>
                            </SkeletonWrap>
                          )
                        }
                      </Media>
                    </div>
                  }

                  {/* video section */}
                  {getProductById_data?.youtube !== false && (
                    <SkeletonWrap wrapperRef={galleryRef} style={{ maxHeight: '300px', borderRadius: '5px', marginBottom: '30px' }}>
                      <div className="video-con">
                        <iframe src={videosrc()} title="" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
                    </SkeletonWrap>
                  )}
                  {getProductById_data?.youtube === false && getProductById_data?.video_link !== '' && (
                    <SkeletonWrap wrapperRef={galleryRef} style={{ maxHeight: '300px', borderRadius: '5px', marginBottom: '30px' }}>
                      <div className="video-con" onClick={handlePlayVideo}>
                        <video ref={vidRef}>
                          <source src={getProductById_data?.video_link} type="video/mp4" alt="video" />
                        </video>
                        <IoPlayCircleOutline className="play-icon" color="white" />
                      </div>
                    </SkeletonWrap>
                  )}
                </div>
                <div className="col-lg-3">
                  <div className="our-support">
                    <div className="d-flex gap-3 mb-4">
                      <img src={getMetaData_data?.['delivery']?.image} alt="" width={30} height="30px" />
                      <div>
                        <TextCom color="dark" weight="xl">
                          {getMetaData_data?.['delivery']?.text_one}
                        </TextCom>
                        <TextCom color="border" weight="sm">
                          {getMetaData_data?.['delivery']?.text_two}
                        </TextCom>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-4">
                      <img src={getMetaData_data?.['payment']?.image} alt="" width={30} height="30px" />
                      <div>
                        <TextCom color="dark" weight="xl">
                          {' '}
                          {getMetaData_data?.['payment']?.text_one}
                        </TextCom>
                        <TextCom color="border" weight="sm">
                          {getMetaData_data?.['payment']?.text_two}
                        </TextCom>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-4">
                      <img src={getMetaData_data?.['return']?.image} alt="" width={30} height="30px" />
                      <div>
                        <TextCom color="dark" weight="xl">
                          {getMetaData_data?.['return']?.text_one}
                        </TextCom>
                        <TextCom color="border" weight="sm">
                          {getMetaData_data?.['return']?.text_two}
                        </TextCom>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mb-4">
                      <img src={getMetaData_data?.['buyer-protection']?.image} alt="" width={30} height="30px" />
                      <div>
                        <TextCom color="dark" weight="xl">
                          {getMetaData_data?.['buyer-protection']?.text_one}
                        </TextCom>
                        <TextCom color="border" weight="sm">
                          {getMetaData_data?.['buyer-protection']?.text_two}
                        </TextCom>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
            {getProductById_data?.alternative_products?.length > 0 && (
              <Container bgcolor="bg1" className="pb-3">
                <TextCom textAlign="center" size="xxxxl" weight="xl">
                  {translate('recommended-products', 'Recommended Products')}
                </TextCom>
                <Container className="container-fluid custom-button pb-5" bgcolor="bg1">
                  <NewArrivalSlider card_data={getProductById_data?.alternative_products} slidesToShow={5} no_border={false} />
                </Container>
              </Container>
            )}
          </Container>
        </StyledDetail>
      ) : (
        <>
          <Loading />
          <div style={{ minHeight: '20vh' }}></div>
        </>
      )}
    </>
  )
}
