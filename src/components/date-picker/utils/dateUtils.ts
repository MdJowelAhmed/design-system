import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay as isSameDayDateFns,
  isWeekend as isWeekendDateFns,
  parse,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from 'date-fns';

export interface DateRestrictionOptions {
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disableWeekends?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
}

export interface DateRange {
  from?: Date | null;
  to?: Date | null;
}

export interface DatePreset {
  label: string;
  range: { from: Date; to: Date };
}

/** Safely format a date, returning an empty string if null/invalid. */
export function formatDate(
  date: Date | null | undefined,
  formatStr = 'dd/MM/yyyy',
): string {
  if (!date || isNaN(date.getTime())) return '';
  try {
    return format(date, formatStr);
  } catch {
    return '';
  }
}

/** Safely parse a date string using format. */
export function parseDate(
  dateStr: string,
  formatStr = 'dd/MM/yyyy',
): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  try {
    const parsed = parse(dateStr.trim(), formatStr, new Date());
    return isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

/** Check if two dates represent the same calendar day. */
export function isSameDay(
  d1: Date | null | undefined,
  d2: Date | null | undefined,
): boolean {
  if (!d1 || !d2) return false;
  return isSameDayDateFns(d1, d2);
}

/** Check if a date satisfies restriction options (min, max, disabled, weekends, past, future). */
export function isDateDisabled(
  date: Date,
  options?: DateRestrictionOptions,
): boolean {
  if (!options) return false;

  const targetDay = startOfDay(date);
  const today = startOfDay(new Date());

  if (options.minDate && isBefore(targetDay, startOfDay(options.minDate))) {
    return true;
  }

  if (options.maxDate && isAfter(targetDay, startOfDay(options.maxDate))) {
    return true;
  }

  if (options.disablePast && isBefore(targetDay, today)) {
    return true;
  }

  if (options.disableFuture && isAfter(targetDay, today)) {
    return true;
  }

  if (options.disableWeekends && isWeekendDateFns(targetDay)) {
    return true;
  }

  if (options.disabledDates && options.disabledDates.length > 0) {
    const isDisabledExact = options.disabledDates.some((d) =>
      isSameDayDateFns(targetDay, startOfDay(d)),
    );
    if (isDisabledExact) return true;
  }

  return false;
}

/** Check if a date lies strictly within a range (excluding endpoints). */
export function isDateInRange(
  date: Date,
  from?: Date | null,
  to?: Date | null,
): boolean {
  if (!from || !to) return false;
  const target = startOfDay(date).getTime();
  const start = startOfDay(from).getTime();
  const end = startOfDay(to).getTime();

  const min = Math.min(start, end);
  const max = Math.max(start, end);

  return target > min && target < max;
}

export function isRangeStart(date: Date, from?: Date | null): boolean {
  if (!from) return false;
  return isSameDayDateFns(date, from);
}

export function isRangeEnd(date: Date, to?: Date | null): boolean {
  if (!to) return false;
  return isSameDayDateFns(date, to);
}

/**
 * Returns a 35- or 42-day calendar grid for the given view month/year,
 * including leading days from previous month and trailing days for next month.
 */
export function getDaysInMonthGrid(
  viewDate: Date,
): Array<{ date: Date; isCurrentMonth: boolean }> {
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
  let day = startDate;

  while (day <= endDate) {
    days.push({
      date: day,
      isCurrentMonth: day.getMonth() === viewDate.getMonth(),
    });
    day = addDays(day, 1);
  }

  return days;
}

/** Generates standard Date Range presets for DateRangePicker. */
export function getDateRangePresets(): DatePreset[] {
  const today = startOfDay(new Date());

  return [
    {
      label: 'Today',
      range: { from: today, to: today },
    },
    {
      label: 'Yesterday',
      range: { from: subDays(today, 1), to: subDays(today, 1) },
    },
    {
      label: 'Last 7 Days',
      range: { from: subDays(today, 6), to: today },
    },
    {
      label: 'Last 30 Days',
      range: { from: subDays(today, 29), to: today },
    },
    {
      label: 'This Month',
      range: { from: startOfMonth(today), to: endOfMonth(today) },
    },
    {
      label: 'Last Month',
      range: {
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      },
    },
  ];
}
