import { EDUCATION } from '../../data/education';
import { vars } from '../../utils/cssVars';
import { LogEntry } from '../experience/LogEntry';

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="stage reveal">
              <b>05</b> education · pre-training
            </p>
            <h2 className="section-title reveal" id="education-title">
              Where the foundation was built.
            </h2>
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Academic grounding in computer science and applied data science.
          </p>
        </div>

        <ol className="log" data-reveal>
          {EDUCATION.map((e, i) => (
            <LogEntry
              key={e.degree}
              index={i}
              when={e.when}
              title={e.degree}
              org={
                <>
                  <b>{e.institution}</b> · <span className="mono">CGPA {e.cgpa}</span>
                </>
              }
              bullets={e.bullets}
              tags={e.tags}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
