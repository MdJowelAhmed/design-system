'use client';

import { createContext, forwardRef, useContext, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils';
import { Dialog, DialogContent } from '../dialog';
import { ScrollArea } from '../scroll-area';
import type {
  CommandGroupProps,
  CommandItemProps,
  CommandProps,
} from './Command.types';

const CommandContext = createContext<{
  search: string;
  setSearch: (s: string) => void;
}>({
  search: '',
  setSearch: () => {},
});

export const Command = forwardRef<HTMLDivElement, CommandProps>(
  ({ open, onOpenChange, className, children, ...props }, ref) => {
    const [search, setSearch] = useState('');

    return (
      <CommandContext.Provider value={{ search, setSearch }}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            aria-label="Command palette"
            className={cn('max-w-lg overflow-hidden p-0 shadow-2xl', className)}
            {...props}
          >
            <div
              ref={ref}
              className="flex w-full flex-col rounded-xl bg-white dark:bg-neutral-900"
            >
              {children}
            </div>
          </DialogContent>
        </Dialog>
      </CommandContext.Provider>
    );
  },
);
Command.displayName = 'Command';

export const CommandInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { search, setSearch } = useContext(CommandContext);

  return (
    <div className="flex items-center border-b border-neutral-200 px-3 dark:border-neutral-800">
      <Search aria-hidden="true" className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label={props.placeholder ?? 'Search'}
        className={cn(
          'flex h-12 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = 'CommandInput';

export const CommandList = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <ScrollArea className="max-h-[300px] p-2">
    <div ref={ref} className={cn('space-y-1', className)} {...props}>
      {children}
    </div>
  </ScrollArea>
));
CommandList.displayName = 'CommandList';

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, className, children, ...props }, ref) => (
    <div ref={ref} className={cn('py-1.5', className)} {...props}>
      {heading && (
        <div className="px-2 py-1 text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {heading}
        </div>
      )}
      <div>{children}</div>
    </div>
  ),
);
CommandGroup.displayName = 'CommandGroup';

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ disabled, onSelect, className, children, ...props }, ref) => (
    <div
      ref={ref}
      onClick={() => !disabled && onSelect?.()}
      className={cn(
        'relative flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors outline-none select-none hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
CommandItem.displayName = 'CommandItem';

export const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    // text-neutral-500 (#737373) ≈4.6:1 on white — fixes WCAG AA (was neutral-400 = 2.52:1)
    className={cn(
      'ml-auto font-mono text-xs tracking-widest text-neutral-500 dark:text-neutral-400',
      className,
    )}
    {...props}
  />
);
CommandShortcut.displayName = 'CommandShortcut';
