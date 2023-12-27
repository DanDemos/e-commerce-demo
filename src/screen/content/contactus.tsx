import React, { useEffect } from 'react'
import { BiSend } from 'react-icons/bi'

import { TextCom, CardCom, FormContainerCom, InputCom, ButtonCom, BreadcrumbCom } from 'components'
import { useHandleOther, useOther } from 'hook'
import Icon from 'asset/icon/luxura'
import './style.scss'

export type IContactUsProps = {}

export const ContactUs: React.FC<IContactUsProps> = props => {
  const { translate, handleSentContactUs } = useHandleOther()
  const { getContactUsPage_data } = useOther()
  const { getMetaData_data, OtherAction, dispatch, langStore } = useOther()
  let langCode = langStore?.code

  let initialValues: any = {
    name: '',
    phone: '',
    email: '',
    message: '',
  }

  const validationSchema = (yup: any) =>
    yup.object({
      name: yup.string().required(translate('name-is-required', 'Name is required')),
      phone: yup.string().required(translate('phone-number-is-required', 'Phone Number is Required')),
      email: yup.string().email(translate('invalid-email', 'Invalid Email')),
      message: yup.string().required(translate('message-required', 'Message Required')),
    })

  const onHandleDataSubmit = (values: any, actions: any) => {
    setTimeout(async () => {
      handleSentContactUs(values)
      actions.resetForm(initialValues)
      actions.setSubmitting(false)
    }, 1000)
  }

  let address_arr = getContactUsPage_data?.branches[0]?.address?.split('\n')

  return (
    <div className="container contactus-container">
      <TextCom as="h1" size={langCode === 'my' ? 28 : 34} weight="xl" textAlign="center" className="mb-3">
        {getMetaData_data?.['contact_info']?.text_one}
      </TextCom>
      <TextCom>{getMetaData_data?.['contact_info']?.text_two}</TextCom>
      <div className="row">
        <div className="col-lg-6">
          <TextCom as="h2" size="xxl" weight="xl" className="title">
            {translate('contact-information', 'Contact Information')}
          </TextCom>
          <hr />
          {getContactUsPage_data &&
            getContactUsPage_data?.branches.map((item: any) => (
              <div className="branch">
                <TextCom weight="xl" size="lg" className="title">
                  {item.name}
                </TextCom>
                {item.phone && (
                  <div className="phone d-flex gap-2 mb-3 mt-2">
                    <img src={Icon.phone} alt="" />
                    <TextCom as="a" link color="primary" href={'tel:' + item.phone}>
                      {item.phone}
                    </TextCom>
                  </div>
                )}
                {item.email && (
                  <div className="mail d-flex gap-2  mb-3">
                    <img src={Icon.mail} alt="" />
                    <TextCom as="a" link color="primary" href={'mailto:' + item.email}>
                      {item.email}
                    </TextCom>
                  </div>
                )}
                {item?.address && (
                  <div className="address d-flex gap-2  mb-3 align-items-start mb-4">
                    <img src={Icon.map} alt="" />
                    {/* <div>{address_arr && address_arr?.map((add: any) => <TextCom className="mb-0">{add}</TextCom>)}</div> */}
                    <TextCom className="mb-0">{item?.address}</TextCom>
                  </div>
                )}
              </div>
            ))}
          <div className="social d-flex align-items-center gap-2">
            <TextCom as="h2" size="lg" weight="xl" className="title">
              {translate('follow-us', 'Follow Us')} :{' '}
            </TextCom>

            {getContactUsPage_data?.social_links?.map((social: any) => (
              <a href={social?.link} target="_blank" style={{ marginInline: '10px' }}>
                <img src={social?.social_image} />
              </a>
            ))}
          </div>
        </div>
        <div className="col-lg-6 message-form">
          <TextCom as="h2" size="xxl" weight="xl" className="title">
            {translate('send-a-message', 'Send a message')}
          </TextCom>
          <hr />
          <FormContainerCom initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values: any, actions: any) => onHandleDataSubmit(values, actions)}>
            {(formikProps: any) => (
              <>
                <InputCom name="name" type="text" label={translate('name', 'Name')} required />
                <InputCom name="phone" type="tel" label={translate('phone', 'Phone')} required />
                <InputCom type="email" name="email" label={translate('email', 'Email')} />
                <InputCom name="message" type="text" input_as="textarea" rows="4" label={translate('message', 'Message')} required />
                <ButtonCom type="submit" color="light" bgcolor="dark" btnBorderRadius="xxxs" text={formikProps.isSubmitting ? translate('sending', 'Sending') : translate('send', 'Send')} SVGR={<BiSend color="white" />} />
              </>
            )}
          </FormContainerCom>
        </div>
      </div>
    </div>
  )
}
