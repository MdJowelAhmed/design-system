import React from 'react';
import { cn } from '../../utils';
import type { ModalHeaderProps } from './Modal.types';

export const ModalHeader = ({ className, ...props }: ModalHeaderProps) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 border-b border-neutral-100 p-6 text-center sm:text-left dark:border-neutral-800/60',
      className,
    )}
    {...props}
  />
);

ModalHeader.displayName = 'ModalHeader';
