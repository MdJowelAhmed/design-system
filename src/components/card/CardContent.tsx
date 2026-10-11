import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardContentProps } from './Card.types';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 text-sm text-neutral-800 dark:text-neutral-200',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'CardContent';
