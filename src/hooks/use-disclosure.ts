import { useCallback, useState } from 'react';

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/** Boolean open/closed state for dialogs, menus, and any other toggleable UI. */
export function useDisclosure({
  defaultIsOpen = false,
  onOpen,
  onClose,
}: UseDisclosureProps = {}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    onOpen?.();
  }, [isOpen, onOpen]);

  const close = useCallback(() => {
    if (!isOpen) return;
    setIsOpen(false);
    onClose?.();
  }, [isOpen, onClose]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return { isOpen, open, close, toggle, setIsOpen };
}
