import { cn } from '../../utils';
import type { MenubarShortcutProps } from './Menubar.types';

export const MenubarShortcut = ({
  className,
  ...props
}: MenubarShortcutProps) => {
  return (
    <span
      className={cn(
        'ml-auto font-mono text-xs tracking-widest text-neutral-400 dark:text-neutral-500',
        className,
      )}
      {...props}
    />
  );
};

MenubarShortcut.displayName = 'MenubarShortcut';
