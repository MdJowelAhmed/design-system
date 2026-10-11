import { forwardRef } from 'react';
import type { ElementRef } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '../../utils';
import type { HoverCardContentProps } from './HoverCard.types';

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out z-50 w-64 rounded-md border border-neutral-200 bg-white p-4 text-neutral-900 shadow-md outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50',
        className,
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
