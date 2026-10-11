import { forwardRef } from 'react';
import { Inbox } from '../../icons/set';
import { cn } from '../../utils';
import { Heading, Text } from '../typography';
import type { TableEmptyProps } from './Table.types';

export const TableEmpty = forwardRef<HTMLTableCellElement, TableEmptyProps>(
  (
    {
      title = 'No Data',
      description = 'There is no data available.',
      icon,
      colSpan = 100,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <tr>
        <td
          ref={ref}
          colSpan={colSpan}
          className={cn('py-12 text-center align-middle', className)}
          {...props}
        >
          <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-2">
            {icon ?? (
              <div className="mb-1 rounded-full bg-neutral-100 p-3 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
                <Inbox className="h-6 w-6" />
              </div>
            )}
            {typeof title === 'string' ? (
              <Heading level={4} size="md" weight="semibold">
                {title}
              </Heading>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <Text size="sm" color="muted" align="center">
                {description}
              </Text>
            ) : (
              description
            )}
            {children}
          </div>
        </td>
      </tr>
    );
  },
);

TableEmpty.displayName = 'TableEmpty';
