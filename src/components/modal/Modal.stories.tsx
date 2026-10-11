import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
} from '.';
import { Button } from '../button';
import { Input } from '../input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button color="primary">Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a standard modal dialog box component built with Radix
            primitives.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>
            Modals provide focused interaction without taking the user away from
            their context.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button color="primary">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Small: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Small Modal (sm)</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Small Modal</ModalTitle>
          <ModalDescription>
            Best for quick confirmations or simple prompts.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to proceed with this quick action?</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button color="primary">Proceed</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Medium: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Medium Modal (md)</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Medium Modal</ModalTitle>
          <ModalDescription>
            Standard width for general content and forms.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>This is the default size for standard application dialogs.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Close</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Large: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Large Modal (lg)</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Large Modal</ModalTitle>
          <ModalDescription>
            Great for detailed multi-column forms or tables.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Provides expanded width for more complex interaction flows.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button color="primary">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Extra Large Modal (xl)</Button>
      </ModalTrigger>
      <ModalContent size="xl">
        <ModalHeader>
          <ModalTitle>Extra Large Modal</ModalTitle>
          <ModalDescription>
            Ideal for rich data visualization or complex settings.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>
            Offers generous screen real estate for large dashboards or media
            viewers.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Done</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const DoubleExtraLarge: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">2XL Modal (2xl)</Button>
      </ModalTrigger>
      <ModalContent size="2xl">
        <ModalHeader>
          <ModalTitle>2XL Data Editor</ModalTitle>
          <ModalDescription>
            Maximum desktop card width for advanced editors.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700">
            [ Rich Data Grid / Code Editor Canvas ]
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Close</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Full: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Full Screen Modal</Button>
      </ModalTrigger>
      <ModalContent size="full">
        <ModalHeader>
          <ModalTitle>Full View Workspace</ModalTitle>
          <ModalDescription>
            Fullscreen modal experience for immersive tasks.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700">
            [ Full Screen Studio / Workspace Content ]
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Exit Fullscreen</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Form: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button color="primary">Create User</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Create User</ModalTitle>
          <ModalDescription>
            Add a new user to your organization.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Full Name
              </label>
              <Input placeholder="John Doe" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Email Address
              </label>
              <Input type="email" placeholder="john@example.com" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button color="primary">Create User</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-500">
          State: {open ? 'Open' : 'Closed'}
        </div>
        <Button onClick={() => setOpen(true)}>Open Controlled Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Controlled Modal</ModalTitle>
              <ModalDescription>
                State managed externally by parent React state.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p>
                This modal state is controlled via open & onOpenChange props.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close via State
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button color="primary">Submit Data</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Processing Action</ModalTitle>
          <ModalDescription>
            Your request is currently being processed.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>Please wait while we update your preferences...</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" disabled>
            Cancel
          </Button>
          <Button color="primary" loading>
            Submitting...
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button color="danger">Delete Account</Button>
      </ModalTrigger>
      <ModalContent
        variant="destructive"
        closeOnOutsideClick={false}
        closeOnEscape={false}
      >
        <ModalHeader>
          <ModalTitle className="text-danger-600 dark:text-danger-400">
            Delete Account
          </ModalTitle>
          <ModalDescription>
            This action cannot be undone. All your personal data will be
            permanently erased.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-danger-600 dark:text-danger-400 font-medium">
            Critical Action Warning: Outside click & Escape key closing are
            disabled for this modal.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button color="danger">Confirm Permanent Deletion</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const WithoutClose: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">No Top Close Icon</Button>
      </ModalTrigger>
      <ModalContent showCloseButton={false}>
        <ModalHeader>
          <ModalTitle>Modal Without Header Close Button</ModalTitle>
          <ModalDescription>
            Useful when close action must strictly be taken in footer.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>The top-right X button is hidden.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Dismiss</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Mobile: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Mobile Responsive View</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Responsive Layout</ModalTitle>
          <ModalDescription>
            Adapts edge-to-edge spacing on smaller viewports.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p>
            On mobile screens, width is restricted to viewport bounds with touch
            margin.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button color="primary">Got It</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark rounded-xl bg-neutral-950 p-8 text-white">
      <Modal>
        <ModalTrigger asChild>
          <Button color="primary">Open Dark Mode Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Dark Theme Modal</ModalTitle>
            <ModalDescription>
              Fully integrated with design system dark tokens.
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <p>Styles react seamlessly to the dark theme context class.</p>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="outline">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button color="secondary">Keyboard Accessible Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Keyboard & Focus Trap</ModalTitle>
          <ModalDescription>
            Press Tab to move focus inside the modal. Press Escape to close.
          </ModalDescription>
        </ModalHeader>
        <ModalBody className="space-y-3">
          <Input placeholder="First focusable input" />
          <Input placeholder="Second focusable input" />
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="outline">Cancel</Button>
          </ModalClose>
          <Button color="primary">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
