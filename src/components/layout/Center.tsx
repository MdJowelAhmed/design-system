import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CenterProps } from './Layout.types';

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ inline = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        inline ? 'inline-flex' : 'flex',
        'items-center justify-center',
        className,
      )}
      {...props}
    />
  ),
);
Center.displayName = 'Center';
