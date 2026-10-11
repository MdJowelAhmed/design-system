import { ChevronLeft, ChevronRight } from '../../icons/set';
import { IconButton } from '../button';
import { calendarHeaderVariants } from './DatePicker.styles';

export interface CalendarHeaderProps {
  viewDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (monthIndex: number) => void;
  onYearChange: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function CalendarHeader({
  viewDate,
  onPrevMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
}: CalendarHeaderProps) {
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  // Generate range of years for quick dropdown selection
  const yearOptions: number[] = [];
  const startYear = Math.max(1900, currentYear - 100);
  const endYear = currentYear + 50;

  for (let y = startYear; y <= endYear; y++) {
    yearOptions.push(y);
  }

  return (
    <div className={calendarHeaderVariants()}>
      <IconButton
        variant="ghost"
        size="sm"
        aria-label="Previous month"
        onClick={onPrevMonth}
      >
        <ChevronLeft className="h-4 w-4" />
      </IconButton>

      <div className="flex items-center gap-1">
        {/* Month Selector */}
        <select
          value={currentMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          aria-label="Select month"
          className="cursor-pointer rounded-md bg-transparent px-1.5 py-1 text-xs font-semibold text-neutral-800 outline-none hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          {MONTH_NAMES.map((name, index) => (
            <option
              key={name}
              value={index}
              className="bg-white dark:bg-neutral-900"
            >
              {name}
            </option>
          ))}
        </select>

        {/* Year Selector */}
        <select
          value={currentYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          aria-label="Select year"
          className="cursor-pointer rounded-md bg-transparent px-1.5 py-1 text-xs font-semibold text-neutral-800 outline-none hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          {yearOptions.map((year) => (
            <option
              key={year}
              value={year}
              className="bg-white dark:bg-neutral-900"
            >
              {year}
            </option>
          ))}
        </select>
      </div>

      <IconButton
        variant="ghost"
        size="sm"
        aria-label="Next month"
        onClick={onNextMonth}
      >
        <ChevronRight className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

CalendarHeader.displayName = 'CalendarHeader';
