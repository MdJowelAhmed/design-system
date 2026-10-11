import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '../../icons/set';
import { cn } from '../../utils';
import { modalContentVariants } from './Modal.styles';
import type { ModalContentProps, ModalOverlayProps } from './Modal.types';

export const ModalPortal = DialogPrimitive.Portal;

export const ModalOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, blur = false, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out fixed inset-0 z-50 bg-black/60',
      blur && 'backdrop-blur-sm',
      className,
    )}
    {...props}
  />
));

ModalOverlay.displayName = 'ModalOverlay';

export const ModalContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(
  (
    {
      className,
      children,
      size = 'md',
      variant = 'default',
      showCloseButton = true,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      blur = false,
      overlayProps,
      onPointerDownOutside,
      onEscapeKeyDown,
      ...props
    },
    ref,
  ) => (
    <ModalPortal>
      <ModalOverlay blur={blur} {...overlayProps} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(modalContentVariants({ size, variant }), className)}
        onPointerDownOutside={(e) => {
          if (!closeOnOutsideClick) {
            e.preventDefault();
          }
          onPointerDownOutside?.(e);
        }}
        onEscapeKeyDown={(e) => {
          if (!closeOnEscape) {
            e.preventDefault();
          }
          onEscapeKeyDown?.(e);
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="absolute top-4 right-4 rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-600 focus:ring-2 focus:ring-neutral-400 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:hover:text-neutral-200 dark:data-[state=open]:bg-neutral-800">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ModalPortal>
  ),
);

ModalContent.displayName = 'ModalContent';
