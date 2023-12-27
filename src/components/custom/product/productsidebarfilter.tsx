import React, { useEffect, useState } from 'react'
import Media from 'react-media'

import { FiPlus, FiMinus } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { BsSliders } from 'react-icons/bs'

import { TextCom, CollapseCom, CollapsePanel, ButtonCom, RangeSliderCom } from 'components'
import { useHandleOther, useProduct, useHandleProduct } from 'hook'
import Icon from 'asset/icon/luxura'

type ProductSideBarFilterProps = {
  priceVal?: any
  handleprice?: any
  setprice?: any
}

export const ProductSideBarFilter: React.FC<ProductSideBarFilterProps> = ({ priceVal, handleprice, setprice }) => {
  const location = useLocation()
  const { getProductCategory_data, getBrandList_data, getCountryOrigin_data, ProductAction, dispatch } = useProduct()
  const { handleProductFilterChange } = useHandleProduct()
  const { translate } = useHandleOther()

  const open_tab = getProductCategory_data?.key?.split('-')
  const onHandleChange = (filter_change_obj: any) => {
    handleProductFilterChange(filter_change_obj)
  }

  let rangemin = document.querySelector('input.range-min')
  let pricemin = document.querySelector('input#price-min')
  let rangemax = document.querySelector('input.range-max')
  let pricemax = document.querySelector('input#price-max')

  useEffect(() => {
    if (rangemin && pricemin && rangemax && pricemax) {
      rangemin.value = 0
      pricemin.value = 0
      rangemax.value = getProductCategory_data?.max_price
      pricemax.value = getProductCategory_data?.max_price
      priceVal({
        min_price: '',
        max_price: '',
      })
    }
  }, [getProductCategory_data?.max_price])

  const handleCategoryChange = (item?: any) => {
    if (item?.item?.sub_category?.length === 0) {
      onHandleChange({ type: 'category', key: item?.item?.key, max_price: item?.item?.price_filter_max })
    }
  }

  let brand_id: any = []
  if (location.search.includes('brand')) {
    brand_id.push(location.search.split('=')[1])
  }
  let cate_id: any = []
  if (location.search.includes('category')) {
    cate_id.push(location.search.split('=')[1])
  }
  const handleNestedRenderCategory = (category: any) => {
    return (
      category?.sub_category?.length > 0 && (
        <CollapseCom accordion expandIcon={({ isActive }: any) => (isActive ? <FiMinus /> : <FiPlus />)} handleChange={handleCategoryChange} defaultActiveKey={[open_tab?.length > 2 ? open_tab?.[1] : '']}>
          {category?.sub_category?.map((subcategory: any, index: any) => (
            <CollapsePanel header={() => <TextCom color={(getProductCategory_data?.selected_ids || Number(cate_id[0])) == subcategory?.category_id ? 'primary' : 'text'}>{subcategory?.category_name}</TextCom>} item={subcategory} key={index.toString()}>
              {handleNestedRenderCategory(subcategory)}
            </CollapsePanel>
          ))}
        </CollapseCom>
      )
    )
  }

  const filterHandlerMobile = () => {
    let collapseCon = document.querySelector('.filter-con')
    collapseCon?.classList.toggle('open')
  }

  useEffect(() => {
    dispatch(ProductAction.getCountryOrigin({ category_id: getProductCategory_data?.selected_ids || '' }))
  }, [getProductCategory_data?.selected_ids])

  return (
    <>
      <div className="d-flex filter-btns">
        <ButtonCom type="outline" bgcolor="transparent" btnBorderRadius="xxxs" onClick={filterHandlerMobile}>
          {/* <BsSliders /> */}
          <img src={Icon.FilterIcon} />
          <Media query={{ minWidth: 992 }}>
            {matches =>
              matches ? (
                <TextCom size="lg" weight="sm">
                  {translate('filter-by', 'Filter By')}
                </TextCom>
              ) : (
                <TextCom size="lg" weight="sm">
                  {translate('filter', 'Filter')}
                </TextCom>
              )
            }
          </Media>
        </ButtonCom>
      </div>
      <div className="filter-by d-flex">
        <div className="d-flex">
          <img src={Icon.FilterIcon} style={{ marginRight: '5px' }} />
          {/* <BsSliders /> */}
          <TextCom size="lg" weight="sm" color="dark">
            {translate('filter-by', 'Filter By')}
          </TextCom>
        </div>
      </div>
      <div className="collapse-con">
        <CollapseCom defaultActiveKey={['1', '2', '3', '4']}>
          <CollapsePanel
            header={(isActive: any) => (
              <TextCom size="lg" weight="xl" color="dark">
                {translate('category', 'Category')}
              </TextCom>
            )}
            className="category-collapse"
            key="1"
            style={{ paddingTop: '3px' }}
          >
            <CollapseCom expandIcon={({ isActive }: any) => (isActive ? <FiMinus /> : <FiPlus />)} handleChange={handleCategoryChange} defaultActiveKey={[open_tab?.[0] || '']}>
              {getProductCategory_data?.data?.map((category: any, index: any) => (
                <CollapsePanel
                  header={() => (
                    <TextCom weight="lg" color={getProductCategory_data?.selected_ids == category?.category_id ? 'primary' : 'text'} onClick={() => {}}>
                      {category?.category_name}
                    </TextCom>
                  )}
                  item={category}
                  key={index.toString()}
                  className=""
                >
                  {handleNestedRenderCategory(category)}
                </CollapsePanel>
              ))}
            </CollapseCom>
          </CollapsePanel>
          <hr />
          <CollapsePanel header={(isActive: any) => <TextCom weight="xl">{translate('brand', 'Brand')}</TextCom>} className="multi-collapse brand" key="2">
            {getBrandList_data && getBrandList_data?.data?.map((brand: any, key: any) => <ButtonCom type="outline" bgcolor="transparent" btnBorderRadius="0" text={brand?.name} key={key} className={brand?.check || Number(brand_id[0]) === brand?.ID ? 'selected' : undefined} onClick={() => onHandleChange({ type: 'brand', id: brand?.ID })} />)}
          </CollapsePanel>
          <hr />
          <CollapsePanel
            header={(isActive: any) => (
              <TextCom weight="xl">
                {translate('price', 'Price')}({translate('ks', 'ks')})
              </TextCom>
            )}
            className="price-collapse"
            key="3"
          >
            <RangeSliderCom change={(type?: string, value?: any) => handleprice({ type, value })} setprice={setprice} />
          </CollapsePanel>
          <hr />
          <CollapsePanel header={(isActive: any) => <TextCom weight="xl">{translate('country-of-origin', 'Country of Origin')}</TextCom>} className="multi-collapse country" key="4">
            {getCountryOrigin_data?.data?.length > 0 && getCountryOrigin_data?.data?.map((x: any, i: number) => <ButtonCom type="outline" bgcolor="transparent" btnBorderRadius="0" text={x?.name} key={i} className={x?.check ? 'selected' : undefined} onClick={() => onHandleChange({ type: 'country', id: x?.ID })} />)}
          </CollapsePanel>
          <hr />
        </CollapseCom>
      </div>
    </>
  )
}
