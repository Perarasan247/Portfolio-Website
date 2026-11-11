import { useState } from 'react';
import { SKILLS } from '../../data/skills';
import type { Skill } from '../../types';
import { vars } from '../../utils/cssVars';
import { Marquee } from '../common/Marquee';
import { SplitText } from '../common/SplitText';

type Level = Skill['l'];

const LEVEL_NAMES: Record<Level, string> = { 3: 'Daily', 2: 'Fluent', 1: 'Familiar' };
const LEVELS: Level[] = [3, 2, 1];

const ALL_SKILLS = SKILLS.flatMap((c) => c.items);
const COUNTS: Record<Level, number> = {
  3: ALL_SKILLS.filter((s) => s.l === 3).length,
  2: ALL_SKILLS.filter((s) => s.l === 2).length,
  1: ALL_SKILLS.filter((s) => s.l === 1).length,
};
const ROWS = SKILLS.map((c) => ({ ...c, items: [...c.items].sort((a, b) => b.l - a.l) }));
const BLURBS: Record<string, string> = {
  'Languages & Frameworks': 'The everyday toolkit for APIs, data, and shipping.',
  'Machine Learning & AI': 'Modeling, vision, and NLP — from notebooks to trained weights.',
  'Generative AI': 'LLM apps, retrieval, and multi-agent orchestration.',
  'Cloud & DevOps': 'Containers, pipelines, and experiment tracking.',
};

export function Skills() {
  const [focus, setFocus] = useState<Level | null>(null);

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow reveal">
              <b>02</b> Stack
            </p>
            <SplitText
              as="h2"
              id="skills-title"
              className="section-title"
              by="words"
              text={[
                { t: 'Tools I reach for, ' },
                { t: 'weighted', className: 'serif' },
                { t: ' by how often they ship.' },
              ]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Comfortable across the ML stack, from data pipelines to deployment. Filter by how often
            I use each tool.
          </p>
        </div>

        <div className="seg reveal" role="group" aria-label="Highlight skills by usage">
          <button type="button" aria-pressed={focus === null} onClick={() => setFocus(null)}>
            All <span className="mono tabular">{ALL_SKILLS.length}</span>
          </button>
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={focus === l}
              onClick={() => setFocus(focus === l ? null : l)}
            >
              <span className="lvl" data-level={l} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {LEVEL_NAMES[l]} <span className="mono tabular">{COUNTS[l]}</span>
            </button>
          ))}
        </div>

        <div className="bento" data-focus={focus ?? undefined}>
          {ROWS.map((row, r) => (
            <article
              className="bento-card spot spot-border reveal"
              key={row.cat}
              style={vars({ '--i': r })}
              data-anim="blur"
            >
              <header className="bento-head">
                <span className="bento-num mono">{row.num}</span>
                <span className="bento-count mono tabular">
                  {row.items.length} <small>tools</small>
                </span>
              </header>
              <h3 className="bento-title">{row.cat}</h3>
              <p className="bento-blurb">{BLURBS[row.cat]}</p>
              <ul className="pills">
                {row.items.map((s, c) => (
                  <li key={s.n} className="pill" data-level={s.l} style={vars({ '--c': c })}>
                    <span>{s.n}</span>
                    <span className="lvl" data-level={s.l} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="sr-only">, {LEVEL_NAMES[s.l]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="skills-strip" aria-hidden="true">
        <Marquee speed={60}>
          {ALL_SKILLS.map((s) => (
            <span className="strip-item" key={s.n}>
              {s.n}
            </span>
          ))}
        </Marquee>
        <Marquee speed={70} reverse>
          {[...ALL_SKILLS].reverse().map((s) => (
            <span className="strip-item outline" key={s.n}>
              {s.n}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
