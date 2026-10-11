import { describe, expect, it } from 'vitest';
import {
  cn,
  formatCurrency,
  formatDateTime,
  formatNumber,
  mergeRefs,
} from './index';

describe('utils', () => {
  it('formats dates, numbers, and currency', () => {
    expect(formatDateTime(new Date(2026, 0, 15), { dateStyle: 'short' })).toBe(
      '1/15/26',
    );
    expect(formatDateTime('not a date')).toBe('');
    expect(formatNumber(1234567)).toBe('1,234,567');
    expect(formatCurrency(99.9, 'USD')).toBe('$99.90');
  });

  it('merges Tailwind classes, letting later classes win', () => {
    expect(cn('px-2 text-sm', 'px-4', false && 'hidden')).toBe('text-sm px-4');
  });

  it('assigns a value to every ref passed to mergeRefs', () => {
    const objectRef = { current: null as string | null };
    let callbackValue: string | null = null;
    mergeRefs<string>(objectRef, (v) => {
      callbackValue = v;
    })('node');

    expect(objectRef.current).toBe('node');
    expect(callbackValue).toBe('node');
  });
});
