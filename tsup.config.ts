import { defineConfig } from 'tsup';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    tokens: 'src/tokens/index.ts',
    theme: 'src/theme/index.ts',
    hooks: 'src/hooks/index.ts',
    icons: 'src/icons/index.ts',
    utils: 'src/utils/index.ts',
    button: 'src/components/button/index.ts',
    input: 'src/components/input/index.ts',
    textarea: 'src/components/textarea/index.ts',
    select: 'src/components/select/index.ts',
    checkbox: 'src/components/checkbox/index.ts',
    radio: 'src/components/radio/index.ts',
    switch: 'src/components/switch/index.ts',
    badge: 'src/components/badge/index.ts',
    avatar: 'src/components/avatar/index.ts',
    card: 'src/components/card/index.ts',
    alert: 'src/components/alert/index.ts',
    separator: 'src/components/separator/index.ts',
    dialog: 'src/components/dialog/index.ts',
    modal: 'src/components/modal/index.ts',
    tooltip: 'src/components/tooltip/index.ts',
    'dropdown-menu': 'src/components/dropdown-menu/index.ts',
    tabs: 'src/components/tabs/index.ts',
    accordion: 'src/components/accordion/index.ts',
    toast: 'src/components/toast/index.ts',
    form: 'src/components/form/index.ts',
    motion: 'src/components/motion/index.ts',
    skeleton: 'src/components/skeleton/index.ts',
    progress: 'src/components/progress/index.ts',
    table: 'src/components/table/index.ts',
    sheet: 'src/components/sheet/index.ts',
    'hover-card': 'src/components/hover-card/index.ts',
    slider: 'src/components/slider/index.ts',
    toggle: 'src/components/toggle/index.ts',
    breadcrumb: 'src/components/breadcrumb/index.ts',
    pagination: 'src/components/pagination/index.ts',
    popover: 'src/components/popover/index.ts',
    'date-picker': 'src/components/date-picker/index.ts',
    typography: 'src/components/typography/index.ts',
    carousel: 'src/components/carousel/index.ts',
    'context-menu': 'src/components/context-menu/index.ts',
    menubar: 'src/components/menubar/index.ts',
    'navigation-menu': 'src/components/navigation-menu/index.ts',
    collapsible: 'src/components/collapsible/index.ts',
    'scroll-area': 'src/components/scroll-area/index.ts',
    combobox: 'src/components/combobox/index.ts',
    command: 'src/components/command/index.ts',
    layout: 'src/components/layout/index.ts',
    providers: 'src/providers/index.ts',
    'file-uploader': 'src/components/file-uploader/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    'lucide-react',
    'framer-motion',
    'react-hook-form',
    'zod',
    '@hookform/resolvers',
  ],
  onSuccess: async () => {
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }
    if (existsSync('src/styles/styles.css')) {
      copyFileSync('src/styles/styles.css', join('dist', 'styles.css'));
      console.log('✅ Coerced styles.css into dist/styles.css');
    }
  },
});
