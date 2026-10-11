import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';
import type { CarouselProgressProps } from './Carousel.types';
import { useCarousel } from './useCarouselContext';

export const CarouselProgress = forwardRef<
  HTMLDivElement,
  CarouselProgressProps
>(({ className, 'aria-label': ariaLabel, ...props }, ref) => {
  const { currentIndex, totalSlides, isPaused, autoplay, delay } =
    useCarousel();

  const progressPercent =
    totalSlides > 0 ? ((currentIndex + 1) / totalSlides) * 100 : 0;

  // Human-readable label: "Slide 2 of 5" — satisfies aria-progressbar-name (WCAG 4.1.2)
  const defaultAriaLabel =
    totalSlides > 0
      ? `Slide ${currentIndex + 1} of ${totalSlides}`
      : 'Carousel progress';

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={ariaLabel ?? defaultAriaLabel}
      aria-valuenow={Math.round(progressPercent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(progressPercent)}% complete`}
      className={cn(
        'relative h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
        className,
      )}
      {...props}
    >
      <motion.div
        className="bg-primary-600 dark:bg-primary-400 h-full rounded-full"
        initial={{ width: `${progressPercent}%` }}
        animate={{
          width: `${progressPercent}%`,
        }}
        transition={{
          duration: autoplay && !isPaused ? delay / 1000 : 0.3,
          ease: 'linear',
        }}
      />
    </div>
  );
});

CarouselProgress.displayName = 'CarouselProgress';
