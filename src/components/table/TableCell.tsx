import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { TableCellProps } from './Table.types';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      align = 'left',
      numeric = false,
      truncate = false,
      wrap = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <td
        ref={ref}
        className={cn(
          'align-middle transition-colors',
          align === 'left' && 'text-left',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          numeric && 'font-mono tabular-nums',
          truncate && 'max-w-[200px] truncate',
          !wrap && 'whitespace-nowrap',
          className,
        )}
        {...props}
      >
        {children}
      </td>
    );
  },
);

TableCell.displayName = 'TableCell';
