import { defineConfig } from 'tsup';
import type { Options } from 'tsup';
import { getEntries } from './scripts/entries.mjs';

// Entries are discovered from src/components — never list components here by hand.
// Dependencies and peerDependencies are externalized automatically by tsup.
const { client, server } = getEntries();

const shared: Options = {
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: false,
  splitting: true,
  // `treeshake: true` re-bundles with Rollup, which strips the "use client" banner.
  treeshake: false,
  target: 'es2022',
};

export default defineConfig([
  {
    ...shared,
    entry: client,
    // Bundling strips per-file directives, so every client entry and chunk gets one here.
    banner: { js: '"use client";' },
    onSuccess: 'node scripts/build-css.mjs',
  },
  {
    ...shared,
    entry: server,
  },
]);
