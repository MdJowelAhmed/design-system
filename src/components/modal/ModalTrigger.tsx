import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ModalTriggerProps } from './Modal.types';

export const ModalTrigger = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  ModalTriggerProps
>((props, ref) => <DialogPrimitive.Trigger ref={ref} {...props} />);

ModalTrigger.displayName = 'ModalTrigger';
