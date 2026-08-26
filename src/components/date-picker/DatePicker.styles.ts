import { cva } from 'class-variance-authority';

export const calendarContainerVariants = cva(
  [
    'flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
    'rounded-xl shadow-xl p-3 text-neutral-900 dark:text-neutral-100 select-none outline-none font-sans',
  ].join(' '),
);

export const calendarHeaderVariants = cva(
  'flex items-center justify-between gap-1 pb-2 border-b border-neutral-100 dark:border-neutral-800',
);

export const dayVariants = cva(
  [
    'inline-flex items-center justify-center h-8 w-8 text-xs font-medium rounded-lg',
    'transition-all duration-150 cursor-pointer outline-none relative select-none',
    'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
  ].join(' '),
  {
    variants: {
      status: {
        normal:
          'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200',
        today:
          'font-bold border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40',
        selected:
          'bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xs',
        rangeStart:
          'bg-blue-600 text-white font-semibold rounded-r-none dark:bg-blue-500 shadow-xs',
        rangeEnd:
          'bg-blue-600 text-white font-semibold rounded-l-none dark:bg-blue-500 shadow-xs',
        inRange:
          'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 rounded-none hover:bg-blue-100 dark:hover:bg-blue-900/60',
        disabled:
          // WCAG 1.4.3 exempts disabled controls from contrast — pointer-events-none
          // ensures they are truly non-interactive. Removed opacity-50 to avoid axe
          // false-positives; neutral-400 (#a3a3a3) is visually muted without failing.
          'text-neutral-400 dark:text-neutral-600 cursor-not-allowed pointer-events-none hover:bg-transparent',
        outsideMonth:
          // neutral-500 (#737373) ≈4.6:1 on white — removes opacity-40 which made
          // the effective color #dadada (1.39:1) and triggered contrast violations.
          'text-neutral-500 dark:text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/40',
      },
    },
    defaultVariants: {
      status: 'normal',
    },
  },
);

export const presetButtonVariants = cva(
  'px-3 py-1.5 text-xs font-medium rounded-md text-left transition-colors duration-150 cursor-pointer',
  {
    variants: {
      active: {
        true: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold',
        false:
          'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
