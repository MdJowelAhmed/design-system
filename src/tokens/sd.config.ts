import StyleDictionary from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';

/*
 * Single source of truth for every visual value in the design system.
 *
 *   src/tokens/*.json
 *     ├─ src/styles/generated/tokens.css  → `--ds-*` CSS variables (+ dark & brand overrides)
 *     ├─ src/styles/generated/theme.css   → Tailwind `@theme` mapping (`bg-primary-600` → `--ds-color-primary-600`)
 *     └─ src/tokens/generated/*.ts        → typed constants for JS consumers
 *
 * Edit the JSON, run `pnpm build:tokens`, and every component picks up the change.
 */

const GENERATED_HEADER =
  '/* Auto-generated from src/tokens/*.json - DO NOT EDIT. Run `pnpm build:tokens`. */';
const MODES = ['light', 'dark'] as const;
const REFERENCE = /^\{([^}]+)\}$/;

const cssName = (path: string[]) => `--ds-${path.join('-')}`;

/** Keeps `{color.primary.500}` references live as `var(--ds-color-primary-500)` so brand overrides cascade. */
const cssValue = (token: TransformedToken): string => {
  const original = token.original.value;
  if (typeof original === 'string') {
    const match = REFERENCE.exec(original);
    if (match) return `var(${cssName(match[1]!.split('.'))})`;
  }
  return String(token.value);
};

const isModeToken = (token: TransformedToken) =>
  token.path[0] === 'color' &&
  (MODES as readonly string[]).includes(token.path[token.path.length - 1]!);

/** `color.muted.foreground.light` → `['color', 'muted', 'foreground']` */
const semanticPath = (token: TransformedToken) => token.path.slice(0, -1);

const uniqueSemanticPaths = (tokens: TransformedToken[]) => [
  ...new Map(
    tokens
      .filter(isModeToken)
      .map((t) => [semanticPath(t).join('.'), semanticPath(t)]),
  ).values(),
];

// ─────────────────────────────────────────────
// CSS variables
// ─────────────────────────────────────────────
StyleDictionary.registerFormat({
  name: 'css/ds-variables',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    const semantic = uniqueSemanticPaths(tokens);

    const root = tokens.map((t) => `  ${cssName(t.path)}: ${cssValue(t)};`);
    const modeAlias = (mode: (typeof MODES)[number]) =>
      semantic.map((p) => `  ${cssName(p)}: var(${cssName([...p, mode])});`);

    const brands = Object.keys(
      (dictionary.tokens as Record<string, Record<string, unknown>>).brand ??
        {},
    );
    const primaryShades = tokens
      .filter((t) => t.path[0] === 'color' && t.path[1] === 'primary')
      .map((t) => t.path[2]!);

    const brandBlocks = brands.map(
      (brand) =>
        `[data-brand='${brand}'] {\n${primaryShades
          .map(
            (shade) =>
              `  ${cssName(['color', 'primary', shade])}: var(${cssName(['brand', brand, shade])});`,
          )
          .join('\n')}\n}`,
    );

    return [
      GENERATED_HEADER,
      `:root {\n${[...root, ...modeAlias('light')].join('\n')}\n}`,
      `:where([data-theme='dark'], .dark) {\n${modeAlias('dark').join('\n')}\n}`,
      ...brandBlocks,
      '',
    ].join('\n\n');
  },
});

// ─────────────────────────────────────────────
// Tailwind v4 theme mapping
// ─────────────────────────────────────────────
type ThemeRule = {
  match: (path: string[]) => boolean;
  name: (path: string[]) => string;
  /** Media queries can't read CSS variables, so some namespaces need literal values. */
  literal?: boolean;
};

const themeRules: ThemeRule[] = [
  {
    match: (p) => p[0] === 'typography' && p[1] === 'fontFamily',
    name: (p) => `--font-${p[2]}`,
  },
  {
    match: (p) => p[0] === 'typography' && p[1] === 'fontSize',
    name: (p) => `--text-${p[2]}`,
  },
  {
    match: (p) => p[0] === 'typography' && p[1] === 'fontWeight',
    name: (p) => `--font-weight-${p[2]}`,
  },
  {
    match: (p) => p[0] === 'typography' && p[1] === 'lineHeight',
    name: (p) => `--leading-${p[2]}`,
  },
  {
    match: (p) => p[0] === 'typography' && p[1] === 'letterSpacing',
    name: (p) => `--tracking-${p[2]}`,
  },
  { match: (p) => p[0] === 'radius', name: (p) => `--radius-${p[1]}` },
  { match: (p) => p[0] === 'shadow', name: (p) => `--shadow-${p[1]}` },
  {
    match: (p) => p[0] === 'motion' && p[1] === 'easing' && p[2] !== 'linear',
    name: (p) => `--ease-${p[2]}`,
  },
  {
    match: (p) => p[0] === 'breakpoint',
    name: (p) => `--breakpoint-${p[1]}`,
    literal: true,
  },
];

StyleDictionary.registerFormat({
  name: 'css/tailwind-theme',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;

    const colors = [
      ...tokens
        .filter((t) => t.path[0] === 'color' && !isModeToken(t))
        .map(
          (t) =>
            `  --color-${t.path.slice(1).join('-')}: var(${cssName(t.path)});`,
        ),
      ...uniqueSemanticPaths(tokens).map(
        (p) => `  --color-${p.slice(1).join('-')}: var(${cssName(p)});`,
      ),
    ];

    const inline: string[] = [];
    const literal: string[] = [];
    for (const token of tokens) {
      const rule = themeRules.find((r) => r.match(token.path));
      if (!rule) continue;
      if (rule.literal) {
        literal.push(`  ${rule.name(token.path)}: ${token.value};`);
      } else {
        inline.push(`  ${rule.name(token.path)}: var(${cssName(token.path)});`);
      }
    }

    return [
      GENERATED_HEADER,
      '/* Only design-token colors exist; the Tailwind default palette (blue-600, red-500, ...) is removed on purpose. */',
      '@theme {\n  --color-*: initial;\n}',
      `@theme inline {\n${[...colors, ...inline].join('\n')}\n}`,
      `@theme {\n${literal.join('\n')}\n}`,
      '',
    ].join('\n\n');
  },
});

// ─────────────────────────────────────────────
// TypeScript outputs
// ─────────────────────────────────────────────
StyleDictionary.registerFormat({
  name: 'typescript/constants',
  format: ({ dictionary }) => {
    const result: Record<string, unknown> = {};
    for (const token of dictionary.allTokens) {
      let current = result;
      for (const key of token.path.slice(0, -1)) {
        current[key] ??= {};
        current = current[key] as Record<string, unknown>;
      }
      current[token.path[token.path.length - 1]!] = token.value;
    }
    return `${GENERATED_HEADER}\nexport const tokens = ${JSON.stringify(result, null, 2)} as const;\n\nexport type DesignTokens = typeof tokens;\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/css-vars',
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens.map(
      (t) => `  '${t.path.join('.')}': 'var(${cssName(t.path)})',`,
    );
    return `${GENERATED_HEADER}\nexport const cssVars = {\n${lines.join('\n')}\n} as const;\n\nexport type CSSVarKey = keyof typeof cssVars;\n`;
  },
});

async function build() {
  const sd = new StyleDictionary({
    source: ['src/tokens/*.json'],
    log: { verbosity: 'silent' },
    platforms: {
      css: {
        buildPath: 'src/styles/generated/',
        files: [
          { destination: 'tokens.css', format: 'css/ds-variables' },
          { destination: 'theme.css', format: 'css/tailwind-theme' },
        ],
      },
      ts: {
        buildPath: 'src/tokens/generated/',
        files: [
          { destination: 'tokens.ts', format: 'typescript/constants' },
          { destination: 'css-vars.ts', format: 'typescript/css-vars' },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();
  console.log('✅ Design tokens built');
}

build().catch((err) => {
  console.error('❌ Token build failed:', err);
  process.exit(1);
});
