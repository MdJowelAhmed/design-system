import { forwardRef } from 'react';
import { cn } from '../../utils';
import type { AspectRatioProps } from './Layout.types';

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = '16/9', className, children, ...props }, ref) => {
    const ratioMap = {
      '16/9': 'aspect-video',
      '4/3': 'aspect-4/3',
      '1/1': 'aspect-square',
      '21/9': 'aspect-21/9',
    };

    const ratioClass =
      typeof ratio === 'string' ? ratioMap[ratio as keyof typeof ratioMap] : '';
    const inlineStyle =
      typeof ratio === 'number' ? { aspectRatio: `${ratio}` } : undefined;

    return (
      <div
        ref={ref}
        style={inlineStyle}
        className={cn('relative w-full overflow-hidden', ratioClass, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AspectRatio.displayName = 'AspectRatio';
