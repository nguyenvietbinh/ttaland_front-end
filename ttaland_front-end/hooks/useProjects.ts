'use client'
import { useState, useEffect } from 'react'
import { apiService, type Project, type ApiResponse } from '@/services/apiService'

interface UseProjectsReturn {
  projects: Project[]
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  loadMore: () => void
  refresh: () => void
}

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchProjects = async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<Project> = await apiService.getProjects({
        page
      })

      if (append) {
        setProjects(prev => [...prev, ...response.results])
      } else {
        setProjects(response.results)
      }

      setTotalCount(response.count)
      setHasMore(response.next !== null)
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProjects(currentPage + 1, true)
    }
  }

  const refresh = () => {
    setCurrentPage(1)
    fetchProjects(1, false)
  }

  useEffect(() => {
    fetchProjects(1, false)
  }, [])

  return {
    projects,
    loading,
    error,
    hasMore,
    totalCount,
    currentPage,
    loadMore,
    refresh
  }
}