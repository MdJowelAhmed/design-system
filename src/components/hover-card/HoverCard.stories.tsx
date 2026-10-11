import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="text-primary-600 dark:text-primary-400 cursor-pointer font-medium underline">
        @nextjs
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Next.js</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            The React Framework for the Web — created and maintained by Vercel.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
