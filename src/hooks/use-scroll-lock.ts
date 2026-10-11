import { useLayoutEffect } from 'react';

export function useScrollLock(lock = true) {
  useLayoutEffect(() => {
    if (!lock || typeof document === 'undefined') return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
