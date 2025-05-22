// components/EnhancedMediaGallery.tsx
'use client'
import { useState, useRef } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  title?: string;
  description?: string;
  poster?: string;
  format?: string;
};

interface MediaGalleryProps {
  mediaItems: MediaItem[];
}

const EnhancedMediaGallery: React.FC<MediaGalleryProps> = ({ mediaItems }) => {
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
    <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold mb-4">Nguyen Viet Binh</h2>
        
        <div 
          ref={mediaContainerRef}
          className="relative group"
        >
          {/* Hiển thị ảnh hoặc video */}
          {currentMedia.type === 'image' ? (
            <figure className="relative aspect-video rounded-lg overflow-hidden">
              <img 
                src={currentMedia.url} 
                alt={currentMedia.alt || 'Gallery image'} 
                className="w-full h-full object-contain"
              />
            </figure>
          ) : (
            <div className="relative aspect-video">
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
              className="btn btn-circle glass opacity-70 hover:opacity-100"
              aria-label="Previous media"
            >
              <FaChevronLeft size={20} />
            </button>
            <button 
              onClick={goToNext}
              className="btn btn-circle glass opacity-70 hover:opacity-100"
              aria-label="Next media"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Media indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Media info */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">
            {currentMedia.title || `Media ${currentIndex + 1}`}
          </h3>
          {currentMedia.description && (
            <p className="text-gray-600">{currentMedia.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedMediaGallery;