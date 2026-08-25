import React from 'react';
import { cn } from '../../utils';
import type { ModalBodyProps } from './Modal.types';

export const ModalBody = ({
  className,
  scrollable = true,
  ...props
}: ModalBodyProps) => (
  <div
    className={cn(
      'flex-1 p-6 text-sm text-neutral-700 dark:text-neutral-300',
      scrollable && 'max-h-[60vh] overflow-y-auto',
      className,
    )}
    {...props}
  />
);

ModalBody.displayName = 'ModalBody';
