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
      headersObjs.push({ text: key, value: key, sortable: true })
    }

    allHeaders.push({ headers: headersObjs })
  })

  return allHeaders
}

export function hydrateItemsPerObject(rawData: { data: object, kids: object }[]) {
  let finals: object[] = []

  const rawKids = rawData.map((obj: any) => {
    return obj.kids
  })

  let childArr: { data: object, kids: object }[] = []
  let dataArr: { data: object }[] = []

  const data = rawData.map(e => e.data)

  dataArr = [...data]

  finals.push([...dataArr])
  // rawKids.forEach((itemObj) => {
  //   for (let key in itemObj) {
  //     if (Object.hasOwnProperty.call(itemObj, key)) {
  //       childArr = itemObj[key].records


  //       const items = childArr.map(ch => ch.data)
  //       childArr = []

  //       childArr.push({ ...items })
  //       hydrateItemsPerObject(childArr)
  //     }
  //   }
  //   finals.push({ ...childArr })
  // })

  return finals
}
