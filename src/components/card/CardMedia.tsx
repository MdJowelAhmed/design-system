import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { CardMediaProps } from './Card.types';

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  (
    {
      src,
      alt = '',
      aspectRatio = 'aspect-video',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative -mx-0 w-full overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800',
          aspectRatio,
          className,
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          children
        )}
      </div>
    );
  },
);

CardMedia.displayName = 'CardMedia';
