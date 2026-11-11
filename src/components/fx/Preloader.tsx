import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../../data/profile';

interface PreloaderProps {
  onDone: () => void;
}

const DURATION = 1700;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Full-screen intro: name rises letter by letter while a counter runs to 100, then two panels wipe up. */
export function Preloader({ onDone }: PreloaderProps) {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.classList.add('is-loading');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let exitTimer = 0;
    const finish = () => {
      setDone(true);
      document.body.classList.remove('is-loading');
      onDone();
      exitTimer = window.setTimeout(() => setGone(true), 1400);
    };
    if (reduce) {
      finish();
      return () => window.clearTimeout(exitTimer);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const v = easeInOut(t);
      if (countRef.current)
        countRef.current.textContent = String(Math.round(v * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${v})`;
      if (t < 1) frame = requestAnimationFrame(tick);
      else finish();
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      document.body.classList.remove('is-loading');
    };
  }, [onDone]);

  if (gone) return null;
  const letters = PROFILE.name.split('');

  return (
    <div className={done ? 'loader done' : 'loader'} aria-hidden="true">
      <div className="loader-panel p1" />
      <div className="loader-panel p2" />
      <div className="loader-inner">
        <div className="loader-name">
          {letters.map((ch, i) => (
            <span key={i} style={{ ['--d' as string]: i }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
          <span className="dot" style={{ ['--d' as string]: letters.length }}>
            .
          </span>
        </div>
        <div className="loader-bar">
          <span ref={barRef} style={{ transform: 'scaleX(0)' }} />
        </div>
        <div className="loader-row">
          <span>ML Engineer · Portfolio ’26</span>
          <span className="loader-count tabular" ref={countRef}>
            000
          </span>
        </div>
      </div>
    </div>
  );
}
