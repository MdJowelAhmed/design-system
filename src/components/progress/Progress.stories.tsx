import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
    <Progress value={60} aria-label="Loading progress" className="w-[60%]" />
  ),
};

export const Complete: Story = {
  render: () => (
    <Progress value={100} aria-label="Completed progress" className="w-[60%]" />
  ),
};
