import type { CSSProperties } from 'react';

/** Typed inline style for CSS custom properties, e.g. vars({ '--i': 2 }). */
export function vars(values: Record<`--${string}`, string | number>): CSSProperties {
  return values as CSSProperties;
}
