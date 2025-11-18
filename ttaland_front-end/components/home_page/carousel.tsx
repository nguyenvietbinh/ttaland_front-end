import { useState, useEffect } from 'react';

interface CarouselItem {
  id: number;
  image: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number; // thời gian chuyển slide (ms)
}

const Carousel = ({ items, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [items.length, autoPlayInterval]);

  // Chuyển đến slide cụ thể
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Slide tiếp theo
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  // Slide trước đó
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div className="relative w-full h-96 md:h-185">
      {/* Carousel container */}
      <div className="carousel w-full h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            id={`slide${index}`}
            className={`carousel-item relative w-full h-full ${
              index === currentSlide ? 'block' : 'hidden'
            }`}
          >
            <img
              src={item.image}
              alt={item.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay text (optional) */}
            {(item.title || item.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <div className="max-w-4xl mx-auto">
                  {item.title && (
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {item.title}
                    </h2>
                  )}
                  {item.description && (
                    <p className="text-lg md:text-xl opacity-90">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button
          onClick={prevSlide}
          className="btn btn-circle btn-outline btn-sm md:btn-md text-white border-white hover:bg-white hover:text-black"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle btn-outline btn-sm md:btn-md text-white border-white hover:bg-white hover:text-black"
        >
          ❯
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute flex justify-center w-full bottom-4 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
};

export default Carousel;