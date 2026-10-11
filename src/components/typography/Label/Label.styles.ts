import { cva } from 'class-variance-authority';

export const labelVariants = cva(
  'font-sans font-medium text-neutral-800 dark:text-neutral-200 select-none transition-colors inline-flex items-center gap-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:text-neutral-500 dark:peer-disabled:text-neutral-400',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      disabled: {
        true: 'cursor-not-allowed text-neutral-500 dark:text-neutral-400',
      },
      error: {
        true: 'text-danger-600 dark:text-danger-400',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
