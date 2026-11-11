import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], input, label, select, textarea';

/**
 * Dot + trailing ring cursor for fine pointers. The ring grows over interactive
 * elements and shows a label for elements with `data-cursor="Label"`.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add('cursor-on');
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let frame = 0;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      const text = t?.dataset.cursor;
      ring.classList.toggle('is-hover', !!t && !text);
      ring.classList.toggle('is-label', !!text);
      if (text) label.textContent = text;
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');
    const onLeave = () => {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('cursor-on');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring is-hidden" ref={ringRef} aria-hidden="true">
        <span className="cursor-label" ref={labelRef} />
      </div>
      <div className="cursor-dot is-hidden" ref={dotRef} aria-hidden="true" />
    </>
  );
}
