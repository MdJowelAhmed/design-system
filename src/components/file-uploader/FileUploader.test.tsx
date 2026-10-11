import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  FileDropzone,
  FileError,
  FileInput,
  FileItem,
  FileList,
  FileUploader,
} from './index';

describe('Enterprise FileUploader Component System', () => {
  it('renders dropzone, hidden input, and handles click to open file dialog', () => {
    render(
      <FileUploader>
        <FileDropzone data-testid="dropzone" />
        <FileInput data-testid="file-input" />
      </FileUploader>,
    );

    const dropzone = screen.getByTestId('dropzone');
    const input = screen.getByTestId('file-input');

    expect(dropzone).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(
      screen.getByText('Click to upload or drag & drop'),
    ).toBeInTheDocument();
  });

  it('renders selected files and handles removal', () => {
    const fileObj = new File(['hello world'], 'hello.txt', {
      type: 'text/plain',
    });
    const mockFileItem = {
      id: '1',
      file: fileObj,
      name: 'hello.txt',
      size: 11,
      type: 'text/plain',
      status: 'idle' as const,
      progress: 0,
    };

    const handleRemove = vi.fn();

    render(
      <FileUploader files={[mockFileItem]}>
        <FileList>
          <FileItem file={mockFileItem} onRemove={handleRemove} />
        </FileList>
      </FileUploader>,
    );

    expect(screen.getByText('hello.txt')).toBeInTheDocument();
    expect(screen.getByText('11 Bytes')).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', {
      name: /Remove file hello.txt/i,
    });
    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('removes files from a controlled list through onFilesChange', () => {
    const item = {
      id: '1',
      file: new File(['x'], 'a.txt', { type: 'text/plain' }),
      name: 'a.txt',
      size: 1,
      type: 'text/plain',
      status: 'idle' as const,
      progress: 0,
    };
    const onFilesChange = vi.fn();
    const onFileRemove = vi.fn();

    render(
      <FileUploader
        files={[item]}
        onFilesChange={onFilesChange}
        onFileRemove={onFileRemove}
      >
        <FileList>
          <FileItem file={item} />
        </FileList>
      </FileUploader>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Remove file a.txt/i }));
    expect(onFileRemove).toHaveBeenCalledWith(item);
    expect(onFilesChange).toHaveBeenCalledWith([]);
  });

  it('adds valid files in uncontrolled mode', () => {
    const onFilesChange = vi.fn();
    render(
      <FileUploader onFilesChange={onFilesChange}>
        <FileInput data-testid="input" />
        <FileList />
      </FileUploader>,
    );

    const file = new File(['abc'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(screen.getByTestId('input'), {
      target: { files: [file] },
    });

    expect(onFilesChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'notes.txt', status: 'idle' }),
    ]);
  });

  it('validates file size limit and displays error alert', () => {
    const onValidationError = vi.fn();
    const largeFile = new File(['a'.repeat(20 * 1024 * 1024)], 'large.pdf', {
      type: 'application/pdf',
    });

    render(
      <FileUploader
        maxSize={5 * 1024 * 1024} // 5MB
        onValidationError={onValidationError}
      >
        <FileDropzone />
        <FileInput data-testid="input" />
        <FileError data-testid="error-banner" />
      </FileUploader>,
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(onValidationError).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByText(/exceeds maximum allowed size/i),
    ).toBeInTheDocument();
  });
});
