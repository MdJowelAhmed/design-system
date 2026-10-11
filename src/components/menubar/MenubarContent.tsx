import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import type { MenubarContentProps } from './Menubar.types';

export const MenubarContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenubarContentProps
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out z-50 min-w-[12rem] overflow-hidden rounded-xl border border-neutral-200 bg-white/95 p-1.5 text-neutral-900 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95 dark:text-neutral-50',
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
);

MenubarContent.displayName = MenubarPrimitive.Content.displayName;
