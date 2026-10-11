import { cn } from '../../utils';
import { dayVariants } from './DatePicker.styles';
import {
  isDateDisabled,
  isDateInRange,
  isRangeEnd,
  isRangeStart,
  isSameDay,
  type DateRange,
  type DateRestrictionOptions,
} from './utils/dateUtils';

export interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  selectedDate?: Date | null;
  selectedRange?: DateRange | null;
  focusedDate?: Date | null;
  restrictions?: DateRestrictionOptions;
  mode?: 'single' | 'range';
  onClick?: (date: Date) => void;
  onMouseEnter?: (date: Date) => void;
}

export function CalendarDay({
  date,
  isCurrentMonth,
  selectedDate,
  selectedRange,
  focusedDate,
  restrictions,
  mode = 'single',
  onClick,
  onMouseEnter,
}: CalendarDayProps) {
  const isDisabled = isDateDisabled(date, restrictions);
  const isToday = isSameDay(date, new Date());
  const isFocused = isSameDay(date, focusedDate);

  let status:
    | 'normal'
    | 'today'
    | 'selected'
    | 'rangeStart'
    | 'rangeEnd'
    | 'inRange'
    | 'disabled'
    | 'outsideMonth' = 'normal';

  if (isDisabled) {
    status = 'disabled';
  } else if (mode === 'single') {
    if (isSameDay(date, selectedDate)) {
      status = 'selected';
    } else if (!isCurrentMonth) {
      status = 'outsideMonth';
    } else if (isToday) {
      status = 'today';
    }
  } else if (mode === 'range') {
    const isStart = isRangeStart(date, selectedRange?.from);
    const isEnd = isRangeEnd(date, selectedRange?.to);
    const inRange = isDateInRange(date, selectedRange?.from, selectedRange?.to);

    if (isStart && isEnd) {
      status = 'selected';
    } else if (isStart) {
      status = 'rangeStart';
    } else if (isEnd) {
      status = 'rangeEnd';
    } else if (inRange) {
      status = 'inRange';
    } else if (!isCurrentMonth) {
      status = 'outsideMonth';
    } else if (isToday) {
      status = 'today';
    }
  }

  const dayNumber = date.getDate();

  return (
    <button
      type="button"
      tabIndex={-1}
      disabled={isDisabled}
      onClick={() => !isDisabled && onClick?.(date)}
      onMouseEnter={() => !isDisabled && onMouseEnter?.(date)}
      aria-label={date.toDateString()}
      aria-disabled={isDisabled || undefined}
      aria-current={isToday ? 'date' : undefined}
      data-focused={isFocused || undefined}
      className={cn(
        dayVariants({ status }),
        isFocused && 'group-focus-visible:ring-ring group-focus-visible:ring-2',
      )}
    >
      {dayNumber}
    </button>
  );
}

CalendarDay.displayName = 'CalendarDay';
