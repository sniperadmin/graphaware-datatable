type PayloadKeys = 'data' | 'kids'
interface HeaderKeys { [key: string]: string | number | undefined }

interface HeadersData {
  'Identification number': string
  'Name': string
  'Gender': string
  'Risk': string
  'Hair length': string
  'IQ': string
  'Admission date': string
  'Last breakdown': string
  'Yearly fee': string
  'Knows the Joker ?': string
}
interface Kid { }

export function hydrateHeadersPerObject(rawData: Record<PayloadKeys, object>[]) {
  let allHeaders: object[] = []
  const heads: object[] = rawData.map((obj: Record<PayloadKeys, object>) => {
    return obj.data
  })

  heads.forEach((headerObj): void => {
    let headersObjs: object[] = []
    for (const key in headerObj) {
      headersObjs.push({ text: key, value: (headerObj as Record<string, string>)[key], sortable: true })
    }

    allHeaders.push({ headers: headersObjs })
  })

  return allHeaders
}

export function hydrateItemsPerObject(rawData: { data: object, kids: object }[]) {
  let finals: object[] = []
  const rawItems = rawData.map((obj: any) => {
    return obj.kids
  })

  let childArr: { data: object, kids: object }[] = []

  rawItems.forEach((itemObj) => {
    for (let key in itemObj) {
      if (Object.hasOwnProperty.call(itemObj, key)) {
        childArr = itemObj[key].records

        hydrateItemsPerObject(childArr)

        const resheads = hydrateHeadersPerObject(childArr)
        const resItems = hydrateItemsPerObject(childArr)
        childArr = []

        childArr.push({ headers: resheads, items: resItems })
      }
    }
    finals.push(...childArr)
  })

  // hydrateItemsPerObject(rawItems)

  return finals
}
