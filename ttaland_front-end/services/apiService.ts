const API_BASE_URL = 'https://tta-backend-iji0.onrender.com/api'

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

// Full Project interface for /api/projects/ endpoint
export interface Project {
  id: string
  name: string
  location: string
  developer: string
  general_contractor: string
  project_type: string
  delivery_time: string
  completion_standard: string
  management_unit: string
  distributor: string
  area_size: string
  area_size_formatted: string
  quantity: string
  policy: string
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
  main_images: string[]
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

// Similar Products API Response Interface
export interface SimilarProductItem {
  id: string
  title: string
  price: string
  price_formatted: string
  area: string
  area_formatted: string
  location: string
  main_image: string
}

export interface SimilarProductsResponse {
  product_id: string
  similar_products: SimilarProductItem[]
  count: number
  criteria: {
    type: string
    price_range: string
    area_range: string
    for_sale: boolean
  }
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

  // Get all projects
  async getProjects(filters: { page?: number } = {}): Promise<ApiResponse<Project>> {
    const queryParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })
    
    const endpoint = `/projects/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.fetchFromApi<ApiResponse<Project>>(endpoint)
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



  // Search properties
  async searchProperties(query: string): Promise<ApiResponse<Property>> {
    const endpoint = `/search/?q=${encodeURIComponent(query)}`
    return this.fetchFromApi<ApiResponse<Property>>(endpoint)
  }

  // Get similar properties
  async getSimilarProperties(propertyId: string): Promise<SimilarProductsResponse> {
    return this.fetchFromApi<SimilarProductsResponse>(`/similar/${propertyId}/`)
  }

  // Get similar properties with fallback to mock data
  async getSimilarPropertiesWithFallback(propertyId: string): Promise<{
    data: SimilarProductsResponse | null,
    isUsingMockData: boolean,
    error?: string
  }> {
    try {
      const data = await this.getSimilarProperties(propertyId)
      return {
        data,
        isUsingMockData: false
      }
    } catch (error) {
      // API failed, using mock data fallback
      
      // Mock data fallback - 27 items following similarity criteria
      const mockData: SimilarProductsResponse = {
        product_id: propertyId,
        similar_products: [
          {
            id: "T-002",
            title: "Nhà phố 3 tầng đẹp, gần chợ",
            price: "5200000000.00",
            price_formatted: "5,2 tỷ",
            area: "98.00",
            area_formatted: "98 m²",
            location: "An Phú, Thủ Đức",
            main_image: "/img/example/showcase0.jpg"
          },
          {
            id: "T-003",
            title: "Townhouse hiện đại, full nội thất",
            price: "6800000000.00",
            price_formatted: "6,8 tỷ",
            area: "115.00",
            area_formatted: "115 m²",
            location: "Quận 9, Hồ Chí Minh",
            main_image: "/img/example/showcase1.jpg"
          },
          {
            id: "T-004",
            title: "Nhà phố mặt tiền rộng, kinh doanh tốt",
            price: "8200000000.00",
            price_formatted: "8,2 tỷ",
            area: "128.00",
            area_formatted: "128 m²",
            location: "Quận 2, Hồ Chí Minh",
            main_image: "/img/example/showcase2.jpg"
          },
          {
            id: "T-005",
            title: "Shophouse 4 tầng, vị trí đẹp",
            price: "9100000000.00",
            price_formatted: "9,1 tỷ",
            area: "105.00",
            area_formatted: "105 m²",
            location: "Quận 7, Hồ Chí Minh",
            main_image: "/img/example/showcase5.jpg"
          },
          {
            id: "T-006",
            title: "Nhà phố cao cấp, thiết kế sang trọng",
            price: "7800000000.00",
            price_formatted: "7,8 tỷ",
            area: "135.00",
            area_formatted: "135 m²",
            location: "Quận Bình Thạnh, Hồ Chí Minh",
            main_image: "/img/example/showcase6.jpg"
          },
          {
            id: "T-007",
            title: "Townhouse phong cách Châu Âu",
            price: "8900000000.00",
            price_formatted: "8,9 tỷ",
            area: "122.00",
            area_formatted: "122 m²",
            location: "Quận 3, Hồ Chí Minh",
            main_image: "/img/example/showcase7.jpg"
          },
          {
            id: "T-008",
            title: "Nhà phố góc 2 mặt tiền, đầu tư tốt",
            price: "9400000000.00",
            price_formatted: "9,4 tỷ",
            area: "108.00",
            area_formatted: "108 m²",
            location: "Quận 10, Hồ Chí Minh",
            main_image: "/img/example/showcase8.jpg"
          },
          {
            id: "T-009",
            title: "Shophouse mới 100%, sổ hồng riêng",
            price: "5800000000.00",
            price_formatted: "5,8 tỷ",
            area: "112.00",
            area_formatted: "112 m²",
            location: "Quận 12, Hồ Chí Minh",
            main_image: "/img/example/showcase9.jpg"
          },
          {
            id: "T-010",
            title: "Nhà phố khu compound, an ninh tốt",
            price: "7500000000.00",
            price_formatted: "7,5 tỷ",
            area: "140.00",
            area_formatted: "140 m²",
            location: "Thủ Đức, Hồ Chí Minh",
            main_image: "/img/example/showcase10.jpg"
          },
          {
            id: "T-011",
            title: "Townhouse 3.5 tầng, hầm để xe",
            price: "6200000000.00",
            price_formatted: "6,2 tỷ",
            area: "118.00",
            area_formatted: "118 m²",
            location: "Quận Gò Vấp, Hồ Chí Minh",
            main_image: "/img/example/showcase11.jpg"
          },
          {
            id: "T-012",
            title: "Nhà phố trục chính, tiện kinh doanh",
            price: "8600000000.00",
            price_formatted: "8,6 tỷ",
            area: "102.00",
            area_formatted: "102 m²",
            location: "Quận Tân Bình, Hồ Chí Minh",
            main_image: "/img/example/showcase12.jpg"
          },
          {
            id: "T-013",
            title: "Shophouse cao cấp, mặt tiền lớn",
            price: "9200000000.00",
            price_formatted: "9,2 tỷ",
            area: "144.00",
            area_formatted: "144 m²",
            location: "Quận 1, Hồ Chí Minh",
            main_image: "/img/example/showcase0.jpg"
          },
          {
            id: "T-014",
            title: "Nhà phố liền kề, khu dân cư cao cấp",
            price: "5600000000.00",
            price_formatted: "5,6 tỷ",
            area: "96.00",
            area_formatted: "96 m²",
            location: "Nhà Bè, Hồ Chí Minh",
            main_image: "/img/example/showcase1.jpg"
          },
          {
            id: "T-015",
            title: "Townhouse hiện đại, nội thất cao cấp",
            price: "7200000000.00",
            price_formatted: "7,2 tỷ",
            area: "126.00",
            area_formatted: "126 m²",
            location: "Quận 8, Hồ Chí Minh",
            main_image: "/img/example/showcase2.jpg"
          },
          {
            id: "T-016",
            title: "Nhà phố 4 tầng, thang máy riêng",
            price: "8800000000.00",
            price_formatted: "8,8 tỷ",
            area: "110.00",
            area_formatted: "110 m²",
            location: "Quận 11, Hồ Chí Minh",
            main_image: "/img/example/showcase5.jpg"
          },
          {
            id: "T-017",
            title: "Shophouse phố thời trang, vị trí vàng",
            price: "9500000000.00",
            price_formatted: "9,5 tỷ",
            area: "100.00",
            area_formatted: "100 m²",
            location: "Quận 1, Hồ Chí Minh",
            main_image: "/img/example/showcase6.jpg"
          },
          {
            id: "T-018",
            title: "Nhà phố mới, thiết kế tối ưu",
            price: "6500000000.00",
            price_formatted: "6,5 tỷ",
            area: "132.00",
            area_formatted: "132 m²",
            location: "Quận Phú Nhuận, Hồ Chí Minh",
            main_image: "/img/example/showcase7.jpg"
          },
          {
            id: "T-019",
            title: "Townhouse khu biệt thự, yên tĩnh",
            price: "5400000000.00",
            price_formatted: "5,4 tỷ",
            area: "142.00",
            area_formatted: "142 m²",
            location: "Quận 9, Hồ Chí Minh",
            main_image: "/img/example/showcase8.jpg"
          },
          {
            id: "T-020",
            title: "Nhà phố góc 3 mặt thoáng, đẹp lung linh",
            price: "8400000000.00",
            price_formatted: "8,4 tỷ",
            area: "114.00",
            area_formatted: "114 m²",
            location: "Quận 3, Hồ Chí Minh",
            main_image: "/img/example/showcase9.jpg"
          },
          {
            id: "T-021",
            title: "Shophouse 2 lầu, mặt tiền chính",
            price: "7000000000.00",
            price_formatted: "7,0 tỷ",
            area: "106.00",
            area_formatted: "106 m²",
            location: "Quận Tân Phú, Hồ Chí Minh",
            main_image: "/img/example/showcase10.jpg"
          },
          {
            id: "T-022",
            title: "Nhà phố compound, sân vườn đẹp",
            price: "5100000000.00",
            price_formatted: "5,1 tỷ",
            area: "138.00",
            area_formatted: "138 m²",
            location: "Bình Chánh, Hồ Chí Minh",
            main_image: "/img/example/showcase11.jpg"
          },
          {
            id: "T-023",
            title: "Townhouse cao cấp, view công viên",
            price: "8100000000.00",
            price_formatted: "8,1 tỷ",
            area: "124.00",
            area_formatted: "124 m²",
            location: "Quận 2, Hồ Chí Minh",
            main_image: "/img/example/showcase12.jpg"
          },
          {
            id: "T-024",
            title: "Nhà phố kinh doanh, dòng tiền ổn định",
            price: "6900000000.00",
            price_formatted: "6,9 tỷ",
            area: "116.00",
            area_formatted: "116 m²",
            location: "Quận 6, Hồ Chí Minh",
            main_image: "/img/example/showcase0.jpg"
          },
          {
            id: "T-025",
            title: "Shophouse mặt tiền lớn, kinh doanh tốt",
            price: "9300000000.00",
            price_formatted: "9,3 tỷ",
            area: "98.00",
            area_formatted: "98 m²",
            location: "Quận 5, Hồ Chí Minh",
            main_image: "/img/example/showcase1.jpg"
          },
          {
            id: "T-026",
            title: "Nhà phố hiện đại, smart home",
            price: "7700000000.00",
            price_formatted: "7,7 tỷ",
            area: "130.00",
            area_formatted: "130 m²",
            location: "Quận 7, Hồ Chí Minh",
            main_image: "/img/example/showcase2.jpg"
          },
          {
            id: "T-027",
            title: "Townhouse 3 tầng, garage 2 xe",
            price: "6000000000.00",
            price_formatted: "6,0 tỷ",
            area: "104.00",
            area_formatted: "104 m²",
            location: "Cần Giờ, Hồ Chí Minh",
            main_image: "/img/example/showcase5.jpg"
          }
        ],
        count: 27,
        criteria: {
          type: "townhouse",
          price_range: "5,100,000,000 - 9,500,000,000 VND",
          area_range: "96.0 - 144.0 m²",
          for_sale: true
        }
      }
      
      return {
        data: mockData,
        isUsingMockData: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Helper method to get full media URL
  getMediaUrl(relativePath: string): string {
    if (relativePath.startsWith('http')) {
      return relativePath
    }
    return `https://tta-backend-iji0.onrender.com${relativePath}`
  }
}

export const apiService = new ApiService()
