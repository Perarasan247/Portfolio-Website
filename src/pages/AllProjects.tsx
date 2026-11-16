import { useCallback, useEffect, useRef, useState } from 'react';
import { Cursor } from '../components/fx/Cursor';
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from '../components/icons/Icons';
import { ProjectArt } from '../components/projects/ProjectArt';
import { ProjectModal } from '../components/projects/ProjectModal';
import { PROFILE } from '../data/profile';
import { DOMAIN_LABELS, PROJECTS } from '../data/projects';
import { usePointerFX } from '../hooks/usePointerFX';
import { useReveal } from '../hooks/useReveal';
import type { Project, ProjectDomain } from '../types';
import { vars } from '../utils/cssVars';
import { homeHref } from '../utils/routes';

type Filter = ProjectDomain | 'all';
const DOMAINS = Object.keys(DOMAIN_LABELS) as ProjectDomain[];
const FILTERS: Filter[] = ['all', ...DOMAINS.filter((d) => PROJECTS.some((p) => p.domain === d))];

function Card({ project, num, onOpen }: { project: Project; num: string; onOpen: () => void }) {
  return (
    <li className="ap-card spot spot-border reveal">
      <button
        type="button"
        className="ap-media"
        onClick={onOpen}
        tabIndex={-1}
        aria-hidden="true"
        data-cursor="Explore"
      >
        <ProjectArt project={project} />
        {project.tag && <span className="acc-tag mono">{project.tag}</span>}
      </button>
      <div className="ap-body">
        <p className="acc-eyebrow mono">
          <b>{num}</b>
          <span aria-hidden="true" />
          {project.cat}
        </p>
        <h2 className="ap-title">{project.title}</h2>
        <p className="ap-blurb">{project.blurb}</p>
        <dl className="acc-metrics">
          {project.impact.map((m) => (
            <div key={m.l}>
              <dt>{m.l}</dt>
              <dd className="tabular">{m.v}</dd>
            </div>
          ))}
        </dl>
        <ul className="acc-tech" aria-label="Technologies">
          {project.stack.map((s) => (
            <li className="chip" key={s}>
              {s}
            </li>
          ))}
        </ul>
        <div className="acc-actions">
          <button type="button" className="acc-cta" onClick={onOpen}>
            Read case study <IconArrowRight />
          </button>
          {project.github && (
            <a className="acc-link" href={project.github} target="_blank" rel="noreferrer">
              GitHub <IconArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

/** Second page: every project in PROJECTS order, filterable by domain. */
export default function AllProjects() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useReveal(rootRef);
  usePointerFX();

  useEffect(() => {
    document.documentElement.classList.add('is-loaded');
  }, []);

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.domain === filter);

  return (
    <div className="app ap" ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <div className="ambient" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="grain" aria-hidden="true" />

      <header className="ap-bar">
        <div className="container ap-bar-inner">
          <a className="brand" href={homeHref} aria-label={`${PROFILE.name} — home`}>
            <span className="brand-mark" aria-hidden="true">
              P<i>D</i>
            </span>
            <span className="brand-name">
              Perarasan<span className="accent">.</span>
            </span>
          </a>
          <a className="al" href={homeHref + '#projects'}>
            <IconArrowLeft /> Back to portfolio
          </a>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="section ap-main">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow reveal">
                <b>03</b> Project archive
              </p>
              <h1 className="section-title reveal">
                All <span className="serif">projects.</span>
              </h1>
            </div>
            <p className="section-sub reveal" style={vars({ '--i': 1 })}>
              Every system I&rsquo;ve built &mdash; {PROJECTS.length} in total. Open any project for
              the problem, the approach, and the measured impact.
            </p>
          </div>

          <div className="ap-filters reveal" role="group" aria-label="Filter projects by domain">
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

          <ul className="ap-grid" key={filter}>
            {visible.map((p) => (
              <Card
                key={p.id}
                project={p}
                num={String(PROJECTS.indexOf(p) + 1).padStart(2, '0')}
                onOpen={() => setOpen(p)}
              />
            ))}
          </ul>

          <div className="ap-foot">
            <a className="al al-solid" href={homeHref + '#projects'}>
              <IconArrowLeft /> Back to portfolio
            </a>
            <a className="al" href={homeHref + '#contact'}>
              Get in touch <IconArrowUpRight />
            </a>
          </div>
        </div>
      </main>

      {open && <ProjectModal project={open} onClose={close} />}
    </div>
  );
}
