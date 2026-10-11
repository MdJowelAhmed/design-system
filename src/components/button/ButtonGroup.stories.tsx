import type { Meta, StoryObj } from '@storybook/react';
import { Download, Plus, Trash2 } from '../../icons';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" color="neutral">
        Cancel
      </Button>
      <Button color="primary">Save</Button>
    </ButtonGroup>
  ),
};

export const DangerAction: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" color="neutral">
        Cancel
      </Button>
      <Button variant="soft" color="danger" leftIcon={<Trash2 />}>
        Delete Account
      </Button>
    </ButtonGroup>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <ButtonGroup gap="xs">
      <Button variant="ghost" color="neutral" leftIcon={<Plus />}>
        New
      </Button>
      <Button variant="ghost" color="neutral" leftIcon={<Download />}>
        Export
      </Button>
      <Button variant="ghost" color="danger" leftIcon={<Trash2 />}>
        Delete
      </Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" gap="xs" className="max-w-[200px]">
      <Button fullWidth variant="outline" color="neutral">
        Profile
      </Button>
      <Button fullWidth variant="outline" color="neutral">
        Settings
      </Button>
      <Button fullWidth variant="ghost" color="danger">
        Sign Out
      </Button>
    </ButtonGroup>
  ),
};
