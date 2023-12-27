import React from 'react'
import { useLocation } from 'react-router-dom'
import { RiCloseFill } from 'react-icons/ri'

import { StyledModal, StyledModalDialog, StyledModalContent, StyledCloseOutside, StyledModalClose } from 'theme'
import { DetailPreview } from 'components'
import { useTheme, useProduct, useHandleOther, hidePreview } from 'hook'

type previewCardProps = {
  ispreview?: boolean | undefined
  isModal?: any
  setIsmodal?: any
}
export const PreviewCardCom: React.FC<previewCardProps> = () => {
  const { CreatePreview_data } = useTheme()
  const location = useLocation()
  const { langStore } = useHandleOther()
  const { ProductAction, dispatch } = useProduct()
  const langCode = langStore?.code

  const closeHandler = async () => {
    let product_id = location.pathname.split('/')[2]
    if (product_id) {
      await dispatch(ProductAction.getProductById({ id: product_id, langCode }))
    }
    hidePreview()
  }

  return (
    <StyledModal className={`fade ${CreatePreview_data?.PreviewModalVisible ? 'show' : 'hide'}`}>
      <StyledCloseOutside onClick={() => closeHandler()} />
      <StyledModalDialog modalWidth={3}>
        <StyledModalClose onClick={() => closeHandler()}>
          <RiCloseFill />
        </StyledModalClose>
        <StyledModalContent style={{ padding: 0 }}>
          <DetailPreview />
        </StyledModalContent>
      </StyledModalDialog>
    </StyledModal>
  )
}
