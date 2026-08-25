// ─────────────────────────────────────────────
// Design System — Unified Exports
// ─────────────────────────────────────────────

// Components & UI Elements
export * from './components';
// Explicit re-exports to resolve UI component vs icon collisions
export {
  Badge,
  Table,
  Sheet,
  Calendar,
  Heading,
  Text,
  Label,
  Link,
  Code,
  Blockquote,
  Command,
  Container,
  Grid,
  FileInput,
  Modal,
} from './components';

// Design Tokens & System Constants
export * from './tokens';

// Theme Provider & Script Helpers
export * from './theme';

// Custom React Hooks
export * from './hooks';

// Icon System
export * from './icons';

// Utility Functions & Types
export * from './utils';
export { formatDate } from './utils';

// Global Platform Providers
export * from './providers';
export { Icon } from './providers';
