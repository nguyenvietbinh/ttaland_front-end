'use client'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { Villa } from '@/types/product'
import { ApiResponse, ApiFilters } from '@/types/api'

interface UseVillasReturn {
  villas: Villa[]
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
  setFilters: (filters: Partial<ApiFilters>) => void
}

export const useVillas = (initialFilters: ApiFilters = {}): UseVillasReturn => {
  const [villas, setVillas] = useState<Villa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFiltersState] = useState<ApiFilters>({
    for_sale: true, // Default to for sale
    ...initialFilters
  })

  const fetchVillas = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<Villa> = await apiService.getVillas({
        ...filters,
        page
      })

      if (append) {
        setVillas(prev => [...prev, ...response.results])
      } else {
        setVillas(response.results)
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

  const setFilters = (newFilters: Partial<ApiFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  // Fetch data when filters change
  useEffect(() => {
    fetchVillas(1, false)
  }, [filters])

  return {
    villas,
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
