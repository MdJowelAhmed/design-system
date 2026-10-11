import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import { Calendar } from './Calendar';
import { formatDate, parseDate, isDateDisabled } from './utils/dateUtils';

describe('Date Utilities', () => {
  it('formats date correctly', () => {
    const d = new Date(2026, 7, 15);
    expect(formatDate(d, 'dd/MM/yyyy')).toBe('15/08/2026');
    expect(formatDate(d, 'yyyy-MM-dd')).toBe('2026-08-15');
  });

  it('parses valid date string correctly', () => {
    const parsed = parseDate('15/08/2026', 'dd/MM/yyyy');
    expect(parsed).not.toBeNull();
    expect(parsed?.getFullYear()).toBe(2026);
    expect(parsed?.getMonth()).toBe(7); // August is 0-indexed month 7
    expect(parsed?.getDate()).toBe(15);
  });

  it('checks date restrictions correctly', () => {
    const past = new Date(2020, 0, 1);
    const future = new Date(2035, 0, 1);

    expect(isDateDisabled(past, { disablePast: true })).toBe(true);
    expect(isDateDisabled(future, { disableFuture: true })).toBe(true);
  });
});

describe('DatePicker', () => {
  it('renders input with label and placeholder', () => {
    render(<DatePicker label="Birth Date" placeholder="DD/MM/YYYY" />);
    expect(screen.getByLabelText('Birth Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument();
  });

  it('displays initial defaultValue correctly formatted', () => {
    const date = new Date(2026, 7, 15);
    render(<DatePicker label="Date" defaultValue={date} format="dd/MM/yyyy" />);
    expect(screen.getByLabelText('Date')).toHaveValue('15/08/2026');
  });

  it('parses manually typed input correctly', () => {
    const handleChange = vi.fn();
    render(
      <DatePicker label="Date" onChange={handleChange} format="dd/MM/yyyy" />,
    );
    const input = screen.getByLabelText('Date');

    fireEvent.change(input, { target: { value: '15/08/2026' } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('keeps partially typed text and does not commit incomplete dates', () => {
    const handleChange = vi.fn();
    render(
      <DatePicker label="Date" onChange={handleChange} format="dd/MM/yyyy" />,
    );
    const input = screen.getByLabelText('Date');

    fireEvent.change(input, { target: { value: '15/08/2' } });
    expect(input).toHaveValue('15/08/2');
    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '15/08/2026' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('restores the formatted value on blur after invalid input', () => {
    render(
      <DatePicker
        label="Date"
        defaultValue={new Date(2026, 7, 15)}
        format="dd/MM/yyyy"
      />,
    );
    const input = screen.getByLabelText('Date');

    fireEvent.change(input, { target: { value: '99/99' } });
    expect(input).toHaveValue('99/99');
    fireEvent.blur(input);
    expect(input).toHaveValue('15/08/2026');
  });

  it('disables input when disabled prop is set', () => {
    render(<DatePicker label="Date" disabled />);
    expect(screen.getByLabelText('Date')).toBeDisabled();
  });

  it('clears date when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <DatePicker
        label="Date"
        defaultValue={new Date()}
        onChange={handleChange}
      />,
    );
    const clearBtn = screen.getByRole('button', { name: /clear input/i });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith(null);
  });
});

describe('DateRangePicker', () => {
  it('renders with range label', () => {
    render(<DateRangePicker label="Travel Dates" />);
    expect(screen.getByLabelText('Travel Dates')).toBeInTheDocument();
  });
});

describe('Standalone Calendar', () => {
  it('renders days grid', () => {
    render(<Calendar defaultViewDate={new Date(2026, 7, 15)} />);
    expect(
      screen.getByRole('region', { name: 'Calendar' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('fires onSelect when a day is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <Calendar
        defaultViewDate={new Date(2026, 7, 15)}
        onSelect={handleSelect}
      />,
    );
    const dayBtn = screen.getByRole('button', { name: /15/i });
    fireEvent.click(dayBtn);
    expect(handleSelect).toHaveBeenCalledWith(expect.any(Date));
  });

  it('moves focus with arrow keys and only selects on Enter', () => {
    const handleSelect = vi.fn();
    render(
      <Calendar selected={new Date(2026, 7, 15)} onSelect={handleSelect} />,
    );
    const calendar = screen.getByRole('region', { name: 'Calendar' });

    fireEvent.keyDown(calendar, { key: 'ArrowRight' });
    fireEvent.keyDown(calendar, { key: 'ArrowRight' });
    expect(handleSelect).not.toHaveBeenCalled();

    fireEvent.keyDown(calendar, { key: 'Enter' });
    expect(handleSelect).toHaveBeenCalledWith(new Date(2026, 7, 17));
  });
});
