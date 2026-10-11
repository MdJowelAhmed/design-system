import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardHeaderProps } from './Card.types';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ align = 'center', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-row items-center justify-between gap-4',
          align === 'start' && 'items-start',
          align === 'end' && 'items-end',
          className,
        )}
        {...props}
      >
        <div className="flex flex-1 flex-col gap-1">{children}</div>
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';
