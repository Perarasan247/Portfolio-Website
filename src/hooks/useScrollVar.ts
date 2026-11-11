import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Writes the element's scroll progress through the viewport to the CSS
 * variable `--p` (0 → 1). Progress starts when the element's top reaches
 * `start` (fraction of viewport height) and ends when its bottom reaches `end`.
 */
export function useScrollVar(ref: RefObject<HTMLElement>, start = 0.85, end = 0.5): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end;
      const total = r.height + (from - to);
      const p = total > 0 ? (from - r.top) / total : 1;
      el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, start, end]);
}
