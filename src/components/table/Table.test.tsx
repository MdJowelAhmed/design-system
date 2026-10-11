import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Badge } from '../badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
} from './index';

describe('Presentation Table Component System', () => {
  it('renders complete table structure with headers, rows, cells, footer and caption', () => {
    render(
      <Table>
        <TableCaption>Monthly Financial Report</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead align="right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell align="right" numeric>
              $250.00
            </TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right" numeric>
              $250.00
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByText('Monthly Financial Report')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('$250.00')).toHaveLength(2);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders sortable header with aria-sort attribute', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const head = screen.getByText('Name').closest('th');
    expect(head?.getAttribute('aria-sort')).toBe('ascending');
  });

  it('handles row selection and clickable keyboard events', () => {
    const handleClick = vi.fn();
    render(
      <Table>
        <TableBody>
          <TableRow
            selected
            clickable
            onClick={handleClick}
            data-testid="test-row"
          >
            <TableCell>Row Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const row = screen.getByTestId('test-row');
    expect(row.getAttribute('aria-selected')).toBe('true');
    expect(row.getAttribute('tabindex')).toBe('0');

    fireEvent.click(row);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(row, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('renders empty state correctly using TableEmpty', () => {
    render(
      <Table>
        <TableBody>
          <TableEmpty
            title="No Users Found"
            description="Try clearing filters."
          />
        </TableBody>
      </Table>,
    );

    expect(screen.getByText('No Users Found')).toBeInTheDocument();
    expect(screen.getByText('Try clearing filters.')).toBeInTheDocument();
  });

  it('renders loading skeletons using TableLoading', () => {
    render(
      <Table>
        <TableBody data-testid="loading-body">
          <TableLoading rows={3} columns={4} />
        </TableBody>
      </Table>,
    );

    const body = screen.getByTestId('loading-body');
    expect(body.querySelectorAll('tr')).toHaveLength(3);
    expect(body.querySelectorAll('td')).toHaveLength(12);
  });
});
