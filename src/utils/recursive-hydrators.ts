/**
 * @file This file exports headers, items needed for the table
 * 
 * Idea => generating compatible headers to be processed via complex Vuetify data tables
 * Same goes with items
 */

import { HeaderObject, PayloadKeys } from '../services/types/definitions'


/**
 * @function hydrateHeadersPerObject
 * @param {Record<PayloadKeys, Object>[]} rawData
 * @returns {HeaderObject[]}
 */
export function hydrateHeadersPerObject(rawData: Record<PayloadKeys, object>[]): HeaderObject[] {
  let allHeaders: { headers: HeaderObject[] }[] = []

  const heads: object[] = rawData.map((obj: Record<PayloadKeys, object>) => {
    return obj.data
  })


  heads.forEach((headerObj): void => {
    let headersObjs: HeaderObject[] = []
    for (const key in headerObj) {
      if (key === 'kids') {
        headersObjs.push({ text: key, value: key, sortable: true, align: ' d-none' })

      } else {
        headersObjs.push({ text: key, value: key, sortable: true })
      }
    }
    headersObjs.push({ text: 'Actions', value: 'actions', sortable: false })

    allHeaders.push({ headers: headersObjs })
  })

  return allHeaders[0].headers
}


/**
 * @function hydrateItemsPerObject
 * @param {Record<PayloadKeys, object>[]} rawData
 * @returns {object[]}
 */
export function hydrateItemsPerObject(rawData: Record<PayloadKeys, object>[]): object[] {
  let finals: object[] = []

  let dataArr: { data: object }[] = []

  const data: { data: { kids?: object } }[] = rawData.map((obj: Record<PayloadKeys, object>) => {
    let o: { data: { kids?: object } } = {
      data: obj.data
    }
    o.data.kids = obj.kids
    return o
  })

  dataArr = [...data]
  finals = [...dataArr]
  return finals
}
