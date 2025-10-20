'use client'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { VillaShowProperty, UseVillasReturn } from '@/types/api/showProperties'
import { Villa } from '@/types/api/propertiesDetail'
import { ApiResponse, ApiFilters } from '@/types/api/api'


export const useVillas = (initialFilters: ApiFilters = {}): UseVillasReturn => {
  const [properties, setProperties] = useState<VillaShowProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const filters = useState<ApiFilters>({
    for_sale: true, // Default to for sale
    ...initialFilters
  })

  const fetchVillas = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<VillaShowProperty> = await apiService.getVillas({
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
      setError(err instanceof Error ? err.message : 'Failed to fetch villas')
      console.error('Error fetching villas:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchVillas(currentPage + 1, true)
    }
  }

  const refresh = () => {
    setCurrentPage(1)
    fetchVillas(1, false)
  }


  // Fetch data when filters change
  useEffect(() => {
    fetchVillas(1, false)
  }, [filters])

  return {
    properties,
    type: 'villa',
    loading,
    error,
    hasMore,
    totalCount,
    currentPage,
    loadMore,
    refresh,
  }
}

// Hook for single villa details
interface UseVillaDetailsReturn {
  villa: Villa | null
  loading: boolean
  error: string | null
  refresh: () => void
}

export const useVillaDetails = (villaId: string | null): UseVillaDetailsReturn => {
  const [villa, setVilla] = useState<Villa | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchVillaDetails = async () => {
    if (!villaId) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getVillaDetails(villaId)
      setVilla(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch villa details')
      console.error('Error fetching villa details:', err)
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    if (villaId) {
      fetchVillaDetails()
    }
  }

  useEffect(() => {
    fetchVillaDetails()
  }, [villaId])

  return {
    villa,
    loading,
    error,
    refresh
  }
}
