import { forwardRef } from 'react';
import { ChevronDown, ChevronRight } from '../../icons/set';
import { cn } from '../../utils';
import { IconButton } from '../button';
import type { CarouselControlProps } from './Carousel.types';
import { useCarousel } from './useCarouselContext';

export const CarouselNext = forwardRef<HTMLButtonElement, CarouselControlProps>(
  ({ className, 'aria-label': ariaLabel = 'Next slide', ...props }, ref) => {
    const {
      scrollNext,
      currentIndex,
      totalSlides,
      slidesPerView,
      loop,
      orientation,
    } = useCarousel();
    const isDisabled = !loop && currentIndex >= totalSlides - slidesPerView;

    const Icon = orientation === 'vertical' ? ChevronDown : ChevronRight;
    return (
      <IconButton
        ref={ref}
        type="button"
        variant="soft"
        size="sm"
        disabled={isDisabled}
        onClick={scrollNext}
        aria-label={ariaLabel}
        className={cn(
          'absolute z-10 shadow-md backdrop-blur-xs transition-opacity hover:opacity-100 disabled:opacity-30',
          orientation === 'horizontal'
            ? 'top-1/2 right-3 -translate-y-1/2'
            : 'bottom-3 left-1/2 -translate-x-1/2',
          className,
        )}
        {...props}
      >
        <Icon className="h-4 w-4" />
      </IconButton>
    );
  },
);

CarouselNext.displayName = 'CarouselNext';
