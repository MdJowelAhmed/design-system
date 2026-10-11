import { cva } from 'class-variance-authority';

/**
 * Button variants use a two-axis model: `variant` (visual style) × `color` (semantic intent).
 * Compound variants encode the full 5×6 = 30 combination matrix so the consumer never
 * needs to reach for a className override just to change a color.
 *
 *   variant: solid | outline | soft | ghost | link
 *   color:   primary | secondary | success | warning | danger | neutral
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'select-none cursor-pointer whitespace-nowrap border border-transparent',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
    'active:scale-[0.97]',
  ].join(' '),
  {
    variants: {
      variant: {
        solid: 'shadow-sm hover:shadow-md',
        outline: '',
        soft: '',
        ghost: '',
        // Link overrides layout props from `size` — it behaves like inline text.
        link: '!p-0 !h-auto !border-none !shadow-none !active:scale-100 underline-offset-4 hover:underline',
      },
      color: {
        primary: 'focus-visible:ring-primary-500/70',
        secondary: 'focus-visible:ring-secondary-500/70',
        success: 'focus-visible:ring-success-500/70',
        warning: 'focus-visible:ring-warning-500/70',
        danger: 'focus-visible:ring-danger-500/70',
        neutral: 'focus-visible:ring-neutral-500/70',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-md [&_svg]:h-3.5 [&_svg]:w-3.5',
        sm: 'h-8 px-3 text-xs gap-1.5 rounded-md [&_svg]:h-4 [&_svg]:w-4',
        md: 'h-10 px-4 text-sm gap-2 rounded-lg [&_svg]:h-4 [&_svg]:w-4',
        lg: 'h-12 px-6 text-base gap-2.5 rounded-xl [&_svg]:h-5 [&_svg]:w-5',
        xl: 'h-14 px-8 text-lg gap-3 rounded-xl [&_svg]:h-6 [&_svg]:w-6',
      },
      radius: {
        none: 'rounded-none!',
        sm: 'rounded!',
        md: 'rounded-lg!',
        lg: 'rounded-xl!',
        full: 'rounded-full!',
      },
      fullWidth: {
        true: 'w-full',
      },
    },

    compoundVariants: [
      // ── solid ────────────────────────────────────────────────────────────────
      {
        variant: 'solid',
        color: 'primary',
        class:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700',
      },
      {
        variant: 'solid',
        color: 'secondary',
        class:
          'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-700',
      },
      {
        variant: 'solid',
        color: 'success',
        class:
          'bg-success-700 text-white hover:bg-success-800 active:bg-success-900 dark:bg-success-700 dark:hover:bg-success-800',
      },
      {
        variant: 'solid',
        color: 'warning',
        class:
          'bg-warning-700 text-white hover:bg-warning-800 active:bg-warning-900 dark:bg-warning-700 dark:hover:bg-warning-800',
      },
      {
        variant: 'solid',
        color: 'danger',
        class:
          'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 dark:bg-danger-600 dark:hover:bg-danger-700',
      },
      {
        variant: 'solid',
        color: 'neutral',
        class:
          'bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100',
      },

      // ── outline ──────────────────────────────────────────────────────────────
      {
        variant: 'outline',
        color: 'primary',
        class:
          'border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950/40',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class:
          'border-secondary-500 text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100 dark:border-secondary-400 dark:text-secondary-400 dark:hover:bg-secondary-950/40',
      },
      {
        variant: 'outline',
        color: 'success',
        class:
          // text-success-700 (≈5.3:1 on white) fixes the WCAG AA contrast violation from emerald-600 (3.76:1)
          'border-success-500 text-success-700 hover:bg-success-50 active:bg-success-100 dark:border-success-400 dark:text-success-300 dark:hover:bg-success-950/40',
      },
      {
        variant: 'outline',
        color: 'warning',
        class:
          // text-warning-700 (≈4.6:1 on white) fixes the WCAG AA contrast violation from amber-600 (3.18:1)
          'border-warning-500 text-warning-700 hover:bg-warning-50 active:bg-warning-100 dark:border-warning-400 dark:text-warning-300 dark:hover:bg-warning-950/40',
      },
      {
        variant: 'outline',
        color: 'danger',
        class:
          'border-danger-500 text-danger-600 hover:bg-danger-50 active:bg-danger-100 dark:border-danger-400 dark:text-danger-400 dark:hover:bg-danger-950/40',
      },
      {
        variant: 'outline',
        color: 'neutral',
        class:
          'border-neutral-300 text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800',
      },

      // ── soft ─────────────────────────────────────────────────────────────────
      {
        variant: 'soft',
        color: 'primary',
        class:
          'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 dark:bg-primary-950/60 dark:text-primary-300 dark:hover:bg-primary-900/60',
      },
      {
        variant: 'soft',
        color: 'secondary',
        class:
          'bg-secondary-50 text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 dark:bg-secondary-950/60 dark:text-secondary-300 dark:hover:bg-secondary-900/60',
      },
      {
        variant: 'soft',
        color: 'success',
        class:
          'bg-success-50 text-success-700 hover:bg-success-100 active:bg-success-200 dark:bg-success-950/60 dark:text-success-300 dark:hover:bg-success-900/60',
      },
      {
        variant: 'soft',
        color: 'warning',
        class:
          'bg-warning-50 text-warning-700 hover:bg-warning-100 active:bg-warning-200 dark:bg-warning-950/60 dark:text-warning-300 dark:hover:bg-warning-900/60',
      },
      {
        variant: 'soft',
        color: 'danger',
        class:
          'bg-danger-50 text-danger-700 hover:bg-danger-100 active:bg-danger-200 dark:bg-danger-950/60 dark:text-danger-300 dark:hover:bg-danger-900/60',
      },
      {
        variant: 'soft',
        color: 'neutral',
        class:
          'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700',
      },

      // ── ghost ────────────────────────────────────────────────────────────────
      {
        variant: 'ghost',
        color: 'primary',
        class:
          'text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-950/40',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class:
          'text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-950/40',
      },
      {
        variant: 'ghost',
        color: 'success',
        class:
          // text-success-700 fixes WCAG AA contrast (was emerald-600 = 3.76:1)
          'text-success-700 hover:bg-success-50 active:bg-success-100 dark:text-success-300 dark:hover:bg-success-950/40',
      },
      {
        variant: 'ghost',
        color: 'warning',
        class:
          // text-warning-700 fixes WCAG AA contrast (was amber-600 = 3.18:1)
          'text-warning-700 hover:bg-warning-50 active:bg-warning-100 dark:text-warning-300 dark:hover:bg-warning-950/40',
      },
      {
        variant: 'ghost',
        color: 'danger',
        class:
          'text-danger-600 hover:bg-danger-50 active:bg-danger-100 dark:text-danger-400 dark:hover:bg-danger-950/40',
      },
      {
        variant: 'ghost',
        color: 'neutral',
        class:
          'text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800',
      },

      // ── link ─────────────────────────────────────────────────────────────────
      {
        variant: 'link',
        color: 'primary',
        class: 'text-primary-600 dark:text-primary-400',
      },
      {
        variant: 'link',
        color: 'secondary',
        class: 'text-secondary-600 dark:text-secondary-400',
      },
      {
        variant: 'link',
        color: 'success',
        // text-success-700 fixes WCAG AA contrast (was emerald-600 = 3.76:1)
        class: 'text-success-700 dark:text-success-300',
      },
      {
        variant: 'link',
        color: 'warning',
        // text-warning-700 fixes WCAG AA contrast (was amber-600 = 3.18:1)
        class: 'text-warning-700 dark:text-warning-300',
      },
      {
        variant: 'link',
        color: 'danger',
        class: 'text-danger-600 dark:text-danger-400',
      },
      {
        variant: 'link',
        color: 'neutral',
        class: 'text-neutral-600 dark:text-neutral-400',
      },
    ],

    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
    },
  },
);
