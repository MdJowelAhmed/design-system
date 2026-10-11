import { forwardRef } from 'react';
import { Stack } from './Stack';
import type { FlexProps } from './Layout.types';

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ direction = 'row', ...props }, ref) => (
    <Stack ref={ref} direction={direction} {...props} />
  ),
);
Flex.displayName = 'Flex';
