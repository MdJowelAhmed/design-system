import { cva } from 'class-variance-authority';

export const dropzoneVariants = cva(
  'relative flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  {
    variants: {
      variant: {
        default:
          'border-2 border-dashed border-neutral-300 bg-neutral-50/50 hover:bg-neutral-100/80 hover:border-primary-500 dark:border-neutral-700 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/80 dark:hover:border-primary-400 rounded-2xl',
        outlined:
          'border border-solid border-neutral-300 bg-white hover:border-primary-500 hover:shadow-xs dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-primary-400 rounded-2xl',
        filled:
          'border border-transparent bg-neutral-100/80 hover:bg-neutral-200/80 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 rounded-2xl',
        ghost:
          'border border-transparent bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl',
      },
      size: {
        sm: 'p-4 gap-2 text-xs',
        md: 'p-6 gap-3 text-sm',
        lg: 'p-8 gap-4 text-base',
      },
      isDragging: {
        true: 'border-primary-500 bg-primary-50/50 ring-2 ring-primary-500/20 dark:border-primary-400 dark:bg-primary-950/30',
      },
      disabled: {
        true: 'pointer-events-none opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export const fileItemVariants = cva(
  'flex items-center gap-3 p-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-2xs transition-all dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50',
  {
    variants: {
      status: {
        idle: 'border-neutral-200 dark:border-neutral-800',
        uploading: 'border-primary-300 dark:border-primary-800',
        success: 'border-success-300 dark:border-success-800',
        error:
          'border-danger-300 bg-danger-50/30 dark:border-danger-800 dark:bg-danger-950/20',
      },
    },
    defaultVariants: {
      status: 'idle',
    },
  },
);
