import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiUser, FiHeart, FiFileText } from 'react-icons/fi'

import { CardCom, TextCom } from 'components'
import './style.scss'

type ProfileSideBarProps = {
  data?: any[]
}

export const ProfileSidebar: React.FC<ProfileSideBarProps> = ({ data, ...props }) => {
  const navigate = useNavigate()
  const pageCode = useParams()

  const OnHandleRoute = (route: any) => {
    navigate(route)
  }

  return (
    <CardCom className="profile-sidebar">
      {data?.map((x: any, i: any) => (
        <div className={`item_con d-flex ${x.key === pageCode && 'active'}`} key={i}>
          {x?.key === 'profile' ? <FiUser /> : x?.key === 'wishlist' ? <FiHeart /> : x?.key === 'my_orders' ? <FiFileText /> : <></>}
          <TextCom weight="xl" onClick={() => OnHandleRoute(x.route)}>
            {x.name}
          </TextCom>
          <hr />
        </div>
      ))}
    </CardCom>
  )
}
