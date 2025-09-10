'use client'

import Media_modal from './media_modal';
import { useEffect, useState, useRef } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';
import { useSwipe } from '@/hooks/useSwipe';

export type MediaItem = {
  type: 'image' | 'video' | 'youtube' | 'tiktok';
  url: string;
  poster?: string;
  format?: string;
  embedUrl?: string; // URL để embed cho YouTube và TikTok
};

interface media_displayer_props {
  mediaItems: MediaItem[];
}

const Media_displayer = ({ mediaItems }: media_displayer_props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tiktokThumbs, setTiktokThumbs] = useState<Record<string, string>>({});

  // refs array cho từng thumbnail
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

  // Fetch TikTok thumbnails
  useEffect(() => {
    const fetchThumbs = async () => {
      const jobs = mediaItems
        .filter(i => i.type === 'tiktok')
        .map(async (i) => {
          // ưu tiên poster do bạn tự truyền, nếu chưa có thì gọi API
          if (i.poster) return [i.url, i.poster] as const;
          try {
            const r = await fetch(`/api/tiktok-thumbnail?url=${encodeURIComponent(i.url)}`);
            const { thumbnail } = await r.json();
            return [i.url, thumbnail] as const;
          } catch {
            return [i.url, ''] as const; // fallback empty string
          }
        });

      const entries = await Promise.all(jobs);
      setTiktokThumbs(Object.fromEntries(entries));
    };

    fetchThumbs();
  }, [mediaItems]);

  // Scroll đến thumbnail hiện tại mỗi khi currentIndex thay đổi
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
    <div className="card w-full lg:w-3/5">
      <div className="card-body p-0">      
        <div ref={posterRef} className="relative group">
          {/* display img or vid */}
          {currentMedia.type === 'image' ? (
            <figure   
              className="relative aspect-video rounded-sm overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${currentMedia.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => {
                (document.getElementById(`media_modal`) as HTMLDialogElement)?.showModal();
              }}>
              <img
                src={currentMedia.url} 
                alt='Ảnh đang được tải' 
                className="w-full h-full object-contain backdrop-blur-2xl bg-black/50"
              />
            </figure>
          ) : currentMedia.type === 'video' ? (
            <div
              onClick={() => {
                (document.getElementById(`media_modal`) as HTMLDialogElement)?.showModal();
              }}
              className="relative aspect-video"
              style={{
                backgroundImage: `url(${currentMedia.poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
              <video
                className="w-full h-full object-contain rounded-lg backdrop-blur-2xl bg-black/50"
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
          ) : currentMedia.type === 'youtube' ? (
            <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                 onClick={() => {
                   // Set modal index to current main display index
                   (document.getElementById(`media_modal`) as HTMLDialogElement)?.showModal();
                 }}>
              {/* YouTube thumbnail với play button overlay */}
              <div className="relative w-full h-full">
                {/* YouTube thumbnail image */}
                <img 
                  src={`https://img.youtube.com/vi/${currentMedia.embedUrl?.split('/embed/')[1]?.split('?')[0]}/maxresdefault.jpg`}
                  alt="YouTube video thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail if maxres doesn't exist
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentMedia.embedUrl?.split('/embed/')[1]?.split('?')[0]}/hqdefault.jpg`;
                  }}
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="bg-white hover:bg-gray-200 rounded-full p-3 shadow-lg transition-all hover:scale-110">
                    <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          ) : currentMedia.type === 'tiktok' ? (
            <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                 style={{
                   backgroundImage: `url(${currentMedia.poster || tiktokThumbs[currentMedia.url]})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat',
                 }}
                 onClick={() => {
                   // Set modal index to current main display index
                   (document.getElementById(`media_modal`) as HTMLDialogElement)?.showModal();
                 }}>
              {/* Background blur overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl"></div>
              
              {/* TikTok video container - tỷ lệ dọc 9:16 */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="relative overflow-hidden" style={{ aspectRatio: '9/16', height: '100%' }}>
                  {/* TikTok thumbnail */}
                  <img
                    src={currentMedia.poster || tiktokThumbs[currentMedia.url]}
                    alt="TikTok thumbnail"
                    className="w-full h-full object-cover"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                    <div className="bg-white hover:bg-gray-200 rounded-full p-3 shadow-lg transition-all hover:scale-110">
                      <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              

            </div>
          ) : null}

          {/* Navigation buttons */}
          <div className='hidden md:block'>
            <button 
              onClick={goToPrevious}
              className="absolute top-1/2 hover:ring-2 ring-white left-0 -translate-y-1/2 mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-2 sm:p-4 z-10"
              aria-label="Previous media"
            >
              <FaChevronLeft size={20} />
            </button>
            <button 
              onClick={goToNext}
              className="absolute top-1/2 hover:ring-2 ring-white right-0 -translate-y-1/2 mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-2 sm:p-4 z-10"
              aria-label="Next media"
            >
              <FaChevronRight size={20} />
            </button>
          </div>


        </div>

        {/* Thumbnail gallery */}
          <div className="w-full overflow-x-auto no-scrollbar gap-2 py-2 hidden md:flex">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                ref={el => {
                  thumbRefs.current[index] = el;
                }}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${index === currentIndex ? 'border-black' : 'border-transparent brightness-60'}`}
                style={{ flex: '0 0 auto', width: '100px', height: '70px' }}
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.url} 
                    alt={`Media ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                ) : item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    poster={item.poster}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : item.type === 'youtube' ? (
                  <img 

                    src={`https://img.youtube.com/vi/${item.embedUrl?.split('/embed/')[1]?.split('?')[0]}/hqdefault.jpg`}
                    alt="YouTube thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to colored div if thumbnail fails
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-red-600 flex items-center justify-center text-white text-sm font-bold';
                      fallback.textContent = 'YT';
                      (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
                    }}
                  />
                ) : item.type === 'tiktok' ? (
                  <img
                    src={item.poster || tiktokThumbs[item.url]}
                    alt="TikTok thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>
      </div>
            
      {/* full screen image display */}
      <Media_modal mediaItems={mediaItems} currentMedia={currentMedia}/>
    </div>
  );
};

export default Media_displayer;
