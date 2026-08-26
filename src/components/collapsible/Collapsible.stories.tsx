import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './index';

const meta: Meta = {
  title: 'Components/Collapsible',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="xs"
            aria-label="Toggle starred repositories"
          >
            <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-neutral-200 px-4 py-2 font-mono text-sm dark:border-neutral-800">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-neutral-200 px-4 py-2 font-mono text-sm dark:border-neutral-800">
          @radix-ui/colors
        </div>
        <div className="rounded-md border border-neutral-200 px-4 py-2 font-mono text-sm dark:border-neutral-800">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
