import {
  BRAND_ATTRIBUTE,
  DEFAULT_STORAGE_KEY,
  THEME_ATTRIBUTE,
  brandStorageKey,
} from './theme-constants';

/**
 * Inline script that applies the stored theme and brand before first paint (prevents FOUC).
 * Place it in <head> before your CSS.
 *
 * @example Next.js app/layout.tsx
 *   <script dangerouslySetInnerHTML={{ __html: getThemeScriptTag() }} />
 */
export function getThemeScriptTag(
  storageKey = DEFAULT_STORAGE_KEY,
  attribute = THEME_ATTRIBUTE,
): string {
  const keys = JSON.stringify({
    theme: storageKey,
    brand: brandStorageKey(storageKey),
    attribute,
    brandAttribute: BRAND_ATTRIBUTE,
  });

  return `(function(){try{var k=${keys};var d=document.documentElement;var t=localStorage.getItem(k.theme)||'system';if(t==='system'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute(k.attribute,t);d.classList.add(t);d.style.colorScheme=t;var b=localStorage.getItem(k.brand);if(b){d.setAttribute(k.brandAttribute,b);}}catch(e){}})();`;
}

/** Script for the default storage key and attribute. */
export const themeScript = getThemeScriptTag();
