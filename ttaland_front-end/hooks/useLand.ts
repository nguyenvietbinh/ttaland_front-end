'use client'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { LandLotShowProperty, UseLandReturn } from '@/types/api/showProperties'
import { LandLot } from '@/types/api/propertiesDetail'
import { ApiResponse, ApiFilters } from '@/types/api/api'



export const useLand = (initialFilters: ApiFilters = {for_sale: true}): UseLandReturn => {
  const [properties, setProperties] = useState<LandLotShowProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters] = useState<ApiFilters>({
    ...initialFilters
  })

  const fetchLand = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<LandLotShowProperty> = await apiService.getLandLots({
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
      setError(err instanceof Error ? err.message : 'Failed to fetch land lots')
      console.error('Error fetching land lots:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchLand(currentPage + 1, true)
    }
  }

  const refresh = () => {
    setCurrentPage(1)
    fetchLand(1, false)
  }


  // Fetch data when filters change
  useEffect(() => {
    fetchLand(1, false)
  }, [filters])

  return {
    properties,
    type: 'land',
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

// Hook for single land details
interface UseLandDetailsReturn {
  land: LandLot | null
  loading: boolean
  error: string | null
  refresh: () => void
}

export const useLandDetails = (landId: string | null): UseLandDetailsReturn => {
  const [land, setLand] = useState<LandLot | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLandDetails = async () => {
    if (!landId) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getLandLotDetails(landId)
      setLand(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch land details')
      console.error('Error fetching land details:', err)
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    if (landId) {
      fetchLandDetails()
    }
  }

  useEffect(() => {
    fetchLandDetails()
  }, [landId])

  return {
    land,
    loading,
    error,
    refresh
  }
}
