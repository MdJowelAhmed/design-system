import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils';
import type { StackProps } from './Layout.types';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-10',
      '3xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
  },
});

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ direction, gap, align, justify, wrap, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        stackVariants({ direction, gap, align, justify }),
        wrap && 'flex-wrap',
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = 'Stack';
