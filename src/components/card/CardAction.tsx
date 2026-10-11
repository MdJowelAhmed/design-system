import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardActionProps } from './Card.types';

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex shrink-0 items-center gap-2 self-start', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardAction.displayName = 'CardAction';
