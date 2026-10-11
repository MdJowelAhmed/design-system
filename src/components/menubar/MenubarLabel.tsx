import { forwardRef } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn } from '../../utils';
import type { MenubarLabelProps } from './Menubar.types';

export const MenubarLabel = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  MenubarLabelProps
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));

MenubarLabel.displayName = MenubarPrimitive.Label.displayName;
