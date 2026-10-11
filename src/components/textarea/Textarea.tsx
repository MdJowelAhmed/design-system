import { forwardRef, useId, useState } from 'react';
import type { ChangeEvent } from 'react';
import { cn } from '../../utils';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showCount = false,
      maxLength,
      fullWidth = true,
      id: customId,
      disabled,
      onChange,
      value,
      defaultValue,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const isControlled = value !== undefined;
    const [uncontrolledCount, setUncontrolledCount] = useState(
      () => String(defaultValue ?? '').length,
    );
    const charCount = isControlled
      ? String(value ?? '').length
      : uncontrolledCount;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setUncontrolledCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div
        className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto')}
      >
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-neutral-700 select-none dark:text-neutral-300"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full resize-y rounded-lg p-3 font-sans text-sm transition-all duration-200',
            'border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900',
            'text-neutral-900 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500',
            'focus:border-primary-500 focus:ring-primary-500/20 dark:focus:border-primary-400 focus:ring-2 focus:outline-none',
            'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60 dark:disabled:bg-neutral-800',
            error &&
              'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20 dark:border-danger-400 dark:focus:border-danger-400',
            className,
          )}
          {...props}
        />

        <div className="flex items-center justify-between gap-2 text-xs">
          {error ? (
            <p
              id={errorId}
              role="alert"
              className="text-danger-600 dark:text-danger-400 font-medium"
            >
              {error}
            </p>
          ) : helperText ? (
            <p id={helperId} className="text-neutral-500 dark:text-neutral-400">
              {helperText}
            </p>
          ) : (
            <span />
          )}

          {showCount && (
            <span className="ml-auto shrink-0 text-neutral-400 dark:text-neutral-500">
              {charCount}
              {maxLength ? ` / ${maxLength}` : ''}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
