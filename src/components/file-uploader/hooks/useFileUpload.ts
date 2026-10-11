import { useCallback, useEffect, useRef, useState } from 'react';
import { generatePreviewUrl, revokePreviewUrl } from '../utils/generatePreview';
import type { UploadFileItem } from '../FileUploader.types';

let fileCounter = 0;
const createFileId = (file: File) =>
  `${file.name}-${file.size}-${Date.now().toString(36)}-${++fileCounter}`;

interface UseFileUploadOptions {
  /** Controlled file list. When provided, the parent owns state via `onFilesChange`. */
  files?: UploadFileItem[];
  onFilesChange?: (files: UploadFileItem[]) => void;
  onFileRemove?: (file: UploadFileItem) => void;
}

export function useFileUpload({
  files: controlledFiles,
  onFilesChange,
  onFileRemove,
}: UseFileUploadOptions = {}) {
  const [internalFiles, setInternalFiles] = useState<UploadFileItem[]>([]);
  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles : internalFiles;

  // Uncontrolled previews belong to this hook and must be released on unmount.
  const ownedPreviews = useRef(new Set<string>());

  const commit = useCallback(
    (next: UploadFileItem[]) => {
      if (!isControlled) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [isControlled, onFilesChange],
  );

  const release = useCallback((item: UploadFileItem) => {
    if (!item.previewUrl) return;
    revokePreviewUrl(item.previewUrl);
    ownedPreviews.current.delete(item.previewUrl);
  }, []);

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const items: UploadFileItem[] = newFiles.map((file) => {
        const previewUrl = generatePreviewUrl(file);
        if (previewUrl && !isControlled) ownedPreviews.current.add(previewUrl);
        return {
          id: createFileId(file),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'idle',
          progress: 0,
          previewUrl,
        };
      });
      commit([...files, ...items]);
    },
    [files, isControlled, commit],
  );

  const removeFile = useCallback(
    (id: string) => {
      const target = files.find((f) => f.id === id);
      if (!target) return;
      release(target);
      onFileRemove?.(target);
      commit(files.filter((f) => f.id !== id));
    },
    [files, onFileRemove, commit, release],
  );

  const updateFileStatus = useCallback(
    (id: string, updates: Partial<UploadFileItem>) => {
      commit(
        files.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );
    },
    [files, commit],
  );

  const clearFiles = useCallback(() => {
    files.forEach(release);
    commit([]);
  }, [files, commit, release]);

  useEffect(() => {
    const previews = ownedPreviews.current;
    return () => {
      previews.forEach(revokePreviewUrl);
      previews.clear();
    };
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    updateFileStatus,
    clearFiles,
  };
}
