import React, { useState } from 'react'
import { StyledVariantCon, StyledVariantItemCon } from 'theme'
import { CardCom, TextCom } from '../../common'
import { useHandleVariant, useTheme, useHandleOther, useOther } from 'hook'

type AttributeButtonModProps = {
  variant_type?: string | undefined
  package_product_index?: any
  data?: any
}

export const AttributeButtonMod: React.FC<AttributeButtonModProps> = ({ data, package_product_index, ...props }) => {
  const [variants, handleVariant] = useHandleVariant(props)
  const { langStore } = useOther()
  const langCode = langStore.code
  const { themeContext } = useTheme()
  const { translate } = useHandleOther()

  const handleStyle = (z: any) => {
    let txt_obj = {
      marginRight: 5,
      borderRadius: 25,
      marginBottom: 7,
      borderColor: z.check ? themeContext?.color?.card?.primary || '#000' : themeContext?.color?.card?.line || '#dedede',
      paddingBlock: '3px',
      paddingInline: '10px',
      cursor: z.stock_balance === 0 ? '' : 'pointer',
      minWidth: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: z.stock_balance === 0 ? '0.5' : '1',
    }
    let photo_obj = {
      marginRight: 15,
      borderRadius: 5,
      marginBottom: 7,
      paddingLeft: 2,
      paddingRight: 2,
      paddingBottom: 2,
      paddingTop: 2,
      borderColor: z.check ? themeContext?.color?.card?.primary || '#000' : themeContext?.color?.card?.line || '#dedede',
      cursor: z.stock_balance === 0 ? '' : 'pointer',
      opacity: z.stock_balance === 0 ? '0.5' : '1',
    }

    return z?.photo ? photo_obj : txt_obj
  }

  return (
    <>
      {props?.variant_type === 'package_product'
        ? data?.attributes?.data?.length > 0 &&
          data?.attributes?.data?.map((item: any,i :any) => (
            <div className="d-flex gap-4 align-items-center" key={i}>
              <TextCom weight="lg" style={{ marginBottom: 3, minWidth: '125px' }}>
                {item?.name} :{' '}
              </TextCom>
              <div className="d-flex">
                {item?.vals?.length > 0 &&
                  item?.vals?.map((z: any, index: number) => (
                    <CardCom key={index} style={handleStyle(z)} onClick={() => (z.stock_balance !== 0 ? handleVariant(item?.id, z?.id, package_product_index, data) : '')}>
                      {z?.photo ? <img src={z?.photo} data-tip data-for="registerTip" title={z?.name} style={{ width: 50, height: 50 }} /> : <TextCom size="xs">{z?.name}</TextCom>}
                    </CardCom>
                  ))}
              </div>
            </div>
          ))
        : variants?.length > 0 &&
          variants?.map((x: any, i: number) => (
            <StyledVariantCon key={i} className="d-flex gap-4 align-items-center" style={{ marginBottom: '10px' }}>
              <TextCom weight="xl" style={{ marginBottom: 5, minWidth: '125px' }}>
                {x?.name}:
              </TextCom>
              <StyledVariantItemCon>
                {x?.vals?.length > 0 &&
                  x?.vals?.map((z: any, index: number) => (
                    <CardCom key={index} style={handleStyle(z)} onClick={() => (z.stock_balance !== 0 ? handleVariant(x?.id, z?.id, data) : '')}>
                      {z?.photo ? <img src={z?.photo} title={z.name} style={{ width: 50, height: 50 }} /> : <TextCom size="xs">{z.name}</TextCom>}
                    </CardCom>
                  ))}
              </StyledVariantItemCon>
            </StyledVariantCon>
          ))}
    </>
  )
}
