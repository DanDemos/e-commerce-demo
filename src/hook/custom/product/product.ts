import { useEffect, useState } from 'react'
import { useProduct, useCart, useOther } from '../../common'
import { useNavigate, useLocation } from 'react-router-dom'

import { useHandleOther } from '../other'

const queryString = require('query-string')
type Props = {}

export const useHandleProduct = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { langStore } = useOther()
  const { translate } = useHandleOther()
  let langCode = langStore?.code

  const [sorting, setSorting] = useState('')
  const [price, setPrice] = useState({
    min_price: '',
    max_price: '',
    price_filter: false
  })
  const { getBrandList_data, getProductCategory_data, dispatch, ProductAction, getCountryOrigin_data } = useProduct()
  const { getAllLocation_data, CartAction } = useCart()
  // useEffect(() => {
  //   dispatch(CartAction.getAllLocation({ lang: langCode }))
  // }, [langCode])


  useEffect(() => {
    let filter_obj = {
      category_ids: getProductCategory_data?.selected_ids,
      brand_ids: getBrandList_data?.selected_ids,
      country_id: getCountryOrigin_data?.selected_ids,
      min_price: price?.min_price || '',
      max_price: price?.max_price || '',
      sort_by: sorting
    }
    const stringified = queryString.stringify(filter_obj, { skipEmptyString: true, skipNull: true, arrayFormat: 'comma' })
    if (getAllLocation_data?.selected_ids || getBrandList_data?.selected_ids || getProductCategory_data?.selected_ids) {
      if (location?.pathname?.includes('/products') && location?.search?.includes('brand_ids')) {
        navigate({
          pathname: '/products',
          search: `?${stringified}`
        })
      }
    }
  }, [getAllLocation_data?.selected_ids, getCountryOrigin_data?.selected_ids, getBrandList_data?.selected_ids, sorting, price, getProductCategory_data?.selected_ids])

  type handleProductFilterProps = {
    type?: string, // category, brand, location, min_price, max_price
    event?: any,
    id?: any,
    key?: any,
    max_price?: any
  }

  const handleProductFilterChange = async ({ type, event, id, key, max_price, ...obj }: handleProductFilterProps) => {
    if (type === 'category') {
      handleCategoryCheck(key, type, max_price)
    } else if (type === 'brand') {
      handleBrandsCheck(id, type)
    }
    else if (type === 'country') {
      handleCountryCheck(id, type)
    }
    else if (type === 'location') {
      handleLocationCheck(id, type)
    } else if (type === 'min_price') {
      handlePriceChange(type, event)
    } else if (type === 'max_price') {
      handlePriceChange(type, event)
    } else if (type === 'clear_all') {
      // await handleCategoryCheck(key, type)
      await handleBrandsCheck(id, type)
      await handleCountryCheck(id, type)
      await handlePriceChange(type, event)
      await handleLocationCheck(id, type)
      // window.scrollTo(0, 0)
    }
  }

  const handleCategoryCheck = async (key: string, type?: string, max_price?: any) => {
    dispatch(ProductAction.setProductCategory({ key, actionType: type, max_price }))
  }

  const handleBrandsCheck = (id: any, type?: string) => {
    dispatch(ProductAction.setBrandList({ type: 'ID', checkListItem: getBrandList_data, data: id, actionType: type }))
  }

  const handleCountryCheck = (id: any, type?: string) => {
    dispatch(ProductAction.setCountryList({ type: 'ID', checkListItem: getCountryOrigin_data, data: id, actionType: type }))
  }

  const handleLocationCheck = (id: any, type?: string) => {
    dispatch(CartAction.setLocationList({ type: 'id', checkListItem: { data: getAllLocation_data?.data?.[0]?.state_ids }, data: id, actionType: type }))
  }

  const handlePriceChange = (type: string, event: any) => {
    if (type === 'clear_all') {
      setPrice({
        ...price,
        min_price: '',
        max_price: '',
      })
    }
  }


  let sort_by = [
    {
      name: translate('price-from-low', 'Price from low'),
      value: 'PRICEFROMLOW'
    },
    {
      name: translate('price-from-high', 'Price from high'),
      value: 'PRICEFROMHIGH'
    }
  ]

  return {
    handleCategoryCheck,
    handleBrandsCheck,
    handleLocationCheck,
    // handlePriceFilter,
    handlePriceChange,
    handleProductFilterChange,
    price,
    setPrice,
    sort_by,
    sorting,
    setSorting,
  }
}