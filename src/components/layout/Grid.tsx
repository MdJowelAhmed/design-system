import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils';
import type { GridProps } from './Layout.types';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
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
  },
  defaultVariants: {
    cols: 1,
    gap: 'md',
  },
});

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols, gap, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    />
  ),
);
Grid.displayName = 'Grid';
