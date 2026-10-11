import { forwardRef } from 'react';
import type { ElementRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../utils';
import type { SliderProps } from './Slider.types';

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, 'aria-label': ariaLabel = 'Slider', ...props }, ref) => {
  // One thumb per value, so `[20, 80]` renders a range slider.
  const thumbCount = (props.value ?? props.defaultValue ?? [0]).length;

  return (
    <SliderPrimitive.Root
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        'relative flex w-full touch-none items-center select-none',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <SliderPrimitive.Range className="bg-primary-600 dark:bg-primary-500 absolute h-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          aria-label={thumbCount > 1 ? `${ariaLabel} ${index + 1}` : ariaLabel}
          className="border-primary-600 focus-visible:ring-primary-500 dark:border-primary-500 block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-900 dark:ring-offset-neutral-900"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = 'Slider';
