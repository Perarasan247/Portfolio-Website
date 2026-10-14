import { ACHIEVEMENTS } from '../../data/achievements';
import type { Certificate } from '../../types';
import { vars } from '../../utils/cssVars';
import { IconArrowRight } from '../icons/Icons';

interface CredentialsProps {
  onOpenCert: (cert: Certificate) => void;
}

export function Credentials({ onOpenCert }: CredentialsProps) {
  return (
    <section className="section" id="credentials" aria-labelledby="credentials-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="stage reveal">
              <b>06</b> credentials · fine-tuning
            </p>
            <h2 className="section-title reveal" id="credentials-title">
              Certifications that shaped my thinking.
            </h2>
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Structured learning alongside applied work, from fundamentals to frontier AI.
          </p>
        </div>

        <ul className="cred-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={a.title} className="reveal" style={vars({ '--i': i })}>
              <button type="button" className="cred" onClick={() => onOpenCert(a)}>
                <span className="cred-top">
                  <span className="cred-ico mono" aria-hidden="true">
                    {a.ico}
                  </span>
                  <span className="mono tabular cred-year">{a.year}</span>
                </span>
                <span className="cred-title">{a.title}</span>
                <span className="cred-org">{a.org}</span>
                <span className="cred-desc">{a.desc}</span>
                <span className="cred-view mono">
                  View certificate <IconArrowRight />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
