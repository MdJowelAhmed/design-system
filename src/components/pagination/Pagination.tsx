import { forwardRef } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from '../../icons/set';
import { cn } from '../../utils';
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
} from './Pagination.types';

export const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

export const PaginationContent = forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  ),
);
PaginationItem.displayName = 'PaginationItem';

export const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
      isActive &&
        'border border-neutral-200 bg-white font-semibold text-neutral-900 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50',
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

export const PaginationPrevious = ({
  className,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn('w-auto gap-1 px-2.5', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = ({
  className,
  ...props
}: PaginationLinkProps) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn('w-auto gap-1 px-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      'flex h-9 w-9 items-center justify-center text-neutral-500 dark:text-neutral-400',
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
