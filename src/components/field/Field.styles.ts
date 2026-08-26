import { cva } from 'class-variance-authority';

export const fieldLabelVariants = cva(
  'block select-none text-sm font-medium leading-none',
  {
    variants: {
      state: {
        default: 'text-neutral-700 dark:text-neutral-300',
        error: 'text-red-600 dark:text-red-400',
        warning: 'text-amber-600 dark:text-amber-400',
        success: 'text-emerald-600 dark:text-emerald-400',
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
        error: 'text-red-600 dark:text-red-400',
        warning: 'text-amber-700 dark:text-amber-400',
        success: 'text-emerald-700 dark:text-emerald-400',
        helper: 'font-normal text-neutral-500 dark:text-neutral-400',
      },
    },
    defaultVariants: { intent: 'helper' },
  },
);

export const fieldCounterVariants = cva('text-xs tabular-nums', {
  variants: {
    state: {
      normal: 'text-neutral-400 dark:text-neutral-500',
      // amber-700 ≈4.6:1 | red-600 ≈5.9:1 on white
      warning: 'text-amber-700 dark:text-amber-400',
      limit: 'font-medium text-red-600 dark:text-red-400',
    },
  },
  defaultVariants: { state: 'normal' },
});
