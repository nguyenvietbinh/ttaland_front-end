'use client'

import { useState, useRef, useEffect } from "react"
import { MediaItem } from "../media_displayer"
import { useSwipe } from "@/hooks/useSwipe";
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';

interface Video_modal_tab_props {
  mediaItems: MediaItem[]
  startVideoIndex: number
}


const Video_modal_tab = ({mediaItems, startVideoIndex}: Video_modal_tab_props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(startVideoIndex);
    const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  
    useSwipe({
      onSwipe: (direction) => {
        if (direction === 'right') {
          goToPrevious()
        } else if (direction === 'left') {
          goToNext()
        }
      },
    })
  
    useEffect(() => {
      setCurrentIndex(startVideoIndex)
    }, [startVideoIndex])
  
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
  const currentMedia = mediaItems[currentIndex]
  return (
    <div>
      {currentMedia.type === 'tiktok' ? (
        <div className="mx-auto select-none h-[90vh] max-w-[98vw] aspect-video bg-black rounded-lg">
          {currentMedia.embedUrl?.startsWith('https://www.tiktok.com/embed/v2/') ? (
            <iframe
              className="h-full w-full"
              src={currentMedia.embedUrl}
              title="TikTok video player"
              frameBorder="0"
              scrolling="no"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen

            ></iframe>
          ) : (
            // Fallback: Link để mở TikTok
            <div className="flex flex-col items-center justify-center text-white p-8 text-center">
              <div className="text-8xl mb-6">🎵</div>
              <h3 className="text-4xl font-bold mb-4">TikTok Video</h3>
              <p className="text-xl mb-6 opacity-75">Click để xem video trên TikTok</p>
              <a 
                href={currentMedia.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-xl transition-colors"
              >
                Xem trên TikTok
              </a>
            </div>
          )}
        </div>
      ) : currentMedia.type === 'youtube' ? (
        <div>
          <div className="aspect-video max-h-190 max-w-[98vw] mx-auto">
            <iframe
              className="w-full h-full"
              src={currentMedia.embedUrl?.includes('?') ? `${currentMedia.embedUrl}&autoplay=1` : `${currentMedia.embedUrl}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <div>
        </div>
      )}


      {mediaItems.length > 1 ? (
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
      ) : (
        <div>

        </div>
      )}

    </div>
  )
}


export default Video_modal_tab