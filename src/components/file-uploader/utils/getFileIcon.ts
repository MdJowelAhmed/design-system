import {
  Archive,
  File,
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
} from '../../../icons/set';

export type FileCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'archive'
  | 'code'
  | 'spreadsheet'
  | 'text'
  | 'document';

export function getFileCategory(
  file: File | { name: string; type?: string },
): FileCategory {
  const type = file.type || '';
  const ext = file.name.split('.').pop()?.toLowerCase() || '';

  if (
    type.startsWith('image/') ||
    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)
  ) {
    return 'image';
  }
  if (
    type.startsWith('video/') ||
    ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)
  ) {
    return 'video';
  }
  if (
    type.startsWith('audio/') ||
    ['mp3', 'wav', 'ogg', 'flac'].includes(ext)
  ) {
    return 'audio';
  }
  if (type === 'application/pdf' || ext === 'pdf') {
    return 'pdf';
  }
  if (
    ['zip', 'rar', 'tar', 'gz', '7z'].includes(ext) ||
    type.includes('zip') ||
    type.includes('archive')
  ) {
    return 'archive';
  }
  if (
    [
      'js',
      'ts',
      'tsx',
      'jsx',
      'html',
      'css',
      'json',
      'py',
      'go',
      'rs',
      'java',
      'cpp',
    ].includes(ext)
  ) {
    return 'code';
  }
  if (
    ['xls', 'xlsx', 'csv'].includes(ext) ||
    type.includes('spreadsheet') ||
    type.includes('excel')
  ) {
    return 'spreadsheet';
  }
  if (['txt', 'md', 'doc', 'docx'].includes(ext)) {
    return 'text';
  }
  return 'document';
}

export function getFileIcon(file: File | { name: string; type?: string }) {
  const category = getFileCategory(file);

  switch (category) {
    case 'image':
      return FileImage;
    case 'video':
      return FileVideo;
    case 'audio':
      return FileAudio;
    case 'pdf':
    case 'text':
      return FileText;
    case 'archive':
      return Archive;
    case 'code':
      return FileCode;
    case 'spreadsheet':
      return FileSpreadsheet;
    default:
      return File;
  }
}
