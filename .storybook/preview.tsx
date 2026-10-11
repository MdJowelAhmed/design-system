import type { Preview } from '@storybook/react';
import { ThemeProvider, brandColors } from '../src/theme';
import type { BrandColor, ResolvedTheme } from '../src/theme';
import '../src/styles/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'Color mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: 'Brand accent (from src/tokens/brand.json)',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: brandColors.map((color) => ({ value: color, title: color })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    brand: 'blue',
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider
        forcedTheme={context.globals.theme as ResolvedTheme}
        forcedBrandColor={context.globals.brand as BrandColor}
      >
        <div className="bg-background text-foreground min-h-[150px] p-6 font-sans transition-colors">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
