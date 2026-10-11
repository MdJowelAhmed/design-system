import { cn } from '../../utils';
import type { ButtonGroupProps } from './ButtonGroup.types';

const gapMap = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
} as const;

export function ButtonGroup({
  gap = 'sm',
  orientation = 'horizontal',
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        'flex',
        orientation === 'vertical'
          ? 'flex-col'
          : 'flex-row flex-wrap items-center',
        gapMap[gap],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
