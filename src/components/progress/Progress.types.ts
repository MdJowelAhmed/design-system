import type { ComponentPropsWithoutRef } from 'react';
import type * as ProgressPrimitive from '@radix-ui/react-progress';

export interface ProgressProps extends ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  value?: number;
}
