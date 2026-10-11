import { forwardRef, useState } from 'react';
import { Check, ChevronsUpDown } from '../../icons/set';
import { cn } from '../../utils';
import { Button } from '../button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import type { ComboboxProps } from './Combobox.types';

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select an option...',
      searchPlaceholder = 'Search options...',
      emptyText = 'No results found.',
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (next: string) => {
      const nextValue = next === value ? '' : next;
      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            color="neutral"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            disabled={disabled}
            className={cn('w-[240px] justify-between font-normal', className)}
          >
            <span
              className={cn('truncate', !selectedOption && 'text-neutral-500')}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown
              aria-hidden="true"
              className="ml-2 shrink-0 opacity-50"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 shadow-xl"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
            <CommandList className="max-h-60 p-1">
              <CommandEmpty className="py-6 text-xs">{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      keywords={[option.label]}
                      disabled={option.disabled}
                      onSelect={() => handleSelect(option.value)}
                      aria-selected={isSelected}
                      className={cn(
                        'rounded-md px-2 py-1.5',
                        isSelected &&
                          'text-primary-600 dark:text-primary-400 font-medium',
                      )}
                    >
                      <Check
                        aria-hidden="true"
                        className={cn(
                          'text-primary-600 dark:text-primary-400',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {option.icon}
                      <span className="truncate">{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

Combobox.displayName = 'Combobox';
