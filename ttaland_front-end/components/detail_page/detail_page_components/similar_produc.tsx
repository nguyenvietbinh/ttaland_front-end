'use client'
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';
import { useRef } from 'react';
import San_pham_ban_property from '@/components/listing/show_property/san_pham_ban_show_property';

const Similar_produc = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth 
      : scrollLeft + clientWidth;
    
    carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  return (
    <div className='relative'>
      <p className='text-3xl mt-20'>Sản phẩm tương tự:</p>
      <div 
        ref={carouselRef}
        className="my-custom-carousel relative border-t-2 border-gray-700 py-2 w-full"
      >
        {items.map((item, index) => (
          <div
            key={index} 
            className='carousel-item w-full lg:w-1/2'
          >
            <San_pham_ban_property/>
          </div>
        ))}
      </div>
      <button 
        onClick={() => scroll('left')}
        className="absolute top-1/2 hover:ring-2 ring-white left-0 -translate-y-full mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-3 sm:p-6"
        aria-label="Previous media"
      >
        <FaChevronLeft size={20} />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute top-1/2 hover:ring-2 ring-white right-0 -translate-y-full mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-3 sm:p-6"
        aria-label="Next media"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}

export default Similar_produc;