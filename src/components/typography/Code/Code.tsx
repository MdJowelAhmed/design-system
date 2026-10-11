import { forwardRef } from 'react';
import type { Ref } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Check, Copy } from '../../../icons/set';
import { useClipboard } from '../../../hooks/use-clipboard';
import { cn } from '../../../utils';
import { codeVariants } from './Code.styles';
import type { CodeProps } from './Code.types';

export const Code = forwardRef<HTMLElement, CodeProps>(
  (
    {
      variant = 'inline',
      copyable = false,
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { copy, copied } = useClipboard();
    const canCopy = copyable && typeof children === 'string';
    const handleCopy = () => {
      if (typeof children === 'string') void copy(children);
    };

    if (variant === 'block' && !asChild) {
      return (
        <div className="group relative my-2">
          <pre
            ref={ref as Ref<HTMLPreElement>}
            className={cn(codeVariants({ variant: 'block', className }))}
            {...props}
          >
            <code>{children}</code>
          </pre>
          {canCopy && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy code'}
              className="focus:ring-primary-500 absolute top-3 right-3 rounded-md bg-neutral-800 p-1.5 text-neutral-300 opacity-80 transition-all group-hover:opacity-100 hover:bg-neutral-700 hover:text-white focus:ring-2 focus:outline-none"
            >
              {copied ? (
                <Check
                  aria-hidden="true"
                  className="text-success-400 h-3.5 w-3.5"
                />
              ) : (
                <Copy aria-hidden="true" className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      );
    }

    const Component = asChild ? Slot : 'code';

    return (
      <span
        className={cn('inline-flex items-center gap-1', copyable && 'relative')}
      >
        <Component
          ref={ref}
          className={cn(codeVariants({ variant, className }))}
          {...props}
        >
          {children}
        </Component>
        {canCopy && variant === 'inline' && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy snippet'}
            className="focus-ring rounded p-0.5 text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {copied ? (
              <Check aria-hidden="true" className="text-success-500 h-3 w-3" />
            ) : (
              <Copy aria-hidden="true" className="h-3 w-3" />
            )}
          </button>
        )}
      </span>
    );
  },
);

Code.displayName = 'Code';
