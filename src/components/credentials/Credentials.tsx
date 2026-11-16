import { useEffect, useRef, useState } from 'react';
import { ACHIEVEMENTS } from '../../data/achievements';
import { PROFILE } from '../../data/profile';
import type { Certificate } from '../../types';
import { vars } from '../../utils/cssVars';
import { IconArrowUpRight } from '../icons/Icons';

interface CredentialsProps {
  onOpenCert: (cert: Certificate) => void;
}

const DEFAULT_TINT = '#a31c1b';
const pad = (n: number) => String(n).padStart(2, '0');
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Pinned horizontal gallery: the section is as tall as the track is wide, its
 * inner stage sticks to the viewport, and vertical scroll slides the cards
 * sideways. The card nearest the centre lifts and glows in its issuer's colour.
 * With reduced motion it falls back to a plain horizontally-scrollable row.
 */
export function Credentials({ onOpenCert }: CredentialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(-1);
  const [pinned] = useState(() => !prefersReducedMotion());
  const [seen, setSeen] = useState<boolean[]>(() => ACHIEVEMENTS.map(() => !pinned));

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (!pinned) return;

    let frame = 0;
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const size = () => {
      section.style.height = `${window.innerHeight + distance()}px`;
    };

    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const d = distance();
      const p = d ? Math.min(1, Math.max(0, -r.top / d)) : 0;
      track.style.transform = `translate3d(${(-p * d).toFixed(1)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      const vw = window.innerWidth;
      const cards = track.querySelectorAll<HTMLElement>('.hx-card');
      let best = -1;
      let bestDist = Infinity;
      const nowSeen: number[] = [];
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const dist = Math.abs(b.left + b.width / 2 - vw / 2);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
        if (b.left < vw * 0.9 && r.top < window.innerHeight * 0.5) nowSeen.push(i);
      });
      if (nowSeen.length) {
        setSeen((s) =>
          nowSeen.every((i) => s[i]) ? s : s.map((v, i) => v || nowSeen.includes(i)),
        );
      }
      const inStage = r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.6;
      setActive(inStage ? best : -1);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      size();
      onScroll();
    };

    size();
    update();
    document.fonts?.ready.then(onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      section.style.height = '';
      track.style.transform = '';
    };
  }, [pinned]);

  /** Keyboard users: scroll the page so a focused card slides into view. */
  const revealCard = (el: HTMLElement) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned || !section || !track) return;
    const card = el.closest<HTMLElement>('.hx-card, .hx-end');
    if (!card) return;
    const d = Math.max(0, track.scrollWidth - window.innerWidth);
    const x = Math.min(
      d,
      Math.max(0, card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2),
    );
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + x, behavior: 'instant' as ScrollBehavior });
  };

  const total = pad(ACHIEVEMENTS.length);

  return (
    <section
      className={'hx' + (pinned ? '' : ' hx-static')}
      id="credentials"
      aria-labelledby="credentials-title"
      ref={sectionRef}
    >
      <div className="hx-sticky">
        <div className="container hx-head">
          <div>
            <p className="eyebrow">
              <b>06</b> Credentials
            </p>
            <h2 className="section-title" id="credentials-title">
              Certified <span className="serif">learning.</span>
            </h2>
          </div>
          <div className="hx-meta">
            <p className="hx-sub">
              Structured learning alongside applied work. Scroll to browse, click a card to view the
              certificate.
            </p>
            <div className="hx-progress" aria-hidden="true">
              <span ref={barRef} />
            </div>
          </div>
        </div>

        <div className="hx-viewport">
          <ul className="hx-track" ref={trackRef}>
            {ACHIEVEMENTS.map((a, i) => (
              <li
                key={a.title}
                className={
                  'hx-card' + (i === active ? ' is-active' : '') + (seen[i] ? ' is-seen' : '')
                }
                style={vars({ '--tint': a.tint ?? DEFAULT_TINT })}
              >
                <button
                  type="button"
                  className="hx-hit"
                  onClick={() => onOpenCert(a)}
                  onFocus={(e) => revealCard(e.currentTarget)}
                  aria-label={`${a.title}, ${a.org}, ${a.year}. View certificate`}
                  data-cursor="View"
                />
                <div className="hx-top">
                  <span className="hx-logo mono" aria-hidden="true">
                    {a.ico}
                  </span>
                  <span className="hx-idx mono" aria-hidden="true">
                    {pad(i + 1)} / {total}
                  </span>
                </div>
                <div className="hx-bottom">
                  <div className="hx-text">
                    <h3 className="hx-label">{a.title}</h3>
                    <p className="hx-cap mono">{a.org}</p>
                    <p className="hx-detail">{a.desc}</p>
                    <span className="hx-view" aria-hidden="true">
                      View certificate <IconArrowUpRight />
                    </span>
                  </div>
                  <div className="hx-num tabular" aria-hidden="true">
                    <span className="hx-pre">&rsquo;</span>
                    {a.year.slice(-2)}
                  </div>
                </div>
              </li>
            ))}
            <li className="hx-end">
              <span className="serif">and counting</span>
              <a
                className="hx-arrow"
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="More certifications on LinkedIn"
                onFocus={(e) => revealCard(e.currentTarget)}
              >
                <IconArrowUpRight />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
