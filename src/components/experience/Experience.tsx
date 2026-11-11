import { useRef } from 'react';
import { EXPERIENCE } from '../../data/experience';
import { useScrollVar } from '../../hooks/useScrollVar';
import type { Certificate, Experience as ExperienceItem } from '../../types';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { SplitText } from '../common/SplitText';
import { IconFile } from '../icons/Icons';
import { LogEntry } from './LogEntry';

interface ExperienceProps {
  onOpenCert: (cert: Certificate) => void;
}

function toCertificate(e: ExperienceItem, cert: string): Certificate {
  return { ico: e.ico, title: e.role, org: e.co, year: e.when, cert };
}

export function Experience({ onOpenCert }: ExperienceProps) {
  const lineRef = useRef<HTMLOListElement>(null);
  useScrollVar(lineRef, 0.7, 0.6);

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow reveal">
              <b>04</b> Experience
            </p>
            <SplitText
              as="h2"
              id="experience-title"
              className="section-title"
              by="words"
              text={[
                { t: 'A short, ' },
                { t: 'deliberate', className: 'serif' },
                { t: ' path through ML and shipping.' },
              ]}
            />
          </div>
          <p className="section-sub reveal" style={vars({ '--i': 1 })}>
            From project trainee to AI intern to ML engineer — building computer vision, LLM, and
            RAG systems.
          </p>
        </div>

        <ol className="timeline" ref={lineRef}>
          {EXPERIENCE.map((e, i) => {
            const cert = e.cert;
            return (
              <LogEntry
                key={`${e.co}-${e.role}`}
                index={i}
                latest={i === 0}
                when={e.when}
                title={e.role}
                org={
                  <>
                    <b>{e.co}</b> · {e.where}
                  </>
                }
                logo={e.logo ? asset(e.logo) : undefined}
                logoAlt={`${e.co} logo`}
                bullets={e.bullets}
                tags={e.stack}
                action={
                  cert && (
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => onOpenCert(toCertificate(e, cert))}
                    >
                      <IconFile /> View certificate
                    </button>
                  )
                }
              />
            );
          })}
        </ol>
      </div>
    </section>
  );
}
