import { forwardRef } from 'react';
import type { FileStatus } from './FileUploader.types';
import { Progress } from '../progress';
import { cn } from '../../utils';

export interface FileProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: FileStatus;
  progress?: number;
  error?: string;
}

export const FileProgress = forwardRef<HTMLDivElement, FileProgressProps>(
  ({ status = 'idle', progress = 0, error, className, ...props }, ref) => {
    if (status === 'error') {
      return (
        <p className="text-danger-700 dark:text-danger-400 mt-1 text-xs font-medium">
          {error ?? 'Upload failed'}
        </p>
      );
    }

    if (status === 'uploading') {
      return (
        <div ref={ref} className={cn('mt-1.5 space-y-1', className)} {...props}>
          <Progress
            value={progress}
            aria-label={`Upload progress: ${Math.round(progress)}%`}
            className="h-1.5"
          />
          <div className="flex justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      );
    }

    return null;
  },
);

FileProgress.displayName = 'FileProgress';
