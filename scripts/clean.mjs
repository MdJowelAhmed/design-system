// Cross-platform `rm -rf` for the paths passed as arguments.
import { rmSync } from 'node:fs';

for (const target of process.argv.slice(2)) {
  rmSync(target, { recursive: true, force: true });
}
