import { ApiResponse, ApiFilters } from '../types/api'
import { Project } from '../types/project'
import { Property, Townhouse, Villa, Apartment, LandLot } from '../types/product'
import { SimilarProductsResponse } from '../types/similar'

const API_BASE_URL = 'https://tta-backend-iji0.onrender.com/api'

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

  async getProperties(filters: ApiFilters = {}): Promise<ApiResponse<Property>> {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) queryParams.append(key, value.toString())
    })
    return this.fetchFromApi(`/properties/${queryParams ? `?${queryParams}` : ''}`)
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
      return { data, isUsingMockData: false }
    } catch (error) {
      // mock data fallback ở đây
      return { data: null, isUsingMockData: true, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  getMediaUrl(relativePath: string): string {
    return relativePath.startsWith('http')
      ? relativePath
      : `https://tta-backend-iji0.onrender.com${relativePath}`
  }
}

export const apiService = new ApiService()
