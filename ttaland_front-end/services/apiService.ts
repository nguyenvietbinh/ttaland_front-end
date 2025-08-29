const API_BASE_URL = 'http://localhost:8000/api'

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Property {
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
  type: 'apartment' | 'townhouse' | 'villa' | 'land'
  type_display: string
  project?: {
    id: string
    name: string
    location: string
  }
  created_at: string
  media: MediaFile[]
  images: string[]
  main_images: string[]
}

export interface Townhouse extends Property {
  bedrooms: number
  bathrooms: number
  garage: number
  townhouse_details?: {
    floors: number
    bedrooms: number
    bathrooms: number
    living_room: boolean
    garage: number
    policy: string
    structure: string
    interior: string
  }
}

export interface Villa extends Property {
  bedrooms: number
  bathrooms: number
  garage: number
  villa_details?: {
    floors: number
    bedrooms: number
    bathrooms: number
    living_room: boolean
    garden: boolean
    swimming_pool: boolean
    garage: number
  }
}

export interface Apartment extends Property {
  bedrooms: number
  bathrooms: number
  apartment_details?: {
    floor_number: number
    bedrooms: number
    bathrooms: number
    balcony: boolean
  }
}

export interface Land extends Property {
  land_details?: {
    land_type: string
    road_frontage: string
    road_frontage_formatted: string
  }
}

export interface MediaFile {
  id: string
  media_type: 'image' | 'video'
  file: string
  uploaded_at: string
  order: number
}

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
  async getLand(filters: Omit<ApiFilters, 'type'> = {}): Promise<ApiResponse<Land>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/land/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<Land>>(endpoint)
  }

  // Get property details
  async getPropertyDetails(propertyId: string): Promise<Property> {
    return this.fetchFromApi<Property>(`/properties/${propertyId}/`)
  }

  // Get townhouse details
  async getTownhouseDetails(townhouseId: string): Promise<Townhouse> {
    return this.fetchFromApi<Townhouse>(`/townhouses/${townhouseId}/`)
  }

  // Get villa details
  async getVillaDetails(villaId: string): Promise<Villa> {
    return this.fetchFromApi<Villa>(`/villas/${villaId}/`)
  }

  // Get apartment details
  async getApartmentDetails(apartmentId: string): Promise<Apartment> {
    return this.fetchFromApi<Apartment>(`/apartments/${apartmentId}/`)
  }

  // Get land details
  async getLandDetails(landId: string): Promise<Land> {
    return this.fetchFromApi<Land>(`/land/${landId}/`)
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
    return `http://localhost:8000${relativePath}`
  }
}

export const apiService = new ApiService()
