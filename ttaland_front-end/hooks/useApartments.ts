'use client'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { ApartmentShowProperty, UseApartmentsReturn } from '@/types/api/showProperties'
import { Apartment } from '@/types/api/propertiesDetail'
import { ApiResponse, ApiFilters } from '@/types/api/api'



export const useApartments = (initialFilters: ApiFilters = {for_sale: true}): UseApartmentsReturn => {
  const [properties, setProperties] = useState<ApartmentShowProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters] = useState<ApiFilters>({
    ...initialFilters
  })

  const fetchApartments = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<ApartmentShowProperty> = await apiService.getApartments({
        ...filters,
        page
      })

      if (append) {
        setProperties(prev => [...prev, ...response.results])
      } else {
        setProperties(response.results)
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

  // Fetch data when filters change
  useEffect(() => {
    fetchApartments(1, false)
  }, [filters])

  return {
    properties,
    type: 'apartment',
    for_sale: filters.for_sale,
    loading,
    error,
    hasMore,
    totalCount,
    currentPage,
    loadMore,
    refresh,
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
