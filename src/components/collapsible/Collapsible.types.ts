import type * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

export type CollapsibleProps = CollapsiblePrimitive.CollapsibleProps;
/**
 * Props for the CollapsibleTrigger component.
 *
 * **Accessibility**: If the trigger contains only an icon (no visible text),
 * you MUST pass `aria-label` describing the action (e.g. "Toggle navigation menu").
 * Also add `aria-hidden="true"` to the icon SVG to prevent double-announcement.
 */
export type CollapsibleTriggerProps =
  CollapsiblePrimitive.CollapsibleTriggerProps;
export type CollapsibleContentProps =
  CollapsiblePrimitive.CollapsibleContentProps;
