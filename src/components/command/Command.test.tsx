import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './index';

const Palette = ({
  onSelect = () => {},
}: {
  onSelect?: (v: string) => void;
}) => (
  <>
    <CommandInput placeholder="Type a command..." />
    <CommandList>
      <CommandEmpty>No results.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem onSelect={onSelect}>Calendar</CommandItem>
        <CommandItem onSelect={onSelect}>Search Emoji</CommandItem>
      </CommandGroup>
    </CommandList>
  </>
);

describe('Command', () => {
  it('filters items by the search query', () => {
    render(
      <Command>
        <Palette />
      </Command>,
    );

    fireEvent.change(screen.getByPlaceholderText('Type a command...'), {
      target: { value: 'emoji' },
    });

    expect(screen.getByText('Search Emoji')).toBeInTheDocument();
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(
      <Command>
        <Palette />
      </Command>,
    );

    fireEvent.change(screen.getByPlaceholderText('Type a command...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('exposes options and selects with the keyboard', () => {
    const onSelect = vi.fn();
    render(
      <Command>
        <Palette onSelect={onSelect} />
      </Command>,
    );

    expect(screen.getAllByRole('option')).toHaveLength(2);
    const input = screen.getByPlaceholderText('Type a command...');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('Search Emoji');
  });

  it('renders inside a dialog when open', () => {
    render(
      <CommandDialog open>
        <Palette />
      </CommandDialog>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });
});
