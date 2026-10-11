import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './index';

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'vue', label: 'Vue.js', disabled: true },
];

const open = () => fireEvent.click(screen.getByRole('combobox'));

describe('Combobox', () => {
  it('renders the placeholder and opens a listbox of options', () => {
    render(<Combobox options={frameworks} placeholder="Select framework..." />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Select framework...');

    open();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('filters options by label', () => {
    render(<Combobox options={frameworks} />);
    open();
    fireEvent.change(screen.getByPlaceholderText('Search options...'), {
      target: { value: 'Svelte' },
    });

    expect(screen.getByText('SvelteKit')).toBeInTheDocument();
    expect(screen.queryByText('Next.js')).not.toBeInTheDocument();
  });

  it('selects an option with the keyboard and closes', () => {
    const onChange = vi.fn();
    render(<Combobox options={frameworks} onChange={onChange} />);
    open();

    const input = screen.getByPlaceholderText('Search options...');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('svelte');
    expect(screen.getByRole('combobox')).toHaveTextContent('SvelteKit');
  });

  it('does not select disabled options', () => {
    const onChange = vi.fn();
    render(<Combobox options={frameworks} onChange={onChange} />);
    open();
    fireEvent.click(screen.getByText('Vue.js'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
