'use client'
import { useState, useEffect } from 'react'
import { apiService, type Apartment, type ApiResponse, type ApiFilters } from '@/services/apiService'

interface UseApartmentsReturn {
  apartments: Apartment[]
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
  setFilters: (filters: Partial<ApiFilters>) => void
}

export const useApartments = (initialFilters: ApiFilters = {}): UseApartmentsReturn => {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFiltersState] = useState<ApiFilters>({
    for_sale: true, // Default to for sale
    ...initialFilters
  })

  const fetchApartments = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<Apartment> = await apiService.getApartments({
        ...filters,
        page
      })

      if (append) {
        setApartments(prev => [...prev, ...response.results])
      } else {
        setApartments(response.results)
      }

      setTotalCount(response.count)
      setHasMore(response.next !== null)
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch apartments')
      console.error('Error fetching apartments:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchApartments(currentPage + 1, true)
    }
  }

  const refresh = () => {
    setCurrentPage(1)
    fetchApartments(1, false)
  }

  const setFilters = (newFilters: Partial<ApiFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  // Fetch data when filters change
  useEffect(() => {
    fetchApartments(1, false)
  }, [filters])

  return {
    apartments,
    loading,
    error,
    hasMore,
    totalCount,
    currentPage,
    loadMore,
    refresh,
    setFilters
  }
}

// Hook for single apartment details
interface UseApartmentDetailsReturn {
  apartment: Apartment | null
  loading: boolean
  error: string | null
  refresh: () => void
}

export const useApartmentDetails = (apartmentId: string | null): UseApartmentDetailsReturn => {
  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchApartmentDetails = async () => {
    if (!apartmentId) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getApartmentDetails(apartmentId)
      setApartment(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch apartment details')
      console.error('Error fetching apartment details:', err)
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    if (apartmentId) {
      fetchApartmentDetails()
    }
  }

  useEffect(() => {
    fetchApartmentDetails()
  }, [apartmentId])

  return {
    apartment,
    loading,
    error,
    refresh
  }
}
