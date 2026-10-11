import { forwardRef } from 'react';
import { cn } from '../../utils';

export type FileListProps = React.HTMLAttributes<HTMLDivElement>;

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 space-y-2', className)} {...props} />
  ),
);

FileList.displayName = 'FileList';
