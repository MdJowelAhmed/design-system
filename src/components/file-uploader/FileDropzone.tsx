'use client';

import { forwardRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { useFileUploaderContext } from './FileUploader';
import { dropzoneVariants } from './FileUploader.styles';
import { cn } from '../../utils';

export interface FileDropzoneProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const FileDropzone = forwardRef<HTMLDivElement, FileDropzoneProps>(
  (
    { className, icon, title, description, children, onClick, ...props },
    ref,
  ) => {
    const { variant, size, disabled, isDragging, openFileDialog } =
      useFileUploaderContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        openFileDialog();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
        className={cn(
          dropzoneVariants({ variant, size, isDragging, disabled, className }),
        )}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <div className="rounded-full bg-neutral-100 p-3 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {icon ?? <UploadCloud className="h-6 w-6" aria-hidden="true" />}
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                {title ?? 'Click to upload or drag & drop'}
              </p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                {description ?? 'SVG, PNG, JPG, PDF or GIF (max 10MB)'}
              </p>
            </div>
          </>
        )}
      </div>
    );
  },
);

FileDropzone.displayName = 'FileDropzone';
