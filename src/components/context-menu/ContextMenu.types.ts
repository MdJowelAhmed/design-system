import type { HTMLAttributes } from 'react';
import type * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export type ContextMenuProps = ContextMenuPrimitive.ContextMenuProps;
export type ContextMenuTriggerProps =
  ContextMenuPrimitive.ContextMenuTriggerProps;
export type ContextMenuContentProps =
  ContextMenuPrimitive.ContextMenuContentProps;
export type ContextMenuItemProps = ContextMenuPrimitive.ContextMenuItemProps & {
  inset?: boolean;
};
export type ContextMenuCheckboxItemProps =
  ContextMenuPrimitive.ContextMenuCheckboxItemProps;
export type ContextMenuRadioItemProps =
  ContextMenuPrimitive.ContextMenuRadioItemProps;
export type ContextMenuLabelProps =
  ContextMenuPrimitive.ContextMenuLabelProps & {
    inset?: boolean;
  };
export type ContextMenuSeparatorProps =
  ContextMenuPrimitive.ContextMenuSeparatorProps;
export type ContextMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;
