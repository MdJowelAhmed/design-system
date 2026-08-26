'use client';

import { forwardRef } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { useFileUploaderContext } from './FileUploader';
import type { UploadFileItem } from './FileUploader.types';
import { IconButton } from '../button';
import { cn } from '../../utils';

export interface FileActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  file: UploadFileItem;
  onRemove?: () => void;
}

export const FileActions = forwardRef<HTMLDivElement, FileActionsProps>(
  ({ file, onRemove, className, ...props }, ref) => {
    const { removeFile, disabled } = useFileUploaderContext();

    const handleRemove = () => {
      if (onRemove) {
        onRemove();
      } else {
        removeFile(file.id);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex shrink-0 items-center gap-1', className)}
        {...props}
      >
        {file.status === 'success' && (
          <span title="Upload complete">
            <CheckCircle2
              className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          </span>
        )}

        <IconButton
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          aria-label={`Remove file ${file.name}`}
          onClick={handleRemove}
          className="text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400"
        >
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>
    );
  },
);

FileActions.displayName = 'FileActions';
