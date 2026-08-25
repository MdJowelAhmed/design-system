import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import type { modalContentVariants } from './Modal.styles';

export type ModalProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
>;

export type ModalTriggerProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;

export type ModalPortalProps = DialogPrimitive.DialogPortalProps;

export interface ModalOverlayProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
> {
  blur?: boolean;
}

export interface ModalContentProps
  extends
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  blur?: boolean;
  overlayProps?: Omit<ModalOverlayProps, 'blur'>;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export type ModalTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

export type ModalDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export type ModalCloseProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>;
