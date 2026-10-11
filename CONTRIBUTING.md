# Contributing

These rules exist so that many people can work on this library and it still looks and behaves like one product. Most of them are **enforced automatically** (ESLint, the architecture test in `src/architecture.test.ts`, git hooks and CI); if you break one, the error message tells you how to fix it.

## Setup

```bash
pnpm install        # pnpm version is pinned via "packageManager"
pnpm storybook      # develop components here
```

| Command                     | What it does                                                      |
| --------------------------- | ----------------------------------------------------------------- |
| `pnpm new:component <name>` | Scaffold a component with every required file, wired into exports |
| `pnpm build:tokens`         | Regenerate CSS/TS from `src/tokens/*.json`                        |
| `pnpm validate`             | Everything CI runs: generated files, types, lint, format, tests   |
| `pnpm build`                | Build the package into `dist/`                                    |
| `pnpm lint:fix` / `format`  | Auto-fix lint and formatting                                      |

Git hooks: `pre-commit` lints and formats staged files, `pre-push` runs type-check and tests.

## 1. Design tokens are the single source of truth

```
src/tokens/*.json  ──pnpm build:tokens──►  src/styles/generated/tokens.css   (--ds-* CSS variables, light/dark, brands)
                                           src/styles/generated/theme.css    (Tailwind @theme: bg-primary-600, text-muted-foreground…)
                                           src/tokens/generated/*.ts         (typed constants)
```

- **Change a color/font/radius/shadow?** Edit the JSON, run `pnpm build:tokens`, commit the JSON _and_ the generated files. Every component updates.
- **Never edit files in `generated/`** — CI regenerates them and fails if they differ.
- **Components only use token colors**: `primary`, `secondary`, `neutral`, `success`, `warning`, `danger`, `info`, and the semantic `background`, `foreground`, `muted`, `muted-foreground`, `border`, `ring`.
  The default Tailwind palette (`bg-blue-500`, `text-gray-700`, …) and hardcoded colors (`bg-[#ff0000]`) are removed from the theme _and_ rejected by ESLint.
- Brand palettes live in `src/tokens/brand.json`; `primary` points at the active brand, so `data-brand="emerald"` re-colors everything.
- Status variants are always named `info | success | warning | danger` (type `StatusVariant` in `src/utils/types.ts`).

## 2. Component structure

Create components with `pnpm new:component my-thing`. Every folder in `src/components/` must contain:

```
src/components/my-thing/
  MyThing.tsx          component (forwardRef + displayName)
  MyThing.styles.ts    cva variants (styling lives here, not inline)
  MyThing.types.ts     public props
  MyThing.test.tsx     Vitest + Testing Library
  MyThing.stories.tsx  Storybook (tags: ['autodocs'])
  index.ts             public API of the folder
```

The folder name automatically becomes the subpath `my-design-system/my-thing` — tsup entries and `package.json#exports` are generated from the folders (`scripts/entries.mjs`). Don't edit `exports` by hand; run `pnpm sync:exports`.

The architecture test fails if a component is missing a test or story, isn't re-exported from `src/components/index.ts`, or `exports` is stale.

## 3. Code conventions

- **No `'use client'` in source files.** The build adds it to client entries; `tokens`, `utils` and `icons` stay server-safe.
- **Icons**: import from the local `icons` module (`../../icons`), never from `lucide-react` directly.
- **Reuse, don't re-implement**: `cn()` for class names, `mergeRefs`, `useClipboard`, `useDisclosure`, `Field*` for label/message/counter, Radix primitives for overlays/menus. If you need a new shared helper, add it to `src/hooks` or `src/utils` with a test.
- **Accessibility is required**: interactive elements are real `<button>`s with `type="button"`, icon-only buttons have `aria-label`, errors use `role="alert"` and are linked with `aria-describedby`, decorative icons get `aria-hidden`.
- **Controlled + uncontrolled**: inputs support both `value/onChange` and `defaultValue`.
- **TypeScript**: no `any`, no unused variables (prefix with `_` if intentional), `import type` for types.
- **Animations**: use the theme animations (`animate-popover-in/out`, `animate-content-in/out`, `animate-overlay-in/out`, `animate-fade-in/out`, `animate-accordion-down/up`) defined in `src/styles/theme.css`.

## 4. Pull requests

1. Branch from `main`.
2. `pnpm validate` passes locally.
3. Visual changes are reviewed in Chromatic (PR builds are not auto-accepted).
4. Note breaking API changes in the PR description.
