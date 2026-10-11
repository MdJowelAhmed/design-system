import { cva } from 'class-variance-authority';

export const fieldLabelVariants = cva(
  'block select-none text-sm font-medium leading-none',
  {
    variants: {
      state: {
        default: 'text-neutral-700 dark:text-neutral-300',
        error: 'text-danger-600 dark:text-danger-400',
        warning: 'text-warning-600 dark:text-warning-400',
        success: 'text-success-600 dark:text-success-400',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

export const fieldMessageVariants = cva(
  'flex items-start gap-1 text-xs font-medium',
  {
    variants: {
      intent: {
        // -600/-700 shades pass WCAG AA on white (4.5:1 min):
        // red-600 ≈5.9:1 | amber-700 ≈4.6:1 | emerald-700 ≈5.3:1
        error: 'text-danger-600 dark:text-danger-400',
        warning: 'text-warning-700 dark:text-warning-400',
        success: 'text-success-700 dark:text-success-400',
        helper: 'font-normal text-neutral-500 dark:text-neutral-400',
      },
    },
    defaultVariants: { intent: 'helper' },
  },
);

export const fieldCounterVariants = cva('text-xs tabular-nums', {
  variants: {
    state: {
      normal: 'text-neutral-500 dark:text-neutral-400',
      // amber-700 ≈4.6:1 | red-600 ≈5.9:1 on white
      warning: 'text-warning-700 dark:text-warning-400',
      limit: 'font-medium text-danger-600 dark:text-danger-400',
    },
  },
  defaultVariants: { state: 'normal' },
});
