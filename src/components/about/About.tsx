import { PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { IdCard } from './IdCard';

const FACTS = [
  { k: 'Based in', v: 'Chennai, India' },
  { k: 'Role', v: 'ML Engineer · Alai Labs' },
  { k: 'Studied', v: 'M.Sc Applied Data Science' },
  { k: 'Focus', v: 'CV · Agents · RAG · MLOps' },
  { k: 'Open to', v: 'Remote · Hybrid · Relocation' },
];

export function About() {
  const firstName = PROFILE.name.split(' ')[0];

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="ab-left reveal">
          <p className="eyebrow">
            <b>01</b> About me
          </p>
          <h2 className="ab-title" id="about-title">
            Hi, I&rsquo;m <span className="serif accent">{firstName}.</span>
          </h2>
          <p className="ab-lead">
            ML Engineer at Alai Labs in Chennai, shipping production AI across computer vision, LLM
            agents, and RAG &mdash; from R&amp;D all the way to deployment.
          </p>
          <p className="ab-sub">
            M.Sc Applied Data Science from SRM. I care about evaluation harnesses that catch silent
            regressions, retrieval that cites its sources, and problems where the right answer
            actually matters.
          </p>
          <div className="ab-links">
            <a className="al al-solid" href={asset('assets/Resume_PD.pdf')} download>
              Résumé <span aria-hidden="true">↓</span>
            </a>
            <a className="al" href={PROFILE.socials.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className="al" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <IdCard />

        <div className="ab-right reveal" style={vars({ '--i': 2 })}>
          <p className="eyebrow">Quick facts</p>
          <dl className="ab-facts">
            {FACTS.map((f, i) => (
              <div className="ab-fact" key={f.k} style={vars({ '--i': i })}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="ab-quote serif">&ldquo;Measured, monitored, maintained.&rdquo;</p>
        </div>
      </div>
    </section>
  );
}
