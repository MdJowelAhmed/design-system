import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from '../../icons/set';
import { cn } from '../../utils';
import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      className,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        type={asChild ? undefined : type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            radius,
            fullWidth,
            className,
          }),
        )}
        {...props}
      >
        {/* When asChild, Slot merges our props onto the child element directly.
            Wrapping in spans would break the merge, so we pass children as-is. */}
        {asChild ? (
          children
        ) : loading ? (
          <>
            <Loader2 className="shrink-0 animate-spin" aria-hidden="true" />
            <span>{loadingText ?? children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {leftIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {rightIcon && (
              <span className="inline-flex shrink-0 items-center justify-center">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Component>
    );
  },
);

Button.displayName = 'Button';
