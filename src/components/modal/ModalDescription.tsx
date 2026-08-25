import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Text } from '../typography';
import { cn } from '../../utils';
import type { ModalDescriptionProps } from './Modal.types';

export const ModalDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <Text
    asChild
    size="sm"
    color="muted"
    className={cn('text-neutral-500 dark:text-neutral-400', className)}
  >
    <DialogPrimitive.Description ref={ref} {...props} />
  </Text>
));

ModalDescription.displayName = 'ModalDescription';
