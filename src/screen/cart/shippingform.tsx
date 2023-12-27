import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useHandleOther, useCart, useHandleCart } from 'hook'
import { TextCom, FormContainerCom, InputCom, ButtonCom } from 'components'
import { Captialize } from 'utils'

type ShippingFormProps = {
  btn_name?: any
  route?: string
  modal?: any
  props?: any
  from?: any
  guestForm?: any
  getGuestform?: any
  type?: string
}

export const ShippingForm: React.FC<ShippingFormProps> = ({ btn_name, type, route, modal, from, guestForm, getGuestform }) => {
  const navigate = useNavigate()

  const { translate, langStore } = useHandleOther()
  const { selectShippingAddress_data, getShippingLocations_data, dispatch, CartAction } = useCart()
  const { handleCreateShippingAddress, handleEditShippingAddress, handleSelectShipping } = useHandleCart()
  const langCode = langStore?.code

  useEffect(() => {
    dispatch(CartAction.getShippingAddress())
    dispatch(CartAction.getAllLocation({ langCode }))
  }, [])
  let initialValues = {
    name: from === 'edit' ? selectShippingAddress_data?.selected_item?.name : from === 'guest_edit' ? getGuestform[0]?.name : '',

    phone: from === 'edit' ? selectShippingAddress_data?.selected_item?.mobile : from === 'guest_edit' ? getGuestform[0]?.mobile : '',

    state: from === 'edit' ? selectShippingAddress_data?.selected_item?.state?.id : from === 'guest_edit' ? getGuestform[0]?.state?.id : '',

    township: from === 'edit' ? selectShippingAddress_data?.selected_item?.township?.id : from === 'guest_edit' ? getGuestform[0]?.township?.id : '',

    address: from === 'edit' ? selectShippingAddress_data?.selected_item?.address1 : from === 'guest_edit' ? getGuestform[0]?.address1 : '',
  }

  const validationSchema = (yup: any) =>
    yup.object({
      name: yup.string().required(`${translate('name_required', 'Name is required')}`),
      phone: yup.number().required('Phone no is requried'),
      state: yup.string(),
      township: yup.string(),
      address: yup.string(),
    })

  const onHandleDataSubmit = async (values: any, actions: any) => {
    actions.setSubmitting(true)
    if (guestForm) {
      const State: any = getShippingLocations_data[0]?.state_ids?.filter((state: any) => Number(state.id) === Number(values?.state))

      const TownShip: any = State[0]?.township_ids?.filter((township: any) => Number(township.id) === Number(values?.township))

      guestForm([
        {
          name: values?.name,
          mobile: values?.phone,
          state: { id: State[0]?.id, name: State[0]?.name },
          township: { id: TownShip[0]?.id, name: TownShip[0]?.name },
          address1: values?.address,
          country: { name: getShippingLocations_data?.name },
        },
      ])
    }
    setTimeout(async () => {
      let postData = {
        name: values?.name,
        address: values?.address,
        state: values?.state,
        township: values?.township,
        user_phone: values?.phone,
      }
      if (from === 'edit') {
        await handleEditShippingAddress({
          edit_id: selectShippingAddress_data?.selected_item?.id,
          ...postData,
        })
      } else {
        let res = await handleCreateShippingAddress(postData)
        if (guestForm) {
          await handleSelectShipping({ id: res?.payload?.ID })
        }
      }
      actions.setSubmitting(false)
      actions.resetForm()
    }, 1000)

    if (route) navigate(route, { replace: true })
    if (modal) modal(false)
  }

  return (
    <div className="inner_modal_con" style={type === 'guest' ? {} : { overflowY: 'scroll', maxHeight: '70vh' }}>
      {/* <TextCom size="xxxl" weight="xl" textAlign="left">
        {from === 'edit' ? translate('edit-shipping-address', 'EDIT SHIPPING ADDRESS') : translate('add-shipping-form', 'Add Shipping Form')}
      </TextCom> */}
      <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values: any, actions: any) => onHandleDataSubmit(values, actions)}>
        {(formikProps: any) => {
          const { values } = formikProps
          return (
            <div className="info">
              <InputCom placeholder={'User Name'} name="name" type="text" label={translate('name', 'Name')} required />
              <InputCom placeholder={'Phone'} name="phone" type="tel" label={translate('phone', 'Name')} required />
              <InputCom placeholder={'Choose State'} label={translate('states-divisions', 'State')} name="state" required input_as="select" defaultValue="">
                {<option value="">{translate('select', 'Select')}</option>}
                {getShippingLocations_data &&
                  getShippingLocations_data[0]?.state_ids?.map((item: any) => {
                    return <option value={[item?.id]}>{Captialize(item?.name)}</option>
                  })}
              </InputCom>
              <InputCom placeholder={'Choose Township'} label={translate('townships', 'Townships')} name="township" input_as="select" defaultValue="" required>
                {<option value="">{translate('choose-after-state/divison', 'Choose After State/Divison')}</option>}
                {values?.state &&
                  getShippingLocations_data &&
                  getShippingLocations_data[0]?.state_ids
                    ?.filter((state: any) => Number(state.id) === Number(values.state))[0]
                    ?.township_ids?.map((town: any) => {
                      return <option value={[town?.id]}>{Captialize(town?.name)}</option>
                    })}
              </InputCom>
              <InputCom name="address" type="text" input_as="textarea" rows="4" label={translate('address', 'Address')} required className="mb-2" />
              <div className={`buttons d-flex ${from === 'edit' ? 'justify-content-center' : 'w-100'}`}>
                {from === 'edit' || from === 'guest_edit' ? (
                  <ButtonCom type="cancel" className={`${from === 'edit' ? '' : 'w-100'}`} btnBorderRadius="xxxs" bgcolor="light" onClick={(e: any) => formikProps.resetForm()}>
                    {translate('cancel', 'Cancel')}
                  </ButtonCom>
                ) : (
                  ''
                )}
                <ButtonCom type="submit" className={`${from === 'edit' ? '' : 'w-100'}`} btnBorderRadius="xxxs" bgcolor="dark">
                  <TextCom color="light">{from === 'edit' || from === 'guest_edit' ? 'Edit' : btn_name}</TextCom>
                </ButtonCom>
              </div>
            </div>
          )
        }}
      </FormContainerCom>
    </div>
  )
}
