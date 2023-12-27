import React, { useEffect, useState } from 'react'

import { FiEdit, FiKey, FiPlus, FiUser, FiHeart, FiFileText } from 'react-icons/fi'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { MdLocationOn } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { TbCrown } from 'react-icons/tb'
import { FaQuestion } from 'react-icons/fa'

import { useHandleOther, useAuth, useCart, useHandleCart } from 'hook'
import { TextCom, ButtonCom, Container, NewTabCom, ModalCom, FormContainerCom, InputCom } from 'components'
import { StyledProfileCon } from 'theme'
import './style.scss'
import { Captialize } from 'utils'

type ProfileProps = {}
export const Profile: React.FC<ProfileProps> = props => {
  const { translate, langStore } = useHandleOther()

  const { getProfile_data, AuthAction } = useAuth()

  const { CartAction, dispatch, getShippingLocations_data, getShippingAddressById_data, getShippingAddress_data } = useCart()

  const { handleCreateShippingAddress, handleEditShippingAddress, handleDeleteShippingAddress } = useHandleCart()

  const langCode = langStore?.code
  const [isModal, setIsModal] = useState(false)
  const [modalType, setModalType] = useState({
    type: '',
    id: '',
  })
  const [deletenoti, setDeletenoti] = useState(false)
  useEffect(() => {
    dispatch(AuthAction.getProfile())
    dispatch(CartAction.getShippingAddress())
    dispatch(CartAction.getShippingLocations('MM'))
  }, [langCode])

  const dataSource = [
    {
      title: translate('profile', 'profile'),
      key: 'profile',
      desc: ' ',
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

  let initialValues = {
    name: modalType.type === 'edit' ? getShippingAddressById_data && getShippingAddressById_data[0]?.name : '',
    phone: modalType.type === 'edit' ? getShippingAddressById_data && getShippingAddressById_data[0]?.mobile : '',
    state: modalType.type === 'edit' ? getShippingAddressById_data && getShippingAddressById_data[0]?.state?.id : '',
    township: modalType.type === 'edit' ? getShippingAddressById_data && getShippingAddressById_data[0]?.township?.id : '',
    address: modalType.type === 'edit' ? getShippingAddressById_data && getShippingAddressById_data[0]?.address1 : '',
  }

  const handleModal = async (type: any, id?: any) => {
    setModalType({ type: type, id: id })
    setIsModal(!isModal)
  }

  useEffect(() => {
    if (modalType?.type === 'edit') {
      dispatch(CartAction.getShippingAddressById(modalType?.id))
    }
  }, [modalType?.type, modalType?.id])

  const onHandleDataSubmit = async (values: any, actions: any) => {
    actions.setSubmitting(true)
    setTimeout(async () => {
      let postData = {
        name: values?.name,
        address: values?.address,
        state: values?.state,
        township: values?.township,
        user_phone: values?.phone,
      }
      if (modalType.type === 'edit') {
        handleEditShippingAddress({
          ...postData,
          edit_id: getShippingAddressById_data[0]?.id,
        })
      } else handleCreateShippingAddress(postData)
      actions.setSubmitting(false)
    }, 1000)
    setIsModal(!isModal)
  }
  const validationSchema = (yup: any) =>
    yup.object({
      name: yup.string().required(`${translate('name_required', 'Name is required')}`),
      phone: yup.string().required('Phone no is requried'),
      state: yup.string(),
      township: yup.string(),
      address: yup.string(),
    })
  const [ID, setid] = useState(0)
  const onHandleDelete = async (from?: any, id?: number) => {
    if (from === 'delete' && id) {
      setid(id)
      setDeletenoti(prev => !prev)
    } else {
      handleDeleteShippingAddress(ID)
      setDeletenoti(prev => !prev)
    }
  }

  const handleCancel = (formdata?: any) => {
    formdata.resetForm()
    setIsModal(!isModal)
  }

  return (
    <StyledProfileCon>
      <Container className="profile-con container-fluid">
        <div className="row profile-row">
          <div className="col-md-11 col-12 tab">
            <NewTabCom defaultActiveKey="profile" dataSource={dataSource} />
          </div>
          <div className="col-xl-4 col-lg-2 col-12 profile-info">
            <TextCom size="31" weight="lg" className="title">
              {translate('profile', 'profile')}
            </TextCom>
            <div className="name">
              <TextCom color="border">{translate('name', 'Name')}</TextCom>
              <TextCom weight="lg">{getProfile_data?.name || 'Username'}</TextCom>
            </div>
            <div className="phone">
              <TextCom color="border">{translate('phone', 'phone')}</TextCom>
              <TextCom weight="lg">{getProfile_data?.mobile || '09xxxxxxxxx'}</TextCom>
            </div>
            <div className="email">
              <TextCom color="border">{translate('email', 'Email')}</TextCom>
              <TextCom weight="lg">{getProfile_data?.email || 'xxxxxxxx@xxxx.com'}</TextCom>
            </div>
            <TextCom as="a" href="/user/profile_edit">
              <FiEdit size={19} />
              {translate('edit-profile', 'Edit profile')}
            </TextCom>
            <TextCom as="a" href="/user/change_password">
              <FiKey size={19} />
              {translate('change-password', 'Change password')}
            </TextCom>
          </div>
          <div className="col-xl-2 col-lg-1 col-12 mx-3 point">
            <TbCrown size={30} color="#F27043" fill="#F27043" />
            <TextCom size="31" weight="lg" className="title">
              {getProfile_data?.point}
            </TextCom>
            <TextCom color="secondary">{translate('point', 'Point')}</TextCom>
          </div>
          <div className="col-xl-1 col-lg-1 col-12"></div>
          <div className="col-xl-5 col-lg-5 col-12 shipping-add">
            <TextCom size="31" weight="lg" className="title">
              {translate('shipping_address', 'Shipping address')}
            </TextCom>
            {getShippingAddress_data?.data?.length > 0 &&
              getShippingAddress_data?.data?.map((add: any, key: any) => {
                return (
                  <div className="address-con d-flex" key={key}>
                    <div className="info">
                      <TextCom weight="lg" className="name">
                        {add?.name}
                      </TextCom>
                      <TextCom color="paragraph">
                        <MdLocationOn color="#0491A4" size={20} />
                        {add?.address1 + ', ' + add?.township?.name + ', ' + add?.state?.name + ', ' + add?.country?.name}
                      </TextCom>
                      <TextCom color="paragraph" className="ph">
                        <FaPhoneAlt color="#0491A4" size={14} />
                        {add?.mobile}
                      </TextCom>
                    </div>
                    <div className="btn">
                      <ButtonCom type="outline" bgcolor="transparent" onClick={() => handleModal('edit', add?.id)}>
                        <FiEdit size={20} color="#444444" />
                      </ButtonCom>
                      <ButtonCom type="outline" bgcolor="transparent" onClick={() => onHandleDelete('delete', add?.id)}>
                        <RiDeleteBin7Line size={20} color="#444444" />
                      </ButtonCom>
                    </div>
                  </div>
                )
              })}
            <ButtonCom className="add-btn" onClick={() => handleModal('add')}>
              <FiPlus size={20} color="#fff" />
              <TextCom color="light">{translate('add-new-address', 'Add new address')}</TextCom>
            </ButtonCom>
            <div className="edit-modal">
              <ModalCom isModal={isModal} handleIsModal={setIsModal} isCloseBtn={true}>
                <div className="inner_modal_con">
                  <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values: any, actions: any) => onHandleDataSubmit(values, actions)}>
                    {(formikProps: any) => {
                      const { values } = formikProps
                      return (
                        <div className="info">
                          <TextCom size="xl" weight="xl" textAlign="left" className="modal-title">
                            {modalType.type === 'add' ? translate('add-shipping-add', 'Add Shipping Address') : translate('edit-shipping-add', 'Edit Shipping Address')}
                          </TextCom>
                          <InputCom
                            // placeholder={modalType === 'edit' ? (getShippingAddressById_data ? getShippingAddressById_data[0]?.name : getProfile_data?.name) : getProfile_data?.name || 'User Name'}
                            name="name"
                            type="text"
                            label={translate('name', 'Name')}
                            required
                          />
                          <InputCom
                            // placeholder={modalType === 'edit' ? (getShippingAddressById_data ? getShippingAddressById_data[0]?.mobile : getProfile_data?.phone) : getProfile_data?.phone || 'Phone'}
                            name="phone"
                            type="tel"
                            label={translate('phone', 'Phone')}
                            required
                          />
                          <InputCom placeholder={modalType.type === 'edit' ? (getShippingAddressById_data ? getShippingAddressById_data[0]?.state?.name : getProfile_data?.state_name) : getProfile_data?.state_name || 'Choose State'} label={translate('states-divisions', 'State')} name="state" required input_as="select" defaultValue="">
                            {<option value="">{translate('select', 'Select')}</option>}
                            {getShippingLocations_data &&
                              getShippingLocations_data[0]?.state_ids?.map((item: any) => {
                                return <option value={item?.id}>{Captialize(item?.name)}</option>
                              })}
                          </InputCom>
                          <InputCom
                            placeholder={modalType.type === 'edit' ? (getShippingAddressById_data ? getShippingAddressById_data[0]?.township?.name : getProfile_data?.township_name) : getProfile_data?.township_name || 'Choose Township'}
                            label={translate('township', 'Township')}
                            name="township"
                            // required
                            input_as="select"
                            defaultValue=""
                          >
                            {<option value="">{translate('choose-after-state/divison', 'Choose After State/Divison')}</option>}
                            {values?.state &&
                              getShippingLocations_data &&
                              getShippingLocations_data[0]?.state_ids
                                ?.filter((state: any) => Number(state.id) === Number(values.state))[0]
                                ?.township_ids?.map((town: any) => {
                                  return <option value={town?.id}>{Captialize(town?.name)}</option>
                                })}
                          </InputCom>
                          <InputCom placeholder={modalType.type === 'edit' ? (getShippingAddressById_data ? getShippingAddressById_data[0]?.address1?.name : getProfile_data?.address) : getProfile_data?.address || 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'} name="address" type="text" input_as="textarea" rows="4" label={translate('address', 'Address')} required />
                          <div className="buttons d-flex justify-content-center align-items-center">
                            <ButtonCom text={translate('cancel', 'Cancel')} type="outline" bgcolor="transparent" onClick={(e: any) => setIsModal(!isModal)} />
                            <ButtonCom type="submit" text={modalType.type === 'add' ? translate('save', 'Save') : translate('edit', 'Edit')} bgcolor="dark" color="light" />
                          </div>
                        </div>
                      )
                    }}
                  </FormContainerCom>
                </div>
              </ModalCom>
              <ModalCom isModal={deletenoti} handleIsModal={setDeletenoti} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FaQuestion size={30} />
                  <TextCom className="mt-3">{translate('are-you-sure-you-want-to-delete-this-shipping-address', 'Are you sure you want to delete this shipping address')}?</TextCom>
                  <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                    <ButtonCom color="light" bgcolor="dark" text="Yes" btnBorderRadius="xxxs" onClick={() => onHandleDelete(true)} />
                    <ButtonCom bgcolor="light" color="dark" text="No" btnBorderRadius="xxxs" btntype="outline" borderColor="dark" onClick={() => setDeletenoti(false)} />
                  </div>
                </div>
              </ModalCom>
            </div>
          </div>
        </div>
      </Container>
    </StyledProfileCon>
  )
}
