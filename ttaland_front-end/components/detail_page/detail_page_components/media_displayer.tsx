'use client'
import { useEffect, useState, useRef } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
} from 'react-icons/fa';

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  poster?: string;
  format?: string;
};

interface MediaGalleryProps {
  mediaItems: MediaItem[];
  id: string | null
}

const Media_displayer = ({ mediaItems, id }: MediaGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // NEW: refs array cho từng thumbnail
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      <div className="card-body px-0">      
        <div className="relative group">
          {/* display img or vid */}
          {currentMedia.type === 'image' ? (
            <figure   
              className="relative aspect-video rounded-lg overflow-hidden"
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
          )}

          {/* Navigation buttons */}
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 hover:ring-2 ring-white left-0 -translate-y-1/2 mx-4 text-gray-800 bg-white/50 cursor-pointer rounded-lg p-2"
            aria-label="Previous media"
          >
            <FaChevronLeft size={20} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 hover:ring-2 ring-white right-0 -translate-y-1/2 mx-4 text-gray-800 bg-white/50 cursor-pointer rounded-lg p-2"
            aria-label="Next media"
          >
            <FaChevronRight size={20} />
          </button>

          {/* image infor */}
          {(currentMedia.type === 'image') ? (
            <div className='absolute text-lg text-white p-4 flex items-center justify-between bottom-0 w-full h-auto'>
              <div className='bg-black/60 px-1 rounded-md'>{currentIndex + 1}/{mediaItems.length}</div>
              <div className='bg-black/60 px-1 rounded-md'>Mô tả?</div>
              <div onClick={() => (document.getElementById(`full_screen_image_id=${id}`) as HTMLDialogElement)?.showModal()}>
                <img src="/img/icons/fullscreen.png" alt="" className='h-5 cursor-pointer'/>
              </div>
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
                ) : (
                  <video 
                    src={item.url} 
                    poster={item.poster}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
              </div>
            ))}
          </div>
      </div>



      {/* full screen image display */}
      <dialog id={`full_screen_image_id=${id}`} className="modal">
        <div className="modal-box p-0 h-screen w-screen max-w-screen">
          {(currentMedia.type === 'image') ? (
            <figure   
              className="relative h-full w-full rounded-lg overflow-hidden"
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
              <div
                className="relative h-full w-full"
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
          )}
        </div>


        {(currentMedia.type === 'image') ? (
          <div className='absolute text-xl text-white p-4 flex items-center justify-between bottom-0 w-full h-auto'>
            <div className='bg-black/60 px-1 rounded-md'>{currentIndex + 1}/{mediaItems.length}</div>
            <div className='modal-action'>
              <form method="dialog">
                <button>
                  <img src="/img/icons/exitfullscreen.png" alt="" className='h-8 cursor-pointer'/>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <button 
          onClick={goToPrevious}
          className="absolute top-1/2 hover:ring-2 ring-white left-0 -translate-y-full mx-4 text-gray-800 bg-white/50 cursor-pointer rounded-lg p-2"
          aria-label="Previous media"
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext}
          className="absolute top-1/2 hover:ring-2 ring-white right-0 -translate-y-full mx-4 text-gray-800 bg-white/50 cursor-pointer rounded-lg p-2"
          aria-label="Next media"
        >
          <FaChevronRight size={20} />
        </button>
      </dialog>
    </div>
  );
};

export default Media_displayer;