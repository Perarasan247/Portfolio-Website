import type { Experience } from '../types';

export const EXPERIENCE: Experience[] = [
  {
    when: 'Jun 2026 · Present',
    role: 'ML Engineer',
    co: 'Alai Labs',
    where: 'Chennai',
    bullets: [
      'Building and shipping production machine learning and generative AI systems, continuing from the work started as an AI Intern.',
      'Working across computer vision, LLM agents, and RAG, from R&D through deployment.',
    ],
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'AWS', 'Docker'],
    ico: 'AL',
    logo: 'assets/alai labs logo.webp',
  },
  {
    when: 'Feb 2026 · May 2026',
    role: 'AI Intern',
    co: 'Alai Labs',
    where: 'Chennai',
    bullets: [
      'Built a workflow automation system and shipped Generative AI products spanning computer vision, LLMs, and RAG.',
      'Owned features end-to-end across R&D and production, working closely with the team on real customer constraints.',
      'Grew into a stronger engineer through hands-on exposure to the edge cases and trade-offs that only surface in production.',
    ],
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'AWS', 'Docker'],
    ico: 'AL',
    logo: 'assets/alai labs logo.webp',
  },
  {
    when: 'Dec 2025 · Mar 2026',
    role: 'Project Trainee',
    co: 'SRM Institute of Science and Technology',
    where: 'Chennai',
    bullets: [
      'Built BoneVision, a multimodal deep learning system for SRM Medical College that predicts Age, Gender, and Bone Health Index from a single hand X-ray.',
      'Trained a multi-task EfficientNet-B3 with attention for age regression and gender classification, plus a custom YOLO segmentation model for metacarpal localization and clinical-grade BHI computation.',
      'Shipped the full stack: PyTorch models behind a Flask API with a drag-and-drop web UI supporting both DICOM and standard image formats.',
    ],
    stack: ['Python', 'PyTorch', 'EfficientNet', 'YOLO', 'Flask', 'OpenCV'],
    ico: 'SR',
    logo: 'assets/SRM logo.svg',
    cert: 'assets/certificates/Internship Certificates/project trainee at srm.pdf',
  },
];
