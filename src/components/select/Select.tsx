'use client';

import { forwardRef, useId } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from '../../icons';
import { cn } from '../../utils';
import type { SelectProps } from './Select.types';

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  SelectPrimitive.SelectTriggerProps & {
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
  }
>(({ className, children, size = 'md', error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between font-sans transition-all duration-200',
      'border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900',
      'text-neutral-900 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500',
      'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:focus:border-blue-400',
      'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60 dark:disabled:bg-neutral-800',
      size === 'sm' && 'h-8 rounded-md px-3 text-xs',
      size === 'md' && 'h-10 rounded-lg px-3.5 text-sm',
      size === 'lg' && 'h-12 rounded-xl px-4 text-base',
      error &&
        'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        className="ml-2 h-4 w-4 shrink-0 opacity-50"
        aria-hidden="true"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100',
        position === 'popper' && 'translate-y-1',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectItem = forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer items-center rounded-md py-2 pr-3 pl-8 text-sm transition-colors outline-none select-none',
      'focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-100',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export function Select({
  options = [],
  placeholder = 'Select an option...',
  label,
  error,
  helperText,
  size = 'md',
  fullWidth = true,
  className,
  id: customId,
  value,
  onValueChange,
  defaultValue,
  disabled,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const id = customId ?? generatedId;
  const messageId = `${id}-message`;

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

      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger
          id={id}
          size={size}
          error={Boolean(error)}
          aria-label={label ? undefined : placeholder}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error || helperText ? messageId : undefined}
          className={className}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {children ??
            options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </SelectPrimitive.Root>

      {error ? (
        <p
          id={messageId}
          role="alert"
          className="text-xs font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={messageId}
          className="text-xs text-neutral-500 dark:text-neutral-400"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectLabel = SelectPrimitive.Label;
export const SelectSeparator = SelectPrimitive.Separator;
