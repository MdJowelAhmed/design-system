import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Plus } from '../../icons';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders with an accessible label', () => {
    render(
      <IconButton aria-label="Add item">
        <Plus />
      </IconButton>,
    );
    expect(
      screen.getByRole('button', { name: 'Add item' }),
    ).toBeInTheDocument();
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <IconButton aria-label="Add item" onClick={handleClick}>
        <Plus />
      </IconButton>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is set', () => {
    render(
      <IconButton aria-label="Add item" disabled>
        <Plus />
      </IconButton>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled and aria-busy when loading', () => {
    render(
      <IconButton aria-label="Saving" loading>
        <Plus />
      </IconButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('forwards ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <IconButton ref={ref} aria-label="Add">
        <Plus />
      </IconButton>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
