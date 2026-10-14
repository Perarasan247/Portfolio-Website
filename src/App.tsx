import { useCallback, useRef, useState } from 'react';
import { About } from './components/about/About';
import { CertificateModal } from './components/credentials/CertificateModal';
import { Credentials } from './components/credentials/Credentials';
import { Education } from './components/education/Education';
import { Experience } from './components/experience/Experience';
import { Hero } from './components/hero/Hero';
import { IntroModal } from './components/hero/IntroModal';
import { Contact } from './components/layout/Contact';
import { Navbar } from './components/layout/Navbar';
import { ProjectModal } from './components/projects/ProjectModal';
import { Projects } from './components/projects/Projects';
import { Skills } from './components/skills/Skills';
import { useReveal } from './hooks/useReveal';
import type { Certificate, Project } from './types';

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [openCert, setOpenCert] = useState<Certificate | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const closeIntro = useCallback(() => setIntroOpen(false), []);
  const closeProject = useCallback(() => setOpenProject(null), []);
  const closeCert = useCallback(() => setOpenCert(null), []);
  useReveal(rootRef);

  return (
    <div className="app" ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero onPlayIntro={() => setIntroOpen(true)} />
        <About />
        <Skills />
        <Projects onSelect={setOpenProject} />
        <Experience onOpenCert={setOpenCert} />
        <Education />
        <Credentials onOpenCert={setOpenCert} />
      </main>
      <Contact />

      {introOpen && <IntroModal onClose={closeIntro} />}
      {openProject && <ProjectModal project={openProject} onClose={closeProject} />}
      {openCert && <CertificateModal cert={openCert} onClose={closeCert} />}
    </div>
  );
}
