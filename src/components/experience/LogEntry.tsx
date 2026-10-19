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

/** One checkpoint in a training-log style timeline. */
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
    <li className="log-entry reveal" style={vars({ '--i': index })}>
      <div className="log-when mono tabular">
        {latest && <span className="log-latest">latest</span>}
        <span>{when.replace(' · ', ' — ')}</span>
      </div>
      <span className="log-node" aria-hidden="true" />
      <article className="log-card">
        <div className="log-card-head">
          <div className="log-card-titles">
            <h3 className="log-title">{title}</h3>
            <p className="log-org">{org}</p>
          </div>
          {logo && (
            <div className="log-logo-badge">
              <img src={logo} alt={logoAlt ?? ''} className="log-logo-img" loading="lazy" />
            </div>
          )}
        </div>
        <ul className="log-bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="log-foot">
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
