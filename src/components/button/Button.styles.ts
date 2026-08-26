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
        primary: 'focus-visible:ring-blue-500/70',
        secondary: 'focus-visible:ring-purple-500/70',
        success: 'focus-visible:ring-emerald-500/70',
        warning: 'focus-visible:ring-amber-500/70',
        danger: 'focus-visible:ring-red-500/70',
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
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
      },
      {
        variant: 'solid',
        color: 'secondary',
        class:
          'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700',
      },
      {
        variant: 'solid',
        color: 'success',
        class:
          'bg-emerald-700 text-white hover:bg-emerald-800 active:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-800',
      },
      {
        variant: 'solid',
        color: 'warning',
        class:
          'bg-amber-700 text-white hover:bg-amber-800 active:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-800',
      },
      {
        variant: 'solid',
        color: 'danger',
        class:
          'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700',
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
          'border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/40',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class:
          'border-purple-500 text-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/40',
      },
      {
        variant: 'outline',
        color: 'success',
        class:
          // text-emerald-700 (≈5.3:1 on white) fixes the WCAG AA contrast violation from emerald-600 (3.76:1)
          'border-emerald-500 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950/40',
      },
      {
        variant: 'outline',
        color: 'warning',
        class:
          // text-amber-700 (≈4.6:1 on white) fixes the WCAG AA contrast violation from amber-600 (3.18:1)
          'border-amber-500 text-amber-700 hover:bg-amber-50 active:bg-amber-100 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-950/40',
      },
      {
        variant: 'outline',
        color: 'danger',
        class:
          'border-red-500 text-red-600 hover:bg-red-50 active:bg-red-100 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/40',
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
          'bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60',
      },
      {
        variant: 'soft',
        color: 'secondary',
        class:
          'bg-purple-50 text-purple-700 hover:bg-purple-100 active:bg-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:hover:bg-purple-900/60',
      },
      {
        variant: 'soft',
        color: 'success',
        class:
          'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60',
      },
      {
        variant: 'soft',
        color: 'warning',
        class:
          'bg-amber-50 text-amber-700 hover:bg-amber-100 active:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900/60',
      },
      {
        variant: 'soft',
        color: 'danger',
        class:
          'bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200 dark:bg-red-950/60 dark:text-red-300 dark:hover:bg-red-900/60',
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
          'text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-950/40',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class:
          'text-purple-600 hover:bg-purple-50 active:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-950/40',
      },
      {
        variant: 'ghost',
        color: 'success',
        class:
          // text-emerald-700 fixes WCAG AA contrast (was emerald-600 = 3.76:1)
          'text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-950/40',
      },
      {
        variant: 'ghost',
        color: 'warning',
        class:
          // text-amber-700 fixes WCAG AA contrast (was amber-600 = 3.18:1)
          'text-amber-700 hover:bg-amber-50 active:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-950/40',
      },
      {
        variant: 'ghost',
        color: 'danger',
        class:
          'text-red-600 hover:bg-red-50 active:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/40',
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
        class: 'text-blue-600 dark:text-blue-400',
      },
      {
        variant: 'link',
        color: 'secondary',
        class: 'text-purple-600 dark:text-purple-400',
      },
      {
        variant: 'link',
        color: 'success',
        // text-emerald-700 fixes WCAG AA contrast (was emerald-600 = 3.76:1)
        class: 'text-emerald-700 dark:text-emerald-300',
      },
      {
        variant: 'link',
        color: 'warning',
        // text-amber-700 fixes WCAG AA contrast (was amber-600 = 3.18:1)
        class: 'text-amber-700 dark:text-amber-300',
      },
      {
        variant: 'link',
        color: 'danger',
        class: 'text-red-600 dark:text-red-400',
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
