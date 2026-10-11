import { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '../../utils';
import { accordionTriggerVariants } from './Accordion.styles';
import type { AccordionTriggerProps } from './Accordion.types';
import { AccordionIcon } from './AccordionIcon';

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ hideIcon = false, icon, className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ className }))}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
      {!hideIcon &&
        (icon ? (
          <span className="accordion-icon transition-transform duration-200">
            {icon}
          </span>
        ) : (
          <AccordionIcon />
        ))}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
