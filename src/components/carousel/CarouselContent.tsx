import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
} from 'react';
import { cn } from '../../utils';
import { carouselTrackVariants } from './Carousel.styles';
import type { CarouselContentProps } from './Carousel.types';
import { useCarousel } from './useCarouselContext';

export const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation, gap, align, setTotalSlides } = useCarousel();

    const count = Children.count(children);

    useEffect(() => {
      setTotalSlides(count);
    }, [count, setTotalSlides]);

    return (
      <div
        ref={ref}
        className={cn(
          carouselTrackVariants({ orientation, gap, align, className }),
        )}
        {...props}
      >
        {Children.map(children, (child, index) => {
          if (isValidElement<{ index?: number }>(child)) {
            return cloneElement(child, { index });
          }
          return child;
        })}
      </div>
    );
  },
);

CarouselContent.displayName = 'CarouselContent';
