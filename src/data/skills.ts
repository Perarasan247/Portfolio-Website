import type { SkillCategory } from '../types';

export const SKILLS: SkillCategory[] = [
  {
    cat: 'Languages & Frameworks',
    num: '01',
    items: [
      { n: 'Python', l: 3 },
      { n: 'SQL', l: 3 },
      { n: 'FastAPI', l: 3 },
      { n: 'Git', l: 3 },
      { n: 'GitHub', l: 3 },
      { n: 'Streamlit', l: 2 },
      { n: 'Tableau', l: 1 },
    ],
  },
  {
    cat: 'Machine Learning & AI',
    num: '02',
    items: [
      { n: 'PyTorch', l: 3 },
      { n: 'Scikit-learn', l: 3 },
      { n: 'NumPy', l: 3 },
      { n: 'Pandas', l: 3 },
      { n: 'Matplotlib', l: 3 },
      { n: 'TensorFlow', l: 2 },
      { n: 'Keras', l: 2 },
      { n: 'OpenCV', l: 2 },
      { n: 'YOLO', l: 2 },
      { n: 'Seaborn', l: 2 },
      { n: 'SciPy', l: 2 },
      { n: 'Statsmodels', l: 2 },
      { n: 'NLTK', l: 2 },
      { n: 'spaCy', l: 2 },
      { n: 'GANs', l: 2 },
    ],
  },
  {
    cat: 'Generative AI',
    num: '03',
    items: [
      { n: 'LLM', l: 3 },
      { n: 'LangChain', l: 3 },
      { n: 'LangGraph', l: 2 },
      { n: 'LlamaIndex', l: 2 },
      { n: 'Vector DB', l: 2 },
      { n: 'LangSmith', l: 2 },
      { n: 'Google ADK', l: 2 },
      { n: 'MCP', l: 2 },
    ],
  },
  {
    cat: 'Cloud & DevOps',
    num: '04',
    items: [
      { n: 'Docker', l: 3 },
      { n: 'AWS', l: 2 },
      { n: 'CI/CD', l: 2 },
      { n: 'GitHub Actions', l: 2 },
      { n: 'MLflow', l: 2 },
      { n: 'Kubernetes', l: 1 },
    ],
  },
];
