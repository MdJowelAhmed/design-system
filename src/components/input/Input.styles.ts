import { cva } from 'class-variance-authority';

/**
 * Styles for the outer wrapper `<div>`.
 *
 * The wrapper owns the border, background, and focus ring — not the `<input>`
 * itself. This lets `focus-within` light up the whole field (including icons
 * and prefix/suffix) when any child receives focus.
 */
export const inputWrapperVariants = cva(
  'relative flex w-full items-center transition-all duration-200 focus-within:ring-2',
  {
    variants: {
      variant: {
        outlined: [
          'border bg-white dark:bg-neutral-900',
          'border-neutral-300 dark:border-neutral-700',
          'focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-primary-500/20',
        ].join(' '),
        filled: [
          'border border-transparent bg-neutral-100 dark:bg-neutral-800',
          'focus-within:bg-white dark:focus-within:bg-neutral-900',
          'focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-primary-500/20',
        ].join(' '),
        ghost: [
          'border border-transparent bg-transparent',
          'hover:bg-neutral-50 dark:hover:bg-neutral-800/60',
          'focus-within:bg-white dark:focus-within:bg-neutral-900',
          'focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-primary-500/20',
        ].join(' '),
        underlined: [
          'rounded-none! border-b border-transparent bg-transparent',
          'border-b-neutral-300 dark:border-b-neutral-700',
          'focus-within:border-b-primary-500 dark:focus-within:border-b-primary-400 focus-within:ring-0',
        ].join(' '),
      },
      size: {
        xs: 'h-7 gap-1.5 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5',
        sm: 'h-8 gap-2 px-3 text-xs [&_svg]:h-4 [&_svg]:w-4',
        md: 'h-10 gap-2 px-3.5 text-sm [&_svg]:h-4 [&_svg]:w-4',
        lg: 'h-12 gap-2.5 px-4 text-base [&_svg]:h-5 [&_svg]:w-5',
        xl: 'h-14 gap-3 px-5 text-lg [&_svg]:h-5 [&_svg]:w-5',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-full',
      },
      state: {
        default: '',
        error: [
          '!border-danger-500 dark:!border-danger-400',
          'focus-within:!ring-danger-500/20 focus-within:!border-danger-500 dark:focus-within:!border-danger-400',
        ].join(' '),
        warning: [
          '!border-warning-500 dark:!border-warning-400',
          'focus-within:!ring-warning-500/20 focus-within:!border-warning-500 dark:focus-within:!border-warning-400',
        ].join(' '),
        success: [
          '!border-success-500 dark:!border-success-400',
          'focus-within:!ring-success-500/20 focus-within:!border-success-500 dark:focus-within:!border-success-400',
        ].join(' '),
        disabled:
          'opacity-60 cursor-not-allowed pointer-events-none bg-neutral-100 dark:bg-neutral-800',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      radius: 'md',
      state: 'default',
    },
  },
);

/**
 * Styles for the bare `<input>` element.
 * No border or background — those live on the wrapper above.
 */
export const inputBaseVariants = cva(
  [
    'flex-1 min-w-0 bg-transparent outline-none border-none font-sans',
    'text-neutral-900 dark:text-neutral-100',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
    'disabled:cursor-not-allowed',
    // Suppress browser-native UI chrome for search and number inputs.
    '[&::-webkit-search-cancel-button]:hidden',
    '[&::-webkit-outer-spin-button]:appearance-none',
    '[&::-webkit-inner-spin-button]:appearance-none',
  ].join(' '),
);

/** Shared slot styles for icons, prefix text, and suffix text. */
export const inputSlotVariants = {
  icon: 'shrink-0 text-neutral-400 dark:text-neutral-500 pointer-events-none',
  // pointer-events-auto: action buttons may be passed inside `icon` slots, which disable pointer events.
  actionIcon:
    'pointer-events-auto shrink-0 rounded-sm text-neutral-400 dark:text-neutral-500 cursor-pointer transition-colors duration-150 hover:text-neutral-600 dark:hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  prefix:
    'shrink-0 select-none whitespace-nowrap text-neutral-500 dark:text-neutral-400',
  suffix:
    'shrink-0 select-none whitespace-nowrap text-neutral-500 dark:text-neutral-400',
};
