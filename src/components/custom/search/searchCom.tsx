import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import { useHandleOther } from 'hook'
import { InputCom } from 'components'
import './style.scss'

type SeachComProps = {
  placeholder?: any
}

export const SearchCom: React.FC<SeachComProps> = props => {
  let [productName, setProductName] = useState('')
  let [search_active, setSearch_active] = useState(false)
  let navigate = useNavigate()
  const { translate, langStore } = useHandleOther()

  const handleSearch = (e: any) => {
    productName !== '' && navigate(`/search/${encodeURI(productName)}`)
    setSearch_active(!search_active)
    setProductName('')
  }

  return (
    <div className={`search-con-mobile ${search_active === true ? 'active' : ''}`}>
      <InputCom isValidate={false} placeholder={props.placeholder} type="text" value={productName} onChange={(e: any) => setProductName(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch(e)} />
      <FiSearch size={25} onClick={e => handleSearch(e)} />
    </div>
  )
}
