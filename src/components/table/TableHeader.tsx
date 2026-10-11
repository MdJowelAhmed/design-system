import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { TableHeaderProps } from './Table.types';

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        'border-b border-neutral-200 bg-neutral-50/80 font-semibold text-neutral-700 backdrop-blur-xs dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300',
        className,
      )}
      {...props}
    >
      {children}
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';
