
export interface TownhouseType {
  id: string
  create_at: string
  type: 'townhouse'
  title: string
  isForSale: boolean,
  location: string
  coordinate: {
    longitude: string,
    latitude: string
  }
  detail_location?: string
  price: string
  area: string
  bedroom: string
  bathroom: string
  discription: string
  policy?: string
  numberOfFloors?: string
  interior?: string
  entranceWay?: string
  images: string[]
  videoUrl: string
}

export interface VillaType {
  id: string
  create_at: string
  type: 'villa'
  title: string
  isForSale: boolean,
  location: string
  coordinate: {
    longitude: string,
    latitude: string
  }
  detail_location?: string
  price: string
  area: string
  bedroom: string
  bathroom: string
  discription: string
  policy?: string
  numberOfFloors?: string
  interior?: string
  entranceWay?: string
  images: string[]
  videoUrl: string
}

export interface LandType {
  id: string
  create_at: string
  type: 'land'
  title: string
  isForSale: boolean,
  location: string
  coordinate: {
    longitude: string,
    latitude: string
  }
  detail_location?: string
  price: string
  area: string
  discription: string
  policy?: string
  entranceWay?: string
  images: string[]
  videoUrl: string
}

export interface ApartmentType {
  id: string
  create_at: string
  type: 'apartment'
  title: string
  isForSale: boolean,
  location: string
  coordinate: {
    longitude: string,
    latitude: string
  }
  detail_location?: string
  price: string
  area: string
  bedroom: string
  bathroom: string
  discription: string
  policy?: string
  numberOfFloors?: string
  interior?: string
  entranceWay?: string
  images: string[]
  videoUrl: string
}

export type ProductType = TownhouseType | VillaType | ApartmentType | LandType
