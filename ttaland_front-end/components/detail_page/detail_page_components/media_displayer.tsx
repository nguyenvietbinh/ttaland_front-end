'use client'
import { useState, useRef } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';

export type MediaItem = {
  type: 'image' | 'video';
  url: string;
  poster?: string;
  format?: string;
};

interface MediaGalleryProps {
  mediaItems: MediaItem[];
}

const Media_displayer: React.FC<MediaGalleryProps> = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);






  const goToPrevious = (): void => {
    setCurrentIndex(prev => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goToNext = (): void => {
    setCurrentIndex(prev => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };


  const currentMedia = mediaItems[currentIndex];

  return (
    <div className="card w-3/5 shadow-xl">
      <div className="card-body px-0">
        
        <div 
          ref={mediaContainerRef}
          className="relative group"
        >
          {/* display img or vid */}
          {currentMedia.type === 'image' ? (
            <figure   
              className="relative aspect-video rounded-lg backdrop-blur-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${currentMedia.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                
              }}>
              <img 
                src={currentMedia.url} 
                alt='Ảnh đang được tải' 
                className="w-full h-full object-contain backdrop-blur-2xl bg-black/50"
              />
            </figure>
          ) : (
            <div className="relative aspect-video bg-gray-900">
              <video
                ref={videoRef}
                className="w-full h-full object-contain rounded-lg"
                poster={currentMedia.poster}
                autoPlay
                controls={true}
              >
                <source 
                  src={currentMedia.url} 
                  type={`video/${currentMedia.format || 'mp4'}`} 
                />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4">
            <button 
              onClick={goToPrevious}
              className=" text-gray-800 bg-white/50 cursor-pointer rounded-lg p-2"
              aria-label="Previous media"
            >
              <FaChevronLeft size={20} />
            </button>
            <button 
              onClick={goToNext}
              className=" text-gray-800 bg-white/50 cursor-pointer rounded-lg p-2"
              aria-label="Next media"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Media indicator */}
        <div className="flex w-[90%] mx-auto justify-center mt-4 space-x-2 ">
          {mediaItems.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-6 h-6 rounded-full bg-gray-500 ${index === currentIndex ? 'border-2 border-red-500' : ''}`}
              aria-label={`Go to media ${index + 1}`}
            >
              
            </div>

          ))}
        </div>

      </div>
    </div>
  );
};

export default Media_displayer;