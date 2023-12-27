import React, { useEffect } from 'react'

import { StyledModal, StyledModalDialog, StyledModalContent, StyledCloseOutside, StyledModalClose } from 'theme'
import { RiCloseFill } from 'react-icons/ri'

type ModalComProps = {
  children?: any
  isModal?: boolean
  handleIsModal?: any
  isSetTimeOut?: number
  isCloseBtn?: boolean
  modalWidth?: number
  className?: any
  id?: any
  style?: any
}
export const ModalCom: React.FC<ModalComProps> = ({ children, isModal, handleIsModal, isSetTimeOut, isCloseBtn = false, ...props }) => {
  useEffect(() => {
    isSetTimeOut &&
      setTimeout(() => {
        handleIsModal(true, null)
      }, 5000)
  }, [isSetTimeOut])

  const handleCloseModal = async () => {
    handleIsModal(false)
  }

  return (
    <StyledModal className={`fade ${isModal ? 'show' : 'hide'}`} {...props}>
      <StyledCloseOutside onClick={handleCloseModal} className="close_outside" />
      <StyledModalDialog {...props} className="modaldialog">
        {isCloseBtn && (
          <StyledModalClose onClick={handleCloseModal}>
            <RiCloseFill />
          </StyledModalClose>
        )}
        <StyledModalContent {...props}>{children}</StyledModalContent>
      </StyledModalDialog>
    </StyledModal>
  )
}
