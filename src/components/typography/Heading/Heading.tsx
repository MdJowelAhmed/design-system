import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../utils';
import { defaultHeadingSizes, headingVariants } from './Heading.styles';
import type { HeadingLevel, HeadingProps } from './Heading.types';

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      size,
      weight,
      align,
      color,
      truncate,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Standard valid HTML tags for levels 1-6
    const validLevel = (Math.min(Math.max(level, 1), 6) as HeadingLevel) || 1;
    const Tag = asChild ? Slot : (`h${validLevel}` as const);
    const resolvedSize = size ?? defaultHeadingSizes[validLevel];

    return (
      <Tag
        ref={ref}
        className={cn(
          headingVariants({
            size: resolvedSize,
            weight,
            align,
            color,
            truncate,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = 'Heading';
