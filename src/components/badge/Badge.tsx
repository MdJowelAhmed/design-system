import { forwardRef } from 'react';
import { cn } from '../../utils';
import { badgeVariants } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      pill,
      leftIcon,
      rightIcon,
      dot = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, pill, className }))}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
        )}
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </div>
    );
  },
);

Badge.displayName = 'Badge';
