import { forwardRef } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { cn } from '../../utils';
import { tableRowVariants } from './Table.styles';
import type { TableRowProps } from './Table.types';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      hoverable = true,
      selected = false,
      clickable = false,
      disabled = false,
      className,
      onClick,
      onKeyDown,
      children,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
      if (clickable && !disabled && (e.key === 'Enter' || e.key === ' ')) {
        if (e.key === ' ') {
          e.preventDefault();
        }
        onClick?.(e as unknown as MouseEvent<HTMLTableRowElement>);
      }
      onKeyDown?.(e);
    };

    return (
      <tr
        ref={ref}
        tabIndex={clickable && !disabled ? 0 : undefined}
        aria-selected={selected || undefined}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          tableRowVariants({
            hoverable,
            selected,
            clickable,
            disabled,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';
