'use client';

import { forwardRef, useId, useRef, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { cn, mergeRefs } from '../../utils';
import {
  FieldCounter,
  FieldLabel,
  FieldMessage,
  FieldRoot,
} from '../field/Field';
import {
  inputBaseVariants,
  inputSlotVariants,
  inputWrapperVariants,
} from './Input.styles';
import type { InputProps } from './Input.types';

/**
 * Derives the visual state of the input wrapper.
 * Priority: disabled/loading → error → warning → success → default.
 */
function getWrapperState(
  props: Pick<
    InputProps,
    'disabled' | 'loading' | 'error' | 'warning' | 'success'
  >,
) {
  if (props.disabled || props.loading) return 'disabled';
  if (props.error) return 'error';
  if (props.warning) return 'warning';
  if (props.success) return 'success';
  return 'default';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      warning,
      success,
      required,
      fullWidth = true,

      size = 'md',
      variant = 'outlined',
      radius = 'md',

      leftIcon,
      rightIcon,
      prefix,
      suffix,

      loading = false,
      clearable = false,
      onClear,

      id: customId,
      disabled,
      maxLength,
      value,
      defaultValue,
      onChange,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useId();
    const id = customId ?? generatedId;
    const messageId = `${id}-message`;

    const isControlled = value !== undefined;

    // We need a DOM ref to imperatively clear uncontrolled inputs.
    // mergeRefs combines it with the consumer's forwarded ref.
    const innerRef = useRef<HTMLInputElement>(null);

    // Track character count to update the counter and clear-button visibility.
    // We only store the length (a number), never the full string value.
    // Controlled mode: the length is always derived from the `value` prop directly.
    const [charCount, setCharCount] = useState(
      () => String(defaultValue ?? '').length,
    );
    const currentLength = isControlled ? String(value ?? '').length : charCount;

    const wrapperState = getWrapperState({
      disabled,
      loading,
      error,
      warning,
      success,
    });
    const hasMessage = Boolean(error || warning || success || helperText);
    const showCounter = Boolean(maxLength);
    const showClearButton =
      clearable && currentLength > 0 && !disabled && !loading;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setCharCount(e.target.value.length);
      onChange?.(e);
    }

    function handleClear(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      if (!isControlled && innerRef.current) {
        innerRef.current.value = '';
        setCharCount(0);
      }
      onClear?.();
    }

    // Right slot priority: loading spinner > clear button > custom right icon.
    const rightSlot = loading ? (
      <Loader2
        className={cn(inputSlotVariants.icon, 'animate-spin')}
        aria-hidden="true"
      />
    ) : showClearButton ? (
      <button
        type="button"
        onClick={handleClear}
        tabIndex={-1}
        aria-label="Clear input"
        className={cn(inputSlotVariants.actionIcon)}
      >
        <X aria-hidden="true" />
      </button>
    ) : rightIcon ? (
      <span className={cn(inputSlotVariants.icon)}>{rightIcon}</span>
    ) : null;

    return (
      <FieldRoot fullWidth={fullWidth}>
        {label && (
          <FieldLabel htmlFor={id} required={required}>
            {label}
          </FieldLabel>
        )}

        <div
          className={cn(
            inputWrapperVariants({
              variant,
              size,
              radius,
              state: wrapperState,
            }),
            className,
          )}
        >
          {prefix && (
            <span className={cn(inputSlotVariants.prefix)} aria-hidden="true">
              {prefix}
            </span>
          )}

          {leftIcon && (
            <span className={cn(inputSlotVariants.icon)} aria-hidden="true">
              {leftIcon}
            </span>
          )}

          <input
            ref={mergeRefs(innerRef, forwardedRef)}
            id={id}
            disabled={disabled || loading}
            required={required}
            maxLength={maxLength}
            {...(isControlled ? { value } : { defaultValue })}
            onChange={handleChange}
            aria-invalid={Boolean(error) || undefined}
            aria-required={required || undefined}
            aria-disabled={disabled || loading || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            className={cn(inputBaseVariants())}
            {...props}
          />

          {rightSlot}

          {suffix && (
            <span className={cn(inputSlotVariants.suffix)} aria-hidden="true">
              {suffix}
            </span>
          )}
        </div>

        {(hasMessage || showCounter) && (
          <div className="flex items-start justify-between gap-2">
            {hasMessage ? (
              <FieldMessage
                id={messageId}
                error={error}
                warning={warning}
                success={success}
                helperText={helperText}
              />
            ) : (
              <span />
            )}
            {showCounter && (
              <FieldCounter current={currentLength} max={maxLength!} />
            )}
          </div>
        )}
      </FieldRoot>
    );
  },
);

Input.displayName = 'Input';
