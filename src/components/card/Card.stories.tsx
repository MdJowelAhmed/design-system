import type { Meta, StoryObj } from '@storybook/react';
import { MoreVertical } from 'lucide-react';
import { Button } from '../button';
import { IconButton } from '../button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Dashboard Analytics</CardTitle>
        <CardDescription>View your monthly traffic performance</CardDescription>
        <CardAction>
          <IconButton variant="ghost" size="sm" aria-label="Card settings">
            <MoreVertical />
          </IconButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Your total page views increased by 24% compared to last month.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Dismiss
        </Button>
        <Button size="sm">View Report</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: StoryObj = {
  render: () => (
    <div className="grid w-[750px] grid-cols-2 gap-4">
      <Card variant="default">
        <CardHeader>
          <CardTitle level={4}>Default Card</CardTitle>
          <CardDescription>Standard bordered with shadow-sm</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="outlined">
        <CardHeader>
          <CardTitle level={4}>Outlined Card</CardTitle>
          <CardDescription>Clean border without shadow</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="filled">
        <CardHeader>
          <CardTitle level={4}>Filled Card</CardTitle>
          <CardDescription>
            Muted filled background without border
          </CardDescription>
        </CardHeader>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle level={4}>Elevated Card</CardTitle>
          <CardDescription>Prominent shadow-md with hover lift</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex w-[450px] flex-col gap-4">
      <Card size="xs">
        <CardTitle level={5}>Extra Small (xs)</CardTitle>
        <CardDescription>Compact card spacing</CardDescription>
      </Card>
      <Card size="sm">
        <CardTitle level={4}>Small (sm)</CardTitle>
        <CardDescription>Tight layout spacing</CardDescription>
      </Card>
      <Card size="md">
        <CardTitle level={3}>Medium (md - Default)</CardTitle>
        <CardDescription>Standard card padding</CardDescription>
      </Card>
      <Card size="lg">
        <CardTitle level={2}>Large (lg)</CardTitle>
        <CardDescription>Generous spacing layout</CardDescription>
      </Card>
    </div>
  ),
};

export const WithMedia: StoryObj = {
  render: () => (
    <Card className="w-[360px]">
      <CardMedia
        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80"
        alt="Abstract Art Banner"
      />
      <CardHeader>
        <CardTitle>Creative Design System</CardTitle>
        <CardDescription>
          Build consistent modern web user interfaces.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button fullWidth>Explore Components</Button>
      </CardFooter>
    </Card>
  ),
};

export const ClickableKeyboardInteractive: StoryObj = {
  render: () => (
    <Card
      clickable
      onClick={() => alert('Card clicked!')}
      className="w-[360px]"
    >
      <CardHeader>
        <CardTitle>Interactive Clickable Card</CardTitle>
        <CardDescription>
          Press Tab to focus and Enter/Space to trigger
        </CardDescription>
      </CardHeader>
      <CardContent>
        Hover or navigate with keyboard to see focus rings and elevation.
      </CardContent>
    </Card>
  ),
};

export const LoadingState: StoryObj = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // False-positive: axe cannot resolve the effective background of text nodes
            // that are physically occluded by the loading overlay. The children wrapper
            // is `inert` (removed from a11y tree) so this is not a real contrast failure.
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
  render: () => (
    <Card loading className="w-[360px]">
      <CardHeader>
        <CardTitle>Fetching Data</CardTitle>
        <CardDescription>Please wait while content is loading</CardDescription>
      </CardHeader>
      <CardContent>
        This content is overlaid with a loading spinner.
      </CardContent>
    </Card>
  ),
};

export const DisabledState: StoryObj = {
  render: () => (
    <Card disabled clickable className="w-[360px]">
      <CardHeader>
        <CardTitle>Disabled Feature</CardTitle>
        <CardDescription>This feature is currently unavailable</CardDescription>
      </CardHeader>
      <CardContent>Interactions are disabled.</CardContent>
    </Card>
  ),
};
