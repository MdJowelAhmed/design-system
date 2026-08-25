'use client';

import { forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { User } from '../../icons';
import { cn } from '../../utils';
import type { AvatarProps } from './Avatar.types';

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-14 w-14 text-lg',
  '2xl': 'h-20 w-20 text-2xl',
};

const statusClasses = {
  online: 'bg-emerald-500',
  offline: 'bg-neutral-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', status, className }, ref) => {
    const initials =
      typeof fallback === 'string'
        ? fallback
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : fallback;

    return (
      <div className="relative inline-flex shrink-0">
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 font-medium select-none dark:border-neutral-800 dark:bg-neutral-800',
            sizeClasses[size],
            className,
          )}
        >
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />

          <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
            {initials ?? <User className="h-1/2 w-1/2" />}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>

        {status && (
          <span
            role="status"
            aria-label={`Status: ${status}`}
            className={cn(
              'absolute right-0 bottom-0 shrink-0 rounded-full ring-2 ring-white dark:ring-neutral-900',
              statusClasses[status],
              size === 'xs' || size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
            )}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
