import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Phone, Globe, CreditCard, User, DollarSign } from '../../icons';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost', 'underlined'],
    },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Default ──────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    helperText: 'Your unique handle on the platform.',
  },
};

// ─── Playground ──────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email...',
    type: 'email',
    helperText: "We'll never share your email.",
    size: 'md',
    variant: 'outlined',
    radius: 'md',
    clearable: true,
    required: true,
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

// ─── Sizes ───────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Input
          key={size}
          size={size}
          label={`Size: ${size}`}
          placeholder={`Input ${size}`}
        />
      ))}
    </div>
  ),
};

// ─── Variants ────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['outlined', 'filled', 'ghost', 'underlined'] as const).map(
        (variant) => (
          <Input
            key={variant}
            variant={variant}
            label={`Variant: ${variant}`}
            placeholder={`${variant} input`}
          />
        ),
      )}
    </div>
  ),
};

// ─── Radius ──────────────────────────────────
export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((radius) => (
        <Input
          key={radius}
          radius={radius}
          label={`Radius: ${radius}`}
          placeholder={`${radius} radius`}
        />
      ))}
    </div>
  ),
};

// ─── States ──────────────────────────────────
export const ErrorState: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address.',
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WarningState: Story = {
  args: {
    label: 'Username',
    value: 'admin_user',
    warning: 'This username may already be taken.',
    leftIcon: <User className="h-4 w-4" />,
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email',
    value: 'valid@example.com',
    success: 'Email address is available!',
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Website',
    placeholder: 'https://example.com',
    helperText: 'Include https:// in the URL.',
    leftIcon: <Globe className="h-4 w-4" />,
  },
};

// ─── Disabled & ReadOnly ─────────────────────
export const Disabled: Story = {
  args: {
    label: 'API Key',
    value: 'sk_live_123456789',
    disabled: true,
    helperText: 'Contact support to change your API key.',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Account ID',
    value: 'acc_0xf8a3b1c2',
    readOnly: true,
    helperText: 'Your unique account identifier.',
  },
};

// ─── Loading ─────────────────────────────────
export const Loading: Story = {
  args: {
    label: 'Searching...',
    placeholder: 'Enter search term',
    loading: true,
    value: 'react design',
  },
};

// ─── Clearable ───────────────────────────────
export const Clearable: Story = {
  args: {
    label: 'Filter',
    defaultValue: 'some filter text',
    clearable: true,
    helperText: 'Click × to clear.',
  },
};

// ─── Icons ───────────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        label="Left Icon"
        placeholder="Email address"
        leftIcon={<Mail className="h-4 w-4" />}
      />
      <Input
        label="Right Icon"
        placeholder="Phone number"
        rightIcon={<Phone className="h-4 w-4" />}
      />
      <Input
        label="Both Icons"
        placeholder="Card number"
        leftIcon={<CreditCard className="h-4 w-4" />}
        rightIcon={<Globe className="h-4 w-4" />}
      />
    </div>
  ),
};

// ─── Prefix & Suffix ─────────────────────────
export const PrefixSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input label="Price" placeholder="0.00" prefix="$" />
      <Input label="Domain" placeholder="mysite" suffix=".com" />
      <Input
        label="Currency Amount"
        placeholder="0.00"
        prefix={<DollarSign className="h-3.5 w-3.5" />}
        suffix="USD"
        type="number"
      />
    </div>
  ),
};

// ─── Character Counter ───────────────────────
export const WithCounter: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 150,
    helperText: 'Keep it short and sweet.',
    defaultValue: 'Frontend developer who loves building beautiful UIs.',
  },
};

// ─── Required ────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
    type: 'email',
  },
};
