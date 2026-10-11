import type { HTMLAttributes } from 'react';
import type { HeadingProps, TextProps } from '../typography';

export type CardVariant =
  'default' | 'outlined' | 'filled' | 'elevated' | 'ghost';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card visual style variant.
   * @default 'default'
   */
  variant?: CardVariant;
  /**
   * Card internal padding size token.
   * @default 'md'
   */
  size?: CardSize;
  /**
   * Border radius size token.
   * @default 'lg'
   */
  radius?: CardRadius;
  /**
   * Enables interactive hover and focus styles with keyboard support (Enter/Space).
   * @default false
   */
  clickable?: boolean;
  /**
   * Selected state ring border highlight.
   * @default false
   */
  selected?: boolean;
  /**
   * Shows a loading spinner overlay.
   * @default false
   */
  loading?: boolean;
  /**
   * Disables interaction and dims the card.
   * @default false
   */
  disabled?: boolean;
  /**
   * Merge props onto child element via Radix Slot.
   */
  asChild?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Align items vertically in header layout.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
}

export type CardTitleProps = HeadingProps;

export type CardDescriptionProps = TextProps;

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Alignment of footer elements.
   * @default 'between'
   */
  align?: 'start' | 'center' | 'end' | 'between';
}

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Image source if rendering standard img tag.
   */
  src?: string;
  /**
   * Image alt text.
   */
  alt?: string;
  /**
   * Aspect ratio utility class e.g., 'aspect-video', 'aspect-square'.
   */
  aspectRatio?: string;
}

export interface CardActionProps extends HTMLAttributes<HTMLDivElement> {}
