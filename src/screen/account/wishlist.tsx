import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiUser, FiHeart, FiFileText, FiInfo } from 'react-icons/fi'
import { FaQuestion } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'
import Media from 'react-media'

import { TextCom, CardCom, ButtonCom, Container, NewTabCom, TableCom, ModalCom, QtyButtonMod, AddToCartButtonMod, StockVariantMsgMod } from 'components'
import { useHandleOther, useHandleWishlist, useProduct } from 'hook'
import { moneyFormat } from 'utils'
import { StyledWishlistCon } from 'theme'
import Image from 'asset/icon/luxura'
import './style.scss'

type IWishlistProps = {}

export const Wishlist: React.FC<IWishlistProps> = props => {
  const navigate = useNavigate()
  const params = useParams()
  const { translate, langStore } = useHandleOther()
  const { isLoading } = useProduct()
  const { getWishlist_data, handleWislistItemDelete, getWishlist } = useHandleWishlist(props)
  const lang = langStore?.code
  const [isModal, setIsModal] = useState({ open: false, item: null })
  useEffect(() => {
    getWishlist()
  }, [])
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
      icon: <FiHeart color="#262626" />,
    },
    {
      title: translate('order-history', 'Order History'),
      key: 'order-history',
      link: '/user/my_orders',
      icon: <FiFileText color="#262626" />,
    },
  ]

  const columns = [
    {
      key: 'name',
      width: 300,
      render: (x: any, y: any) => (
        <div className="product_name_wrap d-flex">
          <img src={x?.image || Image.DefaultCard} />
          <div>
            <TextCom weight="xl">{x?.name || Image.DefaultCard}</TextCom>
            <StockVariantMsgMod from="other" item={getWishlist_data[getWishlist_data.indexOf(x)]} />
            {x?.product_code && (
              <TextCom weight="xl">
                {translate('sku', 'SKU')} : <span>{x?.product_code}</span>
              </TextCom>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      width: 150,
      render: (x: any, y: any) => (
        <div className="price-wrap">
          <TextCom weight="xl" size="lg" textAlign="right" color="secondary">
            {moneyFormat(x?.list_price)} {translate('ks', 'Ks')}
          </TextCom>
          {/* { x?.promotion?.length>0 &&
          <TextCom textAlign='center' color='paragraph'><del>1,500ks</del></TextCom>
        } */}
          {/* <TextCom textAlign='right' color='paragraph'><del>1,500{translate('ks', 'Ks')}</del></TextCom> */}
        </div>
      ),
    },
    {
      key: 'qty',
      textAlign: 'center',
      width: 150,
      render: (x: any, y: any) => (
        <div className="qty-wrap d-flex flex-column gap-2">
          <QtyButtonMod type="wishlist" item={x} w_index={getWishlist_data.indexOf(x)} disabled={isLoading} />
        </div>
      ),
    },
    {
      key: 'add-to-cart',
      width: 150,
      render: (x: any, y: any) => (
        <div className="btn-wrap">
          <AddToCartButtonMod type_for="wishlist" type="addtocart" navigate={navigate} text={translate('add-to-cart', 'Add to cart')} w_item={x} bgcolor="dark" color="light" btnBorderRadius="xxxs" />
        </div>
      ),
    },
    {
      key: 'buy-now',
      width: 150,
      render: (x: any, y: any) => (
        <div className="btn-wrap buynow">
          <AddToCartButtonMod type="buynow" navigate={navigate} params={x?.product_template_id} w_item={x} bgcolor="light" color="dark" outline borderColor="dark" text={translate('buy-now', 'Buy now')} btnBorderRadius="xxxs" />
        </div>
      ),
    },
    {
      key: 'action',
      width: 50,
      placement: 'right',
      render: (x: any, y: any) => (
        <div className="cancel_btn" onClick={() => handleDelete(x, 'delete')}>
          <AiFillCloseCircle color="#707070" size={25} />
        </div>
      ),
    },
  ]

  const mb_columns = [
    {
      key: 'name',
      textAlign: 'left',
      render: (x: any, y: any) => (
        <>
          <div className="product_name_wrap d-flex">
            <img src={x?.image || Image.DefaultCard} />
            <div>
              <TextCom weight="xl">{x?.name}</TextCom>
              <TextCom weight="xl">
                {translate('sku', 'SKU')} : <span>{x?.sku}</span>
              </TextCom>
              <StockVariantMsgMod from="other" item={getWishlist_data[getWishlist_data.indexOf(x)]} />
              <div className="price-wrap">
                <TextCom weight="xl" size="lg" color="secondary">
                  {moneyFormat(x?.list_price)} {translate('ks', 'Ks')}
                </TextCom>
                {/* { x?.promotion?.length>0 &&
                <TextCom textAlign='center' color='paragraph'><del>1,500ks</del></TextCom>
                } */}
                <TextCom color="paragraph">{/* <del>1,500{translate('ks', 'Ks')}</del> */}</TextCom>
                <div className="cancel_btn" onClick={() => handleDelete(x, 'item')}>
                  <AiFillCloseCircle color="#707070" size={25} />
                </div>
              </div>
            </div>
          </div>
          <div className="btn-con d-flex">
            <div className="qty-wrap">
              <QtyButtonMod type="wishlist" item={x} w_index={getWishlist_data.indexOf(x)} disabled={isLoading} />
              {/* <QtyButtonCom /> */}
            </div>
            <AddToCartButtonMod type_for="wishlist" type="addtocart" navigate={navigate} text={translate('add-to-cart', 'Add to cart')} w_item={x} bgcolor="dark" color="light" btnBorderRadius="xxxs" />
            <AddToCartButtonMod type="buynow" navigate={navigate} params={x?.product_template_id} w_item={x} bgcolor="light" color="dark" outline borderColor="dark" text={translate('buy-now', 'Buy now')} btnBorderRadius="xxxs" />
          </div>
        </>
      ),
    },
  ]

  const handleDelete = async (item: any, type: any) => {
    setIsModal({ ...isModal, open: true, item: item })
  }

  const handleDeleteWishlist = async (w_id: any) => {
    await handleWislistItemDelete(w_id)
    setIsModal({ ...isModal, open: false })
  }

  return (
    <StyledWishlistCon>
      <Container className="wishlist-con container-fluid">
        <div className="row wishlist-row">
          <div className="col-md-11 col-12 tab">
            <NewTabCom defaultActiveKey="wishlist" dataSource={dataSource} />
          </div>
          <div className="col-md-11 col-12 wishlist-table">
            <TextCom size="31" weight="lg" className="title">
              {translate('wishlist', 'Wishlist')}
            </TextCom>
            {getWishlist_data ? (
              <Media query={{ minWidth: 992 }}>{matches => <TableCom dataSource={getWishlist_data} columns={matches ? columns : mb_columns} />}</Media>
            ) : (
              <div className="no-item">
                <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                  <FiInfo size="60" color="#CBCBCB" />
                  <TextCom>{translate('empty-wishlist-information', `There's no item in Wishlist`)} !</TextCom>
                  <TextCom as="a" href="/" className="shopping" color="secondary">
                    {translate('continue-shopping', 'Continue Shopping')}
                  </TextCom>
                </div>
              </div>
            )}
          </div>
          <ModalCom isModal={isModal.open} handleIsModal={setIsModal}>
            <div className="inner_modal_con d-flex flex-column justify-content-center align-items-center">
              <FaQuestion size={30} />
              <TextCom className="desc_txt">{translate('are-you-sure-you-want-to-delete-item', 'Are you sure you want to delete item')}?</TextCom>
              <div className="modal_btn_con d-flex">
                <ButtonCom text="Cancel" bgcolor="light" color="dark" btntype="outline" borderColor="dark" onClick={() => setIsModal({ ...isModal, open: false })} btnBorderRadius="xxxs" />
                <ButtonCom color="light" bgcolor="dark" text={translate('delete', 'Delete')} btnBorderRadius="xxxs" onClick={() => handleDeleteWishlist(isModal.item)} />
              </div>
            </div>
          </ModalCom>
        </div>
      </Container>
    </StyledWishlistCon>
  )
}
