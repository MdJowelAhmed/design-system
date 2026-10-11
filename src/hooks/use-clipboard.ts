import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseClipboardOptions {
  /** How long `copied` stays true, in ms. */
  timeout?: number;
}

export function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = useCallback(
    async (text: string) => {
      clearTimeout(resetTimer.current);
      try {
        if (!navigator?.clipboard) {
          throw new Error('Clipboard API not supported');
        }
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        resetTimer.current = setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setCopied(false);
        return false;
      }
    },
    [timeout],
  );

  return { copy, copied, error };
}
