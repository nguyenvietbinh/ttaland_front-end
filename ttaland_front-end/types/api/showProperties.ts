// /api/townhouses 
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
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  bedrooms: number
  bathrooms: number
}

// /api/villas
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
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  bedrooms: number
  bathrooms: number
}

// /api/apartments
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
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
  bedrooms: number
  bathrooms: number
}

// /api/land
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
  type_display: string
  created_at: string
  main_images: [string, string, string, string]
  number_of_images: number
}

// api/properties
export type ShowProperty = TownhouseShowProperty | VillaShowProperty | ApartmentShowProperty | LandLotShowProperty




export interface UseTownhousesReturn {
  properties: TownhouseShowProperty[]
  type: 'townhouse'
  for_sale: boolean
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
  for_sale: boolean
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
  for_sale: boolean
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
  for_sale: boolean
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
}


export type ShowPropertyReturn = UseTownhousesReturn | UseVillasReturn | UseLandReturn | UseApartmentsReturn