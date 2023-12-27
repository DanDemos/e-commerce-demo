import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { CardCom, TextCom } from 'components'
import './style.scss'

type StaticSideBarProps = {
  data?: any[]
  route?: any
  classname?: any
  style?: any
}
export const StaticSidebar: React.FC<StaticSideBarProps> = ({ data, route, classname, style, ...props }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const OnHandleRoute = (id?: any, link?: any) => {
    if (id) navigate(route + id)
    if (link) {
      navigate(route + link)
    }
  }

  const checkId = () => {
    if (isNaN(Number(id))) {
      return id
    } else {
      return Number(id)
    }
  }

  return (
    <CardCom className={`${classname} static-sidebar`} style={style}>
      {data?.map((x, i) => (
        <div className={`item_con ${x?.id ? (x?.id === checkId() ? 'active' : '') : location?.pathname === x?.link ? 'active' : ''}`} key={i}>
          <TextCom weight="xl" onClick={() => OnHandleRoute(x?.id || x?.link)}>
            {x.name}
          </TextCom>
          <hr />
        </div>
      ))}
    </CardCom>
  )
}
