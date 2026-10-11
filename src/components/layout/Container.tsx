import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils';
import type { ContainerProps } from './Layout.types';

const containerVariants = cva('w-full px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    centered: {
      true: 'mx-auto',
      false: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    centered: true,
  },
});

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size, centered, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, centered }), className)}
      {...props}
    />
  ),
);
Container.displayName = 'Container';
