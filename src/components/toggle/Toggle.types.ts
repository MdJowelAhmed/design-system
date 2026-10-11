import type { ComponentPropsWithoutRef } from 'react';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import type * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

export interface ToggleProps extends ComponentPropsWithoutRef<
  typeof TogglePrimitive.Root
> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export type ToggleGroupProps = ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
>;
export type ToggleGroupItemProps = ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
>;
