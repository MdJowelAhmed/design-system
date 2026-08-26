import type { ReactNode } from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SelectProps extends SelectPrimitive.SelectProps {
  options?: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  id?: string;
}
