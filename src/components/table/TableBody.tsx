import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { TableBodyProps } from './Table.types';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          'divide-y divide-neutral-200 dark:divide-neutral-800',
          className,
        )}
        {...props}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';
