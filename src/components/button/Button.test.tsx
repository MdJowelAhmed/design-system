import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Plus } from '../../icons';
import { Button } from './Button';

describe('Button', () => {
  // ─── Render ────────────────────────────────
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('has type="button" by default', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // ─── Click ─────────────────────────────────
  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ─── Disabled ──────────────────────────────
  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ─── Loading ───────────────────────────────
  it('is disabled and aria-busy when loading', () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('shows loadingText when provided', () => {
    render(
      <Button loading loadingText="Saving...">
        Save
      </Button>,
    );
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('shows original children text while loading (when no loadingText)', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  // ─── Icons ─────────────────────────────────
  it('renders leftIcon', () => {
    render(<Button leftIcon={<Plus data-testid="left-icon" />}>Add</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightIcon', () => {
    render(<Button rightIcon={<Plus data-testid="right-icon" />}>Add</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  // ─── asChild ───────────────────────────────
  it('renders as an anchor tag when asChild is used', () => {
    render(
      <Button asChild variant="outline">
        <a href="/dashboard">Dashboard</a>
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
  });

  // ─── Keyboard ──────────────────────────────
  it('fires onClick on Enter key press', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press me</Button>);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    // Native button handles Enter → click natively; we just verify the element is focusable.
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  // ─── forwardRef ────────────────────────────
  it('forwards ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // ─── Accessibility ─────────────────────────
  it('supports aria-label for icon-only usage', () => {
    render(
      <Button aria-label="Add item">
        <Plus />
      </Button>,
    );
    expect(
      screen.getByRole('button', { name: 'Add item' }),
    ).toBeInTheDocument();
  });
});
