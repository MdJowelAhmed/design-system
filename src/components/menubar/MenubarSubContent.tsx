import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import type { MenubarSubContentProps } from './Menubar.types';

export const MenubarSubContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  MenubarSubContentProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out z-50 min-w-[8rem] overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 text-neutral-900 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50',
      className,
    )}
    {...props}
  />
));

MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;
