import { forwardRef } from 'react';
import { ChevronDown, ChevronsUpDown, ChevronUp } from '../../icons/set';
import { cn } from '../../utils';
import type { TableHeadProps } from './Table.types';

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      align = 'left',
      sortable = false,
      sortDirection = false,
      scope = 'col',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <th
        ref={ref}
        scope={scope}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
              ? 'descending'
              : undefined
        }
        className={cn(
          'align-middle font-semibold text-neutral-700 transition-colors select-none dark:text-neutral-300',
          align === 'left' && 'text-left',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          sortable &&
            'cursor-pointer hover:text-neutral-900 dark:hover:text-neutral-100',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'inline-flex items-center gap-1.5',
            align === 'center' && 'justify-center',
            align === 'right' && 'justify-end',
          )}
        >
          {children}
          {sortable && (
            <span className="shrink-0 text-neutral-400 dark:text-neutral-500">
              {sortDirection === 'asc' ? (
                <ChevronUp className="text-primary-600 dark:text-primary-400 h-4 w-4" />
              ) : sortDirection === 'desc' ? (
                <ChevronDown className="text-primary-600 dark:text-primary-400 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="h-3.5 w-3.5 opacity-60" />
              )}
            </span>
          )}
        </div>
      </th>
    );
  },
);

TableHead.displayName = 'TableHead';
