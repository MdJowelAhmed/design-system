import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import { menubarVariants } from './Menubar.styles';
import type { MenubarProps } from './Menubar.types';

export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarPortal = MenubarPrimitive.Portal;

export const Menubar = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenubarProps
>(({ variant = 'default', size = 'md', className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(menubarVariants({ variant, size, className }))}
    {...props}
  />
));

Menubar.displayName = MenubarPrimitive.Root.displayName;
