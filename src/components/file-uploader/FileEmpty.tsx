'use client';

import { forwardRef } from 'react';
import { useFileUploaderContext } from './FileUploader';
import { cn } from '../../utils';

export type FileEmptyProps = React.HTMLAttributes<HTMLDivElement>;

export const FileEmpty = forwardRef<HTMLDivElement, FileEmptyProps>(
  ({ className, children, ...props }, ref) => {
    const { files } = useFileUploaderContext();

    if (files.length > 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'py-4 text-center text-xs text-neutral-500 dark:text-neutral-400',
          className,
        )}
        {...props}
      >
        {children ?? 'No files selected yet.'}
      </div>
    );
  },
);

FileEmpty.displayName = 'FileEmpty';
