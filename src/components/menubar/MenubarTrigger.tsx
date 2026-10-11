import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import { menubarTriggerVariants } from './Menubar.styles';
import type { MenubarTriggerProps } from './Menubar.types';

export const MenubarTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(menubarTriggerVariants({ className }))}
    {...props}
  />
));

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;
