import { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '../../utils';
import type { NavigationMenuContentProps } from './NavigationMenu.types';

export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'data-[motion^=from-]:animate-fade-in data-[motion^=to-]:animate-fade-out top-0 left-0 w-full md:absolute md:w-auto',
      className,
    )}
    {...props}
  />
));

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
