import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils';
import { carouselItemVariants } from './Carousel.styles';
import type { CarouselItemProps } from './Carousel.types';
import { useCarousel } from './useCarouselContext';

const animationVariants = {
  slide: {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  },
  fade: {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  },
  zoom: {
    enter: { scale: 0.8, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  },
  scale: {
    enter: { scale: 0.5, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
};

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ index = 0, className, children, ...props }, ref) => {
    const { currentIndex, animation, slidesPerView, direction } = useCarousel();

    const isVisible =
      slidesPerView > 1
        ? index >= currentIndex && index < currentIndex + slidesPerView
        : index === currentIndex;

    if (slidesPerView > 1) {
      return (
        <div
          ref={ref}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1}`}
          aria-hidden={!isVisible}
          className={cn(
            carouselItemVariants({
              slidesPerView: slidesPerView as 1 | 2 | 3 | 4,
              className,
            }),
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        {isVisible && (
          <motion.div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1}`}
            custom={direction}
            variants={animationVariants[animation]}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className={cn(
              carouselItemVariants({ slidesPerView: 1, className }),
            )}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
