import React, { forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '../../utils';
import type {
  ToggleProps,
  ToggleGroupProps,
  ToggleGroupItemProps,
} from './Toggle.types';

export const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant = 'default', size = 'md', ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      'focus-visible:ring-primary-500 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-200 data-[state=on]:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:data-[state=on]:bg-neutral-800 dark:data-[state=on]:text-neutral-50',
      variant === 'outline' &&
        'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800',
      size === 'sm' && 'h-8 min-w-8 px-2',
      size === 'md' && 'h-10 min-w-10 px-3',
      size === 'lg' && 'h-11 min-w-11 px-5',
      className,
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('inline-flex items-center justify-center gap-1', className)}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-100 data-[state=on]:bg-neutral-200 dark:hover:bg-neutral-800 dark:data-[state=on]:bg-neutral-800',
      className,
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
));
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
