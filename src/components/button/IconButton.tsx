import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from '../../icons/set';
import { cn } from '../../utils';
import { buttonVariants } from './Button.styles';
import type { IconButtonProps } from './IconButton.types';

/**
 * Square button for icon-only actions.
 * `aria-label` is required because there is no visible text label.
 *
 * @example
 * <IconButton aria-label="Add project" color="primary">
 *   <Plus />
 * </IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      color = 'neutral',
      size = 'md',
      radius,
      loading = false,
      asChild = false,
      disabled,
      children,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    // Square size map — removes horizontal padding and fixes width to match height.
    const squareSizeMap = {
      xs: 'w-7 !px-0',
      sm: 'w-8 !px-0',
      md: 'w-10 !px-0',
      lg: 'w-12 !px-0',
      xl: 'w-14 !px-0',
    } as const;

    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        type={asChild ? undefined : type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          buttonVariants({ variant, color, size, radius }),
          squareSizeMap[size ?? 'md'],
          'shrink-0',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          children
        )}
      </Component>
    );
  },
);

IconButton.displayName = 'IconButton';
