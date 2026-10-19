import type { Profile } from '../types';
import { PROJECTS } from './projects';
import { SKILLS } from './skills';

export const PROFILE: Profile = {
  name: 'Perarasan D',
  role: 'ML Engineer',
  tagline:
    'Building intelligent systems — from LLMs and computer vision to production ML pipelines.',
  status: 'Open to Software Engineer (AI/ML), Data Scientist, AI/ML Engineer roles',
  email: 'perarasandevarajan@gmail.com',
  location: 'Chennai, IN',
  socials: {
    github: 'https://github.com/Perarasan247',
    linkedin: 'https://www.linkedin.com/in/perarasan/',
    twitter: 'https://x.com/Perarasan_D',
  },
};

/** Areas shown under the hero tagline. */
export const FOCUS_AREAS = ['Computer vision', 'AI Agents', 'RAG', 'MLOps'];

export const HIGHLIGHTS = [
  { label: 'Projects shipped', value: String(PROJECTS.length).padStart(2, '0') },
  { label: 'Roles held', value: '03' },
  { label: 'M.Sc CGPA', value: '9.15' },
  {
    label: 'Tools in the stack',
    value: String(SKILLS.reduce((n, c) => n + c.items.length, 0)),
  },
];

/** Drop the file at public/videos/intro.mp4 and the hero's intro button will play it. */
export const INTRO_VIDEO = 'videos/intro.mp4';
