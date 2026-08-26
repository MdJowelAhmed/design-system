'use client';

import { forwardRef } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useFileUploaderContext } from './FileUploader';
import { IconButton } from '../button';
import { cn } from '../../utils';

export type FileErrorProps = React.HTMLAttributes<HTMLDivElement>;

export const FileError = forwardRef<HTMLDivElement, FileErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { errors, clearErrors } = useFileUploaderContext();

    if (errors.length === 0) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'mt-3 flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700 dark:text-rose-400" />
          <div>
            {children ?? (
              <ul className="list-disc space-y-0.5 pl-4">
                {errors.map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <IconButton
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Dismiss errors"
          onClick={clearErrors}
          className="text-rose-700 hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-900/50"
        >
          <X className="h-3.5 w-3.5" />
        </IconButton>
      </div>
    );
  },
);

FileError.displayName = 'FileError';
