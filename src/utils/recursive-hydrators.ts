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
