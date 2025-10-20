import { ApiResponse, ApiFilters } from '../types/api'
import { Project } from '../types/project'
import { Property, Townhouse, Villa, Apartment, LandLot } from '../types/product'
import { SimilarProductsResponse, SimilarProductItem } from '../types/similar'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const API_BASE_URL = `${BACKEND_URL}/api`

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

  async getProjects(filters: { page?: number } = {}): Promise<ApiResponse<Project>> {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) queryParams.append(key, value.toString())
    })
    return this.fetchFromApi(`/projects/${queryParams ? `?${queryParams}` : ''}`)
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

  async getSimilarPropertiesWithFallback(propertyId: string) {
    try {
      const data = await this.fetchFromApi<SimilarProductsResponse>(`/similar/${propertyId}/`)
      return { data }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
async getWatchedProperties(propertiesID: string[]) {
  let ans: SimilarProductItem[] = []

  for (let i = 0; i < propertiesID.length; i++) {
    try {
      const data: Property = await this.fetchFromApi(`/properties/${propertiesID[i]}`)

      let main_image: string | undefined
      for (let j = 0; j < data.media.length; j++) { 
        if (!main_image && data.media[j].media_type === 'image') {
          main_image = data.media[j].file
        }
      }

      ans.push({
        id: data.id,
        title: data.title,
        price: data.price,
        price_formatted: data.price_formatted,
        area: data.area,
        area_formatted: data.area_formatted,
        location: data.location,
        main_image: main_image,
        num_images: data.media.length,
        created_at: data.created_at
      })
    } catch (err) {
      console.warn(`Skipping property ${propertiesID[i]}:`, err)
      continue
    }
  }
  return ans
}

  getMediaUrl(relativePath: string): string {
    return relativePath.startsWith('http')
      ? relativePath
      : `${BACKEND_URL}${relativePath}`
      // : `https://tta-backend-iji0.onrender.com${relativePath}` # check before deploy
  }
}

export const apiService = new ApiService()
