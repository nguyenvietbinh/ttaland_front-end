'use client'

import { useState, useRef, useEffect } from "react"
import { MediaItem } from "../media_displayer"
import { useSwipe } from "@/hooks/useSwipe";
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';

interface Image_modal_tab_props {
  mediaItems: MediaItem[]
  startImageIndex: number
}

const Image_modal_tab = ({mediaItems, startImageIndex}: Image_modal_tab_props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(startImageIndex);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posterRef = useRef<HTMLDivElement>(null)

  useSwipe({
    onSwipe: (direction) => {
      if (direction === 'right') {
        goToPrevious()
      } else if (direction === 'left') {
        goToNext()
      }
    },
    targetRef: posterRef
  })

  useEffect(() => {
    setCurrentIndex(startImageIndex)
  }, [startImageIndex])

  useEffect(() => {
    const currentThumb = thumbRefs.current[currentIndex];
    if (currentThumb) {
      currentThumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  const goToPrevious = (): void => {
    setCurrentIndex(prev => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goToNext = (): void => {
    setCurrentIndex(prev => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };
  
  const currentMedia = mediaItems[currentIndex];
  return (
    <div>
      <div ref={posterRef} className="h-[80vh] full">
        <figure   
          className="relative aspect-video h-full max-w-[98vw] select-none rounded-lg overflow-hidden mx-auto">
          <img
            src={currentMedia.url} 
            alt='Ảnh đang được tải' 
            className="w-full h-full object-contain"
          />
        </figure>
      </div>

      {/* Navigation buttons */}
      <div className="hidden md:block">
        <button 
          onClick={goToPrevious}
          className="absolute top-1/2 hover:ring-2 ring-white left-0 -translate-y-1/2 mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-2 sm:p-4"
          aria-label="Previous media"
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext}
          className="absolute top-1/2 hover:ring-2 ring-white right-0 -translate-y-1/2 mx-2 sm:mx-8 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-2 sm:p-4"
          aria-label="Next media"
        >
          <FaChevronRight size={20} />
        </button>
      </div>




      {/* Thumbnail gallery */}
      <div className="w-full overflow-x-auto no-scrollbar gap-2 py-2 m-4 hidden md:flex select-none">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            ref={el => {
              thumbRefs.current[index] = el;
            }}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${index === currentIndex ? 'border-white' : 'border-transparent brightness-50'}`}
            style={{ flex: '0 0 auto', width: '100px', height: '70px' }}
          >
            <img 
              src={item.url} 
              alt={`Media ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}


export default Image_modal_tab