



export interface TownhouseShowProperty {
  id: string
  title: string
  description: string
  area: string
  area_formatted: string
  location: string
  price: string
  price_formatted: string
  for_sale: boolean
  for_sale_display: string
  type: 'townhouse' | 'villa' | 'apartment' | 'land'
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  have_video: boolean
  bedrooms: number
  bathrooms: number
}

export interface VillaShowProperty {
  id: string
  title: string
  description: string
  area: string
  area_formatted: string
  location: string
  price: string
  price_formatted: string
  for_sale: boolean
  for_sale_display: string
  type: 'townhouse' | 'villa' | 'apartment' | 'land'
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  have_video: boolean
  bedrooms: number
  bathrooms: number
}

export interface ApartmentShowProperty {
  id: string
  title: string
  description: string
  area: string
  area_formatted: string
  location: string
  price: string
  price_formatted: string
  for_sale: boolean
  for_sale_display: string
  type: 'townhouse' | 'villa' | 'apartment' | 'land'
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  have_video: boolean
  bedrooms: number
  bathrooms: number
}

export interface LandLotShowProperty {
  id: string
  title: string
  description: string
  area: string
  area_formatted: string
  location: string
  price: string
  price_formatted: string
  for_sale: boolean
  for_sale_display: string
  type: 'townhouse' | 'villa' | 'apartment' | 'land'
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  have_video: boolean
}

export interface UseTownhousesReturn {
  properties: TownhouseShowProperty[]
  type: 'townhouse'
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
}

export interface UseVillasReturn {
  properties: VillaShowProperty[]
  type: 'villa'
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
}

export interface UseLandReturn {
  properties: LandLotShowProperty[]
  type: 'land'
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
}

export interface UseApartmentsReturn {
  properties: ApartmentShowProperty[]
  type: 'apartment'
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
}


export type ShowProperty = TownhouseShowProperty | VillaShowProperty | ApartmentShowProperty | LandLotShowProperty

export type ShowPropertyReturn = UseTownhousesReturn | UseVillasReturn | UseLandReturn | UseApartmentsReturn