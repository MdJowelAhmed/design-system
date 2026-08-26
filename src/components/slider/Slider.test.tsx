import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders slider element correctly', () => {
    const { container } = render(
      <Slider defaultValue={[50]} max={100} step={1} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('provides accessible name on slider thumb', () => {
    const { getByRole } = render(
      <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />,
    );
    expect(getByRole('slider')).toHaveAttribute('aria-label', 'Volume');
  });
});
