import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders progress bar correctly', () => {
    const { container } = render(<Progress value={60} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('provides default aria-label with percentage', () => {
    const { getByRole } = render(<Progress value={75} />);
    expect(getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      'Progress: 75%',
    );
  });
});
