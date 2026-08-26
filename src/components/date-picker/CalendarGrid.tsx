'use client';

import { CalendarDay } from './CalendarDay';
import {
  getDaysInMonthGrid,
  type DateRange,
  type DateRestrictionOptions,
} from './utils/dateUtils';

export interface CalendarGridProps {
  viewDate: Date;
  selectedDate?: Date | null;
  selectedRange?: DateRange | null;
  restrictions?: DateRestrictionOptions;
  mode?: 'single' | 'range';
  onDateSelect: (date: Date) => void;
  onDateHover?: (date: Date) => void;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function CalendarGrid({
  viewDate,
  selectedDate,
  selectedRange,
  restrictions,
  mode = 'single',
  onDateSelect,
  onDateHover,
}: CalendarGridProps) {
  const daysGrid = getDaysInMonthGrid(viewDate);

  return (
    // ARIA: grid > row (header) > columnheader | grid > row × N > gridcell > button
    <div role="grid" aria-label="Calendar days" className="grid gap-1 pt-2">
      {/* Header row — must be inside role="grid" to satisfy ARIA required-parent rule */}
      <div role="row" className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            role="columnheader"
            aria-label={day}
            className="py-1 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Week rows */}
      {Array.from({ length: Math.ceil(daysGrid.length / 7) }, (_, weekIdx) => (
        <div key={weekIdx} role="row" className="grid grid-cols-7 gap-1">
          {daysGrid
            .slice(weekIdx * 7, weekIdx * 7 + 7)
            .map(({ date, isCurrentMonth }) => (
              <div key={date.toISOString()} role="gridcell">
                <CalendarDay
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  selectedDate={selectedDate}
                  selectedRange={selectedRange}
                  restrictions={restrictions}
                  mode={mode}
                  onClick={onDateSelect}
                  onMouseEnter={onDateHover}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
