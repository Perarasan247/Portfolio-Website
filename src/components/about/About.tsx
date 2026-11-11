import { useRef } from 'react';
import { useScrollVar } from '../../hooks/useScrollVar';
import { vars } from '../../utils/cssVars';
import { SplitText } from '../common/SplitText';

const STATEMENT =
  'I build AI systems that actually ship — from medical imaging and autonomous agents to private, offline RAG — and I care about the small reliability decisions that keep models alive in production.';
const ACCENT = new Set([
  'ship',
  'medical',
  'imaging',
  'autonomous',
  'agents',
  'offline',
  'RAG',
  'production.',
]);

const FACTS = [
  { k: 'Based in', v: 'Chennai, India' },
  { k: 'Open to', v: 'Remote · Hybrid · Relocation' },
  { k: 'Languages', v: 'English · Tamil' },
  { k: 'Availability', v: 'Immediate · Full-time' },
];

const NOW = [
  {
    tag: 'Building',
    text: (
      <>
        <b>BoneVision</b> — multimodal medical AI for SRM Medical College, plus workflow automation
        and on-device RAG at Alai Labs.
      </>
    ),
  },
  {
    tag: 'Reading',
    text: 'LangGraph internals, on-device LLM patterns, and recent agentic-AI research.',
  },
  {
    tag: 'Seeking',
    text: 'Full-time AI/ML Engineer, Data Scientist, and Software Engineer roles.',
  },
  {
    tag: 'Learning',
    text: 'Multimodal architectures, agent orchestration, and edge deployment of language models.',
  },
];

export function About() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  useScrollVar(statementRef, 0.9, 0.55);
  const words = STATEMENT.split(' ');

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <p className="eyebrow reveal">
          <b>01</b> About me
        </p>
        <h2 className="sr-only" id="about-title">
          About
        </h2>

        <p className="statement" ref={statementRef} style={vars({ '--n': words.length })}>
          {words.map((w, i) => (
            <span key={i} className={ACCENT.has(w) ? 'sw hot' : 'sw'} style={vars({ '--w': i })}>
              {w}{' '}
            </span>
          ))}
        </p>

        <div className="about-grid">
          <div className="about-text">
            <SplitText
              as="h3"
              className="about-kicker"
              by="words"
              text={[
                { t: 'Engineer by training, ' },
                { t: 'builder by habit.', className: 'serif accent' },
              ]}
            />
            <p className="reveal">
              I&rsquo;m an M.Sc Applied Data Science graduate from SRM Institute of Science and
              Technology and an ML Engineer at Alai Labs in Chennai (joined as an AI Intern), where
              I built a workflow automation system and work across R&amp;D, generative AI products,
              and computer vision.
            </p>
            <p className="reveal" style={vars({ '--i': 1 })}>
              My recent work spans medical imaging (a multimodal system that predicts age, gender,
              and Bone Health Index from a single hand X-ray), agentic AI (an autonomous LangGraph
              agent that writes and debugs its own SQL and Python), generative AI (a fully offline
              RAG system running Gemma on a phone), and process automation (a LangGraph workflow
              that cut 5 hours of daily reporting to under 30 minutes).
            </p>
            <p className="reveal" style={vars({ '--i': 2 })}>
              I use AI coding tools daily to ship faster without losing rigor. I care about
              evaluation harnesses that catch silent regressions, retrieval pipelines that cite
              their sources, and problems where the right answer actually matters.
            </p>
          </div>

          <aside className="about-side">
            <dl className="facts">
              {FACTS.map((f, i) => (
                <div
                  className="fact spot reveal"
                  data-anim="scale"
                  key={f.k}
                  style={vars({ '--i': i })}
                >
                  <dt className="mono">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="now spot reveal" style={vars({ '--i': 2 })}>
              <div className="now-head">
                <span className="mono">Right now</span>
                <span className="now-live mono">
                  <span className="status-dot" aria-hidden="true" /> live
                </span>
              </div>
              <ul>
                {NOW.map((n, i) => (
                  <li key={n.tag} style={vars({ '--i': i })}>
                    <span className="now-tag mono">{n.tag}</span>
                    <span>{n.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
