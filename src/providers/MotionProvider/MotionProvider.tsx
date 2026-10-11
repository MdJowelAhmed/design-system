import { MotionConfig } from 'framer-motion';
import type { Transition } from 'framer-motion';
import type { ReactNode } from 'react';

export interface MotionProviderProps {
  children: ReactNode;
  /** `user` follows the OS "reduce motion" setting. */
  reducedMotion?: 'user' | 'always' | 'never';
  transition?: Transition;
}

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export function MotionProvider({
  children,
  reducedMotion = 'user',
  transition = DEFAULT_TRANSITION,
}: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion={reducedMotion} transition={transition}>
      {children}
    </MotionConfig>
  );
}
