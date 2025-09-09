import { useEffect } from 'react';

type SwipeDirection = 'up' | 'down' | 'left' | 'right';

interface UseSwipeOptions {
  onSwipe: (direction: SwipeDirection) => void;
  minDistance?: number;
  targetRef: React.RefObject<HTMLElement | null>; // phần tử cần lắng nghe
}

export function useSwipe({ onSwipe, minDistance = 50, targetRef }: UseSwipeOptions) {
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > minDistance) {
          onSwipe(dx > 0 ? 'right' : 'left');
        }
      } else {
        if (Math.abs(dy) > minDistance) {
          onSwipe(dy > 0 ? 'down' : 'up');
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, minDistance, targetRef]);
}
