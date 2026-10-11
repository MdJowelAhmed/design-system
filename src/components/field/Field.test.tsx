import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldCounter, FieldLabel, FieldMessage, FieldRoot } from './Field';

describe('Field', () => {
  it('renders a label with a decorative required marker', () => {
    render(
      <FieldRoot>
        <FieldLabel htmlFor="email" required>
          Email
        </FieldLabel>
        <input id="email" />
      </FieldRoot>,
    );
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows only the highest-priority message', () => {
    render(
      <FieldMessage
        id="msg"
        error="Required"
        warning="Weak"
        helperText="Hint"
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
    expect(screen.queryByText('Weak')).not.toBeInTheDocument();
    expect(screen.queryByText('Hint')).not.toBeInTheDocument();
  });

  it('renders nothing when there is no message', () => {
    const { container } = render(<FieldMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the character counter', () => {
    render(<FieldCounter current={8} max={10} />);
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
  });
});
