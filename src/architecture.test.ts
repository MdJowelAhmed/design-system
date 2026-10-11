/**
 * Project conventions, enforced. If one of these fails, follow the message —
 * or run `pnpm new:component <name>` which scaffolds everything correctly.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getComponentNames } from '../scripts/entries.mjs';
import { buildExports } from '../scripts/sync-exports.mjs';

const ROOT = process.cwd();
const COMPONENTS = join(ROOT, 'src/components');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const componentNames = getComponentNames(ROOT);
const sourceFiles = walk(join(ROOT, 'src')).filter((f) =>
  /\.(ts|tsx)$/.test(f),
);

describe('architecture', () => {
  it.each(componentNames)('%s has a test and a story', (name) => {
    const files = walk(join(COMPONENTS, name));
    expect(
      files.some((f) => /\.test\.tsx?$/.test(f)),
      `add a *.test.tsx to src/components/${name}`,
    ).toBe(true);
    expect(
      files.some((f) => f.endsWith('.stories.tsx')),
      `add a *.stories.tsx to src/components/${name}`,
    ).toBe(true);
  });

  it('every component folder is re-exported from src/components/index.ts', () => {
    const barrel = readFileSync(join(COMPONENTS, 'index.ts'), 'utf8');
    const missing = componentNames.filter(
      (n) => !barrel.includes(`from './${n}'`),
    );
    expect(
      missing,
      "add `export * from './<name>'` to src/components/index.ts",
    ).toEqual([]);
  });

  it('package.json exports match the component folders', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    expect(pkg.exports, 'run `pnpm sync:exports`').toEqual(buildExports());
  });

  it("source files do not declare 'use client' (the build adds it)", () => {
    const offenders = sourceFiles
      .filter((f) => /^\s*['"]use client['"]/m.test(readFileSync(f, 'utf8')))
      .map((f) => relative(ROOT, f));
    expect(offenders).toEqual([]);
  });

  it('generated token files are not edited by hand', () => {
    for (const file of [
      'src/styles/generated/tokens.css',
      'src/tokens/generated/tokens.ts',
    ]) {
      expect(readFileSync(join(ROOT, file), 'utf8')).toContain('DO NOT EDIT');
    }
  });
});
