'use client';

import { forwardRef, useState } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { ScrollArea } from '../scroll-area';
import type { ComboboxProps } from './Combobox.types';

export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options = [],
      value: customValue,
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
    const [query, setQuery] = useState('');

    const value = customValue !== undefined ? customValue : internalValue;

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = query
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase()),
        )
      : options;

    const handleSelect = (val: string) => {
      const nextValue = val === value ? '' : val;
      if (customValue === undefined) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
      setOpen(false);
      setQuery('');
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={
              selectedOption ? `Selected: ${selectedOption.label}` : placeholder
            }
            disabled={disabled}
            className={cn('w-[240px] justify-between font-normal', className)}
          >
            <span aria-hidden="true" className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown
              aria-hidden="true"
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0 shadow-xl" align="start">
          <div className="flex items-center border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
            <Search
              aria-hidden="true"
              className="mr-2 h-4 w-4 shrink-0 opacity-50"
            />
            <input
              className="flex h-7 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-60 p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-500">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    onClick={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    className={cn(
                      'relative flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      option.disabled && 'pointer-events-none opacity-50',
                      isSelected &&
                        'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-950/30 font-medium',
                    )}
                  >
                    <Check
                      aria-hidden="true"
                      className={cn(
                        'text-primary-600 dark:text-primary-400 mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    <span className="truncate">{option.label}</span>
                  </div>
                );
              })
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  },
);

Combobox.displayName = 'Combobox';
