import { forwardRef, useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';
import { Calendar as CalendarIcon } from '../../icons/set';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';
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
      onBlur,
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

    const [open, setOpen] = useState(false);
    // Raw text while the user is typing; null means "show the formatted selected date".
    const [draft, setDraft] = useState<string | null>(null);

    const displayValue = draft ?? formatDate(selectedDate, format);
    const defaultPlaceholder = placeholder ?? format.toUpperCase();

    const commit = (date: Date | null) => {
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
    };

    const handleSelect = (date: Date) => {
      setDraft(null);
      commit(date);
      setOpen(false);
    };

    const handleClear = () => {
      setDraft(null);
      commit(null);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setDraft(text);
      if (!text) {
        commit(null);
        return;
      }
      // Commit only complete dates: "15/08/2" parses as year 2, so require an exact round-trip.
      const parsed = parseDate(text, format);
      if (parsed && formatDate(parsed, format) === text.trim()) {
        commit(parsed);
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setDraft(null);
      onBlur?.(e);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        {/*
         * WCAG-correct date picker pattern:
         *   - PopoverAnchor is a non-interactive positioning anchor; it does NOT inject
         *     aria-expanded / type="button" like PopoverTrigger does.
         *   - The plain <div> onClick toggles the popover (no interactive role = no nesting violation).
         *   - The Input carries role="combobox", aria-expanded, aria-haspopup directly on the
         *     underlying <input> element via ...props spread — satisfying the ARIA combobox pattern.
         */}
        <PopoverAnchor asChild>
          <div
            onClick={() => !disabled && !readOnly && !loading && setOpen(!open)}
            className="cursor-pointer"
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
              onClear={handleClear}
              placeholder={defaultPlaceholder}
              value={displayValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              leftIcon={<CalendarIcon aria-hidden="true" className="h-4 w-4" />}
              className={className}
              // These land on the underlying <input> element via ...props spread in Input
              role="combobox"
              aria-expanded={open}
              aria-haspopup="dialog"
              {...props}
            />
          </div>
        </PopoverAnchor>

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
