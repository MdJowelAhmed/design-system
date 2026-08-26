'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../utils';
import { labelVariants } from './Label.styles';
import type { LabelProps } from './Label.types';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size,
      required = false,
      disabled = false,
      error = false,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'label';

    return (
      <Component
        ref={ref}
        className={cn(labelVariants({ size, disabled, error, className }))}
        {...props}
      >
        {children}
        {required && (
          <span
            className="ml-0.5 text-red-600 dark:text-red-400"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </Component>
    );
  },
);

Label.displayName = 'Label';
