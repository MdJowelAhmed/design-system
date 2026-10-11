import { forwardRef } from 'react';
import { Skeleton } from '../skeleton';
import type { TableLoadingProps } from './Table.types';

export const TableLoading = forwardRef<HTMLTableRowElement, TableLoadingProps>(
  ({ rows = 5, columns = 4, colSpan, className, ...props }, ref) => {
    const rowArray = Array.from({ length: rows });
    const colArray = Array.from({ length: columns });

    return (
      <>
        {rowArray.map((_, rowIndex) => (
          <tr
            key={`loading-row-${rowIndex}`}
            ref={rowIndex === 0 ? ref : undefined}
            className="border-b border-neutral-200 dark:border-neutral-800"
            {...props}
          >
            {colSpan ? (
              <td colSpan={colSpan} className="px-4 py-3">
                <Skeleton className="h-5 w-full rounded-md" />
              </td>
            ) : (
              colArray.map((_, colIndex) => (
                <td key={`loading-col-${colIndex}`} className="px-4 py-3">
                  <Skeleton
                    className={`h-5 rounded-md ${
                      colIndex === 0
                        ? 'w-3/4'
                        : colIndex === columns - 1
                          ? 'w-1/2'
                          : 'w-full'
                    }`}
                  />
                </td>
              ))
            )}
          </tr>
        ))}
      </>
    );
  },
);

TableLoading.displayName = 'TableLoading';
