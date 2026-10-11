import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Command as CommandPrimitive } from 'cmdk';

export interface CommandDialogProps extends Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive>,
  'title'
> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible dialog title (visually hidden). */
  title?: ReactNode;
  /** Accessible dialog description (visually hidden). */
  description?: ReactNode;
}
