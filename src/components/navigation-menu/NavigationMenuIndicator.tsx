import { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '../../utils';
import type { NavigationMenuIndicatorProps } from './NavigationMenu.types';

export const NavigationMenuIndicator = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'data-[state=visible]:animate-fade-in data-[state=hidden]:animate-fade-out top-full z-[1] flex h-2.5 items-end justify-center overflow-hidden',
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm border-t border-l border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900" />
  </NavigationMenuPrimitive.Indicator>
));

NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;
