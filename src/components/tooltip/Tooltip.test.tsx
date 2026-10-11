import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './Tooltip';

describe('Tooltip', () => {
  it('renders trigger correctly', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover Me</TooltipTrigger>
          <TooltipContent>Tooltip Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText('Hover Me')).toBeInTheDocument();
  });
});
