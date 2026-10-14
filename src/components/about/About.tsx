import { vars } from '../../utils/cssVars';

const CONFIG = [
  { k: 'based', v: 'Chennai, India' },
  { k: 'open_to', v: 'Remote · Hybrid · Relocation' },
  { k: 'languages', v: 'English · Tamil' },
  { k: 'available', v: 'Immediate · Full-time' },
];

const NOW = [
  {
    tag: 'build',
    tone: 'accent',
    text: (
      <>
        <b>BoneVision</b> — multimodal medical AI for SRM Medical College, plus workflow automation
        and on-device RAG at Alai Labs.
      </>
    ),
  },
  {
    tag: 'read',
    tone: 'cyan',
    text: 'LangGraph internals, on-device LLM patterns, and recent agentic-AI research.',
  },
  {
    tag: 'apply',
    tone: 'amber',
    text: 'Open to full-time AI/ML Engineer, Data Scientist, and Software Engineer roles.',
  },
  {
    tag: 'learn',
    tone: 'cyan',
    text: 'Multimodal architectures, agent orchestration, and edge deployment of language models.',
  },
];

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="stage reveal">
              <b>01</b> about · model card
            </p>
            <h2 className="section-title reveal" id="about-title">
              I build <em className="hl-accent">AI systems</em> that actually{' '}
              <em className="hl-amber">ship</em>.
            </h2>
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            M.Sc Applied Data Science graduate, currently shipping production AI across computer
            vision, agents, and generative AI.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="lead reveal">
              I&rsquo;m an M.Sc Applied Data Science Graduate at SRM Institute of Science and
              Technology and an ML Engineer at Alai Labs in Chennai (joined as an AI Intern), where
              I built a workflow automation system and work across R&amp;D, generative AI products,
              and computer vision.
            </p>
            <p className="reveal" style={vars({ '--i': 1 })}>
              My recent work spans medical imaging (a multimodal deep learning system for SRM
              Medical College that predicts age, gender, and Bone Health Index from a single hand
              X-ray), agentic AI (an autonomous LangGraph agent that writes and debugs its own SQL
              and Python to answer data questions, plus multi-agent orchestration experiments),
              generative AI (a fully offline RAG system running on Gemma 4 on a phone), and process
              automation (a LangGraph workflow at Alai Labs that cut 5 hours of daily reporting down
              to under 30 minutes).
            </p>
            <p className="reveal" style={vars({ '--i': 2 })}>
              I&rsquo;m fluent with AI coding tools and use them daily to ship faster without losing
              rigor. The things I care about are evaluation harnesses that catch silent regressions,
              retrieval pipelines that cite their sources, and the small reliability decisions that
              keep models alive in production. Equally comfortable in PyTorch and in shipping code,
              and drawn to problems where the right answer actually matters.
            </p>
          </div>

          <aside className="about-side">
            <div className="panel reveal" style={vars({ '--i': 1 })}>
              <div className="panel-head mono">
                <span>config.yaml</span>
              </div>
              <dl className="config mono">
                {CONFIG.map((c) => (
                  <div key={c.k}>
                    <dt>{c.k}:</dt>
                    <dd>{c.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="panel reveal" style={vars({ '--i': 2 })}>
              <div className="panel-head mono">
                <span>now.log</span>
                <span className="panel-live">
                  <span className="status-dot" aria-hidden="true" /> live
                </span>
              </div>
              <ul className="now-list">
                {NOW.map((n) => (
                  <li key={n.tag}>
                    <span className={'now-tag mono tone-' + n.tone}>{n.tag}</span>
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
