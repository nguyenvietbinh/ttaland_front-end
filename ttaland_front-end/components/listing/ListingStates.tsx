'use client'

interface LoadingStateProps {
  isLoading: boolean
  error: string | null
  onRetry?: () => void
}

export const LoadingErrorState = ({ isLoading, error, onRetry }: LoadingStateProps) => {
  if (isLoading) {
    return (
      <div className="col-span-2 text-center py-8 text-white">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <p className="mt-2">Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-2 text-center py-8 text-red-400">
        <p>Có lỗi xảy ra: {error}</p>
        <button 
          onClick={onRetry || (() => window.location.reload())} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return null
}

interface LoadMoreButtonProps {
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export const LoadMoreButton = ({ isLoading, hasMore, onLoadMore }: LoadMoreButtonProps) => {
  if (!isLoading && hasMore) {
    return (
      <div className="col-span-2 text-center py-4">
        <button 
          onClick={onLoadMore}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Tải thêm
        </button>
      </div>
    )
  }

  return null
}
