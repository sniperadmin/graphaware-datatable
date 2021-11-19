interface HeaderKeys {
  [key: string]: string | boolean | undefined
}

export interface HeaderObject extends HeaderKeys {
  text: string
  value: string
  sortable: boolean
  align?: string
}

export type PayloadKeys = 'data' | 'kids'
