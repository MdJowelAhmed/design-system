# My Design System

An accessible **React 18/19 component library** built with TypeScript, Tailwind CSS v4, Radix UI, Framer Motion and Style Dictionary v4 design tokens.

- **45+ components**: forms, overlays, navigation, data display, layout and motion.
- **One source of truth for design**: every color, font, radius, shadow and easing lives in `src/tokens/*.json`. Change a token and the CSS variables, Tailwind utilities, TypeScript constants and every component update together.
- **Theming**: light, dark and system modes, plus 8 brand palettes (`blue` (default), `indigo`, `violet`, `emerald`, `rose`, `amber`, `cyan`, `zinc`), switchable at runtime.
- **Tree-shakeable**: ESM + CJS + types, with a subpath for every component (`my-design-system/button`, `my-design-system/date-picker`, ...). Works in the Next.js App Router (`"use client"` is added by the build).

---

## Installation

```bash
pnpm add my-design-system
```

`react` and `react-dom` (18 or 19) are peer dependencies.

## Styles: pick one

**A. No Tailwind in your app** — import the precompiled stylesheet once:

```tsx
import 'my-design-system/styles.css';
```

**B. Your app already uses Tailwind v4** — use the preset instead, so you get one stylesheet and can use the design-system tokens (`bg-primary-600`, `text-muted-foreground`, ...) in your own code:

```css
/* app.css */
@import 'tailwindcss';
@import 'my-design-system/theme.css';
```

## Theme provider

```tsx
import { ThemeProvider } from 'my-design-system/theme';

<ThemeProvider defaultTheme="system" defaultBrandColor="blue">
  <App />
</ThemeProvider>;
```

For SSR (Next.js), avoid a flash of the wrong theme by injecting the script in `<head>`:

```tsx
import { themeScript } from 'my-design-system/theme';

<script dangerouslySetInnerHTML={{ __html: themeScript }} />;
```

## Usage

```tsx
import { Button } from 'my-design-system/button';
import { ToastProvider, useToast } from 'my-design-system/toast';
import { Search } from 'my-design-system/icons';

function SaveButton() {
  const { addToast } = useToast();
  return (
    <Button
      color="primary"
      leftIcon={<Search />}
      onClick={() => addToast({ title: 'Saved', variant: 'success' })}
    >
      Save
    </Button>
  );
}
```

Status variants are the same everywhere: `info | success | warning | danger`.

Icons are not re-exported from the root entry (their names clash with components); import them from `my-design-system/icons`.

---

## Development

```bash
pnpm install
pnpm storybook          # http://localhost:6006
pnpm validate           # everything CI checks
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the project rules, how tokens work and how to add a component.

## License

MIT © [Md Jowel Ahmed](https://github.com/MdJowelAhmed)
