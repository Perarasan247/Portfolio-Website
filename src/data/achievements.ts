import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    ico: 'PY',
    title: 'Python Course from Basics to Advanced',
    org: 'Udemy',
    year: '2024',
    desc: 'Comprehensive Python — syntax, OOP, decorators, generators, and idiomatic patterns used in production codebases.',
    cert: 'assets/certificates/python certificate.pdf',
  },
  {
    ico: 'ML',
    title: 'Complete Machine Learning and Data Science',
    org: 'GeeksforGeeks',
    year: '2024',
    desc: 'End-to-end ML workflow: regression, classification, model evaluation, feature engineering, and applied projects.',
    cert: 'assets/certificates/GeeksforGeeks Certificate.pdf',
  },
  {
    ico: 'DL',
    title: 'Mathematics for ML and Data Science Specialization',
    org: 'DeepLearning.AI',
    year: '2025',
    desc: 'Linear algebra, calculus, probability, and statistics — the mathematical foundations behind modern ML.',
    cert: 'assets/certificates/Mathematics for Machine Learning and Data Science.pdf',
  },
  {
    ico: 'IB',
    title: 'IBM RAG and Agentic AI',
    org: 'IBM',
    year: '2025',
    desc: 'Building retrieval-augmented generation pipelines and agentic AI systems with LLMs, tools, and memory.',
    cert: 'assets/certificates/IBM RAG And Agentic AI Certificate.pdf',
  },
  {
    ico: 'PR',
    title: 'Machine Learning in Production',
    org: 'DeepLearning.AI',
    year: '2025',
    desc: 'MLOps lifecycle: deployment patterns, monitoring, data drift, and scaling ML systems beyond the notebook.',
    cert: 'assets/certificates/Machine Learning in Production.pdf',
  },
];
