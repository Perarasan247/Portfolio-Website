import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV_IDS, NAV_SECTIONS } from '../../data/navigation';
import { PROFILE } from '../../data/profile';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { vars } from '../../utils/cssVars';
import { IconArrowUpRight } from '../icons/Icons';

interface NavbarProps {
  progress: number;
}

export function Navbar({ progress }: NavbarProps) {
  const active = useScrollSpy(NAV_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const linksRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Slide the active pill under the current section's link.
  useLayoutEffect(() => {
    const measure = () => {
      const link = active
        ? linksRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`)
        : null;
      setPill(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !menuOpen;
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onResize = () => mq.matches && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const cls = [
    'nav',
    progress > 0.002 && 'scrolled',
    hidden && !menuOpen && 'hide',
    menuOpen && 'open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={cls}>
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Perarasan D — back to top" data-magnetic="0.2">
          <span className="brand-mark" aria-hidden="true">
            P<i>D</i>
          </span>
          <span className="brand-name">
            Perarasan<span className="accent">.</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary" ref={linksRef}>
          <span
            className={pill ? 'nav-pill on' : 'nav-pill'}
            style={pill ? vars({ '--x': pill.x + 'px', '--w': pill.w + 'px' }) : undefined}
            aria-hidden="true"
          />
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={'#' + s.id} aria-current={active === s.id ? 'location' : undefined}>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="nav-end">
          <a className="btn btn-primary nav-cta" href="#contact" data-magnetic="0.25">
            Let&rsquo;s talk <IconArrowUpRight />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-progress" aria-hidden="true">
        <span style={{ transform: 'scaleX(' + progress + ')' }} />
      </div>

      <div id="mobile-menu" className="mobile-menu" ref={menuRef}>
        <nav aria-label="Mobile">
          {NAV_SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={'#' + s.id}
              style={vars({ '--i': i })}
              aria-current={active === s.id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="mobile-foot" style={vars({ '--i': NAV_SECTIONS.length })}>
          <a className="btn btn-primary" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&rsquo;s talk <IconArrowUpRight />
          </a>
          <a className="mono mobile-mail" href={'mailto:' + PROFILE.email}>
            {PROFILE.email}
          </a>
        </div>
      </div>
    </header>
  );
}
