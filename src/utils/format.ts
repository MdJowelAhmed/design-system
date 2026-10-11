/** Locale-aware date/time formatting. For pattern-based formatting (dd/MM/yyyy) use the date-picker `formatDate`. */
export function formatDateTime(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
  locale = 'en-US',
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(locale, options).format(d);
}

export function formatNumber(
  num: number,
  options?: Intl.NumberFormatOptions,
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
