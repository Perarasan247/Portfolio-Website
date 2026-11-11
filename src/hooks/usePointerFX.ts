import { useEffect } from 'react';

/**
 * Delegated pointer effects for fine pointers:
 *  - `[data-magnetic]` elements drift toward the cursor (via --bx / --by)
 *  - `.spot` elements get the pointer position as --mx / --my (spotlight glow)
 *  - `[data-tilt]` elements get --rx / --ry rotation for a 3D tilt
 */
export function usePointerFX(): void {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const reset = (el: HTMLElement | null, props: string[]) => {
      if (!el) return;
      for (const p of props) el.style.removeProperty(p);
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const m = target.closest<HTMLElement>('[data-magnetic]');
      if (m !== magnet) {
        reset(magnet, ['--bx', '--by']);
        magnet = m;
      }
      if (m) {
        const r = m.getBoundingClientRect();
        const strength = Number(m.dataset.magnetic) || 0.3;
        m.style.setProperty('--bx', (e.clientX - (r.left + r.width / 2)) * strength + 'px');
        m.style.setProperty('--by', (e.clientY - (r.top + r.height / 2)) * strength + 'px');
      }

      const s = target.closest<HTMLElement>('.spot');
      if (s) {
        const r = s.getBoundingClientRect();
        s.style.setProperty('--mx', e.clientX - r.left + 'px');
        s.style.setProperty('--my', e.clientY - r.top + 'px');
      }

      const t = target.closest<HTMLElement>('[data-tilt]');
      if (t !== tilt) {
        reset(tilt, ['--rx', '--ry']);
        tilt = t;
      }
      if (t) {
        const r = t.getBoundingClientRect();
        const max = Number(t.dataset.tilt) || 6;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        t.style.setProperty('--rx', (-py * max).toFixed(2) + 'deg');
        t.style.setProperty('--ry', (px * max).toFixed(2) + 'deg');
      }
    };
    const onLeave = () => {
      reset(magnet, ['--bx', '--by']);
      reset(tilt, ['--rx', '--ry']);
      magnet = tilt = null;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);
}
