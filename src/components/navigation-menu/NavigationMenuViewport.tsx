import { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '../../utils';
import type { NavigationMenuViewportProps } from './NavigationMenu.types';

export const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className={cn('absolute top-full left-0 flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top overflow-hidden rounded-xl border border-neutral-200 bg-white/95 text-neutral-900 shadow-xl backdrop-blur-md md:w-[var(--radix-navigation-menu-viewport-width)] dark:border-neutral-800 dark:bg-neutral-900/95 dark:text-neutral-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;
