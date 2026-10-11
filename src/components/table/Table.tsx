import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../utils';
import { tableVariants } from './Table.styles';
import type { TableProps } from './Table.types';

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = 'default',
      size = 'md',
      responsive = true,
      fullWidth = true,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'table';

    const tableElement = (
      <Component
        ref={ref}
        className={cn(
          tableVariants({ variant, size, className }),
          !fullWidth && 'w-auto',
        )}
        {...props}
      >
        {children}
      </Component>
    );

    if (responsive) {
      return (
        <div className="relative w-full overflow-x-auto rounded-xl border border-neutral-200 shadow-xs dark:border-neutral-800">
          {tableElement}
        </div>
      );
    }

    return tableElement;
  },
);

Table.displayName = 'Table';
