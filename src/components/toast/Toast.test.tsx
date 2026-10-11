import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from './useToast';
import type { ToastMessage } from './Toast';

const Trigger = (toast: Omit<ToastMessage, 'id'>) => {
  const { addToast } = useToast();
  return <button onClick={() => addToast(toast)}>Show Toast</button>;
};

const renderWithProvider = (toast: Omit<ToastMessage, 'id'>) =>
  render(
    <ToastProvider>
      <Trigger {...toast} />
    </ToastProvider>,
  );

describe('Toast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a toast when triggered', () => {
    renderWithProvider({
      title: 'Success!',
      description: 'Operation completed',
      variant: 'success',
    });

    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses an assertive alert role for danger toasts', () => {
    renderWithProvider({ title: 'Failed', variant: 'danger' });
    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  });

  it('auto-dismisses after the duration', () => {
    vi.useFakeTimers();
    renderWithProvider({ title: 'Bye', duration: 1000 });
    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Bye')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Bye')).not.toBeInTheDocument();
  });

  it('dismisses manually and clears the pending timer', () => {
    vi.useFakeTimers();
    renderWithProvider({ title: 'Manual' });
    fireEvent.click(screen.getByText('Show Toast'));
    fireEvent.click(screen.getByLabelText('Dismiss notification'));

    expect(screen.queryByText('Manual')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('throws when used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger title="x" />)).toThrow(
      'useToast must be used within a <ToastProvider>',
    );
    spy.mockRestore();
  });
});
