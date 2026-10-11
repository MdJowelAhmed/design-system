import type { ComponentPropsWithoutRef, ElementType } from 'react';

/**
 * Generic polymorphic component prop types.
 * Allows a component to accept an `as` prop to render as a different element.
 *
 * @example
 * type ButtonProps = PolymorphicProps<'button', { variant: 'primary' | 'secondary' }>;
 */
export type PolymorphicProps<E extends ElementType, P = object> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'> & {
    as?: E;
  };

/**
 * Extract the ref type for a given element type.
 */
export type PolymorphicRef<E extends ElementType> =
  ComponentPropsWithoutRef<E> extends { ref?: infer R } ? R : never;

/**
 * Size variant type used across all components.
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Color variant type used across all components.
 */
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';

/**
 * Feedback/status intent shared by Alert, Toast, and other status surfaces.
 */
export type StatusVariant = 'info' | 'success' | 'warning' | 'danger';

/**
 * Common component props shared across many components.
 */
export interface BaseComponentProps {
  /** Additional class names */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in a loading state */
  loading?: boolean;
}

/**
 * Make specific properties required
 */
export type RequiredProps<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * Make all properties optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;

/**
 * Extract props that are not native HTML attributes
 */
export type CustomProps<P, E extends ElementType> = Omit<
  P,
  keyof ComponentPropsWithoutRef<E>
>;
