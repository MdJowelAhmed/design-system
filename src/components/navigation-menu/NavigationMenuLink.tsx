import { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cn } from '../../utils';
import type { NavigationMenuLinkProps } from './NavigationMenu.types';

export const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, active, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    active={active}
    className={cn(
      'block rounded-lg p-3 text-sm leading-none no-underline transition-colors outline-none select-none hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
      active &&
        'text-primary-600 dark:text-primary-400 bg-neutral-100/80 font-medium dark:bg-neutral-800/80',
      className,
    )}
    {...props}
  />
));

NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;
