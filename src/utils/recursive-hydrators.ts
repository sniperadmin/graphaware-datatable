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

  let itemObjs: { data: object, kids: object }[] = []

  rawItems.forEach((itemObj): void => {
    if (itemObj.has_relatives !== undefined) {
      itemObjs = [...itemObj.has_relatives.records]


      // const testHeaders: object[] = hydrateHeadersPerObject(itemObjs)
      // testHeaders.forEach((obj: any) => {
      //   obj.items = [...hydrateItemsPerObject(itemObjs)]
      // })
      // console.info('testHeaders => ', testHeaders);
    }
    finals.push(...itemObjs)
  })

  return finals
}
