import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { tokens } from '../tokens/generated/tokens';
import {
  BRAND_ATTRIBUTE,
  DEFAULT_STORAGE_KEY,
  THEME_ATTRIBUTE,
  brandStorageKey,
} from './theme-constants';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

/** Brand accents are defined in src/tokens/brand.json — add a palette there to add a brand. */
export type BrandColor = keyof typeof tokens.brand;
export const brandPalettes = tokens.brand;
export const brandColors = Object.keys(brandPalettes) as BrandColor[];

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  brandColor: BrandColor;
  setTheme: (theme: Theme) => void;
  setBrandColor: (color: BrandColor) => void;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultBrandColor?: BrandColor;
  storageKey?: string;
  attribute?: string;
  forcedTheme?: ResolvedTheme;
  forcedBrandColor?: BrandColor;
  disableSystemTheme?: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system';

const isBrandColor = (value: unknown): value is BrandColor =>
  typeof value === 'string' && value in brandPalettes;

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode, sandboxed iframes).
  }
}

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultBrandColor = 'blue',
  storageKey = DEFAULT_STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
  forcedTheme,
  forcedBrandColor,
  disableSystemTheme = false,
}: ThemeProviderProps) {
  // Render with defaults so server and client markup match; stored values load before paint.
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [brandColorState, setBrandColorState] =
    useState<BrandColor>(defaultBrandColor);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');

  useIsomorphicLayoutEffect(() => {
    const storedTheme = readStorage(storageKey);
    const storedBrand = readStorage(brandStorageKey(storageKey));
    if (isTheme(storedTheme)) setThemeState(storedTheme);
    if (isBrandColor(storedBrand)) setBrandColorState(storedBrand);
    setSystemTheme(getSystemTheme());
  }, [storageKey]);

  useEffect(() => {
    if (disableSystemTheme) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? 'dark' : 'light');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [disableSystemTheme]);

  const resolvedTheme: ResolvedTheme =
    forcedTheme ??
    (theme === 'system' ? (disableSystemTheme ? 'light' : systemTheme) : theme);
  const brandColor = forcedBrandColor ?? brandColorState;

  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute(attribute, resolvedTheme);
    root.setAttribute(BRAND_ATTRIBUTE, brandColor);
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, brandColor, attribute]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      writeStorage(storageKey, next);
    },
    [storageKey],
  );

  const setBrandColor = useCallback(
    (next: BrandColor) => {
      setBrandColorState(next);
      writeStorage(brandStorageKey(storageKey), next);
    },
    [storageKey],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      brandColor,
      setTheme,
      setBrandColor,
      toggleTheme,
    }),
    [theme, resolvedTheme, brandColor, setTheme, setBrandColor, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return context;
}
