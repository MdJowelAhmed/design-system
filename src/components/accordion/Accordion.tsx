import { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../utils';
import { accordionVariants } from './Accordion.styles';
import type { AccordionProps } from './Accordion.types';

export const Accordion = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ variant = 'default', className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(accordionVariants({ variant, className }))}
    {...(props as
      | AccordionPrimitive.AccordionSingleProps
      | AccordionPrimitive.AccordionMultipleProps)}
  />
));

Accordion.displayName = 'Accordion';
