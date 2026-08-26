'use client';

import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { cn } from '../../utils';
import {
  fieldCounterVariants,
  fieldLabelVariants,
  fieldMessageVariants,
} from './Field.styles';
import type {
  FieldCounterProps,
  FieldLabelProps,
  FieldMessageProps,
  FieldRootProps,
} from './Field.types';

export function FieldRoot({
  fullWidth = true,
  className,
  ...props
}: FieldRootProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        fullWidth ? 'w-full' : 'w-auto',
        className,
      )}
      {...props}
    />
  );
}
FieldRoot.displayName = 'FieldRoot';

export function FieldLabel({
  required,
  srOnly,
  className,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <label
      className={cn(
        fieldLabelVariants({ state: 'default' }),
        srOnly && 'sr-only',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
FieldLabel.displayName = 'FieldLabel';

/**
 * Renders one message below a field.
 * Only the highest-priority message is shown: error > warning > success > helperText.
 */
export function FieldMessage({
  id,
  error,
  warning,
  success,
  helperText,
}: FieldMessageProps) {
  if (error) {
    return (
      <p
        id={id}
        role="alert"
        className={cn(fieldMessageVariants({ intent: 'error' }))}
      >
        <AlertCircle
          className="mt-px h-3.5 w-3.5 shrink-0"
          aria-hidden="true"
        />
        {error}
      </p>
    );
  }
  if (warning) {
    return (
      <p id={id} className={cn(fieldMessageVariants({ intent: 'warning' }))}>
        <TriangleAlert
          className="mt-px h-3.5 w-3.5 shrink-0"
          aria-hidden="true"
        />
        {warning}
      </p>
    );
  }
  if (success) {
    return (
      <p id={id} className={cn(fieldMessageVariants({ intent: 'success' }))}>
        <CheckCircle2
          className="mt-px h-3.5 w-3.5 shrink-0"
          aria-hidden="true"
        />
        {success}
      </p>
    );
  }
  if (helperText) {
    return (
      <p id={id} className={cn(fieldMessageVariants({ intent: 'helper' }))}>
        <Info className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {helperText}
      </p>
    );
  }
  return null;
}
FieldMessage.displayName = 'FieldMessage';

/** Displays the current character count relative to a maximum. */
export function FieldCounter({ current, max }: FieldCounterProps) {
  const ratio = current / max;
  const state = ratio >= 1 ? 'limit' : ratio >= 0.8 ? 'warning' : 'normal';

  return (
    <span className={cn(fieldCounterVariants({ state }))} aria-live="polite">
      {current}
      <span className="text-neutral-500 dark:text-neutral-400">/{max}</span>
    </span>
  );
}
FieldCounter.displayName = 'FieldCounter';
