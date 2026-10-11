import { forwardRef } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from '../../icons/set';
import { cn } from '../../utils';
import { navigationMenuTriggerVariants } from './NavigationMenu.styles';
import type { NavigationMenuTriggerProps } from './NavigationMenu.types';

export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerVariants({ className }))}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3.5 w-3.5 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
