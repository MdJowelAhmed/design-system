import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ModalCloseProps } from './Modal.types';

export const ModalClose = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  ModalCloseProps
>((props, ref) => <DialogPrimitive.Close ref={ref} {...props} />);

ModalClose.displayName = 'ModalClose';
