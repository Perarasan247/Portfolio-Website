/** Resolves a path under /public against the configured Vite base URL. */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + encodeURI(path.replace(/^\//, ''));
}
