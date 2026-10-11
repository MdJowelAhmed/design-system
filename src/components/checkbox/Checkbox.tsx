import { forwardRef, useId } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from '../../icons/set';
import { cn } from '../../utils';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      checked,
      disabled,
      id: customId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId ?? generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2.5">
          <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            checked={checked}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'peer group mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border transition-all duration-150',
              'border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900',
              'focus-visible:ring-primary-500/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              'data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white',
              'data-[state=indeterminate]:border-primary-600 data-[state=indeterminate]:bg-primary-600 data-[state=indeterminate]:text-white',
              'dark:data-[state=checked]:border-primary-500 dark:data-[state=checked]:bg-primary-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-danger-500 dark:border-danger-400',
              className,
            )}
            {...props}
          >
            {/* Icon follows Radix's own state so uncontrolled indeterminate also renders correctly. */}
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              <Check className="h-3 w-3 stroke-[3] group-data-[state=indeterminate]:hidden" />
              <Minus className="hidden h-3 w-3 stroke-[3] group-data-[state=indeterminate]:block" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && (
            <div className="grid gap-0.5 leading-none">
              <label
                htmlFor={id}
                className={cn(
                  'cursor-pointer text-sm font-medium text-neutral-900 select-none dark:text-neutral-50',
                  disabled && 'cursor-not-allowed opacity-60',
                )}
              >
                {label}
              </label>
              {description && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-danger-600 dark:text-danger-400 pl-6 text-xs font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
