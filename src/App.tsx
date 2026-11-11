import { useCallback, useRef, useState } from 'react';
import { About } from './components/about/About';
import { Marquee } from './components/common/Marquee';
import { CertificateModal } from './components/credentials/CertificateModal';
import { Credentials } from './components/credentials/Credentials';
import { Education } from './components/education/Education';
import { Experience } from './components/experience/Experience';
import { Cursor } from './components/fx/Cursor';
import { Preloader } from './components/fx/Preloader';
import { ScrollTop } from './components/fx/ScrollTop';
import { Hero } from './components/hero/Hero';
import { IntroModal } from './components/hero/IntroModal';
import { IconSpark } from './components/icons/Icons';
import { Contact } from './components/layout/Contact';
import { Navbar } from './components/layout/Navbar';
import { ProjectModal } from './components/projects/ProjectModal';
import { Projects } from './components/projects/Projects';
import { Skills } from './components/skills/Skills';
import { usePointerFX } from './hooks/usePointerFX';
import { useReveal } from './hooks/useReveal';
import { useScrollProgress } from './hooks/useScrollProgress';
import type { Certificate, Project } from './types';

const TICKER = [
  'Computer Vision',
  'AI Agents',
  'Retrieval-Augmented Generation',
  'MLOps',
  'Deep Learning',
  'LLM Engineering',
  'Production ML',
];

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [openCert, setOpenCert] = useState<Certificate | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const closeIntro = useCallback(() => setIntroOpen(false), []);
  const closeProject = useCallback(() => setOpenProject(null), []);
  const closeCert = useCallback(() => setOpenCert(null), []);
  const onLoaded = useCallback(() => document.documentElement.classList.add('is-loaded'), []);
  const progress = useScrollProgress();
  useReveal(rootRef);
  usePointerFX();

  return (
    <div className="app" ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader onDone={onLoaded} />
      <Cursor />
      <div className="ambient" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="grain" aria-hidden="true" />

      <Navbar progress={progress} />
      <main id="main" tabIndex={-1}>
        <Hero onPlayIntro={() => setIntroOpen(true)} />
        <div className="ticker-wrap" aria-hidden="true">
          <div className="ticker">
            <Marquee speed={36}>
              {TICKER.map((t) => (
                <span className="ticker-item" key={t}>
                  {t} <IconSpark />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
        <About />
        <Skills />
        <Projects onSelect={setOpenProject} />
        <Experience onOpenCert={setOpenCert} />
        <Education />
        <Credentials onOpenCert={setOpenCert} />
      </main>
      <Contact />
      <ScrollTop progress={progress} />

      {introOpen && <IntroModal onClose={closeIntro} />}
      {openProject && <ProjectModal project={openProject} onClose={closeProject} />}
      {openCert && <CertificateModal cert={openCert} onClose={closeCert} />}
    </div>
  );
}
