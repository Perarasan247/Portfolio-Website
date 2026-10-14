import { useEffect, useRef } from 'react';

interface CountUpProps {
  /** Final display value, e.g. "06", "9.15" or "99.71%". */
  value: string;
  duration?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a numeric string up from zero when it scrolls into view, keeping its
 * format (leading zeros, decimals, suffix). Frames write straight to the text
 * node so the count never re-renders React. Screen readers get the final value.
 */
export function CountUp({ value, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = /^(\d+)(?:\.(\d+))?(.*)$/.exec(value);
    if (!el || !match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, whole, frac = '', suffix] = match;
    const target = parseFloat(whole + (frac ? '.' + frac : ''));
    const format = (n: number) =>
      n.toFixed(frac.length).padStart(value.length - suffix.length, '0') + suffix;

    let frame = 0;
    el.textContent = format(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = t < 1 ? format(target * easeOutCubic(t)) : value;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
