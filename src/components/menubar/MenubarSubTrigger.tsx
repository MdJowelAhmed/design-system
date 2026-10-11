import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { ChevronRight } from '../../icons/set';
import { cn } from '../../utils';
import type { MenubarSubTriggerProps } from './Menubar.types';

export const MenubarSubTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  MenubarSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-none select-none focus:bg-neutral-100 focus:text-neutral-900 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-100 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-100',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));

MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;
