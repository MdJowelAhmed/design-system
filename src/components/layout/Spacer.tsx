import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils';

export const Spacer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex-1 self-stretch', className)} {...props} />
));
Spacer.displayName = 'Spacer';
