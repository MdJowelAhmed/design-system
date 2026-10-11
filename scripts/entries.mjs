// Single source of truth for package entry points.
// Every folder in src/components with an index.ts becomes `jowel-ahmed-design-system/<folder>`.
// Used by tsup.config.ts, scripts/sync-exports.mjs and the architecture test.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const COMPONENTS_DIR = 'src/components';

/** Entries that must not carry "use client" so they can be imported from React Server Components. */
const SERVER_SAFE_ENTRIES = {
  tokens: 'src/tokens/index.ts',
  utils: 'src/utils/index.ts',
  icons: 'src/icons/index.ts',
};

const CLIENT_ENTRIES = {
  index: 'src/index.ts',
  theme: 'src/theme/index.ts',
  hooks: 'src/hooks/index.ts',
  providers: 'src/providers/index.ts',
};

export function getComponentNames(root = process.cwd()) {
  const dir = join(root, COMPONENTS_DIR);
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, 'index.ts')))
    .map((d) => d.name)
    .sort();
}

export function getEntries(root = process.cwd()) {
  const components = Object.fromEntries(
    getComponentNames(root).map((name) => [
      name,
      `${COMPONENTS_DIR}/${name}/index.ts`,
    ]),
  );
  return {
    client: { ...CLIENT_ENTRIES, ...components },
    server: { ...SERVER_SAFE_ENTRIES },
  };
}

export function getEntryNames(root = process.cwd()) {
  const { client, server } = getEntries(root);
  return [...Object.keys(client), ...Object.keys(server)];
}
