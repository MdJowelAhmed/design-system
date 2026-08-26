import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  FileDropzone,
  FileError,
  FileInput,
  FileItem,
  FileList,
  FileUploader,
  type UploadFileItem,
} from './index';

const meta: Meta<typeof FileUploader> = {
  title: 'Components/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof FileUploader> = {
  render: () => {
    const [files, setFiles] = useState<UploadFileItem[]>([]);

    return (
      <div className="w-[500px]">
        <FileUploader
          files={files}
          onFilesChange={setFiles}
          maxSize={5 * 1024 * 1024} // 5MB
          maxFiles={5}
          accept={['image/*', 'application/pdf']}
        >
          <FileDropzone />
          <FileInput />
          <FileError />
          <FileList>
            {files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
          </FileList>
        </FileUploader>
      </div>
    );
  },
};

export const Variants: StoryObj<typeof FileUploader> = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-6">
      <div>
        <h4 className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          Default Dashed
        </h4>
        <FileUploader variant="default">
          <FileDropzone />
          <FileInput />
        </FileUploader>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          Outlined Solid
        </h4>
        <FileUploader variant="outlined">
          <FileDropzone />
          <FileInput />
        </FileUploader>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          Filled Background
        </h4>
        <FileUploader variant="filled">
          <FileDropzone />
          <FileInput />
        </FileUploader>
      </div>
    </div>
  ),
};

export const MockUploadProgress: StoryObj<typeof FileUploader> = {
  render: () => {
    const mockFiles: UploadFileItem[] = [
      {
        id: '1',
        file: new File([], 'dashboard_wireframe.png', { type: 'image/png' }),
        name: 'dashboard_wireframe.png',
        size: 2.4 * 1024 * 1024,
        type: 'image/png',
        status: 'success',
        progress: 100,
      },
      {
        id: '2',
        file: new File([], 'annual_report_2026.pdf', {
          type: 'application/pdf',
        }),
        name: 'annual_report_2026.pdf',
        size: 5.8 * 1024 * 1024,
        type: 'application/pdf',
        status: 'uploading',
        progress: 65,
      },
      {
        id: '3',
        file: new File([], 'video_recording.mp4', { type: 'video/mp4' }),
        name: 'video_recording.mp4',
        size: 45 * 1024 * 1024,
        type: 'video/mp4',
        status: 'error',
        progress: 30,
        error: 'Connection interrupted. Click retry.',
      },
    ];

    return (
      <div className="w-[500px]">
        <FileUploader files={mockFiles}>
          <FileDropzone />
          <FileList>
            {mockFiles.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
          </FileList>
        </FileUploader>
      </div>
    );
  },
};
