import { forwardRef } from 'react';
import { useFileUploaderContext } from './FileUploader';
import { mergeRefs } from '../../utils';

export type FileInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
>;

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, ...props }, ref) => {
    const { multiple, disabled, accept, addFiles, inputRef } =
      useFileUploaderContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        addFiles(selectedFiles);
      }
      onChange?.(e);
      // Reset value so same file can be selected again
      e.target.value = '';
    };

    const formattedAccept = Array.isArray(accept) ? accept.join(',') : accept;

    return (
      <input
        ref={mergeRefs(inputRef, ref)}
        type="file"
        multiple={multiple}
        disabled={disabled}
        accept={formattedAccept}
        className="sr-only hidden"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleChange}
        {...props}
      />
    );
  },
);

FileInput.displayName = 'FileInput';
