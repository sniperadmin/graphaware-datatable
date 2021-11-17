/**
 * @file This file exports headers, items needed for the table
 * 
 * Idea => generating compatible headers to be processed via complex Vuetify data tables
 * Same goes with items
 */

type PayloadKeys = 'data' | 'kids'

/**
 * @function hydrateHeadersPerObject
 * @param {Record<PayloadKeys, Object>[]} rawData
 * @returns {{headers: object[]}}
 */
export function hydrateHeadersPerObject(rawData: Record<PayloadKeys, object>[]) {
  let allHeaders: object[] = []
  const heads: object[] = rawData.map((obj: Record<PayloadKeys, object>) => {
    return obj.data
  })

  heads.forEach((headerObj): void => {
    let headersObjs: object[] = []
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

  return allHeaders
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
  finals.push([...dataArr])
  return finals
}

/**
 * @function deleteObject
 * Under testing
 * Not completed yet
 */
export function deleteObject(data: any, obj: any) {
  let hydrated: object[] = []
  let done: boolean = false

  data.forEach((item: any): void => {
    if (item === obj) {
      console.log('look for index => ', data.indexOf(obj));
      console.info('index => ', data.indexOf(obj), 'data => ', data);

      data.splice(data.indexOf(obj), 1);
      done = true
    } else {
      if (item.kids && !done) {
        let arr = []
        for (let key in item.kids) {
          if (item.kids[key] instanceof Object) {
            arr.push(...item.kids[key].records)
          }
        }
        hydrated = (hydrateItemsPerObject(arr)[0] as object[]).map((o: any) => o.data)
        console.log(hydrated);
        deleteObject(hydrated, obj)
      }
    }
  })


  return hydrated
}
