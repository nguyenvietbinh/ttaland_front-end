'use client'
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import SimilarProductCard from '../similar_product/similar_product_card';
import { SimilarProductItem } from '@/types/similar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { apiService } from '@/services/apiService';


const Watched_product = () => {
  const { getWatchedProductData } = useLocalStorage()
  
  // State for API data
  const [watchedProductsID] = useState<string[]>(getWatchedProductData())
  const [watchedProductsItems, setWatchedProductsItems] = useState<SimilarProductItem[]>([])
  // Pagination state
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const fetchWatchedProperties = async () => {
    const data = await apiService.getWatchedProperties(watchedProductsID)
    setWatchedProductsItems(data)
  }
  
  // Reset pagination when products change
  useEffect(() => {
    setCurrentPage(1);
    fetchWatchedProperties()
  }, [watchedProductsID]);

  // Calculate total pages based on similar products
  const totalPages = Math.ceil(watchedProductsID.length / itemsPerPage);
  
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
    return watchedProductsItems.slice(startIndex, endIndex);
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

  return (
    <div className='relative flex justify-center'>
      <div>
        {/* Title and Pagination Controls on same line */}
        <div className="flex justify-start lg:justify-between items-center mt-20 mb-6">
          <p className='text-xl font-bold text-left'>Sản phẩm đã xem:</p>
        
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



        {/* Desktop Products Grid */}
        {(
          <div className="">
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-2 2xl:gap-4 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            >
              {getCurrentItems().map((property, index) => (
                <SimilarProductCard key={index} similerproductIteam={property}/>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Watched_product
