import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiHeart, FiFileText } from 'react-icons/fi'

import { TextCom, CardCom, ButtonCom, Container, FormContainerCom, InputCom, NewTabCom } from 'components'
import { useOther, useHandleOther, useHandleAuth, useAuth } from 'hook'
import { StyledProfileEditCon } from 'theme'
import './style.scss'

type ProfileEditProps = {}

export const ProfileEdit: React.FC<ProfileEditProps> = props => {
  const { translate } = useHandleOther()
  const { handleUpdateProfile } = useHandleAuth(props)
  const { getProfile_data } = useAuth()

  const dataSource = [
    {
      title: translate('profile', 'profile'),
      key: 'profile',
      desc: ' ',
      link: '/user/profile',
      icon: <FiUser color="#262626" />,
    },
    {
      title: translate('wishlist', 'Wishlist'),
      key: 'wishlist',
      link: '/user/wishlist',
      icon: <FiHeart color="#262626" />,
    },
    {
      title: translate('order-history', 'Order History'),
      key: 'order-history',
      link: '/user/my_orders',
      icon: <FiFileText color="#262626" />,
    },
  ]

  const onHandleDataSubmit = async (values: any, actions: any) => {
    actions.setSubmitting(true)
    setTimeout(async () => {
      let postData: any = {
        name: values?.name,
        email: values?.email,
      }
      handleUpdateProfile(postData)
      actions.setSubmitting(false)
    }, 1000)
  }

  let initialValues = {
    name: getProfile_data?.name,
    email: getProfile_data?.email,
  }

  const validationSchema = (yup: any) =>
    yup.object({
      name: yup.string().required(`${translate('name_required', 'Name is required')}`),
      email: yup.string().email(),
    })

  return (
    <StyledProfileEditCon>
      <Container className="profile-edit-con container-fluid">
        <Container className="container-fluid">
          <div className="tab">
            <NewTabCom defaultActiveKey="profile" dataSource={dataSource} />
          </div>
          <TextCom size="31" weight="lg" className="title">
            {translate('edit-profile', 'Edit profile')}
          </TextCom>
          <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values: any, actions: any) => onHandleDataSubmit(values, actions)}>
            {(formikProps: any) => {
              return (
                <div className="info">
                  <div>
                    <InputCom name="name" type="text" label={translate('name', 'Name')} required />
                    <InputCom type="email" name="email" label={translate('email', 'Name')} />
                  </div>
                  <div className="buttons d-flex">
                    <Link to="/user/profile">
                      <ButtonCom text={translate('cancel', 'Cancel')} type="outline" bgcolor="transparent" />
                    </Link>
                    <ButtonCom type="submit" text={translate('save', 'Save')} bgcolor="dark" color="light" />
                  </div>
                </div>
              )
            }}
          </FormContainerCom>
        </Container>
      </Container>
    </StyledProfileEditCon>
  )
}
