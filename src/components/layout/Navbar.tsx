import { useEffect, useState } from 'react';
import { NAV_IDS, NAV_SECTIONS } from '../../data/navigation';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { IconClose, IconMenu } from '../icons/Icons';
import { RunMeter } from './RunMeter';

export function Navbar() {
  const progress = useScrollProgress();
  const active = useScrollSpy(NAV_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const mq = window.matchMedia('(min-width: 960px)');
    const onResize = () => mq.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const scrolled = progress > 0.002;

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Perarasan D — back to top">
          <span className="brand-mark" aria-hidden="true" />
          <span className="mono">
            perarasan<span className="brand-tld">.dev</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={'#' + s.id} aria-current={active === s.id ? 'location' : undefined}>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="nav-end">
          <RunMeter progress={progress} />
          <a className="btn btn-primary nav-cta" href="#contact">
            Let&rsquo;s talk
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div className="nav-progress" aria-hidden="true">
        <span style={{ transform: 'scaleX(' + progress + ')' }} />
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {NAV_SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={'#' + s.id}
              aria-current={active === s.id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          ))}
          <a className="btn btn-primary" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&rsquo;s talk
          </a>
        </nav>
      </div>
    </header>
  );
}
