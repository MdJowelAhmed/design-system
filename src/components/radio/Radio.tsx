import { forwardRef, useId } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from '../../icons/set';
import { cn } from '../../utils';
import type { RadioGroupProps, RadioItemProps } from './Radio.types';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { className, label, error, orientation = 'vertical', children, ...props },
    ref,
  ) => {
    const id = useId();
    const labelId = `${id}-label`;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <span
            id={labelId}
            className="text-sm font-medium text-neutral-700 select-none dark:text-neutral-300"
          >
            {label}
          </span>
        )}

        <RadioGroupPrimitive.Root
          ref={ref}
          orientation={orientation}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            'grid gap-2.5',
            orientation === 'horizontal'
              ? 'auto-cols-max grid-flow-col gap-4'
              : 'grid-flow-row',
            className,
          )}
          {...props}
        >
          {children}
        </RadioGroupPrimitive.Root>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-danger-600 dark:text-danger-400 text-xs font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  (
    { className, label, description, disabled, id: customId, value, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId ?? generatedId;

    return (
      <div className="flex items-start gap-2.5">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={id}
          value={value}
          disabled={disabled}
          className={cn(
            'aspect-square h-4 w-4 rounded-full border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900',
            'text-primary-600 dark:text-primary-500 mt-0.5 cursor-pointer transition-all duration-150',
            'focus-visible:ring-primary-500/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            'data-[state=checked]:border-primary-600 dark:data-[state=checked]:border-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Circle className="text-primary-600 dark:text-primary-400 h-2 w-2 fill-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

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
      </div>
    );
  },
);
RadioItem.displayName = 'RadioItem';
