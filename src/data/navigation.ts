export const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'credentials', label: 'Credentials' },
] as const;

export const NAV_IDS = NAV_SECTIONS.map((s) => s.id);
