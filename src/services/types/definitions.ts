export type PayloadKeys = 'data' | 'kids'

export type DataRecord = Record<PayloadKeys, object>

interface HeaderKeys {
  [key: string]: string | boolean | undefined
}


export interface HeaderObject extends HeaderKeys {
  text: string
  value: string
  sortable: boolean
  align?: string
}
