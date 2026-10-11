import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from '../../icons/set';
import { cn } from '../../utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../dialog';
import type { CommandDialogProps } from './Command.types';

export const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50',
      className,
    )}
    {...props}
  />
));
Command.displayName = 'Command';

export function CommandDialog({
  open,
  onOpenChange,
  title = 'Command palette',
  description = 'Search for a command to run.',
  className,
  children,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg overflow-hidden p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command className={className} {...props}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export const CommandInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center border-b border-neutral-200 px-3 dark:border-neutral-800"
    cmdk-input-wrapper=""
  >
    <Search aria-hidden="true" className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = 'CommandInput';

export const CommandList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'max-h-[300px] overflow-x-hidden overflow-y-auto p-2',
      className,
    )}
    {...props}
  />
));
CommandList.displayName = 'CommandList';

export const CommandEmpty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn('py-6 text-center text-sm text-neutral-500', className)}
    {...props}
  />
));
CommandEmpty.displayName = 'CommandEmpty';

export const CommandGroup = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden py-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-neutral-500 [&_[cmdk-group-heading]]:uppercase dark:[&_[cmdk-group-heading]]:text-neutral-400',
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

export const CommandSeparator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-neutral-200 dark:bg-neutral-800', className)}
    {...props}
  />
));
CommandSeparator.displayName = 'CommandSeparator';

export const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = 'CommandItem';

export function CommandShortcut({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'ml-auto font-mono text-xs tracking-widest text-neutral-500 dark:text-neutral-400',
        className,
      )}
      {...props}
    />
  );
}
