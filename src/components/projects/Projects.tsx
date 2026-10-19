import { useState } from 'react';
import { DOMAIN_LABELS, PROJECTS } from '../../data/projects';
import type { Project, ProjectDomain } from '../../types';
import { vars } from '../../utils/cssVars';
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from '../icons/Icons';
import { ProjectArt } from './ProjectArt';

const FILTERS: Array<ProjectDomain | 'all'> = ['all', 'cv', 'agents', 'ml'];
const PAGE_SIZE = 6;

function getPageNumbers(current: number, total: number): Array<number | '...'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

interface ProjectsProps {
  onSelect: (project: Project) => void;
}

export function Projects({ onSelect }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectDomain | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.domain === filter);
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * PAGE_SIZE;
  const paginatedProjects = visible.slice(startIndex, startIndex + PAGE_SIZE);

  const [previewId, setPreviewId] = useState(PROJECTS[0]?.id ?? '');
  const preview =
    paginatedProjects.find((p) => p.id === previewId) ??
    paginatedProjects[0] ??
    visible[0] ??
    PROJECTS[0];

  const handleFilterChange = (f: ProjectDomain | 'all') => {
    setFilter(f);
    setCurrentPage(1);
    const nextVisible = f === 'all' ? PROJECTS : PROJECTS.filter((p) => p.domain === f);
    if (nextVisible[0]) {
      setPreviewId(nextVisible[0].id);
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === validPage) return;
    setCurrentPage(page);
    const newStart = (page - 1) * PAGE_SIZE;
    const nextProject = visible[newStart];
    if (nextProject) {
      setPreviewId(nextProject.id);
    }
    const el = document.getElementById('projects');
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < 0) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const fromCount = visible.length === 0 ? 0 : startIndex + 1;
  const toCount = Math.min(startIndex + PAGE_SIZE, visible.length);
  const pageNumbers = getPageNumbers(validPage, totalPages);

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
                onClick={() => handleFilterChange(f)}
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
              {paginatedProjects.map((p, i) => {
                const idx = PROJECTS.indexOf(p) + 1;
                return (
                  <li key={p.id} className="reveal" style={vars({ '--i': i })}>
                    <button
                      type="button"
                      className="run"
                      aria-current={preview?.id === p.id ? 'true' : undefined}
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

            <nav className="runs-pagination" aria-label="Projects pagination">
              <div className="pagination-info">
                Showing{' '}
                <span className="mono tabular">
                  {fromCount}–{toCount}
                </span>{' '}
                of <span className="mono tabular">{visible.length}</span> runs
              </div>

              <div className="pagination-controls">
                <button
                  type="button"
                  className="pagination-btn pagination-btn-nav"
                  disabled={validPage <= 1}
                  onClick={() => goToPage(validPage - 1)}
                  aria-label="Previous page"
                >
                  <IconArrowLeft /> Prev
                </button>

                {pageNumbers.map((item, idx) =>
                  item === '...' ? (
                    <span key={`dots-${idx}`} className="pagination-ellipsis" aria-hidden="true">
                      ···
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      className="pagination-btn"
                      aria-current={validPage === item ? 'page' : undefined}
                      onClick={() => goToPage(item)}
                      aria-label={`Page ${item}`}
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="pagination-btn pagination-btn-nav"
                  disabled={validPage >= totalPages}
                  onClick={() => goToPage(validPage + 1)}
                  aria-label="Next page"
                >
                  Next <IconArrowRight />
                </button>
              </div>
            </nav>
          </div>

          {preview && (
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
          )}
        </div>
      </div>
    </section>
  );
}
