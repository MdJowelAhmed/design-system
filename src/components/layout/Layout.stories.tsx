import type { Meta, StoryObj } from '@storybook/react';
import {
  AspectRatio,
  Center,
  Container,
  Flex,
  Grid,
  Spacer,
  Stack,
} from './index';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Primitives',
  component: Stack,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ label }: { label: string }) => (
  <div className="bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-200 rounded-md px-4 py-3 text-sm font-medium">
    {label}
  </div>
);

export const StackStory: Story = {
  name: 'Stack',
  args: { direction: 'column', gap: 'md' },
  render: (args) => (
    <Stack {...args}>
      <Box label="One" />
      <Box label="Two" />
      <Box label="Three" />
    </Stack>
  ),
};

export const FlexWithSpacer: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <Box label="Left" />
      <Spacer />
      <Box label="Right" />
    </Flex>
  ),
};

export const GridStory: Story = {
  name: 'Grid',
  render: () => (
    <Grid cols={3} gap="md">
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} label={`Cell ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const ContainerAndCenter: Story = {
  render: () => (
    <Container size="sm">
      <Center className="border-border h-40 rounded-md border border-dashed">
        <Box label="Centered" />
      </Center>
    </Container>
  ),
};

export const AspectRatioStory: Story = {
  name: 'AspectRatio',
  render: () => (
    <div className="w-80">
      <AspectRatio
        ratio="16/9"
        className="rounded-md bg-neutral-200 dark:bg-neutral-800"
      >
        <Center className="h-full text-sm text-neutral-600 dark:text-neutral-300">
          16 / 9
        </Center>
      </AspectRatio>
    </div>
  ),
};
