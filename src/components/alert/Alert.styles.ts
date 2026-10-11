import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-xl border p-4 text-sm transition-colors flex items-start gap-3 shadow-xs',
  {
    variants: {
      variant: {
        info: 'bg-info-50 text-info-900 border-info-200 dark:bg-info-950/50 dark:text-info-200 dark:border-info-800',
        success:
          'bg-success-50 text-success-900 border-success-200 dark:bg-success-950/50 dark:text-success-200 dark:border-success-800',
        warning:
          'bg-warning-50 text-warning-900 border-warning-200 dark:bg-warning-950/50 dark:text-warning-200 dark:border-warning-800',
        danger:
          'bg-danger-50 text-danger-900 border-danger-200 dark:bg-danger-950/50 dark:text-danger-200 dark:border-danger-800',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);
