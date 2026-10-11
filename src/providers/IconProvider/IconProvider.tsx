import { createContext, forwardRef, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon, LucideProps } from '../../icons/set';
import { defaultIcons } from '../../icons/registry';
import { cn } from '../../utils';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const iconSizeMap: Record<IconSize, string> = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

export type IconRegistry = Record<string, LucideIcon>;

export interface IconProps extends Omit<LucideProps, 'size' | 'ref'> {
  /** Name of a registered icon (kebab-case), e.g. "chevron-down". */
  name?: string;
  /** Render a specific icon component directly; takes precedence over `name`. */
  icon?: LucideIcon;
  size?: IconSize;
}

export interface IconContextValue {
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  /** Extra icons available to `<Icon name>`, merged over the defaults. */
  icons?: IconRegistry;
}

const IconContext = createContext<IconContextValue>({
  size: 'md',
  strokeWidth: 2,
});

export function IconProvider({
  children,
  size = 'md',
  color,
  strokeWidth = 2,
  icons,
}: IconContextValue & { children: ReactNode }) {
  const value = useMemo(
    () => ({ size, color, strokeWidth, icons }),
    [size, color, strokeWidth, icons],
  );
  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

/**
 * Renders an icon with provider-level defaults.
 * Only registered icons can be referenced by name so unused Lucide icons stay tree-shakeable.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, icon, size, color, strokeWidth, className, ...props }, ref) => {
    const context = useContext(IconContext);
    const Component =
      icon ??
      (name ? (context.icons?.[name] ?? defaultIcons[name]) : undefined) ??
      defaultIcons['help-circle']!;

    return (
      <Component
        ref={ref}
        aria-hidden={props['aria-label'] ? undefined : true}
        strokeWidth={strokeWidth ?? context.strokeWidth ?? 2}
        color={color ?? context.color ?? 'currentColor'}
        className={cn(iconSizeMap[size ?? context.size ?? 'md'], className)}
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';
