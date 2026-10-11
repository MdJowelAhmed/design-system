import { fireEvent, render, screen } from '@testing-library/react';
import { Plus } from '../../icons';
import { describe, expect, it } from 'vitest';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './index';

describe('Accordion Component System', () => {
  it('renders accordion items and expands content on trigger click', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your refund policy?</AccordionTrigger>
          <AccordionContent>We offer a 30-day refund policy.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText('What is your refund policy?')).toBeInTheDocument();
    expect(
      screen.queryByText('We offer a 30-day refund policy.'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('What is your refund policy?'));
    expect(
      screen.getByText('We offer a 30-day refund policy.'),
    ).toBeInTheDocument();
  });

  it('supports multiple expanded items simultaneously when type="multiple"', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Section 2'));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('prevents expansion of disabled accordion item', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled Section</AccordionTrigger>
          <AccordionContent>Disabled Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText('Disabled Section');
    fireEvent.click(trigger);
    expect(screen.queryByText('Disabled Content')).not.toBeInTheDocument();
  });

  it('supports custom icon prop and AccordionIcon component', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger icon={<Plus data-testid="custom-plus" />}>
            Custom Icon Section
          </AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId('custom-plus')).toBeInTheDocument();
  });
});
