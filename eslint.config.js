const tseslint = require('typescript-eslint');
const reactHooks = require('eslint-plugin-react-hooks');

const PALETTE =
  'slate|gray|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const UTILITY =
  'bg|text|border|ring|ring-offset|outline|divide|from|via|to|fill|stroke|shadow|decoration|accent|caret|placeholder';
const paletteClass = `(^|[\\s:'"\`])(${UTILITY})(-[trblxy])?-(${PALETTE})-\\d{2,3}`;
const arbitraryColor = '\\[(#[0-9a-fA-F]{3,8}|rgba?\\(|hsla?\\()';

const tokenRule = (selector) => [
  {
    selector: `Literal[value=/${paletteClass}/]`,
    message:
      'Use design-token colors (primary, secondary, neutral, success, warning, danger, info) instead of the default Tailwind palette.',
  },
  {
    selector: `TemplateElement[value.raw=/${paletteClass}/]`,
    message:
      'Use design-token colors (primary, secondary, neutral, success, warning, danger, info) instead of the default Tailwind palette.',
  },
  {
    selector: `${selector}[value=/${arbitraryColor}/]`,
    message:
      'Hardcoded colors are not allowed. Add a token in src/tokens/*.json instead.',
  },
];

module.exports = tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'storybook-static/**',
      'coverage/**',
      'src/styles/generated/**',
      'src/tokens/generated/**',
    ],
  },
  ...tseslint.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/theme/**/*.{ts,tsx}',
      'src/providers/**/*.{ts,tsx}',
    ],
    ignores: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts'],
    rules: {
      'no-restricted-syntax': ['error', ...tokenRule('Literal')],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lucide-react',
              message:
                "Import icons from 'icons/set' (add the icon there if it is missing).",
            },
          ],
          patterns: [
            {
              regex: '^(\\.\\./)+icons$',
              message:
                "Import from 'icons/set'; the icons index re-exports all of Lucide and breaks tree-shaking.",
            },
          ],
        },
      ],
    },
  },
  {
    // Storybook `render` functions are components in practice.
    files: ['**/*.stories.tsx'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
  {
    files: ['src/tokens/sd.config.ts', '**/*.{js,cjs}', 'scripts/**/*.mjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },
);
