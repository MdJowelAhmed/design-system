// Regenerates the `exports` map in package.json from scripts/entries.mjs.
//   node scripts/sync-exports.mjs          → write
//   node scripts/sync-exports.mjs --check  → fail if package.json is out of date (CI)
import { readFileSync, writeFileSync } from 'node:fs';
import { getEntryNames } from './entries.mjs';

const STATIC_EXPORTS = {
  './styles.css': './dist/styles.css',
  './theme.css': './dist/theme.css',
  './package.json': './package.json',
};

const entryExport = (name) => ({
  import: { types: `./dist/${name}.d.mts`, default: `./dist/${name}.mjs` },
  require: { types: `./dist/${name}.d.ts`, default: `./dist/${name}.js` },
});

export function buildExports() {
  const names = getEntryNames()
    .filter((n) => n !== 'index')
    .sort();
  return {
    '.': entryExport('index'),
    ...Object.fromEntries(names.map((n) => [`./${n}`, entryExport(n)])),
    ...STATIC_EXPORTS,
  };
}

const isMain = process.argv[1]
  ?.replace(/\\/g, '/')
  .endsWith('scripts/sync-exports.mjs');

if (isMain) {
  const pkgPath = 'package.json';
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const expected = buildExports();
  const inSync = JSON.stringify(pkg.exports) === JSON.stringify(expected);

  if (process.argv.includes('--check')) {
    if (!inSync) {
      console.error(
        '❌ package.json "exports" is out of date. Run `pnpm sync:exports`.',
      );
      process.exit(1);
    }
    console.log('✅ package.json exports are in sync');
  } else if (!inSync) {
    pkg.exports = expected;
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log('✅ package.json exports updated');
  }
}
