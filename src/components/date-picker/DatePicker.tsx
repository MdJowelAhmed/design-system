'use client';

import { forwardRef, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Input } from '../input';
import { Calendar } from './Calendar';
import type { DatePickerProps } from './DatePicker.types';
import { formatDate, parseDate } from './utils/dateUtils';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder,
      format = 'dd/MM/yyyy',
      label,
      helperText,
      error,
      warning,
      success,
      required,
      size = 'md',
      variant = 'outlined',
      radius = 'md',
      fullWidth = true,
      disabled = false,
      readOnly = false,
      loading = false,
      clearable = true,
      showTodayButton = true,
      showClearButton = true,
      minDate,
      maxDate,
      disabledDates,
      disableWeekends,
      disableFuture,
      disablePast,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    // Controlled / Uncontrolled state
    const isControlled = value !== undefined;
    const [internalDate, setInternalDate] = useState<Date | null>(
      defaultValue ?? null,
    );
    const selectedDate = isControlled ? value : internalDate;

    // Popover open state
    const [open, setOpen] = useState(false);

    // Formatted display string
    const displayValue = formatDate(selectedDate, format);
    const defaultPlaceholder = placeholder ?? format.toUpperCase();

    // Select date callback
    const handleSelect = (date: Date) => {
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
      setOpen(false);
    };

    // Clear callback
    const handleClear = () => {
      if (!isControlled) setInternalDate(null);
      onChange?.(null);
    };

    // Manual input typing parser
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (!text) {
        handleClear();
        return;
      }
      const parsed = parseDate(text, format);
      if (parsed) {
        if (!isControlled) setInternalDate(parsed);
        onChange?.(parsed);
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        {/* asChild removed: PopoverTrigger renders its own <button> so Radix ARIA props
            (aria-expanded, type="button") land on a real button element, not a div.
            The wrapping button is visually invisible — Input handles all styling. */}
        <PopoverTrigger
          disabled={disabled || readOnly || loading}
          className="w-full cursor-default p-0 text-left [all:unset] focus:outline-none"
        >
          <Input
            ref={ref}
            id={id}
            label={label}
            helperText={helperText}
            error={error}
            warning={warning}
            success={success}
            required={required}
            size={size}
            variant={variant}
            radius={radius}
            fullWidth={fullWidth}
            disabled={disabled}
            readOnly={readOnly}
            loading={loading}
            clearable={clearable && Boolean(selectedDate)}
            onClear={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            placeholder={defaultPlaceholder}
            value={displayValue}
            onChange={handleInputChange}
            leftIcon={<CalendarIcon aria-hidden="true" className="h-4 w-4" />}
            className={className}
            {...props}
          />
        </PopoverTrigger>

        {!disabled && !readOnly && (
          <PopoverContent
            align="start"
            sideOffset={4}
            className="w-auto border-none bg-transparent p-0 shadow-none"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              showTodayButton={showTodayButton}
              showClearButton={showClearButton}
              onClear={handleClear}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              disableWeekends={disableWeekends}
              disableFuture={disableFuture}
              disablePast={disablePast}
            />
          </PopoverContent>
        )}
      </Popover>
    );
  },
);

DatePicker.displayName = 'DatePicker';
