import { useCallback } from 'react';
import {
  validateFile,
  type FileValidationOptions,
  type ValidationError,
} from '../utils/validateFile';

export function useFileValidation(options: FileValidationOptions = {}) {
  const validate = useCallback(
    (files: File[]): { validFiles: File[]; errors: ValidationError[] } => {
      const validFiles: File[] = [];
      const errors: ValidationError[] = [];

      const { maxFiles, existingFiles = [] } = options;

      if (maxFiles && existingFiles.length + files.length > maxFiles) {
        errors.push({
          type: 'maxFiles',
          message: `Cannot add more than ${maxFiles} files in total.`,
        });
      }

      for (const file of files) {
        const error = validateFile(file, options);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      }

      return { validFiles, errors };
    },
    [options],
  );

  return { validate };
}
