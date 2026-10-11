import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../utils';
import { blockquoteVariants } from './Blockquote.styles';
import type { BlockquoteProps } from './Blockquote.types';

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  (
    { color, author, cite, asChild = false, className, children, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : 'blockquote';

    return (
      <Component
        ref={ref}
        cite={cite}
        className={cn(blockquoteVariants({ color, className }))}
        {...props}
      >
        <div>{children}</div>
        {author && (
          <footer className="mt-2 text-sm font-medium text-neutral-600 not-italic dark:text-neutral-400">
            — {author}
          </footer>
        )}
      </Component>
    );
  },
);

Blockquote.displayName = 'Blockquote';
