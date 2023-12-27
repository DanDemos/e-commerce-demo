import moment from 'moment'

/**
 * * This function calculate promotion for product list
 * todo: Let's calculate the promotion price | insert it and return
 * @param data is product list of reducer state
 */
const calcuPromo = (data: any, key: any = 'product_list', promotion_type: string = 'discount', base_price: any = null) => {
  if (data?.[key]?.length > 0) {
    let temp = []
    let res = data?.[key]?.map((x: any, i: number) => {
      if (x?.promotion?.length > 0) {
        let isPromotype = x.promotion.some(
          (x: any) => x.promotion_type === 'flash_sale'
        )
        let final_promo_type = isPromotype || promotion_type
        let tmp = isBetweenDateRange(x.promotion, final_promo_type)
        if (tmp.length > 0) {
          let add = tmp.reduce(
            (total: any, value: any) => total + value.discount,
            0
          )
          let actual_base_price = base_price || x.list_price
          let km = tmp[0].discount_type === 'fixed_price' ? add : actual_base_price * (add / 100)
          let fr = actual_base_price - km
          x.cal_discount_percent = add
          x.promo_price = fr
        }
        if (!x?.qty) x.qty = 1
        temp.push(x)
      } else {
        if (!x?.qty) x.qty = 1
        x.promo_price = false
        temp.push(x)
      }
    })
    return data
  } else {
    let obj = {
      ...data,
    }
    if (obj?.promotion?.length > 0) {
      let isPromotype = obj.promotion.some(
        (x: any) => x.promotion_type === 'flash_sale'
      )
      let final_promo_type = isPromotype || promotion_type
      let tmp = isBetweenDateRange(obj?.promotion, final_promo_type)
      if (tmp.length > 0) {
        let add = tmp.reduce(
          (total, value) => total + value.discount,    //changed discount_percent to discount 
          0
        )
        let actual_base_price = base_price || obj.price
        let km = tmp[0].discount_type === 'fixed_price' ? add : actual_base_price * (add / 100)
        let fr = actual_base_price - km
        obj.cal_discount_percent = add
        obj.promo_price = fr
      }
    } else {
      obj.promo_price = false
    }
    return obj
  }
}

/**
 * ? Is it on the specified date?
 * * This function will do it
 */
const isBetweenDateRange = (array: any[], type: string) => {
  if (array.length > 0) {
    if (type) {
      let filter_arr = array?.filter((x: any) => x.promotion_type === type)  //changed x?.promotion_type to x?.type
      let tmp = filter_arr?.filter(
        e =>
          moment(moment(e.server_date_time).format()).isBetween(
            moment(e.start_date).format(),
            moment(e.end_date).format()
          ) ||
          (e.start_date === false && e.end_date === false) ||
          (e.start_date !== false && e.end_date === false) ||
          (e.start_date === false &&
            e.end_date !== false &&
            moment(moment(e.server_date_time).format()).isBetween(
              moment(moment().subtract(1, 'day').format()).format(),
              moment(e.end_date).format()
            )) ||
          (e.start_date === null && e.end_date === null) ||
          (e.start_date !== null && e.end_date === null) ||
          (e.start_date === null &&
            e.end_date !== null &&
            moment(moment(e.server_date_time).format()).isBetween(
              moment(moment().subtract(1, 'day').format()).format(),
              moment(e.end_date).format()
            ))
      )
      return tmp
    } else {
      let temp = array?.filter(
        (e: any) =>
          moment(moment(e.server_date_time).format()).isBetween(
            moment(e.start_date).format(),
            moment(e.end_date).format()
          ) ||
          (e.start_date === false && e.end_date === false) ||
          (e.start_date !== false && e.end_date === false) ||
          (e.start_date === false &&
            e.end_date !== false &&
            moment(moment(e.server_date_time).format()).isBetween(
              moment(moment().subtract(1, 'day').format()).format(),
              moment(e.end_date).format()
            )) ||
          (e.start_date === null && e.end_date === null) ||
          (e.start_date !== null && e.end_date === null) ||
          (e.start_date === null &&
            e.end_date !== null &&
            moment(moment(e.server_date_time).format()).isBetween(
              moment(moment().subtract(1, 'day').format()).format(),
              moment(e.end_date).format()
            ))
      )
      return temp
    }
  } else {
    return array
  }
}

export { calcuPromo, isBetweenDateRange }