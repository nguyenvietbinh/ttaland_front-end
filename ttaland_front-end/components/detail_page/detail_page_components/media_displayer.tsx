'use client'
import { useEffect, useState, useRef } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';

export type MediaItem = {
  type: 'image' | 'video' | 'youtube' | 'tiktok';
  url: string;
  poster?: string;
  format?: string;
  embedUrl?: string; // URL để embed cho YouTube và TikTok
};

interface media_displayer_props {
  mediaItems: MediaItem[];
  id: string | null
}

const Media_displayer = ({ mediaItems, id }: media_displayer_props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [modalTab, setModalTab] = useState<'video' | 'image' | 'map'>('image'); // State cho tab modal
  const [modalMediaIndex, setModalMediaIndex] = useState<number>(0); // Index chung cho tất cả media trong modal
  const [tiktokThumbs, setTiktokThumbs] = useState<Record<string, string>>({});
  const [modalKey, setModalKey] = useState<number>(0); // Key để force re-render modal content

  // refs array cho từng thumbnail
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Lấy danh sách chỉ có ảnh
  const imageItems = mediaItems.filter(item => item.type === 'image');
  
  // Lấy danh sách chỉ có video (YouTube, TikTok, video files)
  const videoItems = mediaItems.filter(item => item.type === 'video' || item.type === 'youtube' || item.type === 'tiktok');

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

  // Navigation chung cho tất cả media trong modal
  const goToPreviousModal = (): void => {
    // Dừng tất cả video trước khi chuyển
    stopAllVideos();
    setModalMediaIndex(prev => (prev === 0 ? mediaItems.length - 1 : prev - 1));
    
    // Cập nhật tab dựa trên loại media hiện tại
    const newIndex = modalMediaIndex === 0 ? mediaItems.length - 1 : modalMediaIndex - 1;
    const currentMedia = mediaItems[newIndex];
    if (currentMedia?.type === 'image') {
      setModalTab('image');
    } else if (currentMedia?.type === 'video' || currentMedia?.type === 'youtube' || currentMedia?.type === 'tiktok') {
      setModalTab('video');
    }
  };

  const goToNextModal = (): void => {
    // Dừng tất cả video trước khi chuyển
    stopAllVideos();
    setModalMediaIndex(prev => (prev === mediaItems.length - 1 ? 0 : prev + 1));
    
    // Cập nhật tab dựa trên loại media hiện tại
    const newIndex = modalMediaIndex === mediaItems.length - 1 ? 0 : modalMediaIndex + 1;
    const currentMedia = mediaItems[newIndex];
    if (currentMedia?.type === 'image') {
      setModalTab('image');
    } else if (currentMedia?.type === 'video' || currentMedia?.type === 'youtube' || currentMedia?.type === 'tiktok') {
      setModalTab('video');
    }
  };

  // Function để dừng tất cả video và iframe
  const stopAllVideos = () => {
    // Dừng tất cả video elements
    const videos = document.querySelectorAll('video');
    videos.forEach((video: HTMLVideoElement) => {
      video.pause();
      video.currentTime = 0;
    });

    // Dừng YouTube videos bằng cách thêm parameter autoplay=0
    const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
    iframes.forEach((iframe: any) => {
      if (iframe.src && !iframe.src.includes('about:blank')) {
        try {
          const url = new URL(iframe.src);
          url.searchParams.set('autoplay', '0');
          iframe.src = url.toString();
        } catch (e) {
          // Nếu có lỗi với URL, giữ nguyên src
          console.warn('Failed to update YouTube iframe URL:', e);
        }
      }
    });

    // Dừng TikTok videos bằng cách reload iframe
    const tiktokIframes = document.querySelectorAll('iframe[src*="tiktok.com/embed"]');
    tiktokIframes.forEach((iframe: any) => {
      if (iframe.src && !iframe.src.includes('about:blank')) {
        const originalSrc = iframe.src;
        iframe.src = 'about:blank';
        setTimeout(() => {
          iframe.src = originalSrc;
        }, 100);
      }
    });
  };

  // Function để đóng modal và dừng video
  const closeModal = () => {
    // Dừng tất cả video trước khi đóng modal
    stopAllVideos();
    
    // Tăng modalKey để force re-render iframe khi mở lại
    setModalKey(prev => prev + 1);
    
    const modal = document.getElementById(`full_screen_image_id=${id}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  // Function để đóng TikTok modal
  const closeTikTokModal = () => {
    const modal = document.getElementById(`tiktok_modal_id=${id}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className="card w-full lg:w-3/5">
      <div className="card-body p-0">      
        <div className="relative group">
          {/* display img or vid */}
          {currentMedia.type === 'image' ? (
            <figure   
              className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${currentMedia.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => {
                // Set modal index to current main display index
                setModalMediaIndex(currentIndex);
                setModalTab('image');
                (document.getElementById(`full_screen_image_id=${id}`) as HTMLDialogElement)?.showModal();
              }}>
              <img
                src={currentMedia.url} 
                alt='Ảnh đang được tải' 
                className="w-full h-full object-contain backdrop-blur-2xl bg-black/50"
              />
            </figure>
          ) : currentMedia.type === 'video' ? (
            <div
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
                   setModalMediaIndex(currentIndex);
                   setModalTab('video');
                   (document.getElementById(`full_screen_image_id=${id}`) as HTMLDialogElement)?.showModal();
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
                
                {/* YouTube logo */}
                <div className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  YouTube
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
                   setModalMediaIndex(currentIndex);
                   setModalTab('video');
                   (document.getElementById(`full_screen_image_id=${id}`) as HTMLDialogElement)?.showModal();
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
              
              {/* TikTok logo - positioned on main container */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold z-20">
                TikTok
              </div>
            </div>
          ) : null}

          {/* Navigation buttons */}
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

          {/* image infor */}
          {(currentMedia.type === 'image') ? (
            <div className='absolute text-lg text-white p-4 flex items-center justify-between bottom-0 w-full h-auto'>
              <div className='bg-black/60 px-1 rounded-md'>{currentIndex + 1}/{mediaItems.length}</div>
              <div className='bg-black/60 px-1 rounded-md'>Mô tả?</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Thumbnail gallery */}
          <div className=" w-full overflow-x-auto no-scrollbar gap-2 py-2 mt-4 hidden md:flex">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                ref={el => {
                  thumbRefs.current[index] = el;
                }}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 ${index === currentIndex ? 'border-red-500' : 'border-transparent'}`}
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
                      fallback.className = 'w-full h-full bg-red-600 flex items-center justify-center text-white text-xs font-bold';
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
      <dialog id={`full_screen_image_id=${id}`} className="modal">
        <div className="modal-box p-0 h-screen w-screen max-w-screen bg-black">
          {/* Navbar với 3 tabs và nút close */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Spacer để căn giữa tabs */}
              <div className="w-12"></div>
              
              {/* Tabs ở giữa */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setModalTab('video')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all cursor-pointer ${
                    modalTab === 'video' 
                      ? 'bg-white text-black' 
                      : 'text-white border border-white/30 hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Video
                </button>
                <button 
                  onClick={() => setModalTab('image')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all cursor-pointer ${
                    modalTab === 'image' 
                      ? 'bg-white text-black' 
                      : 'text-white border border-white/30 hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  Hình ảnh
                </button>
                <button 
                  onClick={() => setModalTab('map')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all cursor-pointer ${
                    modalTab === 'map' 
                      ? 'bg-white text-black' 
                      : 'text-white border border-white/30 hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                  </svg>
                  Bản đồ
                </button>
              </div>
              
              {/* Nút Close ở bên phải */}
              <button 
                onClick={closeModal} 
                className="w-12 h-12 bg-black/50 hover:bg-white/90 text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content dựa trên tab được chọn */}
          <div className="h-full w-full pt-16">
            {modalTab === 'image' && (
              <>
                {mediaItems[modalMediaIndex]?.type === 'image' ? (
                  <figure   
                    className="relative h-full w-full overflow-hidden"
                    style={{
                      backgroundImage: `url(${mediaItems[modalMediaIndex]?.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}>
                    <img 
                      src={mediaItems[modalMediaIndex]?.url} 
                      alt='Ảnh đang được tải' 
                      className="w-full h-full object-contain backdrop-blur-2xl bg-black/50"
                    />
                  </figure>
                ) : (
                  <div className="flex flex-col items-center justify-center text-white text-center h-full">
                    <div className="text-6xl mb-4">🖼️</div>
                    <h3 className="text-2xl font-bold mb-2">Không có hình ảnh</h3>
                    <p className="text-gray-400">Sản phẩm này chưa có hình ảnh</p>
                  </div>
                )}
              </>
            )}

            {modalTab === 'video' && (
              <div className="h-full w-full flex items-center justify-center">
                {/* Hiển thị video hiện tại */}
                {(() => {
                  const currentMedia = mediaItems[modalMediaIndex];
                  if (!currentMedia || (currentMedia.type !== 'video' && currentMedia.type !== 'youtube' && currentMedia.type !== 'tiktok')) {
                    return (
                      <div className="flex flex-col items-center justify-center text-white text-center">
                        <div className="text-6xl mb-4">📹</div>
                        <h3 className="text-2xl font-bold mb-2">Không có video</h3>
                        <p className="text-gray-400">Sản phẩm này chưa có video</p>
                      </div>
                    );
                  }
                  
                  if (currentMedia.type === 'youtube') {
                    // Thêm autoplay=1 vào URL để tự động phát khi mở modal
                    const autoplayUrl = currentMedia.embedUrl?.includes('?') 
                      ? `${currentMedia.embedUrl}&autoplay=1`
                      : `${currentMedia.embedUrl}?autoplay=1`;
                      
                    return (
                      <div className="relative h-full w-full flex items-center justify-center bg-black">
                        <div className="w-full max-w-6xl" style={{ aspectRatio: '16/9' }}>
                          <iframe
                            key={`youtube-${modalMediaIndex}-${modalKey}-${currentMedia.url}`} // Key để force re-render với modalKey
                            className="w-full h-full"
                            src={autoplayUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    );
                  } else if (currentMedia.type === 'video') {
                    return (
                      <div
                        className="relative h-full w-full"
                        style={{
                          backgroundImage: `url(${currentMedia.poster})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}>
                        <video
                          key={`video-${modalMediaIndex}-${currentMedia.url}`} // Key để force re-render
                          className="w-full h-full object-contain backdrop-blur-2xl bg-black/50"
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
                    );
                  } else if (currentMedia.type === 'tiktok') {
                    return (
                      <div className="relative h-full w-full flex items-center justify-center bg-black">
                        <div className="relative h-full flex items-center justify-center rounded-lg" style={{ maxWidth: '400px' }}>
                          {currentMedia.embedUrl?.startsWith('https://www.tiktok.com/embed/v2/') ? (
                            <iframe
                              key={`tiktok-${modalMediaIndex}-${currentMedia.url}`} // Key để force re-render
                              className="h-full w-full border-0 rounded-2xl"
                              src={currentMedia.embedUrl}
                              title="TikTok video player"
                              frameBorder="0"
                              scrolling="no"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              style={{
                                height: '80vh',
                                width: '400px',
                                maxWidth: '100vw',
                                border: 'none',
                                overflow: 'hidden'
                              }}
                            ></iframe>
                          ) : (
                            // Fallback: Link để mở TikTok
                            <div className="flex flex-col items-center justify-center text-white p-8 text-center">
                              <div className="text-8xl mb-6">🎵</div>
                              <h3 className="text-3xl font-bold mb-4">TikTok Video</h3>
                              <p className="text-lg mb-6 opacity-75">Click để xem video trên TikTok</p>
                              <a 
                                href={currentMedia.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
                              >
                                Xem trên TikTok
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            )}

            {modalTab === 'map' && (
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-white text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-2xl font-bold mb-2">Bản đồ vị trí</h3>
                  <p className="text-gray-400 mb-6">Hiển thị vị trí của bất động sản</p>
                  {/* Placeholder cho bản đồ - có thể tích hợp Google Maps sau */}
                  <div className="w-4/5 h-3/5 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center">
                    <p className="text-gray-400">Google Maps sẽ được tích hợp ở đây</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons cho tất cả media */}
          {mediaItems.length > 1 && (
            <>
              <button 
                onClick={goToPreviousModal}
                className="absolute top-1/2 hover:ring-2 ring-white left-0 -translate-y-1/2 mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-2 sm:p-4 z-10"
                aria-label="Previous media"
              >
                <FaChevronLeft size={20} />
              </button>
              <button 
                onClick={goToNextModal}
                className="absolute top-1/2 hover:ring-2 ring-white right-0 -translate-y-1/2 mx-2 sm:mx-4 text-gray-800 bg-white/30 hover:bg-white/70 cursor-pointer rounded-full p-2 sm:p-4 z-10"
                aria-label="Next media"
              >
                <FaChevronRight size={20} />
              </button>

              {/* Media info */}
              <div className='absolute text-xl text-white p-4 flex items-center justify-between bottom-0 w-full h-auto z-10'>
                <div className='bg-black/60 px-3 py-1 rounded-md'>{modalMediaIndex + 1}/{mediaItems.length}</div>
                <div className='bg-black/60 px-3 py-1 rounded-md'>
                  {mediaItems[modalMediaIndex]?.type === 'youtube' ? 'YouTube' : 
                   mediaItems[modalMediaIndex]?.type === 'tiktok' ? 'TikTok' : 
                   mediaItems[modalMediaIndex]?.type === 'video' ? 'Video' :
                   'Hình ảnh'}
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>

      {/* TikTok Modal */}
      <dialog id={`tiktok_modal_id=${id}`} className="modal">
        <div className="modal-box p-0 h-screen w-screen max-w-screen bg-black flex items-center justify-center">
          <div className="relative h-full w-full flex items-center justify-center">
            {/* TikTok Video Container */}
            <div className="relative h-full flex items-center justify-center" style={{ maxWidth: '400px' }}>
              {currentMedia.type === 'tiktok' && currentMedia.embedUrl?.startsWith('https://www.tiktok.com/embed/v2/') ? (
                <iframe
                  className="h-full w-full border-0"
                  src={currentMedia.embedUrl}
                  title="TikTok video player"
                  frameBorder="0"
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    height: '100vh',
                    width: '400px',
                    maxWidth: '100vw',
                    border: 'none',
                    overflow: 'hidden'
                  }}
                ></iframe>
              ) : (
                // Fallback: Link để mở TikTok
                <div className="flex flex-col items-center justify-center text-white p-8 text-center">
                  <div className="text-8xl mb-6">🎵</div>
                  <h3 className="text-3xl font-bold mb-4">TikTok Video</h3>
                  <p className="text-lg mb-6 opacity-75">Click để xem video trên TikTok</p>
                  <a 
                    href={currentMedia.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
                  >
                    Xem trên TikTok
                  </a>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button onClick={closeTikTokModal} className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Media_displayer;
