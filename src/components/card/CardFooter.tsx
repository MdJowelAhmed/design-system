import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardFooterProps } from './Card.types';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'between', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-auto flex items-center gap-3 pt-2',
          align === 'start' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'end' && 'justify-end',
          align === 'between' && 'justify-between',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'CardFooter';
