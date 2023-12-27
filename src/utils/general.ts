import _, { object } from 'underscore'
import moment from 'moment'
const moneyFormat = (amount: number = 0, lang: string = 'en') => {
  let eng_money = Number(amount)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  let tmp: any = {
    '0': '၀',
    1: '၁',
    2: '၂',
    3: '၃',
    4: '၄',
    5: '၅',
    6: '၆',
    7: '၇',
    8: '၈',
    9: '၉',
  }
  let mm_money = eng_money.replace(/([0-9])/g, (s, key: any) => tmp[key] || s)
  return lang === 'en' ? eng_money : mm_money
}

const en2mm_num = (num: number = 0, lang: string = 'en') => {
  let strnum = num.toString()
  let tmp: any = {
    '0': '၀',
    1: '၁',
    2: '၂',
    3: '၃',
    4: '၄',
    5: '၅',
    6: '၆',
    7: '၇',
    8: '၈',
    9: '၉',
  }
  let mm_tmp = strnum.replace(/([0-9])/g, (s, key: any) => tmp[key] || s)
  return lang === 'en' ? num : mm_tmp
}

const groupBy = (data: any[], key: string) => {
  return data.reduce(function (rv, x) {
    ; (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

// const uniqueArray = (data: any, key: any) => {
//   return [...new Map(data.map((x: any) => [key(x), x])).values()]
// }

const getUiTranslate = (
  dict: any = { loading: { en: 'Loading', my: 'လုပ်ဆောင်နေသည်' } },
  entry: any,
  lang: string = 'en',
  def: any
) => {
  if (dict) {
    return dict?.[entry]?.[lang] || def || entry
  }
}

const addCheckDefault = (data: any[], key: string) => {
  let tmp = data.map((x: any) => ({ ...x, [key]: false }))
  return tmp
}

const checkChange = (type: string, checkListItem: any, data: any, mode: string = 'multi') => {
  let arr: any[] = []
  let final_arr: any[] = []
  if (mode === 'single') {
    checkListItem?.data?.map((x: any) => {
      arr.push({
        ...x,
        check: false,
      })
    })
  } else if (mode === 'clear_all') {
    checkListItem?.data?.map((x: any) => {
      arr.push({
        ...x,
        check: false,
      })
    })
  }
  else {
    arr = checkListItem?.data
  }

  arr?.map((x: any) => {
    if (x[type] === data) {
      final_arr.push({
        ...x,
        check: !x.check,
      })
    } else {
      final_arr.push({
        ...x,
      })
    }
  })
  return final_arr

}

const getCheckId = (type: string, data: any[]) => {
  let temp: any[] = []
  data.map((x: any) => x.check === true && temp.push(x[type]))
  return temp
}

const handleStatus = (
  dict: any = { loading: { en: 'Loading', my: 'လုပ်ဆောင်နေသည်' } },
  status: string = 'loading',
  langCode: string = 'en',
  def: string = 'loading'
) => {
  return getUiTranslate(dict, status, langCode, def)
}


// let data = {
//     att_data,
//     att_id,
//     sub_id
// }
const wishlistHandleChange = (data: any) => {
  let selected: any[] = []
  let obj_selected: any[] = []
  let arr = []
  if (data?.att_data?.length > 0) {
    arr = data?.att_data?.map((x: any) => {
      let par_obj = {
        ...x,
      }
      if (x.id === data?.att_id) {
        let sub = []
        if (x?.vals?.length > 0) {
          sub = x?.vals?.map((y: any) => {
            let obj = {
              ...y,
            }
            if (y.id === data?.sub_id) {
              obj.check = !obj?.check
            } else {
              obj.check = false
            }
            return obj
          })
        }
        par_obj.vals = sub
      }
      if (par_obj?.vals?.length > 0) {
        par_obj?.vals?.map((e: any) => {
          if (e.check) {
            selected.push(e.id)
            obj_selected.push(e)
          }
        })
      }
      return par_obj
    })
  }
  let add_total = obj_selected.reduce((total, value) => total + value.price, 0)
  let final_arr_obj = {
    selected_variant_ids: selected,
    obj_selected_variant: obj_selected,
    extra_price_for_variant: add_total,
    data: arr,
  }
  return final_arr_obj
}

const UnitArray = async (data: any, type: string) => {
  let uniqueIds: any[] = []

  const unique = data.filter((element: any) => {
    const isDuplicate = uniqueIds.includes(element[type])

    if (!isDuplicate) {
      uniqueIds.push(element[type])

      return true
    }

    return false
  })
  return unique
}

const handleNestedChange = (data: any[], type: string, nst_type: string) => {
  let n_arr = data

  const handleInnerNested = (data: any, type: string, nst_type: string, index: any) => {
    let dem_arr = data

    if (dem_arr?.length > 0) {
      let tmp = dem_arr?.map((x, i) => {
        let tmp_i = `${index}-${i}`
        if (x[nst_type].length > 0) {
          x.key = `${tmp_i}-${x[type]}`
          handleInnerNested(x[nst_type], type, nst_type, tmp_i)
        } else {
          x.key = `${tmp_i}-${x[type]}`
        }
      })
    }
  }

  if (n_arr?.length > 0) {
    let tmp = n_arr?.map((x, i) => {
      let tmp_i: any = i.toString()
      if (x[nst_type].length > 0) {
        x.key = `${tmp_i}-${x[type]}`
        handleInnerNested(x[nst_type], type, nst_type, tmp_i)
      } else {
        x.key = `${tmp_i}-${x[type]}`
      }
    })
  }
  return n_arr
}

const splitedTime = (data: any) => {
  if (data?.includes('T')) {
    let orderdate = data?.split('T')
    return moment(orderdate[0]).format('DD/MM/YYYY') + ', ' + orderdate[1].split('+')[0]
  } else {
    let orderdate = data?.split(' ')
    return moment(orderdate[0]).format('DD/MM/YYYY') + ' , ' + orderdate[1]
  }
}

const joinSpace = (data: string) => {
  return data && data?.includes('\\n') ? data?.split('\\n').join(' ') : data
}

const Captialize = (data: string) => {
  const str = data.toLowerCase()
  const arr = str.split(' ')
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  const str2 = arr.join(' ')
  return str2
}

export {
  joinSpace,
  moneyFormat,
  groupBy,
  // uniqueArray,
  addCheckDefault,
  checkChange,
  getCheckId,
  getUiTranslate,
  handleStatus,
  en2mm_num,
  wishlistHandleChange,
  UnitArray,
  handleNestedChange,
  splitedTime,
  Captialize
}