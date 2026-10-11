import { forwardRef } from 'react';
import type { UploadFileItem } from './FileUploader.types';
import { getFileIcon } from './utils/getFileIcon';
import { cn } from '../../utils';

export interface FilePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  file: UploadFileItem;
}

export const FilePreview = forwardRef<HTMLDivElement, FilePreviewProps>(
  ({ file, className, ...props }, ref) => {
    const IconComponent = getFileIcon(file);

    if (file.previewUrl) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800',
            className,
          )}
          {...props}
        >
          <img
            src={file.previewUrl}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300',
          className,
        )}
        {...props}
      >
        <IconComponent className="h-5 w-5" />
      </div>
    );
  },
);

FilePreview.displayName = 'FilePreview';
