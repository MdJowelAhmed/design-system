# 🎨 My Design System

A modern, production-grade, accessible **React 19 Design System & UI Component Library** built with TypeScript, Tailwind CSS v4, Radix UI primitives, Framer Motion, and Style Dictionary v4 design tokens.

---

## ⚡ Key Features

- **🎨 45+ Production-Grade UI Components**: Button, Input, PasswordInput, SearchInput, Select, Combobox, Checkbox, Radio, Switch, Slider, Toggle, Field, FileUploader, DatePicker, DateRangePicker, Card, Table, Badge, Avatar, Separator, Typography, Layout, ScrollArea, Carousel, Breadcrumb, Pagination, Tabs, Accordion, Collapsible, Dropdown Menu, Context Menu, Menubar, Navigation Menu, Command (Palette), Dialog, Modal, Sheet, Popover, Hover Card, Tooltip, Toast, Alert, Progress, Skeleton, and Motion primitives.
- **🌓 Theme Engine**: Built-in `ThemeProvider`, `ThemeCustomizer`, and `useTheme` hook with Light, Dark, System preference support, and 8 brand accent palettes (`indigo`, `emerald`, `violet`, `rose`, `amber`, `blue`, `cyan`, `zinc`).
- **🪙 Design Tokens**: Powered by **Style Dictionary v4** auto-generating DTCG CSS variables and TypeScript constants.
- **📦 Single Repository Architecture & Modular Subpath Exports**: Clean bundling using `tsup` producing tree-shakeable **ESM**, **CommonJS**, **TypeScript declarations**, and subpath imports (`my-design-system/button`, `my-design-system/form`, `my-design-system/date-picker`, etc.).
- **🧪 100% Test Coverage for Primitives**: Unit testing using **Vitest** and `@testing-library/react`.
- **📖 Interactive Storybook 8**: Comprehensive documentation site and interactive component showcase.

---

## 📦 Installation

Install the package using your preferred package manager:

```bash
# pnpm
pnpm add my-design-system

# npm
npm install my-design-system

# yarn
yarn add my-design-system
```

---

## 🚀 Quick Start

### 1. Import Global Styles

Import the design system CSS variables and utilities at the root of your application (`src/main.tsx` or `app/layout.tsx`):

```tsx
import 'my-design-system/styles.css';
```

### 2. Wrap App with ThemeProvider

Wrap your root application component with `ThemeProvider`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'my-design-system';
import 'my-design-system/styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

### 3. Use Components in Your Application

```tsx
import React from 'react';
import {
  Button,
  DatePicker,
  FileUploader,
  ToastProvider,
  useToast,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'my-design-system';

function ProfileSection() {
  const { addToast } = useToast();

  return (
    <div className="space-y-4 p-6">
      {/* Toast Trigger */}
      <Button
        variant="primary"
        onClick={() =>
          addToast({
            title: 'Changes Saved!',
            description: 'Your settings have been updated successfully.',
            variant: 'success',
          })
        }
      >
        Save Settings
      </Button>

      {/* Date Picker */}
      <DatePicker placeholder="Select birth date" />

      {/* File Uploader */}
      <FileUploader maxFiles={3} accept="image/*" />
    </div>
  );
}
```

---

## 📖 Storybook & Live Documentation

Run Storybook locally:

```bash
pnpm run storybook
```

Build static Storybook:

```bash
pnpm run build-storybook
```

---

## 📄 License

MIT © [Md Jowel Ahmed](https://github.com/MdJowelAhmed)
