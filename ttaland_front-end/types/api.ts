import { Property } from './product'

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiFilters {
  type?: string
  for_sale?: boolean
  min_price?: number
  max_price?: number
  project?: string
  page?: number
}
