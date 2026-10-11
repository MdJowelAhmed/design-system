import { forwardRef } from 'react';
import { ChevronLeft, ChevronUp } from '../../icons/set';
import { cn } from '../../utils';
import { IconButton } from '../button';
import type { CarouselControlProps } from './Carousel.types';
import { useCarousel } from './useCarouselContext';

export const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  CarouselControlProps
>(
  (
    { className, 'aria-label': ariaLabel = 'Previous slide', ...props },
    ref,
  ) => {
    const { scrollPrev, currentIndex, loop, orientation } = useCarousel();
    const isDisabled = !loop && currentIndex === 0;

    const Icon = orientation === 'vertical' ? ChevronUp : ChevronLeft;
    return (
      <IconButton
        ref={ref}
        type="button"
        variant="soft"
        size="sm"
        disabled={isDisabled}
        onClick={scrollPrev}
        aria-label={ariaLabel}
        className={cn(
          'absolute z-10 shadow-md backdrop-blur-xs transition-opacity hover:opacity-100 disabled:opacity-30',
          orientation === 'horizontal'
            ? 'top-1/2 left-3 -translate-y-1/2'
            : 'top-3 left-1/2 -translate-x-1/2',
          className,
        )}
        {...props}
      >
        <Icon className="h-4 w-4" />
      </IconButton>
    );
  },
);

CarouselPrevious.displayName = 'CarouselPrevious';
