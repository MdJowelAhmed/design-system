import { forwardRef } from 'react';
import { ChevronDown } from '../../icons/set';
import { cn } from '../../utils';
import type { AccordionIconProps } from './Accordion.types';

export const AccordionIcon = forwardRef<HTMLSpanElement, AccordionIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'accordion-icon shrink-0 text-neutral-500 transition-transform duration-200 dark:text-neutral-400',
          className,
        )}
        {...props}
      >
        {children ?? <ChevronDown className="h-4 w-4" />}
      </span>
    );
  },
);

AccordionIcon.displayName = 'AccordionIcon';
