import React from 'react';
import { cn } from '../../utils';
import type { ModalFooterProps } from './Modal.types';

export const ModalFooter = ({ className, ...props }: ModalFooterProps) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 border-t border-neutral-100 bg-neutral-50/50 p-6 sm:flex-row sm:justify-end sm:space-x-2 dark:border-neutral-800/60 dark:bg-neutral-900/50',
      className,
    )}
    {...props}
  />
);

ModalFooter.displayName = 'ModalFooter';
