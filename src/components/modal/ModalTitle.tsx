import React, { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Heading } from '../typography';
import { cn } from '../../utils';
import type { ModalTitleProps } from './Modal.types';

export const ModalTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <Heading
    asChild
    level={2}
    size="lg"
    weight="semibold"
    className={cn('leading-none tracking-tight', className)}
  >
    <DialogPrimitive.Title ref={ref} {...props} />
  </Heading>
));

ModalTitle.displayName = 'ModalTitle';
