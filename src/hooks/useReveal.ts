import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Adds the `in` class to `.reveal` elements (and `[data-reveal]` groups, whose
 * children animate instead of the element itself) as they scroll into view.
 * The root only gets `reveal-ready` (which hides unrevealed content) once the
 * observer is running, and never when the user prefers reduced motion.
 */
export function useReveal(rootRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    const pending = '.reveal:not(.in), [data-reveal]:not(.in)';
    const observe = (el: Element) => io.observe(el);
    root.querySelectorAll(pending).forEach(observe);
    root.classList.add('reveal-ready');

    // Re-observe .reveal nodes added later (filters, conditional renders, etc.), and any
    // element whose `in` class gets wiped by a React re-render or hot reload.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes') {
          if (m.target instanceof Element && m.target.matches(pending)) observe(m.target);
          continue;
        }
        for (const node of m.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(pending)) observe(node);
          node.querySelectorAll(pending).forEach(observe);
        }
      }
    });
    mo.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, [rootRef]);
}
