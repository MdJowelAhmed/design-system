import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { TableFooterProps } from './Table.types';

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, children, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-neutral-200 bg-neutral-100/70 font-semibold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-800/70 dark:text-neutral-100',
        className,
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
});

TableFooter.displayName = 'TableFooter';
