import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import Media from 'react-media'

import { Container, TextCom, NewArrivalSlider, ProductCard, PaginationWrap, ProductSideBarFilter, InputCom, ButtonCom, ProductCardMap, SearchCom } from 'components'
import { useHandleOther, useProduct, useHandleProduct, useOther } from 'hook'
import { StyledSearchList } from 'theme'
import Icon from 'asset/icon/luxura'

type SearchListProps = {}

export const SearchList: React.FC<SearchListProps> = props => {
  let { translate, langStore } = useHandleOther()
  let navigate = useNavigate()
  let { getProduct_data, ProductAction, dispatch } = useProduct()
  const { getMetaData_data } = useOther()
  let param = useParams()
  let langCode = langStore?.code

  let [productName, setProductName] = useState('')
  let [search_active, setSearch_active] = useState(false)
  const [current, setCurrent] = useState(1)

  const checkMediaWidth = () => {
    let width = window.innerWidth
    return width > 991 ? 15 : 16
  }

  useEffect(() => {
    let req_obj = {
      lang: langCode,
      page_number: current,
      per_page: checkMediaWidth(),
      keywords: param?.keyword,
    }
    dispatch(ProductAction.getProduct(req_obj))
  }, [param?.keyword, current, langCode])

  const handleSearch = (e: any) => {
    productName !== '' && navigate(`/search/${encodeURI(productName)}`)
    setSearch_active(!search_active)
  }

  const onChangePaginate = (pagenumber: any) => {
    setCurrent(pagenumber)
  }

  return (
    <StyledSearchList>
      {getProduct_data?.product_list?.length > 0 ? (
        <Media query={{ maxWidth: 991 }}>
          {matches =>
            matches ? (
              <div style={{ marginBottom: '-20px' }}>
                <SearchCom placeholder={translate(param?.keyword, param?.keyword)} />
              </div>
            ) : (
              <Container className="container-fluid product-search" style={{ paddingBottom: '0px', marginBottom: '-20px' }}>
                <div className={`search-con ${search_active === true ? 'active' : ''}`}>
                  <InputCom isValidate={false} placeholder={translate(param?.keyword, param?.keyword)} type="text" value={productName} onChange={(e: any) => setProductName(e.target.value)} onKeyPress={(e: any) => e.key === 'Enter' && handleSearch(e)} />
                  <FiSearch size={25} onClick={e => handleSearch(e)} />
                  <ButtonCom text={translate('search', 'Search')} bgcolor="dark" color="light" btnBorderRadius="xxxs" onClick={e => handleSearch(e)} />
                </div>
              </Container>
            )
          }
        </Media>
      ) : (
        <></>
      )}
      <Container className="container-fluid product-search">
        {getProduct_data?.product_list?.length > 0 ? (
          <div className="search-result-con">
            <TextCom size="xxl" weight="xl">
              {translate('search-result-for', 'Search Result for')} "{translate(param?.keyword, param?.keyword)}"
            </TextCom>
            <TextCom color="border">Items : {getProduct_data?.total_products || '0'}</TextCom>
            <div className="product-con">
              <div className="row">{getProduct_data && <ProductCardMap data={getProduct_data?.product_list} className="cu-card-width" />}</div>
            </div>
            <div className="pagination-con">
              <PaginationWrap onChange={onChangePaginate} current={current} total={getProduct_data?.total_products} defaultPageSize={15} />
            </div>
          </div>
        ) : (
          <>
            <TextCom size="xxl" weight="xl">
              {translate('search-result-for', 'Search Result for')} "{translate(param?.keyword, param?.keyword)}"
            </TextCom>
            <TextCom color="border">
              {translate('items', 'Items')} : {getProduct_data?.total_products || '0'}
            </TextCom>
            <div className="no-result-con">
              <img src={Icon.SearchIconLarge} alt="search-icon" />
              <TextCom size="xxxl" weight="xl" className="title">
                {translate('no-result', 'Search No Result')}
              </TextCom>
              <TextCom className="desc">{getMetaData_data['no-search-result']?.text_one}</TextCom>
            </div>
          </>
        )}
      </Container>
    </StyledSearchList>
  )
}
