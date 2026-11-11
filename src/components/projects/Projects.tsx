import { useLayoutEffect, useRef, useState } from 'react';
import { DOMAIN_LABELS, PROJECTS } from '../../data/projects';
import type { Project, ProjectDomain } from '../../types';
import { vars } from '../../utils/cssVars';
import { SplitText } from '../common/SplitText';
import { IconArrowUpRight } from '../icons/Icons';
import { ProjectArt } from './ProjectArt';

type Filter = ProjectDomain | 'all';
const FILTERS: Filter[] = ['all', 'cv', 'agents', 'ml'];

interface ProjectsProps {
  onSelect: (project: Project) => void;
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const num = String(PROJECTS.indexOf(project) + 1).padStart(2, '0');
  return (
    <li
      className={'pcard-wrap reveal' + (project.featured ? ' featured' : '')}
      style={vars({ '--i': index % 3 })}
    >
      <button
        type="button"
        className="pcard spot spot-border"
        onClick={onSelect}
        data-tilt="5"
        data-cursor="Explore"
        aria-label={project.title + ' — open case study'}
      >
        <span className="pcard-media">
          <ProjectArt project={project} />
          <span className="pcard-num mono" aria-hidden="true">
            {num}
          </span>
          {project.tag && <span className="pcard-tag mono">{project.tag}</span>}
        </span>
        <span className="pcard-body">
          <span className="pcard-cat mono">{project.cat}</span>
          <span className="pcard-title">{project.title}</span>
          <span className="pcard-blurb">{project.blurb}</span>
          <span className="pcard-metrics">
            {project.impact.slice(0, project.featured ? 3 : 2).map((m) => (
              <span className="pcard-metric" key={m.l}>
                <b className="tabular">{m.v}</b>
                <small>{m.l}</small>
              </span>
            ))}
          </span>
          <span className="pcard-foot">
            <span className="chip-row">
              {project.stack.slice(0, project.featured ? 5 : 3).map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </span>
            <span className="pcard-go" aria-hidden="true">
              <IconArrowUpRight />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

export function Projects({ onSelect }: ProjectsProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.domain === filter);

  useLayoutEffect(() => {
    const measure = () => {
      const btn = tabsRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (btn) setPill({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [filter]);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow reveal">
              <b>03</b> Selected work
            </p>
            <SplitText
              as="h2"
              id="projects-title"
              className="section-title"
              by="words"
              text={[
                { t: 'Projects that shipped, taught, or ' },
                { t: 'surprised', className: 'serif' },
                { t: ' me.' },
              ]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            Open any project for the full case study — the problem, the approach, and the measured
            impact.
          </p>
        </div>

        <div
          className="tabs reveal"
          role="group"
          aria-label="Filter projects by domain"
          ref={tabsRef}
        >
          <span
            className="tabs-pill"
            style={vars({ '--x': pill.x + 'px', '--w': pill.w + 'px' })}
            aria-hidden="true"
          />
          {FILTERS.map((f) => {
            const count =
              f === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.domain === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All work' : DOMAIN_LABELS[f]}
                <sup className="mono tabular">{count}</sup>
              </button>
            );
          })}
        </div>

        <ul className="pgrid" key={filter}>
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onSelect={() => onSelect(p)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
