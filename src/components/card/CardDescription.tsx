import { forwardRef } from 'react';
import { cn } from '../../utils';
import { Text } from '../typography';
import type { CardDescriptionProps } from './Card.types';

export const CardDescription = forwardRef<HTMLElement, CardDescriptionProps>(
  ({ size = 'sm', color = 'muted', className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        size={size}
        color={color}
        className={cn('leading-relaxed', className)}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

CardDescription.displayName = 'CardDescription';
