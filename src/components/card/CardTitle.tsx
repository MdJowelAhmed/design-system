import { forwardRef } from 'react';
import { cn } from '../../utils';
import { Heading } from '../typography';
import type { CardTitleProps } from './Card.types';

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  (
    {
      level = 3,
      size = 'lg',
      weight = 'semibold',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Heading
        ref={ref}
        level={level}
        size={size}
        weight={weight}
        className={cn('leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </Heading>
    );
  },
);

CardTitle.displayName = 'CardTitle';
