import { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '../../utils';
import type { SeparatorProps } from './Separator.types';

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      label,
      ...props
    },
    ref,
  ) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          role={decorative ? 'none' : 'separator'}
          className={cn('relative flex w-full items-center py-2', className)}
          {...props}
        >
          <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800" />
          <span className="shrink-0 px-3 text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            {label}
          </span>
          <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800" />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-neutral-200 dark:bg-neutral-800',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className,
        )}
        {...props}
      />
    );
  },
);

Separator.displayName = SeparatorPrimitive.Root.displayName;
