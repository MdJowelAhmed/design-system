import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import type { MenubarItemProps } from './Menubar.types';

export const MenubarItem = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenubarItemProps
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-100',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));

MenubarItem.displayName = MenubarPrimitive.Item.displayName;
