import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from './index';

describe('Card Component System', () => {
  it('renders complete compound card with title, content, footer, media, and action', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>View your analytics</CardDescription>
          <CardAction>
            <Button size="sm" variant="ghost">
              ...
            </Button>
          </CardAction>
        </CardHeader>
        <CardMedia src="https://example.com/banner.png" alt="Card banner" />
        <CardContent>Main content area</CardContent>
        <CardFooter>
          <Button>View Details</Button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    expect(screen.getByText('View your analytics')).toBeInTheDocument();
    expect(screen.getByAltText('Card banner')).toBeInTheDocument();
    expect(screen.getByText('Main content area')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'View Details' }),
    ).toBeInTheDocument();
  });

  it('applies variant and size classes correctly', () => {
    render(
      <Card variant="outlined" size="lg" radius="xl" data-testid="styled-card">
        <CardContent>Styled Card</CardContent>
      </Card>,
    );

    const card = screen.getByTestId('styled-card');
    expect(card.className).toContain('border-neutral-300');
    expect(card.className).toContain('p-8');
    expect(card.className).toContain('rounded-3xl');
  });

  it('handles clickable state and keyboard navigation (Enter & Space)', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick} data-testid="clickable-card">
        <CardContent>Clickable Content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId('clickable-card');
    expect(card.getAttribute('role')).toBe('button');
    expect(card.getAttribute('tabindex')).toBe('0');

    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(card, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('handles loading state with aria-busy and inert children', () => {
    render(
      <Card loading data-testid="loading-card">
        <CardContent>Loading content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId('loading-card');
    expect(card.getAttribute('aria-busy')).toBe('true');
    // The status role live region announces loading to screen readers
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading card content')).toBeInTheDocument();
    // Children wrapper is `inert` — removes occluded subtree from a11y tree and axe checks
    const childrenWrapper = card.querySelector('[inert]');
    expect(childrenWrapper).toBeInTheDocument();
  });

  it('handles disabled state with aria-disabled', () => {
    const handleClick = vi.fn();
    render(
      <Card
        clickable
        disabled
        onClick={handleClick}
        data-testid="disabled-card"
      >
        <CardContent>Disabled Content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId('disabled-card');
    expect(card.getAttribute('aria-disabled')).toBe('true');
    expect(card.className).toContain('pointer-events-none');

    fireEvent.click(card);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
