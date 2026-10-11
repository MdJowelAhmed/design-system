import type { FocusEvent } from 'react';
import type { DateRange, DateRestrictionOptions } from './utils/dateUtils';

// ─────────────────────────────────────────────
// Shared Picker Props
// ─────────────────────────────────────────────
export interface BasePickerProps extends DateRestrictionOptions {
  /** Label above the picker */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Warning message */
  warning?: string;
  /** Success message */
  success?: string;
  /** Show required asterisk */
  required?: boolean;

  /** Placeholder text */
  placeholder?: string;
  /** Date format pattern e.g. "dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd", "MMM dd, yyyy" */
  format?: string;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Border/background variant */
  variant?: 'outlined' | 'filled' | 'ghost' | 'underlined';
  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Take full container width */
  fullWidth?: boolean;

  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readOnly?: boolean;
  /** Loading state */
  loading?: boolean;

  /** Custom clear button */
  clearable?: boolean;

  /** Custom class name on container */
  className?: string;
  id?: string;
  /** Form field name (useful with react-hook-form) */
  name?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

// ─────────────────────────────────────────────
// Single DatePicker Props
// ─────────────────────────────────────────────
export interface DatePickerProps extends BasePickerProps {
  /** Selected date (Controlled) */
  value?: Date | null;
  /** Initial selected date (Uncontrolled) */
  defaultValue?: Date | null;
  /** Callback fired when a date is selected or cleared */
  onChange?: (date: Date | null) => void;
  /** Show Today button inside calendar footer */
  showTodayButton?: boolean;
  /** Show Clear button inside calendar footer */
  showClearButton?: boolean;
}

// ─────────────────────────────────────────────
// DateRangePicker Props
// ─────────────────────────────────────────────
export interface DateRangePickerProps extends BasePickerProps {
  /** Selected date range (Controlled) */
  value?: DateRange | null;
  /** Initial selected date range (Uncontrolled) */
  defaultValue?: DateRange | null;
  /** Callback fired when range changes */
  onChange?: (range: DateRange | null) => void;
  /** Show quick preset buttons sidebar (Today, Yesterday, Last 7 Days, etc.) */
  showPresets?: boolean;
}

// ─────────────────────────────────────────────
// Standalone Calendar Props
// ─────────────────────────────────────────────
export interface CalendarProps extends DateRestrictionOptions {
  mode?: 'single' | 'range';

  /** Selected date for single mode */
  selected?: Date | null;
  /** Selected range for range mode */
  selectedRange?: DateRange | null;

  /** Single selection callback */
  onSelect?: (date: Date) => void;
  /** Range selection callback */
  onRangeSelect?: (range: DateRange) => void;

  /** Initial view date (month/year displayed) */
  defaultViewDate?: Date;

  /** Show Today button at bottom */
  showTodayButton?: boolean;
  /** Show Clear button at bottom */
  showClearButton?: boolean;
  onClear?: () => void;

  className?: string;
}
