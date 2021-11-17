type PayloadKeys = 'data' | 'kids'

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

export function hydrateItemsPerObject(rawData: Record<PayloadKeys, object>[]) {
  let finals: object[] = []

  let dataArr: { data: object }[] = []

  const data = rawData.map((obj: Record<PayloadKeys, object>) => {
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

export function deleteObject(data: any, obj: any) {
  let hydrated;
  data.forEach((item: object): void => {
    if (item === obj) {
      console.log('look for index => ', data.indexOf(obj) > -1);

      return data.splice(data.indexOf(obj), 1);
    } else {
      if (item.kids) {
        let arr = []
        for (let key in item.kids) {
          if (item.kids[key] instanceof Object) {
            arr.push(...item.kids[key].records)
          }
        }
        hydrated = hydrateItemsPerObject(arr)[0].map((o: any) => o.data)
        return deleteObject(hydrated, obj)
      }
    }
  })
  return hydrated
}
