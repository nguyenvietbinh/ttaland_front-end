const API_BASE_URL = 'http://127.0.0.1:8000/api'

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Base interfaces
export interface DevelopmentProject {
  id: string
  name: string
  location: string
}

export interface MediaFile {
  id: string
  media_type: 'image' | 'video'
  file: string
  file_url?: string
  uploaded_at: string
  order: number
}

// Base RealEstateProduct interface (corresponds to Django model)
export interface RealEstateProduct {
  id: string // Format: {type_prefix}-{sequential_number}
  title: string
  description: string
  area: string // Decimal as string from API
  area_formatted: string
  location: string
  price: string // Decimal as string from API
  price_formatted: string
  for_sale: boolean // True = sale, False = rent
  for_sale_display: string
  type: 'land' | 'townhouse' | 'villa' | 'apartment'
  type_display: string
  project?: DevelopmentProject | null
  created_at: string
  media: MediaFile[]
  youtube_url?: string | null
  tiktok_url?: string | null
}

// Detail interfaces corresponding to Django detail models
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
  road_frontage: string // Decimal as string from API
  road_frontage_formatted?: string
}

// Extended product interfaces with their specific details
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

// Union type for all product types
export type Property = Townhouse | Villa | Apartment | LandLot

// Legacy interface for backward compatibility
export interface ApiTownhouseDetail extends Townhouse {}

export interface ApiFilters {
  type?: string
  for_sale?: boolean
  min_price?: number
  max_price?: number
  project?: string
  page?: number
}

class ApiService {
  private async fetchFromApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from ${endpoint}:`, error)
      throw error
    }
  }

  // Get all properties with filters
  async getProperties(filters: ApiFilters = {}): Promise<ApiResponse<Property>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/properties/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<Property>>(endpoint)
  }

  // Get townhouses specifically
  async getTownhouses(filters: Omit<ApiFilters, 'type'> = {}): Promise<ApiResponse<Townhouse>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/townhouses/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<Townhouse>>(endpoint)
  }

  // Get villas specifically
  async getVillas(filters: Omit<ApiFilters, 'type'> = {}): Promise<ApiResponse<Villa>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/villas/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<Villa>>(endpoint)
  }

  // Get apartments specifically
  async getApartments(filters: Omit<ApiFilters, 'type'> = {}): Promise<ApiResponse<Apartment>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/apartments/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<Apartment>>(endpoint)
  }

  // Get land lots specifically
  async getLandLots(filters: Omit<ApiFilters, 'type'> = {}): Promise<ApiResponse<LandLot>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/land/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<LandLot>>(endpoint)
  }

  // Get property details (generic)
  async getPropertyDetails(propertyId: string): Promise<Property> {
    return this.fetchFromApi<Property>(`/properties/${propertyId}/`)
  }

  // Get specific product type details
  async getTownhouseDetails(townhouseId: string): Promise<Townhouse> {
    return this.fetchFromApi<Townhouse>(`/townhouses/${townhouseId}/`)
  }

  async getVillaDetails(villaId: string): Promise<Villa> {
    return this.fetchFromApi<Villa>(`/villas/${villaId}/`)
  }

  async getApartmentDetails(apartmentId: string): Promise<Apartment> {
    return this.fetchFromApi<Apartment>(`/apartments/${apartmentId}/`)
  }

  async getLandLotDetails(landId: string): Promise<LandLot> {
    return this.fetchFromApi<LandLot>(`/land/${landId}/`)
  }

  // Get townhouse details with fallback to mock data #Remove mock data for production
  async getTownhouseDetailsWithFallback(townhouseId: string): Promise<{
    data: Townhouse | null,
    isUsingMockData: boolean,
    error?: string
  }> {
    try {
      const data = await this.getTownhouseDetails(townhouseId)
      return {
        data,
        isUsingMockData: false
      }
    } catch (error) {
      console.warn(`API failed for townhouse ${townhouseId}, using mock data:`, error)
      
      // Mock data fallback
      const mockData: Townhouse = {
        id: townhouseId,
        title: `Nhà phố ${townhouseId} (Mock Data - FOR TESTING)`,
        description: "Mô tả sản phẩm từ mock data cho testing",
        area: "120.00",
        area_formatted: "120 m²",
        location: "Test Location, Testing District",
        price: "7300000000.00",
        price_formatted: "7.3 Tỷ",
        for_sale: true,
        for_sale_display: "For Sale",
        type: "townhouse",
        type_display: "Townhouse",
        created_at: new Date().toISOString(),
        project: null,
        media: [
          {
            id: "mock-1",
            media_type: "image",
            file: "/img/example/showcase0.jpg",
            file_url: "/img/example/showcase0.jpg",
            uploaded_at: new Date().toISOString(),
            order: 0
          },
          {
            id: "mock-2", 
            media_type: "image",
            file: "/img/example/showcase1.jpg",
            file_url: "/img/example/showcase1.jpg",
            uploaded_at: new Date().toISOString(),
            order: 1
          }
        ],
        youtube_url: "https://www.youtube.com/watch?v=dQj7hrKQxU8",
        tiktok_url: "https://www.tiktok.com/@tuananh_nhadat/video/7401361660478246162",
        townhouse_details: {
          floors: 3,
          bedrooms: 4,
          bathrooms: 3,
          living_room: true,
          garage: 1,
          policy: "Đang cập nhật (Mock Data)",
          structure: "1 trệt - 3 lầu (Mock Data)",
          interior: "Đầy đủ (Mock Data)"
        }
      }
      
      return {
        data: mockData,
        isUsingMockData: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Search properties
  async searchProperties(query: string): Promise<ApiResponse<Property>> {
    const endpoint = `/search/?q=${encodeURIComponent(query)}`
    return this.fetchFromApi<ApiResponse<Property>>(endpoint)
  }

  // Get similar properties
  async getSimilarProperties(propertyId: string): Promise<{
    product_id: string
    similar_products: string[]
    criteria: {
      type: string
      price_range: string
      area_range: string
      for_sale: boolean
    }
  }> {
    return this.fetchFromApi(`/similar/${propertyId}/`)
  }

  // Helper method to get full media URL
  getMediaUrl(relativePath: string): string {
    if (relativePath.startsWith('http')) {
      return relativePath
    }
    return `http://127.0.0.1:8000${relativePath}`
  }
}

export const apiService = new ApiService()
