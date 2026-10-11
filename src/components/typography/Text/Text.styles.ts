import { cva } from 'class-variance-authority';

export const textVariants = cva('font-sans transition-colors', {
  variants: {
    size: {
      xs: 'text-xs leading-4',
      sm: 'text-sm leading-5',
      md: 'text-base leading-6',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-8',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: 'text-neutral-800 dark:text-neutral-200',
      muted: 'text-neutral-600 dark:text-neutral-400',
      subtle: 'text-neutral-500 dark:text-neutral-400',
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      danger: 'text-danger-600 dark:text-danger-400',
      success: 'text-success-700 dark:text-success-400',
      warning: 'text-warning-700 dark:text-warning-400',
      white: 'text-white',
    },
    truncate: {
      true: 'truncate',
    },
    italic: {
      true: 'italic',
    },
    underline: {
      true: 'underline underline-offset-4',
    },
    strikethrough: {
      true: 'line-through',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    color: 'default',
  },
});
