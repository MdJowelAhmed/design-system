import { forwardRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../utils';
import type { ProgressProps } from './Progress.types';

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, 'aria-label': ariaLabel, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    aria-label={
      ariaLabel ??
      (value !== undefined ? `Progress: ${Math.round(value)}%` : 'Progress')
    }
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
      className,
    )}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="bg-primary-600 dark:bg-primary-500 h-full w-full flex-1 transition-all duration-300"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;
