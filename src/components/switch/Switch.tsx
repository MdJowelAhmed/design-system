import { forwardRef, useId } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../utils';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      size = 'md',
      disabled,
      id: customId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId ?? generatedId;

    return (
      <div className="flex items-center justify-between gap-3">
        {label && (
          <div className="grid gap-0.5 leading-none">
            <label
              htmlFor={id}
              className={cn(
                'cursor-pointer text-sm font-medium text-neutral-800 select-none dark:text-neutral-200',
                disabled && 'cursor-not-allowed opacity-60',
              )}
            >
              {label}
            </label>
            {description && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        )}

        <SwitchPrimitive.Root
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            'focus-visible:ring-primary-500/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:bg-primary-600 dark:data-[state=checked]:bg-primary-500 bg-neutral-200 dark:bg-neutral-800',
            size === 'sm' && 'h-5 w-9',
            size === 'md' && 'h-6 w-11',
            size === 'lg' && 'h-7 w-14',
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              'pointer-events-none block rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out',
              size === 'sm' &&
                'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
              size === 'md' &&
                'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
              size === 'lg' &&
                'h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
            )}
          />
        </SwitchPrimitive.Root>
      </div>
    );
  },
);

Switch.displayName = SwitchPrimitive.Root.displayName;
