import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Download, Plus, Settings, Trash2, X } from '../../icons';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'ghost'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'neutral',
      ],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    'aria-label': 'Add item',
    children: <Plus />,
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <IconButton aria-label="Notification" color="primary">
        <Bell />
      </IconButton>
      <IconButton aria-label="Settings" color="secondary">
        <Settings />
      </IconButton>
      <IconButton aria-label="Download" color="success">
        <Download />
      </IconButton>
      <IconButton aria-label="Warning" color="warning">
        <Bell />
      </IconButton>
      <IconButton aria-label="Delete" color="danger">
        <Trash2 />
      </IconButton>
      <IconButton aria-label="Close" color="neutral">
        <X />
      </IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['solid', 'outline', 'soft', 'ghost'] as const).map((variant) => (
        <IconButton
          key={variant}
          variant={variant}
          color="primary"
          aria-label={`${variant} add`}
        >
          <Plus />
        </IconButton>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <IconButton key={size} size={size} aria-label={`${size} add`}>
          <Plus />
        </IconButton>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    'aria-label': 'Saving',
    loading: true,
    color: 'primary',
    variant: 'solid',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Add item',
    children: <Plus />,
    disabled: true,
  },
};
