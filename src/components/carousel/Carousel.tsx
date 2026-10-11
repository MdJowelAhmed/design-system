import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../utils';
import { carouselVariants } from './Carousel.styles';
import type { CarouselProps } from './Carousel.types';
import { CarouselContext } from './useCarouselContext';

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      animation = 'slide',
      orientation = 'horizontal',
      align = 'start',
      loop = true,
      autoplay = false,
      delay = 4000,
      draggable = true,
      slidesPerView = 1,
      gap = 'md',
      asChild = false,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    const scrollTo = useCallback(
      (index: number) => {
        if (totalSlides === 0) return;
        setDirection(index > currentIndex ? 1 : -1);
        if (index < 0) {
          setCurrentIndex(loop ? maxIndex : 0);
        } else if (index > maxIndex) {
          setCurrentIndex(loop ? 0 : maxIndex);
        } else {
          setCurrentIndex(index);
        }
      },
      [currentIndex, loop, maxIndex, totalSlides],
    );

    const scrollPrev = useCallback(() => {
      scrollTo(currentIndex - 1);
    }, [currentIndex, scrollTo]);

    const scrollNext = useCallback(() => {
      scrollTo(currentIndex + 1);
    }, [currentIndex, scrollTo]);

    // Autoplay effect
    useEffect(() => {
      if (!autoplay || isPaused || isDragging || totalSlides <= 1) return;

      const timer = setInterval(() => {
        scrollNext();
      }, delay);

      return () => clearInterval(timer);
    }, [autoplay, delay, isPaused, isDragging, totalSlides, scrollNext]);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scrollPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scrollNext();
        }
      } else if (orientation === 'vertical') {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          scrollPrev();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          scrollNext();
        }
      }

      if (e.key === 'Home') {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollTo(maxIndex);
      }

      onKeyDown?.(e);
    };

    const contextValue = useMemo(
      () => ({
        currentIndex,
        totalSlides,
        direction,
        animation,
        orientation,
        align,
        loop,
        autoplay,
        delay,
        draggable,
        slidesPerView,
        gap,
        isPaused,
        isDragging,
        scrollPrev,
        scrollNext,
        scrollTo,
        setTotalSlides,
        setIsPaused,
        setIsDragging,
      }),
      [
        currentIndex,
        totalSlides,
        direction,
        animation,
        orientation,
        align,
        loop,
        autoplay,
        delay,
        draggable,
        slidesPerView,
        gap,
        isPaused,
        isDragging,
        scrollPrev,
        scrollNext,
        scrollTo,
      ],
    );

    const Component = asChild ? Slot : 'div';

    return (
      <CarouselContext.Provider value={contextValue}>
        <Component
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          onMouseEnter={(e) => {
            setIsPaused(true);
            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            setIsPaused(false);
            onMouseLeave?.(e);
          }}
          onFocus={(e) => {
            setIsPaused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsPaused(false);
            onBlur?.(e);
          }}
          onKeyDown={handleKeyDown}
          className={cn(carouselVariants({ orientation, className }))}
          {...props}
        >
          {children}
        </Component>
      </CarouselContext.Provider>
    );
  },
);

Carousel.displayName = 'Carousel';
