import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Download, Mail, Plus, Trash2 } from '../../icons';
import { Button } from './Button';
import type { ButtonColor, ButtonVariant } from './Button.types';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'ghost', 'link'],
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
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const VARIANTS: ButtonVariant[] = ['solid', 'outline', 'soft', 'ghost', 'link'];
const COLORS: ButtonColor[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'neutral',
];

// ─── Playground ──────────────────────────────
export const Playground: Story = {
  args: {
    children: 'Create Project',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

// ─── All Variants × Colors Matrix ────────────
export const VariantColorMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <span className="w-16 text-right font-mono text-xs text-neutral-600 dark:text-neutral-400">
            {variant}
          </span>
          {COLORS.map((color) => (
            <Button key={color} variant={variant} color={color}>
              {color}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── All Sizes ───────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Button key={size} size={size}>
          Size {size}
        </Button>
      ))}
    </div>
  ),
};

// ─── Radius ──────────────────────────────────
export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((radius) => (
        <Button key={radius} variant="outline" color="neutral" radius={radius}>
          {radius}
        </Button>
      ))}
    </div>
  ),
};

// ─── With Icons ──────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<Plus />}>New Project</Button>
      <Button rightIcon={<ArrowRight />}>Continue</Button>
      <Button leftIcon={<Mail />} rightIcon={<ArrowRight />}>
        Send Email
      </Button>
      <Button variant="outline" color="danger" leftIcon={<Trash2 />}>
        Delete
      </Button>
      <Button variant="soft" color="success" leftIcon={<Download />}>
        Download
      </Button>
    </div>
  ),
};

// ─── Loading ─────────────────────────────────
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button loading>Save</Button>
      <Button loading loadingText="Uploading...">
        Upload
      </Button>
      <Button loading variant="outline" color="neutral">
        Processing
      </Button>
      <Button loading variant="soft" color="success">
        Saving
      </Button>
    </div>
  ),
};

// ─── Disabled ────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {VARIANTS.filter((v) => v !== 'link').map((variant) => (
        <Button key={variant} variant={variant} disabled>
          Disabled
        </Button>
      ))}
    </div>
  ),
};

// ─── Full Width ──────────────────────────────
export const FullWidth: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline" color="neutral">
        Cancel
      </Button>
    </div>
  ),
};

// ─── asChild ─────────────────────────────────
export const AsChild: Story = {
  render: () => (
    <Button asChild variant="outline" color="primary">
      {/* In a real app this would be <Link href="/dashboard"> */}
      <a href="#dashboard">Go to Dashboard</a>
    </Button>
  ),
};
