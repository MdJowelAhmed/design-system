import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from '../../icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './index';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Accordion> = {
  render: () => (
    <Accordion type="single" collapsible className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your refund policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day money-back guarantee with no questions asked.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Do you provide 24/7 customer support?
        </AccordionTrigger>
        <AccordionContent>
          Yes, our dedicated support team is available around the clock via live
          chat and email.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Can I upgrade or downgrade my subscription?
        </AccordionTrigger>
        <AccordionContent>
          You can change your plan at any time directly from your billing
          account dashboard.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleExpand: StoryObj = {
  render: () => (
    <Accordion type="multiple" className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1: Getting Started</AccordionTrigger>
        <AccordionContent>
          Learn the basics of setting up your design system components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2: Customization</AccordionTrigger>
        <AccordionContent>
          Tailor colors, fonts, and spacing tokens to fit your brand guidelines.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Variants: StoryObj = {
  render: () => (
    <div className="flex w-[550px] flex-col gap-8">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          Bordered Variant
        </h4>
        <Accordion type="single" collapsible variant="bordered">
          <AccordionItem value="1">
            <AccordionTrigger>Bordered Item 1</AccordionTrigger>
            <AccordionContent>Bordered content box 1.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>Bordered Item 2</AccordionTrigger>
            <AccordionContent>Bordered content box 2.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          Filled Variant
        </h4>
        <Accordion type="single" collapsible variant="filled">
          <AccordionItem value="1">
            <AccordionTrigger>Filled Container Item 1</AccordionTrigger>
            <AccordionContent>
              Muted filled background styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>Filled Container Item 2</AccordionTrigger>
            <AccordionContent>
              Muted filled background styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          Ghost Variant
        </h4>
        <Accordion type="single" collapsible variant="ghost">
          <AccordionItem value="1">
            <AccordionTrigger>Ghost Minimal Item 1</AccordionTrigger>
            <AccordionContent>No border dividers.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

export const CustomIcons: StoryObj = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      variant="bordered"
      className="w-[500px]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger icon={<Plus className="h-4 w-4" />}>
          Expandable Section with Plus Icon
        </AccordionTrigger>
        <AccordionContent>
          The custom icon rotates automatically on state change.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: StoryObj = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      variant="bordered"
      className="w-[500px]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Active Accordion Item</AccordionTrigger>
        <AccordionContent>Active content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Accordion Item</AccordionTrigger>
        <AccordionContent>Disabled content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
