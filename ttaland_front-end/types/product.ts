import { DevelopmentProject } from './project'
import { MediaFile } from './media'

export interface RealEstateProduct {
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
  type: 'land' | 'townhouse' | 'villa' | 'apartment'
  type_display: string
  project?: DevelopmentProject | null
  created_at: string
  media: MediaFile[]
  main_images: string[]
  latitude: string
  longitude: string
  youtube_url?: string | null
  tiktok_url?: string | null
}

export interface TownhouseDetails {
  floors: number
  bedrooms: number
  bathrooms: number
  living_room: boolean
  garage: number
  policy: string
  structure: string
  interior: string
}

export interface VillaDetails {
  floors: number
  bedrooms: number
  bathrooms: number
  living_room: boolean
  garden: boolean
  swimming_pool: boolean
  garage: number
}

export interface ApartmentDetails {
  floor_number: number
  bedrooms: number
  bathrooms: number
  balcony: boolean
}

export interface LandLotDetails {
  land_type: 'residential' | 'commercial'
  road_frontage: string
  road_frontage_formatted?: string
}

// Extended product interfaces
export interface Townhouse extends RealEstateProduct {
  type: 'townhouse'
  townhouse_details: TownhouseDetails
}

export interface Villa extends RealEstateProduct {
  type: 'villa'
  villa_details: VillaDetails
}

export interface Apartment extends RealEstateProduct {
  type: 'apartment'
  apartment_details: ApartmentDetails
}

export interface LandLot extends RealEstateProduct {
  type: 'land'
  land_details: LandLotDetails
}

// Union type
export type Property = Townhouse | Villa | Apartment | LandLot
