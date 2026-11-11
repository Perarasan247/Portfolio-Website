import { ACHIEVEMENTS } from '../../data/achievements';
import type { Certificate } from '../../types';
import { vars } from '../../utils/cssVars';
import { SplitText } from '../common/SplitText';
import { IconArrowUpRight } from '../icons/Icons';

interface CredentialsProps {
  onOpenCert: (cert: Certificate) => void;
}

export function Credentials({ onOpenCert }: CredentialsProps) {
  return (
    <section className="section" id="credentials" aria-labelledby="credentials-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow reveal">
              <b>06</b> Credentials
            </p>
            <SplitText
              as="h2"
              id="credentials-title"
              className="section-title"
              by="words"
              text={[
                { t: 'Certifications that ' },
                { t: 'shaped', className: 'serif' },
                { t: ' my thinking.' },
              ]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Structured learning alongside applied work, from fundamentals to frontier AI.
          </p>
        </div>

        <ul className="cred-list">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={a.title} className="reveal" style={vars({ '--i': i % 3 })}>
              <button
                type="button"
                className="cred spot"
                onClick={() => onOpenCert(a)}
                data-cursor="View"
              >
                <span className="cred-idx mono tabular" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="cred-ico mono" aria-hidden="true">
                  {a.ico}
                </span>
                <span className="cred-main">
                  <span className="cred-title">{a.title}</span>
                  <span className="cred-desc">{a.desc}</span>
                </span>
                <span className="cred-org">{a.org}</span>
                <span className="cred-year mono tabular">{a.year}</span>
                <span className="cred-go" aria-hidden="true">
                  <IconArrowUpRight />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
