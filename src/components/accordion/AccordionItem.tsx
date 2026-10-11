import { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../utils';
import { accordionItemVariants } from './Accordion.styles';
import type { AccordionItemProps } from './Accordion.types';

export const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ disabled, className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    disabled={disabled}
    className={cn(accordionItemVariants({ disabled, className }))}
    {...props}
  />
));

AccordionItem.displayName = 'AccordionItem';
