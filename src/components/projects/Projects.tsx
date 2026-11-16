import { useEffect, useRef, useState } from 'react';
import { FEATURED_PROJECTS, PROJECTS } from '../../data/projects';
import { allProjectsHref } from '../../utils/routes';
import type { Project } from '../../types';
import { vars } from '../../utils/cssVars';
import { SplitText } from '../common/SplitText';
import { IconArrowRight, IconArrowUpRight } from '../icons/Icons';
import { ProjectArt } from './ProjectArt';

const MAX_CHIPS = 6;
const HOVER_INTENT_MS = 140;

interface ProjectsProps {
  onSelect: (project: Project) => void;
}

interface PanelProps {
  project: Project;
  index: number;
  open: boolean;
  onOpen: () => void;
  onHover: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
}

function Panel({ project, index, open, onOpen, onHover, onHoverEnd, onSelect }: PanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, '0');
  const extra = project.stack.length - MAX_CHIPS;
  const contentId = `acc-c-${project.id}`;

  // Closed panels are visually hidden; keep their links out of the tab order.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [open]);

  return (
    <li
      className={'acc-panel' + (open ? ' is-open' : '')}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      <button
        type="button"
        className="acc-spine"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onOpen}
        onFocus={onOpen}
      >
        <span className="acc-num mono">{num}</span>
        <span className="acc-vtitle">{project.title}</span>
        <span className="acc-plus" aria-hidden="true">
          +
        </span>
      </button>

      <div className="acc-content" id={contentId} ref={contentRef}>
        <div className="acc-info">
          <p className="acc-eyebrow mono">
            <b>{num}</b>
            <span aria-hidden="true" />
            {project.cat}
          </p>
          <h3 className="acc-title">{project.title}</h3>
          <p className="acc-blurb">{project.blurb}</p>
          <dl className="acc-metrics">
            {project.impact.map((m) => (
              <div key={m.l}>
                <dt>{m.l}</dt>
                <dd className="tabular">{m.v}</dd>
              </div>
            ))}
          </dl>
          <ul className="acc-tech" aria-label="Technologies">
            {project.stack.slice(0, MAX_CHIPS).map((s) => (
              <li className="chip" key={s}>
                {s}
              </li>
            ))}
            {extra > 0 && <li className="chip">+{extra}</li>}
          </ul>
          <div className="acc-actions">
            <button type="button" className="acc-cta" onClick={onSelect}>
              Read case study <IconArrowRight />
            </button>
            {project.github && (
              <a className="acc-link" href={project.github} target="_blank" rel="noreferrer">
                GitHub <IconArrowUpRight />
              </a>
            )}
          </div>
        </div>

        <button
          type="button"
          className="acc-visual"
          onClick={onSelect}
          tabIndex={-1}
          aria-hidden="true"
          data-cursor="Explore"
        >
          <ProjectArt project={project} />
          {project.tag && <span className="acc-tag mono">{project.tag}</span>}
        </button>
      </div>
    </li>
  );
}

export function Projects({ onSelect }: ProjectsProps) {
  const [openIdx, setOpenIdx] = useState(0);
  const hoverTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const hoverOpen = (i: number) => {
    if (!window.matchMedia('(hover: hover) and (min-width: 1100px)').matches) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenIdx(i), HOVER_INTENT_MS);
  };
  const cancelHover = () => window.clearTimeout(hoverTimer.current);

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
              text={[{ t: 'Things I’ve ' }, { t: 'built.', className: 'serif' }]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            A few favourites across medical imaging, autonomous agents and RAG. Hover a panel to
            open it, or{' '}
            <a className="text-link" href={allProjectsHref}>
              browse all {PROJECTS.length} projects
            </a>
            .
          </p>
        </div>

        <ol className="acc reveal" aria-label="Projects">
          {FEATURED_PROJECTS.map((p, i) => (
            <Panel
              key={p.id}
              project={p}
              index={i}
              open={i === openIdx}
              onOpen={() => setOpenIdx(i)}
              onHover={() => hoverOpen(i)}
              onHoverEnd={cancelHover}
              onSelect={() => onSelect(p)}
            />
          ))}
          <li className="acc-panel acc-more">
            <a className="acc-spine" href={allProjectsHref} data-cursor="All">
              <span className="acc-num mono">{String(PROJECTS.length).padStart(2, '0')}</span>
              <span className="acc-vtitle">All projects</span>
              <span className="acc-plus" aria-hidden="true">
                <IconArrowRight />
              </span>
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
