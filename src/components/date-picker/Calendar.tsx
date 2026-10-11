import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  addDays,
  addMonths,
  addYears,
  startOfDay,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { cn } from '../../utils';
import { Button } from '../button';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';
import { calendarContainerVariants } from './DatePicker.styles';
import type { CalendarProps } from './DatePicker.types';
import {
  isDateDisabled,
  type DateRange,
  type DateRestrictionOptions,
} from './utils/dateUtils';

export function Calendar({
  mode = 'single',
  selected,
  selectedRange,
  onSelect,
  onRangeSelect,
  defaultViewDate,
  showTodayButton = true,
  showClearButton = true,
  onClear,
  minDate,
  maxDate,
  disabledDates,
  disableWeekends,
  disableFuture,
  disablePast,
  className,
}: CalendarProps) {
  const initialDate = startOfDay(
    selected ?? selectedRange?.from ?? defaultViewDate ?? new Date(),
  );
  // viewDate drives the visible month; focusedDate is the keyboard cursor.
  const [viewDate, setViewDate] = useState<Date>(initialDate);
  const [focusedDate, setFocusedDate] = useState<Date>(initialDate);
  const [hoverRange, setHoverRange] = useState<DateRange | null>(null);

  // Jump to a newly selected date only when the selection itself changes, not on every render.
  const selectedTime = selected?.getTime() ?? null;
  const [syncedTime, setSyncedTime] = useState(selectedTime);
  if (selectedTime !== syncedTime) {
    setSyncedTime(selectedTime);
    if (selected) {
      setViewDate(startOfDay(selected));
      setFocusedDate(startOfDay(selected));
    }
  }

  const restrictions: DateRestrictionOptions = {
    minDate,
    maxDate,
    disabledDates,
    disableWeekends,
    disableFuture,
    disablePast,
  };

  // Month & Year Navigation
  const handlePrevMonth = () => setViewDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setViewDate((prev) => addMonths(prev, 1));
  const handleMonthChange = (m: number) =>
    setViewDate((prev) => new Date(prev.getFullYear(), m, 1));
  const handleYearChange = (y: number) =>
    setViewDate((prev) => new Date(y, prev.getMonth(), 1));

  // Date selection logic
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date, restrictions)) return;
    setFocusedDate(date);

    if (mode === 'single') {
      onSelect?.(date);
    } else if (mode === 'range') {
      if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
        // Start new range
        onRangeSelect?.({ from: date, to: null });
        setHoverRange(null);
      } else {
        // Complete range
        const from = selectedRange.from;
        if (date < from) {
          onRangeSelect?.({ from: date, to: from });
        } else {
          onRangeSelect?.({ from, to: date });
        }
        setHoverRange(null);
      }
    }
  };

  // Range hover preview
  const handleDateHover = (date: Date) => {
    if (mode === 'range' && selectedRange?.from && !selectedRange.to) {
      const from = selectedRange.from;
      if (date < from) {
        setHoverRange({ from: date, to: from });
      } else {
        setHoverRange({ from, to: date });
      }
    }
  };

  // Today button handler
  const handleTodayClick = () => {
    const today = startOfDay(new Date());
    if (!isDateDisabled(today, restrictions)) {
      setViewDate(today);
      if (mode === 'single') {
        onSelect?.(today);
      } else if (mode === 'range') {
        onRangeSelect?.({ from: today, to: today });
      }
    }
  };

  // Arrow keys move the focus cursor only; Enter/Space commits the selection (WAI-ARIA date grid).
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = focusedDate;
    let nextDate: Date;

    switch (e.key) {
      case 'ArrowLeft':
        nextDate = subDays(current, 1);
        break;
      case 'ArrowRight':
        nextDate = addDays(current, 1);
        break;
      case 'ArrowUp':
        nextDate = subDays(current, 7);
        break;
      case 'ArrowDown':
        nextDate = addDays(current, 7);
        break;
      case 'PageUp':
        nextDate = e.shiftKey ? subYears(current, 1) : subMonths(current, 1);
        break;
      case 'PageDown':
        nextDate = e.shiftKey ? addYears(current, 1) : addMonths(current, 1);
        break;
      case 'Home':
        nextDate = subDays(current, current.getDay());
        break;
      case 'End':
        nextDate = addDays(current, 6 - current.getDay());
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDateClick(current);
        return;
      default:
        return;
    }

    e.preventDefault();
    setFocusedDate(nextDate);
    setViewDate(nextDate);
    handleDateHover(nextDate);
  };

  const activeRange = hoverRange ?? selectedRange;

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={calendarContainerVariants({
        className: cn('group', className),
      })}
      role="region"
      aria-label="Calendar"
    >
      <CalendarHeader
        viewDate={viewDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        minDate={minDate}
        maxDate={maxDate}
      />

      <CalendarGrid
        viewDate={viewDate}
        selectedDate={selected}
        selectedRange={activeRange}
        focusedDate={focusedDate}
        restrictions={restrictions}
        mode={mode}
        onDateSelect={handleDateClick}
        onDateHover={handleDateHover}
      />

      {/* Footer controls: Today & Clear */}
      {(showTodayButton || showClearButton) && (
        <div className="mt-2 flex items-center justify-between border-t border-neutral-100 pt-2 dark:border-neutral-800">
          {showTodayButton ? (
            <Button
              variant="ghost"
              color="primary"
              size="xs"
              onClick={handleTodayClick}
            >
              Today
            </Button>
          ) : (
            <span />
          )}

          {showClearButton && onClear ? (
            <Button variant="ghost" color="neutral" size="xs" onClick={onClear}>
              Clear
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

Calendar.displayName = 'Calendar';
