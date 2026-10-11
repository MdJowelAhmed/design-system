import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { TableCaptionProps } from './Table.types';

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn(
        'mt-3 text-center text-xs text-neutral-500 italic dark:text-neutral-400',
        className,
      )}
      {...props}
    >
      {children}
    </caption>
  );
});

TableCaption.displayName = 'TableCaption';
