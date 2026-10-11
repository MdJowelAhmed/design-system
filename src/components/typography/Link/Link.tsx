import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ExternalLink } from '../../../icons/set';
import { cn } from '../../../utils';
import { linkVariants } from './Link.styles';
import type { LinkProps } from './Link.types';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      underline,
      color,
      external = false,
      disabled = false,
      asChild = false,
      className,
      children,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'a';
    const resolvedTarget = external ? '_blank' : target;
    const resolvedRel = external
      ? rel
        ? `${rel} noopener noreferrer`
        : 'noopener noreferrer'
      : rel;

    return (
      <Component
        ref={ref}
        target={resolvedTarget}
        rel={resolvedRel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        className={cn(linkVariants({ color, underline, disabled, className }))}
        {...props}
      >
        {children}
        {external && !asChild && (
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
        )}
      </Component>
    );
  },
);

Link.displayName = 'Link';
