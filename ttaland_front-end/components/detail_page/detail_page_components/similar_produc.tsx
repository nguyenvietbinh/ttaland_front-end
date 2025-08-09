'use client'
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';
import { useRef, useState } from 'react';
import SimilarProductCard from './similar_product_card';

const Similar_produc = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Pagination state
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data for variety - 27 different properties
  const sampleProperties = [
    {
      title: "2PN rẻ nhất Masteri Centre Point, bàn giao full nội thất",
      price: "4,6 tỷ",
      area: "70 m²",
      location: "Quận 9, Hồ Chí Minh"
    },
    {
      title: "Căn hộ cao cấp Vinhomes Grand Park, view sông",
      price: "3,2 tỷ",
      area: "65 m²",
      location: "Quận 9, Hồ Chí Minh"
    },
    {
      title: "Chung cư The Sun Avenue, nội thất đầy đủ",
      price: "5,8 tỷ",
      area: "85 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Apartment Landmark 81, tầng cao view đẹp",
      price: "7,2 tỷ",
      area: "90 m²",
      location: "Quận 1, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Saigon Pearl, full nội thất cao cấp",
      price: "6,5 tỷ",
      area: "88 m²",
      location: "Quận Bình Thạnh, Hồ Chí Minh"
    },
    {
      title: "Penthouse Vinhomes Central Park, view panorama",
      price: "12,5 tỷ",
      area: "120 m²",
      location: "Quận Bình Thạnh, Hồ Chí Minh"
    },
    {
      title: "Studio Gateway Thảo Điền, giá tốt nhất thị trường",
      price: "2,8 tỷ",
      area: "45 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Diamond Island, view sông Sài Gòn",
      price: "8,9 tỷ",
      area: "95 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Chung cư The Manor, nội thất sang trọng",
      price: "6,2 tỷ",
      area: "78 m²",
      location: "Quận Bình Thạnh, Hồ Chí Minh"
    },
    {
      title: "Officetel Millennium, đầu tư sinh lời cao",
      price: "3,5 tỷ",
      area: "52 m²",
      location: "Quận 4, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Estella Heights, view công viên",
      price: "5,1 tỷ",
      area: "75 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Duplex The Vista An Phú, thiết kế hiện đại",
      price: "9,8 tỷ",
      area: "110 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Times City Park Hill, tiện ích đầy đủ",
      price: "4,3 tỷ",
      area: "68 m²",
      location: "Quận 10, Hồ Chí Minh"
    },
    {
      title: "Chung cư Sunrise City, ban công rộng rãi",
      price: "5,7 tỷ",
      area: "82 m²",
      location: "Quận 7, Hồ Chí Minh"
    },
    {
      title: "Apartment Feliz En Vista, view thành phố",
      price: "4,9 tỷ",
      area: "71 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Palm Heights, không gian xanh",
      price: "6,8 tỷ",
      area: "86 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Penthouse Riverpark Premier, tầng cao nhất",
      price: "15,2 tỷ",
      area: "140 m²",
      location: "Quận 7, Hồ Chí Minh"
    },
    {
      title: "Studio The Gold View, view sông đẹp",
      price: "3,1 tỷ",
      area: "48 m²",
      location: "Quận 4, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Masteri Millennium, trung tâm quận 4",
      price: "5,4 tỷ",
      area: "77 m²",
      location: "Quận 4, Hồ Chí Minh"
    },
    {
      title: "Chung cư New City Thu Thiem, khu đô thị mới",
      price: "7,6 tỷ",
      area: "92 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Times City Park Hill, tiện ích đầy đủ",
      price: "4,3 tỷ",
      area: "68 m²",
      location: "Quận 10, Hồ Chí Minh"
    },
    {
      title: "Chung cư Sunrise City, ban công rộng rãi",
      price: "5,7 tỷ",
      area: "82 m²",
      location: "Quận 7, Hồ Chí Minh"
    },
    {
      title: "Apartment Feliz En Vista, view thành phố",
      price: "4,9 tỷ",
      area: "71 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Palm Heights, không gian xanh",
      price: "6,8 tỷ",
      area: "86 m²",
      location: "Quận 2, Hồ Chí Minh"
    },
    {
      title: "Penthouse Riverpark Premier, tầng cao nhất",
      price: "15,2 tỷ",
      area: "140 m²",
      location: "Quận 7, Hồ Chí Minh"
    },
    {
      title: "Studio The Gold View, view sông đẹp",
      price: "3,1 tỷ",
      area: "48 m²",
      location: "Quận 4, Hồ Chí Minh"
    },
    {
      title: "Căn hộ Masteri Millennium, trung tâm quận 4",
      price: "5,4 tỷ",
      area: "77 m²",
      location: "Quận 4, Hồ Chí Minh"
    }
  ];

  // Calculate total pages based on sample properties
  const totalPages = Math.ceil(sampleProperties.length / itemsPerPage);
  
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

  // Get current items to display
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sampleProperties.slice(startIndex, endIndex);
  };

  // Generate pagination numbers - specific pattern for all cases
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
      <div className="w-full max-w-7xl">
        {/* Title and Pagination Controls on same line */}
        <div className="flex justify-between items-center mt-20 mb-6">
          <p className='text-3xl'>Sản phẩm tương tự:</p>
        
        <div className="flex items-center space-x-1">
        {/* Previous Arrow */}
        <button 
          onClick={() => scroll('left')}
          disabled={currentPage === 1 || isAnimating}
          className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
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
              <div className="w-12 h-12 flex items-center justify-center rounded-lg border bg-white border-gray-300 text-gray-500 text-lg font-bold">
                ...
              </div>
            ) : (
              <button
                onClick={() => goToPage(page as number)}
                disabled={isAnimating}
                className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-200 text-lg font-bold ${
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
          className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-200 ${
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
      
      {/* Products Grid with Animation */}
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ease-in-out ${
            isAnimating ? 'opacity-0 transform translate-x-2' : 'opacity-100 transform translate-x-0'
          }`}
        >
          {getCurrentItems().map((propertyData, index) => {
            const actualIndex = (currentPage - 1) * itemsPerPage + index;
            const delayClass = index === 0 ? '' : index === 1 ? 'delay-75' : index === 2 ? 'delay-150' : 'delay-300';
            
            return (
              <div
                key={`${currentPage}-${index}`} 
                className={`transition-all duration-300 ${delayClass} ${
                  isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
                }`}
              >
                <SimilarProductCard 
                  id={`similar-${actualIndex}`}
                  title={propertyData.title}
                  price={propertyData.price}
                  area={propertyData.area}
                  location={propertyData.location}
                />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Similar_produc;