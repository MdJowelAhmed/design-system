// Produces the two published stylesheets:
//   dist/styles.css → precompiled, works in any app (no Tailwind needed)
//   dist/theme.css  → Tailwind v4 preset for apps that use Tailwind and want the same tokens
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const STYLES = 'src/styles';
const OUT = 'dist';

function compileStyles() {
  const pkgPath = require.resolve('@tailwindcss/cli/package.json');
  const { bin } = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const cli = join(
    dirname(pkgPath),
    typeof bin === 'string' ? bin : bin.tailwindcss,
  );

  execFileSync(
    process.execPath,
    [cli, '-i', `${STYLES}/build.css`, '-o', `${OUT}/styles.css`, '--minify'],
    { stdio: ['ignore', 'ignore', 'inherit'] },
  );
}

function buildThemePreset() {
  const read = (file) => readFileSync(join(STYLES, file), 'utf8');
  const withoutLocalImports = read('theme.css').replace(
    /^@import '\.\/generated\/[^']+';\r?\n/gm,
    '',
  );

  const preset = [
    '/* my-design-system Tailwind v4 preset. Usage: @import "tailwindcss"; @import "my-design-system/theme.css"; */',
    read('generated/tokens.css'),
    read('generated/theme.css'),
    withoutLocalImports,
    "@source './**/*.{js,mjs}';",
    '',
  ].join('\n');

  writeFileSync(join(OUT, 'theme.css'), preset);
}

mkdirSync(OUT, { recursive: true });
compileStyles();
buildThemePreset();
console.log('✅ CSS built (dist/styles.css, dist/theme.css)');
