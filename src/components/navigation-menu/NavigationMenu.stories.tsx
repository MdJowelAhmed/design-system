import type { Meta, StoryObj } from '@storybook/react';
import { Code2, Layers, Sparkles } from '../../icons';
import { Grid } from '../layout';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './index';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const MegaMenu: StoryObj<typeof NavigationMenu> = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Grid cols={2} className="w-[500px] gap-3 p-4">
              <div>
                <div className="mb-2 px-3 text-xs font-semibold text-neutral-400">
                  UI COMPONENTS
                </div>
                <NavigationMenuLink href="/button">
                  <div className="flex items-center gap-2 font-semibold">
                    <Layers className="text-primary-500 h-4 w-4" /> Button &
                    Inputs
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Accessible form controls and buttons.
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink href="/card">
                  <div className="flex items-center gap-2 font-semibold">
                    <Sparkles className="text-secondary-500 h-4 w-4" /> Cards &
                    Containers
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Compound layout cards and boxes.
                  </p>
                </NavigationMenuLink>
              </div>

              <div>
                <div className="mb-2 px-3 text-xs font-semibold text-neutral-400">
                  DEVELOPERS
                </div>
                <NavigationMenuLink href="/docs">
                  <div className="flex items-center gap-2 font-semibold">
                    <Code2 className="text-success-500 h-4 w-4" /> Documentation
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    API specifications and guides.
                  </p>
                </NavigationMenuLink>
              </div>
            </Grid>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] space-y-2 p-4">
              <NavigationMenuLink href="/enterprise">
                <div className="font-semibold">Enterprise SaaS</div>
                <p className="text-xs text-neutral-500">
                  Scale across multiple teams.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/startups">
                <div className="font-semibold">Startups</div>
                <p className="text-xs text-neutral-500">
                  Move fast with pre-built primitives.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing" active>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
