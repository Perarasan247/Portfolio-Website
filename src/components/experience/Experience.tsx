import { useEffect, useRef } from 'react';
import { EXPERIENCE } from '../../data/experience';
import type { Certificate, Experience as ExperienceItem } from '../../types';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { SplitText } from '../common/SplitText';
import { IconArrowRight, IconFile } from '../icons/Icons';

interface ExperienceProps {
  onOpenCert: (cert: Certificate) => void;
}

function toCertificate(e: ExperienceItem, cert: string): Certificate {
  return { ico: e.ico, title: e.role, org: e.co, year: e.when, cert };
}

const isCurrent = (e: ExperienceItem) => /present/i.test(e.when);

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Sortable start date from a `when` like "Feb 2026 · May 2026" (year * 12 + month). */
function startOf(e: ExperienceItem): number {
  const [start] = e.when.split('·');
  const year = Number(start.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS.indexOf(start.trim().slice(0, 3).toLowerCase());
  return year * 12 + Math.max(0, month);
}

/** Oldest first, current role last — the "Next" card follows it. */
const TIMELINE = [...EXPERIENCE].sort((a, b) => startOf(a) - startOf(b));

/** Big year shown beside each stop: "Now" for the current role, else the start year. */
function yearOf(e: ExperienceItem): string {
  if (isCurrent(e)) return 'Now';
  return e.when.match(/\d{4}/)?.[0] ?? '';
}

/**
 * Fills the centre spine as the list scrolls through the viewport (via `--p`)
 * and lights each stop once the fill reaches its node.
 */
function useJourney(ref: React.RefObject<HTMLOListElement>, start = 0.75, end = 0.55) {
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const stops = Array.from(list.querySelectorAll<HTMLElement>('.j-stop'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      list.style.setProperty('--p', '1');
      stops.forEach((s) => s.classList.add('is-lit'));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * (start - end);
      const p = Math.min(1, Math.max(0, (vh * start - r.top) / total));
      list.style.setProperty('--p', p.toFixed(4));
      for (const s of stops) {
        const node = s.querySelector<HTMLElement>('.j-node');
        const at = ((node?.offsetTop ?? 0) + s.offsetTop) / r.height;
        s.classList.toggle('is-lit', p >= at - 0.02);
      }
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

export function Experience({ onOpenCert }: ExperienceProps) {
  const listRef = useRef<HTMLOListElement>(null);
  useJourney(listRef);

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow reveal">
              <b>04</b> Experience
            </p>
            <SplitText
              as="h2"
              id="experience-title"
              className="section-title"
              by="words"
              text={[{ t: 'Where I’ve ' }, { t: 'worked.', className: 'serif' }]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            From project trainee to AI intern to ML engineer &mdash; one path, scroll to follow it.
          </p>
        </div>

        <ol className="journey" ref={listRef}>
          <span className="j-spine" aria-hidden="true">
            <span className="j-fill" />
          </span>

          {TIMELINE.map((e, i) => {
            const current = isCurrent(e);
            const cert = e.cert;
            return (
              <li
                key={`${e.co}-${e.role}`}
                className={'j-stop ' + (i % 2 ? 'is-right' : 'is-left')}
              >
                <div className="j-year" aria-hidden="true">
                  {yearOf(e)}
                </div>
                <span className={'j-node' + (current ? ' is-now' : '')} aria-hidden="true" />
                <article className="j-card">
                  <div className="j-meta">
                    <span className={'j-kind mono' + (current ? ' is-now' : '')}>
                      {current ? 'Current' : 'Experience'}
                    </span>
                    <span className="mono j-when">{e.when.replace(' · ', ' — ')}</span>
                  </div>
                  <header className="j-head">
                    {e.logo && (
                      <span className="j-logo">
                        <img src={asset(e.logo)} alt={`${e.co} logo`} loading="lazy" />
                      </span>
                    )}
                    <div>
                      <h3 className="j-title">{e.role}</h3>
                      <p className="j-org">
                        {e.co}
                        <span> · {e.where}</span>
                      </p>
                    </div>
                  </header>
                  <ul className="j-bullets">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="j-foot">
                    <ul className="chip-row" aria-label="Technologies">
                      {e.stack.map((t) => (
                        <li className="chip" key={t}>
                          {t}
                        </li>
                      ))}
                    </ul>
                    {cert && (
                      <button
                        type="button"
                        className="text-btn"
                        onClick={() => onOpenCert(toCertificate(e, cert))}
                      >
                        <IconFile /> View certificate
                      </button>
                    )}
                  </div>
                </article>
              </li>
            );
          })}

          <li className={'j-stop is-next ' + (TIMELINE.length % 2 ? 'is-right' : 'is-left')}>
            <div className="j-year serif" aria-hidden="true">
              Next
            </div>
            <span className="j-node" aria-hidden="true" />
            <article className="j-card">
              <div className="j-meta">
                <span className="j-kind mono">What&rsquo;s next</span>
                <span className="mono j-when">Open</span>
              </div>
              <h3 className="j-title">Your team?</h3>
              <p className="j-org">
                Open to AI/ML Engineer, Data Scientist, and Software Engineer roles.
              </p>
              <a className="j-cta" href="#contact">
                Let&rsquo;s talk <IconArrowRight />
              </a>
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}
