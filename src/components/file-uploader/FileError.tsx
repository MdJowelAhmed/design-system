import { forwardRef } from 'react';
import { AlertCircle, X } from '../../icons/set';
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
          'border-danger-200 bg-danger-50 text-danger-800 dark:border-danger-900/50 dark:bg-danger-950/40 dark:text-danger-300 mt-3 flex items-start justify-between gap-3 rounded-xl border p-3 text-xs',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="text-danger-700 dark:text-danger-400 mt-0.5 h-4 w-4 shrink-0" />
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
          className="text-danger-700 hover:bg-danger-100 dark:text-danger-400 dark:hover:bg-danger-900/50"
        >
          <X className="h-3.5 w-3.5" />
        </IconButton>
      </div>
    );
  },
);

FileError.displayName = 'FileError';
