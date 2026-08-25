import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Modal Component System', () => {
  it('renders closed by default and opens content when trigger is clicked', () => {
    render(
      <Modal>
        <ModalTrigger>Open Trigger</ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Test Modal Title</ModalTitle>
            <ModalDescription>Test Modal Description</ModalDescription>
          </ModalHeader>
          <ModalBody>Modal Body Content</ModalBody>
          <ModalFooter>
            <ModalClose>Cancel</ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>,
    );

    expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Trigger'));

    expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Test Modal Description')).toBeInTheDocument();
    expect(screen.getByText('Modal Body Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes when close button is clicked', () => {
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Close Test</ModalTitle>
          </ModalHeader>
          <ModalFooter>
            <ModalClose>Close Modal</ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>,
    );

    expect(screen.getByText('Close Test')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.queryByText('Close Test')).not.toBeInTheDocument();
  });

  it('handles controlled mode via open and onOpenChange', () => {
    const handleOpenChange = vi.fn();
    render(
      <Modal open={true} onOpenChange={handleOpenChange}>
        <ModalContent showCloseButton>
          <ModalHeader>
            <ModalTitle>Controlled Title</ModalTitle>
          </ModalHeader>
        </ModalContent>
      </Modal>,
    );

    expect(screen.getByText('Controlled Title')).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('applies custom size and variant classes', () => {
    render(
      <Modal defaultOpen>
        <ModalContent
          size="lg"
          variant="destructive"
          data-testid="modal-content"
        >
          <ModalHeader>
            <ModalTitle>Sizing Test</ModalTitle>
          </ModalHeader>
        </ModalContent>
      </Modal>,
    );

    const dialogContent = screen.getByTestId('modal-content');
    expect(dialogContent).toHaveClass('max-w-lg');
    expect(dialogContent).toHaveClass('border-red-500/40');
  });

  it('renders without close icon when showCloseButton is false', () => {
    render(
      <Modal defaultOpen>
        <ModalContent showCloseButton={false}>
          <ModalHeader>
            <ModalTitle>No Close Icon</ModalTitle>
          </ModalHeader>
        </ModalContent>
      </Modal>,
    );

    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });
});
