export function getComponentNames(root?: string): string[];
export function getEntries(root?: string): {
  client: Record<string, string>;
  server: Record<string, string>;
};
export function getEntryNames(root?: string): string[];
