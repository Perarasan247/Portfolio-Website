import type { SkillCategory } from '../types';

export const SKILLS: SkillCategory[] = [
  {
    cat: 'Programming & Tools',
    num: '01',
    items: [
      { n: 'Python', l: 3 },
      { n: 'SQL', l: 3 },
      { n: 'Git', l: 3 },
      { n: 'GitHub', l: 3 },
      { n: 'Streamlit', l: 2 },
      { n: 'Flask', l: 2 },
      { n: 'FastAPI', l: 3 },
      { n: 'Tableau', l: 2 },
    ],
  },
  {
    cat: 'Machine Learning & AI',
    num: '02',
    items: [
      { n: 'NumPy', l: 3 },
      { n: 'Pandas', l: 3 },
      { n: 'SciPy', l: 2 },
      { n: 'Statsmodels', l: 2 },
      { n: 'Matplotlib', l: 3 },
      { n: 'Seaborn', l: 2 },
      { n: 'PyTorch', l: 3 },
      { n: 'TensorFlow', l: 2 },
      { n: 'Keras', l: 2 },
      { n: 'OpenCV', l: 2 },
      { n: 'YOLO', l: 2 },
      { n: 'NLTK', l: 2 },
      { n: 'spaCy', l: 2 },
      { n: 'GANs', l: 2 },
    ],
  },
  {
    cat: 'Generative AI',
    num: '03',
    items: [
      { n: 'LangChain', l: 3 },
      { n: 'LangGraph', l: 2 },
      { n: 'FAISS', l: 2 },
      { n: 'Pinecone', l: 2 },
      { n: 'Google ADK', l: 2 },
      { n: 'MCP', l: 2 },
    ],
  },
  {
    cat: 'Cloud & DevOps',
    num: '04',
    items: [
      { n: 'AWS S3', l: 1 },
      { n: 'EC2', l: 1 },
      { n: 'ECS', l: 1 },
      { n: 'Lambda', l: 1 },
      { n: 'SageMaker', l: 1 },
      { n: 'Docker', l: 3 },
      { n: 'GitHub Actions', l: 2 },
      { n: 'MLflow', l: 2 },
    ],
  },
];
