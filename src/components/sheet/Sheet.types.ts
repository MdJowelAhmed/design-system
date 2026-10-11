import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';

export type SheetSide = 'top' | 'bottom' | 'left' | 'right';

export interface SheetContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  side?: SheetSide;
  /** Render the built-in close (X) button. */
  showCloseButton?: boolean;
}

export type SheetHeaderProps = HTMLAttributes<HTMLDivElement>;
export type SheetFooterProps = HTMLAttributes<HTMLDivElement>;
export type SheetTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;
export type SheetDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
