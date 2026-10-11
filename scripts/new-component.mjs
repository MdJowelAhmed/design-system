// Scaffolds a component that already satisfies every project convention.
//   pnpm new:component date-range      → src/components/date-range/DateRange.*
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const folder = process.argv[2];
if (!folder || !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(folder)) {
  console.error(
    'Usage: pnpm new:component <kebab-case-name>   e.g. pnpm new:component date-range',
  );
  process.exit(1);
}

const name = folder
  .split('-')
  .map((s) => s[0].toUpperCase() + s.slice(1))
  .join('');
const camel = name[0].toLowerCase() + name.slice(1);
const dir = join('src/components', folder);

if (existsSync(dir)) {
  console.error(`❌ ${dir} already exists`);
  process.exit(1);
}

const files = {
  [`${name}.tsx`]: `import { forwardRef } from 'react';
import { cn } from '../../utils';
import { ${camel}Variants } from './${name}.styles';
import type { ${name}Props } from './${name}.types';

export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  ({ variant, size, className, ...props }, ref) => (
    <div ref={ref} className={cn(${camel}Variants({ variant, size, className }))} {...props} />
  ),
);

${name}.displayName = '${name}';
`,
  [`${name}.styles.ts`]: `import { cva } from 'class-variance-authority';

// Only token colors (primary, neutral, success, ...) — the linter rejects the default Tailwind palette.
export const ${camel}Variants = cva('inline-flex items-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
      primary: 'bg-primary-600 text-white',
    },
    size: {
      sm: 'h-8 px-2 text-sm',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
`,
  [`${name}.types.ts`]: `import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { ${camel}Variants } from './${name}.styles';

export interface ${name}Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${camel}Variants> {}
`,
  [`${name}.test.tsx`]: `import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders its children', () => {
    render(<${name}>Hello</${name}>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
`,
  [`${name}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
  args: { children: '${name}' },
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary' },
};
`,
  'index.ts': `export * from './${name}';
export type * from './${name}.types';
`,
};

mkdirSync(dir, { recursive: true });
for (const [file, content] of Object.entries(files)) {
  writeFileSync(join(dir, file), content);
}

const barrelPath = 'src/components/index.ts';
const barrel = readFileSync(barrelPath, 'utf8');
writeFileSync(
  barrelPath,
  `${barrel.trimEnd()}\nexport * from './${folder}';\n`,
);

execSync('node scripts/sync-exports.mjs', { stdio: 'inherit' });

console.log(`
✅ Created ${dir}
   - ${name}.tsx / .styles.ts / .types.ts / .test.tsx / .stories.tsx / index.ts
   - added to src/components/index.ts
   - added "my-design-system/${folder}" to package.json exports
`);
