import { cva } from 'class-variance-authority';
import type { HeadingLevel, HeadingSize } from './Heading.types';

export const headingVariants = cva(
  'font-heading tracking-tight text-neutral-900 dark:text-neutral-50 transition-colors',
  {
    variants: {
      size: {
        xs: 'text-xs leading-4',
        sm: 'text-sm leading-5',
        md: 'text-base leading-6',
        lg: 'text-lg leading-7',
        xl: 'text-xl leading-8',
        '2xl': 'text-2xl leading-9',
        '3xl': 'text-3xl leading-10',
        '4xl': 'text-4xl leading-none',
        '5xl': 'text-5xl leading-none',
        '6xl': 'text-6xl leading-none',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      color: {
        default: 'text-neutral-900 dark:text-neutral-50',
        muted: 'text-neutral-600 dark:text-neutral-400',
        primary: 'text-primary-600 dark:text-primary-400',
        secondary: 'text-secondary-600 dark:text-secondary-400',
        accent: 'text-accent-600 dark:text-accent-400',
        danger: 'text-red-600 dark:text-red-400',
        success: 'text-emerald-700 dark:text-emerald-400',
        warning: 'text-amber-700 dark:text-amber-400',
        white: 'text-white',
      },
      truncate: {
        true: 'truncate',
      },
    },
    defaultVariants: {
      weight: 'bold',
      color: 'default',
    },
  },
);

export const defaultHeadingSizes: Record<HeadingLevel, HeadingSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
};
