import type { ReactNode } from 'react';
import { vars } from '../../utils/cssVars';

interface LogEntryProps {
  index: number;
  when: string;
  title: string;
  org: ReactNode;
  bullets: string[];
  tags: string[];
  latest?: boolean;
  action?: ReactNode;
  logo?: string;
  logoAlt?: string;
}

/** One stop on the scroll-drawn timeline. */
export function LogEntry({
  index,
  when,
  title,
  org,
  bullets,
  tags,
  latest,
  action,
  logo,
  logoAlt,
}: LogEntryProps) {
  return (
    <li className={'tl-item' + (latest ? ' latest' : '')} style={vars({ '--i': index })}>
      <span className="tl-node" aria-hidden="true" />
      <div className="tl-when reveal" data-anim="left">
        <span className="mono tabular">{when.replace(' · ', ' — ')}</span>
        {latest && <span className="tl-badge mono">Current</span>}
      </div>
      <article className="tl-card spot spot-border reveal" data-anim="right">
        <header className="tl-head">
          {logo && (
            <span className="tl-logo">
              <img src={logo} alt={logoAlt ?? ''} loading="lazy" />
            </span>
          )}
          <div>
            <h3 className="tl-title">{title}</h3>
            <p className="tl-org">{org}</p>
          </div>
        </header>
        <ul className="tl-bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="tl-foot">
          <div className="chip-row">
            {tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          {action}
        </div>
      </article>
    </li>
  );
}
