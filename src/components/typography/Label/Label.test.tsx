import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './Label';

describe('Label Component', () => {
  it('renders label with htmlFor attribute', () => {
    render(<Label htmlFor="email">Email Address</Label>);
    const label = screen.getByText('Email Address');
    expect(label.getAttribute('for')).toBe('email');
  });

  it('renders required indicator star when required is true', () => {
    render(<Label required>Username</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies error styling when error is true', () => {
    render(<Label error>Password</Label>);
    const label = screen.getByText('Password');
    expect(label.className).toContain('text-danger-600');
  });
});
