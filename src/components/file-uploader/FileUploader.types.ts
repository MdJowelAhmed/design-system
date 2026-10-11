import type { HTMLAttributes, ReactNode } from 'react';
import type { ValidationError } from './utils/validateFile';

export type FileUploaderVariant = 'default' | 'outlined' | 'filled' | 'ghost';
export type FileUploaderSize = 'sm' | 'md' | 'lg';
export type FileStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: FileStatus;
  progress: number;
  error?: string;
  previewUrl?: string | null;
}

export interface FileUploaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: FileUploaderVariant;
  size?: FileUploaderSize;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string | string[];
  maxSize?: number; // bytes
  minSize?: number;
  maxFiles?: number;
  allowDuplicates?: boolean;
  files?: UploadFileItem[];
  onFilesChange?: (files: UploadFileItem[]) => void;
  onFileRemove?: (file: UploadFileItem) => void;
  onValidationError?: (errors: ValidationError[]) => void;
  onUpload?: (files: File[]) => Promise<void> | void;
  uploadOnSelect?: boolean;
  children?: ReactNode;
}

export interface FileUploaderContextValue {
  variant: FileUploaderVariant;
  size: FileUploaderSize;
  multiple: boolean;
  disabled: boolean;
  accept?: string | string[];
  maxSize?: number;
  minSize?: number;
  maxFiles?: number;
  files: UploadFileItem[];
  isDragging: boolean;
  errors: ValidationError[];
  openFileDialog: () => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  addFiles: (files: File[]) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}
