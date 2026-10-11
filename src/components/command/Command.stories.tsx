import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar, Calculator, Smile, User } from '../../icons';
import { Button } from '../button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './index';

const meta: Meta = {
  title: 'Components/Command',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const Items = () => (
  <>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <Calendar aria-hidden="true" />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem>
          <Smile aria-hidden="true" />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem disabled>
          <Calculator aria-hidden="true" />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          <User aria-hidden="true" />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </>
);

export const Inline: StoryObj = {
  render: () => (
    <Command className="w-[400px] border border-neutral-200 shadow-md dark:border-neutral-800">
      <Items />
    </Command>
  ),
};

export const Dialog: StoryObj = {
  parameters: {
    a11y: {
      config: {
        // Radix focus guards are aria-hidden with tabIndex=-1; axe flags them but they are unreachable.
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Items />
        </CommandDialog>
      </>
    );
  },
};
