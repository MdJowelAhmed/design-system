'use client';

import { forwardRef, useId } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from '../../icons';
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

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2.5">
          <CheckboxPrimitive.Root
            ref={ref}
            id={id}
            checked={checked}
            disabled={disabled}
            className={cn(
              'peer mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border transition-all duration-150',
              'border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900',
              'focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2 focus-visible:outline-none',
              'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white',
              'data-[state=indeterminate]:border-blue-600 data-[state=indeterminate]:bg-blue-600 data-[state=indeterminate]:text-white',
              'dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 dark:border-red-400',
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              {checked === 'indeterminate' ? (
                <Minus className="h-3 w-3 stroke-[3]" />
              ) : (
                <Check className="h-3 w-3 stroke-[3]" />
              )}
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
          // text-red-600 (#dc2626) ≈5.9:1 on white — fixes WCAG AA (was red-500 = 3.76:1)
          <p className="pl-6 text-xs font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
