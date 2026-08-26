'use client';

import { forwardRef } from 'react';
import { FileActions } from './FileActions';
import { FilePreview } from './FilePreview';
import { FileProgress } from './FileProgress';
import { fileItemVariants } from './FileUploader.styles';
import type { UploadFileItem } from './FileUploader.types';
import { formatFileSize } from './utils/formatFileSize';
import { cn } from '../../utils';

export interface FileItemProps extends React.HTMLAttributes<HTMLDivElement> {
  file: UploadFileItem;
  onRemove?: () => void;
}

export const FileItem = forwardRef<HTMLDivElement, FileItemProps>(
  ({ file, onRemove, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(fileItemVariants({ status: file.status, className }))}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <FilePreview file={file} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {file.name}
                </p>
                <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <FileProgress
                status={file.status}
                progress={file.progress}
                error={file.error}
              />
            </div>
            <FileActions file={file} onRemove={onRemove} />
          </>
        )}
      </div>
    );
  },
);

FileItem.displayName = 'FileItem';
