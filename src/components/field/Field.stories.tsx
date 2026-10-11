import type { Meta, StoryObj } from '@storybook/react';
import { FieldCounter, FieldLabel, FieldMessage, FieldRoot } from './Field';

const meta: Meta<typeof FieldRoot> = {
  title: 'Forms/Field',
  component: FieldRoot,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FieldRoot>;

const inputClass =
  'h-10 rounded-md border border-neutral-300 bg-background px-3 text-sm dark:border-neutral-700';

export const Default: Story = {
  render: () => (
    <FieldRoot className="max-w-sm">
      <FieldLabel htmlFor="field-name" required>
        Full name
      </FieldLabel>
      <input
        id="field-name"
        aria-describedby="field-name-msg"
        className={inputClass}
      />
      <FieldMessage
        id="field-name-msg"
        helperText="As it appears on your ID."
      />
    </FieldRoot>
  ),
};

export const Messages: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <FieldMessage error="This field is required." />
      <FieldMessage warning="This password is weak." />
      <FieldMessage success="Username is available." />
      <FieldMessage helperText="We will never share your email." />
    </div>
  ),
};

export const Counter: Story = {
  render: () => (
    <div className="flex gap-4">
      <FieldCounter current={20} max={100} />
      <FieldCounter current={85} max={100} />
      <FieldCounter current={100} max={100} />
    </div>
  ),
};
