import { useTheme, brandColors, brandPalettes } from './ThemeProvider';
import { cn } from '../utils';

const THEME_MODES = ['light', 'dark', 'system'] as const;

export interface ThemeCustomizerProps {
  className?: string;
}

export function ThemeCustomizer({ className }: ThemeCustomizerProps) {
  const { brandColor, setBrandColor, theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        'space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
          Theme Mode
        </h4>
        <div
          role="radiogroup"
          aria-label="Theme mode"
          className="flex gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800"
        >
          {THEME_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={theme === mode}
              onClick={() => setTheme(mode)}
              className={cn(
                'focus-ring rounded-md px-2 py-1 text-xs font-medium capitalize transition-all',
                theme === mode
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-neutral-50'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400',
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
          Brand Accent Color
        </h4>
        <div
          role="radiogroup"
          aria-label="Brand color"
          className="flex flex-wrap gap-2"
        >
          {brandColors.map((color) => {
            const isSelected = brandColor === color;
            return (
              <button
                key={color}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`${color} brand color`}
                onClick={() => setBrandColor(color)}
                style={{ backgroundColor: brandPalettes[color][500] }}
                className={cn(
                  'focus-ring h-6 w-6 rounded-full transition-transform',
                  isSelected
                    ? 'scale-110 ring-2 ring-neutral-900 ring-offset-2 dark:ring-neutral-50'
                    : 'hover:scale-105',
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
