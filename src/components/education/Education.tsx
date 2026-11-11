import { EDUCATION } from '../../data/education';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { CountUp } from '../common/CountUp';
import { SplitText } from '../common/SplitText';

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow reveal">
              <b>05</b> Education
            </p>
            <SplitText
              as="h2"
              id="education-title"
              className="section-title"
              by="words"
              text={[
                { t: 'Where the ' },
                { t: 'foundation', className: 'serif' },
                { t: ' was built.' },
              ]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Academic grounding in computer science and applied data science.
          </p>
        </div>

        <ul className="edu-grid">
          {EDUCATION.map((e, i) => {
            const [score, scale] = e.cgpa.split('/').map((s) => s.trim());
            return (
              <li key={e.degree} className="reveal" data-anim="scale" style={vars({ '--i': i })}>
                <article className="edu-card spot spot-border">
                  <header className="edu-top">
                    {e.logo && (
                      <span className="edu-logo">
                        <img src={asset(e.logo)} alt={`${e.institution} logo`} loading="lazy" />
                      </span>
                    )}
                    <span className="mono edu-when">{e.when.replace(' · ', ' — ')}</span>
                  </header>
                  <h3 className="edu-degree">{e.degree}</h3>
                  <p className="edu-inst">{e.institution}</p>
                  <div className="edu-score">
                    <span className="edu-cgpa tabular">
                      <CountUp value={score} />
                    </span>
                    <span className="mono">
                      / {scale}
                      <br />
                      CGPA
                    </span>
                  </div>
                  <ul className="edu-bullets">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="chip-row">
                    {e.tags.map((t) => (
                      <span className="chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
