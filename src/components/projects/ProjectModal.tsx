import { useRef } from 'react';
import { DOMAIN_LABELS, PROJECTS } from '../../data/projects';
import { useModal } from '../../hooks/useModal';
import type { Project } from '../../types';
import { asset } from '../../utils/asset';
import { IconArrowUpRight, IconClose } from '../icons/Icons';
import { ProjectArt } from './ProjectArt';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModal(dialogRef, onClose);
  const runId = 'run_' + String(PROJECTS.indexOf(project) + 1).padStart(2, '0');
  const titleId = 'project-title-' + project.id;

  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-bar">
          <span className="mono sheet-crumb">
            {runId} <span aria-hidden="true">/</span> {DOMAIN_LABELS[project.domain]}
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
            data-autofocus
          >
            <IconClose />
          </button>
        </div>

        <div className="sheet-scroll">
          {project.video ? (
            <video
              className="sheet-media"
              src={asset(project.video)}
              controls
              muted
              playsInline
              preload="metadata"
              aria-label={project.title + ' demo video'}
            />
          ) : (
            <div className="sheet-media">
              <ProjectArt project={project} />
            </div>
          )}

          <div className="sheet-body">
            <p className="mono sheet-cat">{project.cat}</p>
            <h2 className="sheet-title" id={titleId}>
              {project.title}
            </h2>
            <p className="sheet-lead">{project.blurb}</p>
            <div className="chip-row">
              {project.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>

            <dl className="metrics metrics-lg">
              {project.impact.map((m) => (
                <div key={m.l}>
                  <dd className="mono tabular">{m.v}</dd>
                  <dt>{m.l}</dt>
                </div>
              ))}
            </dl>

            <ol className="case-flow">
              <li>
                <h3>
                  <span className="mono">01</span> Problem
                </h3>
                <p>{project.problem}</p>
              </li>
              <li>
                <h3>
                  <span className="mono">02</span> Approach
                </h3>
                <p>{project.solution}</p>
              </li>
            </ol>

            {(project.github || project.demo) && (
              <div className="sheet-cta">
                {project.github && (
                  <a
                    className="btn btn-primary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub <IconArrowUpRight />
                  </a>
                )}
                {project.demo && (
                  <a
                    className="btn btn-ghost"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo <IconArrowUpRight />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
