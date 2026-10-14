export interface Profile {
  name: string;
  role: string;
  tagline: string;
  status: string;
  email: string;
  location: string;
  socials: { github: string; linkedin: string; twitter: string };
}

export interface Skill {
  n: string;
  /** 1 = familiar, 2 = fluent, 3 = daily */
  l: 1 | 2 | 3;
}

export interface SkillCategory {
  cat: string;
  num: string;
  items: Skill[];
}

export interface ImpactStat {
  v: string;
  l: string;
}

export type ProjectDomain = 'cv' | 'agents' | 'ml';

export interface Project {
  id: string;
  domain: ProjectDomain;
  title: string;
  tag?: string;
  cat: string;
  blurb: string;
  stack: string[];
  art: string;
  glyph: string;
  featured?: boolean;
  problem: string;
  solution: string;
  impact: ImpactStat[];
  video?: string;
  github?: string;
  demo?: string;
}

export interface Experience {
  when: string;
  role: string;
  co: string;
  where: string;
  bullets: string[];
  stack: string[];
  ico: string;
  cert?: string;
  now?: boolean;
}

export interface Education {
  when: string;
  degree: string;
  institution: string;
  cgpa: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
}

/** A certificate shown in the preview modal. */
export interface Certificate {
  ico: string;
  title: string;
  org: string;
  year: string;
  cert: string;
  desc?: string;
}

export interface Achievement extends Certificate {
  desc: string;
}
