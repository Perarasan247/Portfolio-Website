import { useState } from 'react';
import { DOMAIN_LABELS, PROJECTS } from '../../data/projects';
import type { Project, ProjectDomain } from '../../types';
import { vars } from '../../utils/cssVars';
import { IconArrowRight, IconArrowUpRight } from '../icons/Icons';
import { ProjectArt } from './ProjectArt';

const FILTERS: Array<ProjectDomain | 'all'> = ['all', 'cv', 'agents', 'ml'];

interface ProjectsProps {
  onSelect: (project: Project) => void;
}

export function Projects({ onSelect }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectDomain | 'all'>('all');
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.domain === filter);
  const [previewId, setPreviewId] = useState(PROJECTS[0].id);
  const preview = visible.find((p) => p.id === previewId) ?? visible[0];

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="stage reveal">
              <b>03</b> projects · experiment runs
            </p>
            <h2 className="section-title reveal" id="projects-title">
              Projects that shipped, taught, or surprised me.
            </h2>
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Open any run for the full case study: the problem, the approach, and the measured
            impact.
          </p>
        </div>

        <div className="filters reveal" role="group" aria-label="Filter projects by domain">
          {FILTERS.map((f) => {
            const count =
              f === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.domain === f).length;
            return (
              <button
                key={f}
                type="button"
                className="filter"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All runs' : DOMAIN_LABELS[f]}
                <span className="mono tabular">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="runs">
          <div className="runs-table">
            <div className="runs-header mono" aria-hidden="true">
              <span>run</span>
              <span>name</span>
              <span>domain</span>
              <span>headline metric</span>
            </div>
            <ul className="runs-list">
              {visible.map((p, i) => {
                const idx = PROJECTS.indexOf(p) + 1;
                return (
                  <li key={p.id} className="reveal" style={vars({ '--i': i })}>
                    <button
                      type="button"
                      className="run"
                      aria-current={preview.id === p.id ? 'true' : undefined}
                      onClick={() => onSelect(p)}
                      onMouseEnter={() => setPreviewId(p.id)}
                      onFocus={() => setPreviewId(p.id)}
                      aria-label={p.title + ' — open case study'}
                    >
                      <span className="run-thumb">
                        <ProjectArt project={p} />
                      </span>
                      <span className="run-id mono tabular">
                        run_{String(idx).padStart(2, '0')}
                      </span>
                      <span className="run-main">
                        <span className="run-title">{p.title}</span>
                        <span className="run-blurb">{p.blurb}</span>
                      </span>
                      <span className="run-domain">
                        <span className="chip">{DOMAIN_LABELS[p.domain]}</span>
                      </span>
                      <span className="run-metric">
                        <span className="mono tabular">{p.impact[0].v}</span>
                        <span>{p.impact[0].l}</span>
                      </span>
                      <span className="run-go" aria-hidden="true">
                        <IconArrowRight />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="run-preview" aria-hidden="true">
            <div className="run-preview-inner" key={preview.id}>
              <ProjectArt project={preview} />
              <div className="run-preview-body">
                <p className="mono run-preview-cat">{preview.cat}</p>
                <h3>{preview.title}</h3>
                <dl className="metrics">
                  {preview.impact.map((m) => (
                    <div key={m.l}>
                      <dd className="mono tabular">{m.v}</dd>
                      <dt>{m.l}</dt>
                    </div>
                  ))}
                </dl>
                <div className="chip-row">
                  {preview.stack.slice(0, 5).map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <p className="run-preview-hint mono">
                  click to open case study <IconArrowUpRight />
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
