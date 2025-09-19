'use client'
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import SimilarProductCard from './similar_product_card';
import { apiService } from '../../../services/apiService';
import { SimilarProductItem } from '@/types/similar';

interface SimilarProductProps {
  productId?: string;
}

const Similar_produc = ({ productId }: SimilarProductProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // State for API data
  const [similarProducts, setSimilarProducts] = useState<SimilarProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Pagination state
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Mount check to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch similar products from API
  useEffect(() => {
    if (!isMounted) return;
    
    const fetchSimilarProducts = async () => {
      if (!productId) {
        return;
      }

      try {
        setIsLoading(true);
        const result = await apiService.getSimilarPropertiesWithFallback(productId);
        
        if (result.data) {
          setSimilarProducts(result.data.similar_products);
        }
        setIsUsingMockData(result.isUsingMockData);
        setError(result.error || null);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load similar products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [productId, isMounted]);

  // Reset pagination when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [similarProducts]);

  // Calculate total pages based on similar products
  const totalPages = Math.ceil(similarProducts.length / itemsPerPage);
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    
    if (direction === 'left' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'right' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToPage = (page: number) => {
    if (isAnimating || page === currentPage) return;
    
    setIsAnimating(true);
    setCurrentPage(page);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Get current items to display - using API data instead of mock
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return similarProducts.slice(startIndex, endIndex);
  };

  // Generate pagination numbers - keep original logic
  const getPaginationNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // If total pages is 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // For more than 5 pages, use specific pattern
      
      if (currentPage <= 2) {
        // Pages 1, 2: show [1] [2] [3] [...] [last]
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Last 3 pages (when current page is totalPages-2, totalPages-1, or totalPages): 
        // show [1] [...] [n-2] [n-1] [n]
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle pages (3, 4, ...): show [current-1] [current] [current+1] [...] [last]
        pages.push(currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className='relative flex justify-center'>
        <div className="container">
          <div className="text-center py-8">
            <div className="text-lg">Đang tải sản phẩm tương tự...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex justify-center'>
      <div className="container">
        {/* Mock Data Warning */}
        {isUsingMockData && (
          <div className="">
          </div>
        )}

        {/* Title and Pagination Controls on same line */}
        <div className="flex justify-start lg:justify-between items-center mt-20 mb-6">
          <p className='text-3xl sm:text-4xl'>Sản phẩm tương tự:</p>
        
          {/* desktop Pagination Controls */}
          <div className="items-center space-x-1 hidden lg:flex">
          {/* Previous Arrow */}
          <button 
            onClick={() => scroll('left')}
            disabled={currentPage === 1 || isAnimating}
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
              currentPage === 1 || isAnimating 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
            }`}
            aria-label="Previous page"
          >
            <FaChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          {getPaginationNumbers().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border bg-white border-gray-300 text-gray-500 text-xl font-bold">
                  ...
                </div>
              ) : (
                <button
                  onClick={() => goToPage(page as number)}
                  disabled={isAnimating}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border transition-all duration-200 text-xl font-bold ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}

          {/* Next Arrow */}
          <button 
            onClick={() => scroll('right')}
            disabled={currentPage === totalPages || isAnimating}
            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
              currentPage === totalPages || isAnimating 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
            }`}
            aria-label="Next page"
          >
            <FaChevronRight size={16} />
          </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg">Đang tải sản phẩm tương tự...</div>
          </div>
        )}

        {/* Desktop Products Grid */}
        {!isLoading && (
          <div className="hidden lg:block">
            <div 
              className={`grid grid-cols-4 gap-4 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            >
              {getCurrentItems().map((property, index) => (
                <SimilarProductCard
                  key={`${property.id}-${currentPage}-${index}`}
                  id={property.id}
                  title={property.title}
                  price={property.price_formatted}
                  area={property.area_formatted}
                  location={property.location}
                  images={[property.main_image]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Products Carousel */}
        {!isLoading && (
          <div className="lg:hidden">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {similarProducts.map((property, index) => (
                <div key={`${property.id}-mobile-${index}`} className="flex-shrink-0 w-64">
                  <SimilarProductCard
                    id={property.id}
                    title={property.title}
                    price={property.price_formatted}
                    area={property.area_formatted}
                    location={property.location}
                    images={[property.main_image]}
                  />
                </div>
              ))}
            </div>

            {/* mobile Pagination Controls */}
            <div className="flex justify-center items-center space-x-1 mt-4">
              {/* Previous Arrow */}
              <button 
                onClick={() => scroll('left')}
                disabled={currentPage === 1 || isAnimating}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                  currentPage === 1 || isAnimating 
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                <FaChevronLeft size={12} />
              </button>

              {/* Page Numbers */}
              {getPaginationNumbers().map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white border-gray-300 text-gray-500 text-sm font-bold">
                      ...
                    </div>
                  ) : (
                    <button
                      onClick={() => goToPage(page as number)}
                      disabled={isAnimating}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 text-sm font-bold ${
                        currentPage === page
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}

              {/* Next Arrow */}
              <button 
                onClick={() => scroll('right')}
                disabled={currentPage === totalPages || isAnimating}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                  currentPage === totalPages || isAnimating 
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
                }`}
                aria-label="Next page"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && !isUsingMockData && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">
              Lỗi tải dữ liệu: {error}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Similar_produc
