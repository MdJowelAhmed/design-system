import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '../../icons/set';
import { cn } from '../../utils';
import { Heading, Text } from '../typography';
import type {
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
} from './Sheet.types';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const SheetContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(
  (
    { side = 'right', showCloseButton = true, className, children, ...props },
    ref,
  ) => (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out dark:bg-neutral-900',
          side === 'top' &&
            'inset-x-0 top-0 border-b border-neutral-200 dark:border-neutral-800',
          side === 'bottom' &&
            'inset-x-0 bottom-0 border-t border-neutral-200 dark:border-neutral-800',
          side === 'left' &&
            'inset-y-0 left-0 h-full w-3/4 border-r border-neutral-200 sm:max-w-sm dark:border-neutral-800',
          side === 'right' &&
            'inset-y-0 right-0 h-full w-3/4 border-l border-neutral-200 sm:max-w-sm dark:border-neutral-800',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="focus-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none">
            <X
              aria-hidden="true"
              className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = DialogPrimitive.Content.displayName;

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

export const SheetTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  SheetTitleProps
>(({ className, ...props }, ref) => (
  <Heading asChild level={2} size="lg" weight="semibold" className={className}>
    <DialogPrimitive.Title ref={ref} {...props} />
  </Heading>
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

export const SheetDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  SheetDescriptionProps
>(({ className, ...props }, ref) => (
  <Text asChild size="sm" color="muted" className={className}>
    <DialogPrimitive.Description ref={ref} {...props} />
  </Text>
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
