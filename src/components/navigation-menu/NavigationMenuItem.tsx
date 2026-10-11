import { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '../../utils';
import type { NavigationMenuItemProps } from './NavigationMenu.types';

export const NavigationMenuItem = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  NavigationMenuItemProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Item
    ref={ref}
    className={cn('relative', className)}
    {...props}
  />
));

NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;
