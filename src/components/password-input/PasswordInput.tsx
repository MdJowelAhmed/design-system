import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from '../../icons/set';
import { cn } from '../../utils';
import { inputSlotVariants } from '../input/Input.styles';
import { Input } from '../input/Input';
import type { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showToggle = true,
      leftIcon,
      autoComplete = 'current-password',
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const visibilityToggle = showToggle ? (
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        className={cn(inputSlotVariants.actionIcon)}
      >
        {isVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </button>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        leftIcon={leftIcon ?? <Lock />}
        rightIcon={visibilityToggle}
        autoComplete={autoComplete}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
