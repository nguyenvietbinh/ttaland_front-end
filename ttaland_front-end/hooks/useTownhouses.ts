'use client'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { TownhouseShowProperty, UseTownhousesReturn } from '@/types/api/showProperties'
import { Townhouse } from '@/types/api/propertiesDetail'
import { ApiResponse, ApiFilters } from '@/types/api/api'

export const useTownhouses = (initialFilters: ApiFilters = {for_sale: true}): UseTownhousesReturn => {
  const [properties, setProperties] = useState<TownhouseShowProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters] = useState<ApiFilters>({
    ...initialFilters
  })

  const fetchTownhouses = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<TownhouseShowProperty> = await apiService.getTownhouses({
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
      setError(err instanceof Error ? err.message : 'Failed to fetch townhouses')
      console.error('Error fetching townhouses:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchTownhouses(currentPage + 1, true)
    }
  }

  const refresh = () => {
    setCurrentPage(1)
    fetchTownhouses(1, false)
  }

  // Fetch data when filters change
  useEffect(() => {
    fetchTownhouses(1, false)
  }, [filters])

  return {
    properties,
    type: 'townhouse',
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

// Hook for single townhouse details
interface UseTownhouseDetailsReturn {
  townhouse: Townhouse | null
  loading: boolean
  error: string | null
  refresh: () => void
}

export const useTownhouseDetails = (townhouseId: string | null): UseTownhouseDetailsReturn => {
  const [townhouse, setTownhouse] = useState<Townhouse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTownhouseDetails = async () => {
    if (!townhouseId) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getTownhouseDetails(townhouseId)
      setTownhouse(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch townhouse details')
      console.error('Error fetching townhouse details:', err)
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    if (townhouseId) {
      fetchTownhouseDetails()
    }
  }

  useEffect(() => {
    fetchTownhouseDetails()
  }, [townhouseId])

  return {
    townhouse,
    loading,
    error,
    refresh
  }
}
