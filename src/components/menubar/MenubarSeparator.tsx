import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import type { MenubarSeparatorProps } from './Menubar.types';

export const MenubarSeparator = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(
      '-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800',
      className,
    )}
    {...props}
  />
));

MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;
