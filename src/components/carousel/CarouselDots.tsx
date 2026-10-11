import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CarouselDotsProps } from './Carousel.types';
import { useCarousel } from './useCarouselContext';

export const CarouselDots = forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { currentIndex, totalSlides, slidesPerView, scrollTo, orientation } =
      useCarousel();

    const dotsCount = Math.max(1, totalSlides - slidesPerView + 1);

    if (dotsCount <= 1) return null;

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Carousel pagination"
        className={cn(
          'absolute z-10 flex items-center justify-center gap-1.5 p-2',
          orientation === 'horizontal'
            ? 'bottom-3 left-1/2 -translate-x-1/2 flex-row'
            : 'top-1/2 right-3 -translate-y-1/2 flex-col',
          className,
        )}
        {...props}
      >
        {Array.from({ length: dotsCount }).map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={`dot-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                'focus:ring-primary-500 h-2 rounded-full transition-all duration-300 focus:ring-2 focus:outline-none',
                isActive
                  ? 'bg-primary-600 dark:bg-primary-400 w-6'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500',
              )}
            />
          );
        })}
      </div>
    );
  },
);

CarouselDots.displayName = 'CarouselDots';
