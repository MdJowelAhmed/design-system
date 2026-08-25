import { cva } from 'class-variance-authority';

export const modalContentVariants = cva(
  'fixed left-1/2 top-1/2 z-50 flex w-full max-h-[85vh] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border bg-white shadow-2xl duration-200 focus-ring data-[state=open]:animate-content-in data-[state=closed]:animate-content-out dark:bg-neutral-900 dark:text-neutral-50 p-0',
  {
    variants: {
      size: {
        sm: 'max-w-sm w-[calc(100vw-2rem)] sm:w-full',
        md: 'max-w-md w-[calc(100vw-2rem)] sm:w-full',
        lg: 'max-w-lg w-[calc(100vw-2rem)] sm:w-full',
        xl: 'max-w-xl w-[calc(100vw-2rem)] sm:w-full',
        '2xl': 'max-w-2xl w-[calc(100vw-2rem)] sm:w-full',
        full: 'max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] rounded-2xl',
      },
      variant: {
        default: 'border-neutral-200 dark:border-neutral-800',
        destructive:
          'border-red-500/40 dark:border-red-500/30 ring-1 ring-red-500/20',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);
