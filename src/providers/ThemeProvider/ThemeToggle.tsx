import { forwardRef } from 'react';
import { Monitor, Moon, Sun } from '../../icons/set';
import { IconButton } from '../../components/button';
import { useTheme } from '../../theme';
import type { IconButtonProps } from '../../components/button';

export interface ThemeToggleProps extends Omit<
  Partial<IconButtonProps>,
  'children' | 'aria-label'
> {
  'aria-label'?: string;
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      'aria-label': ariaLabel = 'Toggle theme',
      variant = 'ghost',
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const { theme, resolvedTheme, toggleTheme } = useTheme();

    return (
      <IconButton
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        aria-label={ariaLabel}
        onClick={toggleTheme}
        {...props}
      >
        {theme === 'system' ? (
          <Monitor className="h-4 w-4 transition-transform duration-200" />
        ) : resolvedTheme === 'dark' ? (
          <Moon className="text-secondary-400 h-4 w-4 transition-transform duration-200" />
        ) : (
          <Sun className="text-warning-500 h-4 w-4 transition-transform duration-200" />
        )}
      </IconButton>
    );
  },
);

ThemeToggle.displayName = 'ThemeToggle';
