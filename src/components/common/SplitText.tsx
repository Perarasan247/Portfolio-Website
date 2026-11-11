import type { CSSProperties, ElementType } from 'react';

export type Segment = string | { t: string; className?: string };

interface SplitTextProps {
  /** Plain text, or segments where some carry a class (e.g. an accent word). */
  text: Segment | Segment[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Split into characters (default) or animate whole words. */
  by?: 'chars' | 'words';
  /** Stagger offset added to every unit (in --i steps of 90ms). */
  delay?: number;
  style?: CSSProperties;
}

/**
 * Masked text reveal: each word sits in an overflow-hidden box and its
 * characters (or the word) rise into place when `.in` lands via useReveal.
 * Screen readers get the plain string from a visually hidden copy.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className,
  id,
  by = 'chars',
  delay = 0,
  style,
}: SplitTextProps) {
  const segments = (Array.isArray(text) ? text : [text]).map((s) =>
    typeof s === 'string' ? { t: s } : s,
  );
  const label = segments.map((s) => s.t).join('');

  // Flatten into words (with their class) and spaces, numbering units for the stagger.
  type Token = { space: true } | { space: false; word: string; cls?: string; start: number };
  const tokens: Token[] = [];
  let d = 0;
  for (const seg of segments) {
    for (const part of seg.t.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        tokens.push({ space: true });
        continue;
      }
      tokens.push({ space: false, word: part, cls: seg.className, start: d });
      d += by === 'words' ? 3 : part.length;
    }
  }

  return (
    <Tag
      id={id}
      className={'split reveal' + (className ? ' ' + className : '')}
      style={{ ...style, ['--i' as string]: delay }}
    >
      <span className="sr-only">{label}</span>
      {tokens.map((tok, i) => {
        if (tok.space) {
          return (
            <span key={i} aria-hidden="true">
              {' '}
            </span>
          );
        }
        return (
          <span className={'split-w ' + (tok.cls ?? '')} key={i} aria-hidden="true">
            {by === 'words' ? (
              <span className="split-c" style={{ ['--d' as string]: tok.start }}>
                {tok.word}
              </span>
            ) : (
              tok.word.split('').map((ch, ci) => (
                <span className="split-c" key={ci} style={{ ['--d' as string]: tok.start + ci }}>
                  {ch}
                </span>
              ))
            )}
          </span>
        );
      })}
    </Tag>
  );
}
