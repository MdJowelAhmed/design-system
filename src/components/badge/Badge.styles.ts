import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors select-none gap-1.5 shrink-0',
  {
    variants: {
      variant: {
        solid: 'bg-primary-600 text-white dark:bg-primary-500',
        soft: 'bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300',
        outline:
          'border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300',
        info: 'bg-info-50 text-info-700 dark:bg-info-950/60 dark:text-info-300 border border-info-200 dark:border-info-800',
        success:
          'bg-success-50 text-success-700 dark:bg-success-950/60 dark:text-success-300 border border-success-200 dark:border-success-800',
        warning:
          'bg-warning-50 text-warning-700 dark:bg-warning-950/60 dark:text-warning-300 border border-warning-200 dark:border-warning-800',
        danger:
          'bg-danger-50 text-danger-700 dark:bg-danger-950/60 dark:text-danger-300 border border-danger-200 dark:border-danger-800',
        neutral:
          'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
      },
      size: {
        sm: 'h-5 px-2 text-[10px] rounded-md',
        md: 'h-6 px-2.5 text-xs rounded-md',
        lg: 'h-7 px-3 text-sm rounded-lg',
      },
      pill: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'soft',
      size: 'md',
      pill: false,
    },
  },
);
