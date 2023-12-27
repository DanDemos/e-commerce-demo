import React, { useEffect } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { BsExclamationCircle } from 'react-icons/bs'

import { StyledModal, StyledModalDialog, StyledModalContent, StyledCloseOutside, StyledModalClose } from 'theme'
import { useToast, hideToast } from 'hook'
import { TextCom, ButtonCom } from 'components'
import { useNavigate } from 'react-router-dom'

type ToastComProps = {
  isCloseBtn?: boolean
  modalWidth?: number

}
export const ToastCom: React.FC<ToastComProps> = ({ isCloseBtn = false, ...props }) => {
  const { createToast_data } = useToast()
  const navigate = useNavigate()
  useEffect(() => {
    if (!createToast_data?.alway && createToast_data?.toastModalVisible) {
      setTimeout(() => {
        hideToast()
      }, createToast_data?.timer || 5000)
    }
  }, [createToast_data?.toastModalVisible])

  const hideToastFun = () => {
    hideToast()
    if (createToast_data?.route) navigate(createToast_data?.route)
  }
  return (
    <StyledModal className={`fade ${createToast_data?.toastModalVisible ? 'show' : 'hide'}`} {...props}>
      <StyledCloseOutside onClick={hideToast} />
      <StyledModalDialog modalWidth={3} {...props}>
        {isCloseBtn && (
          <StyledModalClose onClick={hideToast}>
            <RiCloseFill />
          </StyledModalClose>
        )}
        {createToast_data?.render ? (
          createToast_data?.render
        ) : (
          <StyledModalContent {...props}>
            {createToast_data?.title && (
              <TextCom size="sm" weight="lg" {...createToast_data?.titleStyle} className="d-flex flex-column justify-content-center align-items-center">
                <BsExclamationCircle size={40} style={{ marginBottom: '10px' }} />
                {createToast_data?.title}
                <div className="mt-4 d-flex justify-content-center align-items-center">
                  <ButtonCom className="d-flex align-items-center justify-content-center" btnBorderRadius="xxxs" bgcolor="dark" color="light" text={createToast_data?.btnText || 'OK'} onClick={() => hideToastFun()} />
                </div>
              </TextCom>
            )}
            {createToast_data?.desc && (
              <TextCom size="xs" {...createToast_data?.descStyle}>
                {createToast_data?.desc}
              </TextCom>
            )}
            {/* {!createToast_data?.title && !createToast_data?.desc && <TextCom size="xs">Required Text Field</TextCom>} */}
          </StyledModalContent>
        )}
      </StyledModalDialog>
    </StyledModal>
  )
}
