// Fails if generated token files or package.json exports are stale,
// i.e. someone edited src/tokens/*.json or a component folder without regenerating.
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIRS = ['src/styles/generated', 'src/tokens/generated'];

const snapshot = () =>
  Object.fromEntries(
    DIRS.flatMap((dir) =>
      readdirSync(dir).map((f) => [
        join(dir, f),
        readFileSync(join(dir, f), 'utf8'),
      ]),
    ),
  );

const before = snapshot();
execSync('pnpm build:tokens', { stdio: 'ignore' });
const after = snapshot();

const stale = Object.keys({ ...before, ...after }).filter(
  (f) => before[f] !== after[f],
);
if (stale.length) {
  console.error('❌ Generated token files were out of date (now regenerated):');
  for (const f of stale) console.error(`   ${f}`);
  console.error('   Commit the regenerated files.');
  process.exit(1);
}
console.log('✅ Generated token files are up to date');

execSync('node scripts/sync-exports.mjs --check', { stdio: 'inherit' });
