import { useState } from 'react';
import { SKILLS } from '../../data/skills';
import type { Skill } from '../../types';
import { vars } from '../../utils/cssVars';

type Level = Skill['l'];

const LEVEL_NAMES: Record<Level, string> = { 3: 'Daily', 2: 'Fluent', 1: 'Familiar' };
const LEVELS: Level[] = [3, 2, 1];

const ALL_SKILLS = SKILLS.flatMap((c) => c.items);
const COUNTS: Record<Level, number> = {
  3: ALL_SKILLS.filter((s) => s.l === 3).length,
  2: ALL_SKILLS.filter((s) => s.l === 2).length,
  1: ALL_SKILLS.filter((s) => s.l === 1).length,
};

// Within each row, most-used first so every row reads as a gradient.
const ROWS = SKILLS.map((c) => ({ ...c, items: [...c.items].sort((a, b) => b.l - a.l) }));
const WIDEST = Math.max(...ROWS.map((r) => r.items.length));

export function Skills() {
  const [focus, setFocus] = useState<Level | null>(null);

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="stage reveal">
              <b>02</b> stack · weight matrix
            </p>
            <h2 className="section-title reveal" id="skills-title">
              Tools I reach for, weighted by how often they end up in production.
            </h2>
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Comfortable across the ML stack, from data pipelines to deployment. Brighter cells are
            the ones I use most.
          </p>
        </div>

        <div className="matrix-legend reveal" role="group" aria-label="Highlight skills by usage">
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
              <span className="swatch" data-level={l} aria-hidden="true" />
              {LEVEL_NAMES[l]} <span className="mono tabular">{COUNTS[l]}</span>
            </button>
          ))}
        </div>

        <div className="matrix" data-reveal data-focus={focus ?? undefined}>
          <div className="matrix-bar mono" aria-hidden="true">
            <span>weights.npy</span>
            <span>
              shape ({ROWS.length} × {WIDEST}) · sorted by usage
            </span>
          </div>

          <div className="matrix-rows">
            {ROWS.map((row, r) => (
              <div className="matrix-row" key={row.cat}>
                <h3 className="matrix-label" style={vars({ '--d': r * 2 })}>
                  <span className="mono matrix-num">{row.num}</span>
                  <span>{row.cat}</span>
                  <span className="mono matrix-count">{row.items.length}</span>
                </h3>
                <ul className="matrix-cells">
                  {row.items.map((s, c) => (
                    <li
                      key={s.n}
                      className="cell"
                      data-level={s.l}
                      style={vars({ '--d': r * 2 + c })}
                    >
                      <span className="cell-name">{s.n}</span>
                      <span className="cell-pips" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="sr-only">, {LEVEL_NAMES[s.l]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="matrix-scale mono" aria-hidden="true">
            <span>familiar</span>
            <span className="matrix-scale-bar" />
            <span>daily</span>
          </div>
        </div>
      </div>
    </section>
  );
}
