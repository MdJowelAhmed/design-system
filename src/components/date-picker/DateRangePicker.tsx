import { forwardRef, useState } from 'react';
import { Calendar as CalendarIcon } from '../../icons/set';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';
import { Input } from '../input';
import { Calendar } from './Calendar';
import type { DateRangePickerProps } from './DatePicker.types';
import { presetButtonVariants } from './DatePicker.styles';
import {
  formatDate,
  getDateRangePresets,
  type DateRange,
} from './utils/dateUtils';

export const DateRangePicker = forwardRef<
  HTMLInputElement,
  DateRangePickerProps
>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = 'Select date range',
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
      showPresets = true,
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
    const [internalRange, setInternalRange] = useState<DateRange | null>(
      defaultValue ?? null,
    );
    const selectedRange = isControlled ? value : internalRange;

    // Popover open state
    const [open, setOpen] = useState(false);

    // Format range string e.g. "01/08/2026 - 15/08/2026"
    let displayValue = '';
    if (selectedRange?.from && selectedRange?.to) {
      displayValue = `${formatDate(selectedRange.from, format)} - ${formatDate(selectedRange.to, format)}`;
    } else if (selectedRange?.from) {
      displayValue = `${formatDate(selectedRange.from, format)} - ...`;
    }

    const presets = getDateRangePresets();

    const handleRangeSelect = (range: DateRange) => {
      if (!isControlled) setInternalRange(range);
      onChange?.(range);
      if (range.from && range.to) {
        setOpen(false);
      }
    };

    const handleClear = () => {
      if (!isControlled) setInternalRange(null);
      onChange?.(null);
    };

    const handlePresetClick = (presetRange: { from: Date; to: Date }) => {
      if (!isControlled) setInternalRange(presetRange);
      onChange?.(presetRange);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        {/* Same PopoverAnchor pattern as DatePicker — see DatePicker.tsx for rationale */}
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
              clearable={clearable && Boolean(selectedRange?.from)}
              onClear={handleClear}
              placeholder={placeholder}
              value={displayValue}
              leftIcon={<CalendarIcon aria-hidden="true" className="h-4 w-4" />}
              className={className}
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
            <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl sm:flex-row dark:border-neutral-800 dark:bg-neutral-900">
              {/* Presets Sidebar */}
              {showPresets && (
                <div className="flex min-w-[130px] flex-row gap-1 border-b border-neutral-100 bg-neutral-50/50 p-3 sm:flex-col sm:border-r sm:border-b-0 dark:border-neutral-800 dark:bg-neutral-900/50">
                  <span className="hidden px-2 py-1 text-[10px] font-bold tracking-wider text-neutral-400 uppercase sm:block dark:text-neutral-500">
                    Presets
                  </span>
                  {presets.map((preset) => {
                    const isActive =
                      selectedRange?.from &&
                      selectedRange?.to &&
                      formatDate(selectedRange.from) ===
                        formatDate(preset.range.from) &&
                      formatDate(selectedRange.to) ===
                        formatDate(preset.range.to);

                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetClick(preset.range)}
                        className={presetButtonVariants({
                          active: Boolean(isActive),
                        })}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Main Calendar in Range Mode */}
              <Calendar
                mode="range"
                selectedRange={selectedRange}
                onRangeSelect={handleRangeSelect}
                showTodayButton={false}
                showClearButton
                onClear={handleClear}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                disableWeekends={disableWeekends}
                disableFuture={disableFuture}
                disablePast={disablePast}
                className="rounded-none border-none shadow-none"
              />
            </div>
          </PopoverContent>
        )}
      </Popover>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';
