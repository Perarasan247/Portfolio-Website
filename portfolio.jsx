/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────
// DATA
// ────────────────────────────────────────────────────────────
const PROFILE = {
  name: 'Perarasan D',
  role: 'AI/ML Engineer',
  tagline: 'Building intelligent systems — from LLMs and computer vision to production ML pipelines.',
  status: 'Open to Software Engineer (AI/ML), Data Scientist, ML Engineer roles',
  email: 'perarasandevarajan@gmail.com',
  location: 'Chennai, IN',
  socials: {
    github: 'https://github.com/Perarasan247',
    linkedin: 'https://www.linkedin.com/in/perarasan/',
    twitter: 'https://x.com/Perarasan_D',
  },
};

const SKILLS = [
  {
    cat: 'Programming & Tools',
    num: '01',
    items: [
      { n: 'Python', l: 3 }, { n: 'SQL', l: 3 }, { n: 'Git', l: 3 },
      { n: 'GitHub', l: 3 }, { n: 'Streamlit', l: 2 }, { n: 'Flask', l: 2 },
      { n: 'FastAPI', l: 3 }, { n: 'Tableau', l: 2 },
    ],
  },
  {
    cat: 'Machine Learning & AI',
    num: '02',
    items: [
      { n: 'NumPy', l: 3 }, { n: 'Pandas', l: 3 }, { n: 'SciPy', l: 2 },
      { n: 'Statsmodels', l: 2 }, { n: 'Matplotlib', l: 3 }, { n: 'Seaborn', l: 2 },
      { n: 'PyTorch', l: 3 }, { n: 'TensorFlow', l: 2 }, { n: 'Keras', l: 2 },
      { n: 'OpenCV', l: 2 }, { n: 'YOLO', l: 2 }, { n: 'NLTK', l: 2 },
      { n: 'spaCy', l: 2 }, { n: 'GANs', l: 2 },
    ],
  },
  {
    cat: 'Generative AI',
    num: '03',
    items: [
      { n: 'LangChain', l: 3 }, { n: 'LangGraph', l: 2 }, { n: 'FAISS', l: 2 },
      { n: 'Pinecone', l: 2 }, { n: 'Google ADK', l: 2 }, { n: 'MCP', l: 2 },
    ],
  },
  {
    cat: 'Cloud & DevOps',
    num: '04',
    items: [
      { n: 'AWS S3', l: 1 }, { n: 'EC2', l: 1 }, { n: 'ECS', l: 1 },
      { n: 'Lambda', l: 1 }, { n: 'SageMaker', l: 1 }, { n: 'Docker', l: 3 },
      { n: 'GitHub Actions', l: 2 }, { n: 'MLflow', l: 2 },
    ],
  },
];

const PROJECTS = [
  {
    id: 'bonevision',
    title: 'BoneVision',
    tag: 'CASE STUDY',
    cat: 'Medical AI · Computer Vision',
    blurb: 'End-to-end medical AI built for SRM Medical College as an internal alternative to Bonexpert — predicts Age, Gender, and Bone Health Index from a single hand X-ray in under 5 seconds.',
    stack: ['PyTorch', 'EfficientNet-B3', 'YOLOv8', 'FastAPI', 'Streamlit', 'DICOM'],
    art: 'art-grad-1',
    glyph: 'SCAN · SEGMENT · DIAGNOSE',
    featured: true,
    problem: 'Radiologists spend 7–10 minutes manually measuring metacarpals to compute the Bone Health Index for every hand X-ray. SRM Medical College needed an internal alternative to Bonexpert that could deliver clinically-accurate Age, Gender, and BHI predictions in seconds rather than minutes.',
    solution: 'Two-model pipeline. (1) EfficientNet-B3 with transfer learning and a custom attention mechanism, trained on the RSNA Bone Age Challenge dataset with CLAHE preprocessing — age as regression, gender as classification. (2) Custom YOLOv8 segmentation model trained on 319 clinical DICOM X-rays (2nd/3rd/4th metacarpals polygon-annotated in Roboflow) that extracts length, width, and cortical thickness and applies the clinical BHI formula. DICOM pixel spacing is read from metadata for clinically-accurate measurements; calibrated default for PNG/JPG. Served via FastAPI backend + Streamlit frontend with drag-and-drop upload.',
    impact: [
      { v: '< 5s', l: 'Per X-ray' },
      { v: '95.77%', l: 'Gender Accuracy' },
      { v: '94.2%', l: 'Segmentation mAP' },
    ],
    github: 'https://github.com/Perarasan247/BoneVision',
  },
  {
    id: 'pilot',
    title: 'Pilot',
    cat: 'Multi-Agent · RPA',
    blurb: 'A multi-agent pilot for cloud workflows that autonomously navigates Google Drive end-to-end, from login (with 2FA detection) to locating, downloading, and relocating files, without any human intervention.',
    stack: ['Python', 'Google ADK', 'Gemini', 'MCP', 'FastAPI', 'Playwright', 'Pydantic'],
    art: 'art-grad-6',
    glyph: 'PLAN · ORCHESTRATE · ACT',
    problem: 'Manual cloud workflows like navigating Google Drive, downloading files, and relocating them across folders are tedious and don\'t scale. Off-the-shelf RPA tools break when the UI changes, and most browser automation falls apart on real auth flows like Google 2FA.',
    solution: 'Engineered an enterprise-grade RPA platform built around Google\'s Agent Development Kit (ADK) with five specialized Gemini 2.0 Flash agents (Orchestrator, Browser, Auth, Drive, Filesystem) communicating through a custom Model Context Protocol (MCP) server built on FastAPI, exposing 20+ typed tool endpoints over async HTTP. Powered by Playwright stealth automation, Pydantic-validated schemas, Loguru structured logging, Watchdog-based file monitoring, and a rubric-based evaluation suite using ADK\'s AgentEvaluator with both quality metrics passing at the > 0.8 threshold.',
    impact: [
      { v: '5 agents', l: 'Multi-Agent System' },
      { v: '20+', l: 'MCP Tool Endpoints' },
      { v: '> 0.8', l: 'Eval Quality Score' },
    ],
  },
  {
    id: 'data-analyst-agent',
    title: 'Autonomous Data Analyst Agent',
    tag: 'SHIPPED',
    cat: 'LLM · Agents',
    blurb: 'Ask any question about your data — the agent writes its own code, runs it in a sandbox, fixes its own mistakes, and answers.',
    stack: ['Python', 'LangGraph', 'Gemini', 'DuckDB', 'Streamlit', 'Docker', 'Redis'],
    art: 'art-grad-2',
    glyph: 'PLAN · EXECUTE · SELF-CORRECT',
    problem: 'Non-technical users sit on top of CSVs and spreadsheets but can\'t write SQL or Python. Existing chatbots either hallucinate summaries or break the moment a question requires real computation over the data.',
    solution: 'A LangGraph state machine with Google Gemini as planner and synthesizer. The agent decides for itself whether to write SQL (DuckDB directly over raw CSVs), run Python (subprocess-isolated for safety), or render a chart — then observes the result and self-corrects in a retry loop until the answer is right. A ChatGPT-style Streamlit interface keeps every past question, answer, and chart visible as a scrollable conversation.',
    impact: [
      { v: 'Self-heal', l: 'Retry Loop' },
      { v: 'Sandboxed', l: 'Code Execution' },
      { v: 'CSV / XLSX', l: 'Direct Upload' },
    ],
    github: 'https://github.com/Perarasan247/Autonomous-Data-Analyst-Agent',
  },
  {
    id: 'doc-rag',
    title: 'Document Q&A with RAG',
    tag: 'OPEN SOURCE',
    cat: 'LLM · RAG',
    blurb: 'A fully-offline RAG system — upload any document, ask in plain English, get cited answers with file + page traceability. No API costs, no data leaves your machine.',
    stack: ['Python', 'LangChain', 'FAISS', 'Sentence-Transformers', 'TinyLlama', 'FastAPI', 'Streamlit'],
    art: 'art-grad-3',
    glyph: 'PARSE · EMBED · CITE',
    problem: 'Reading long PDFs, reports, or research papers to find one specific answer is slow and frustrating. Cloud-based AI tools solve it — but at the cost of privacy, recurring API fees, and dependency on internet access.',
    solution: 'Self-contained RAG pipeline that runs entirely on the user\'s machine. Multi-format parsers (PyMuPDF, Pandas, ebooklib) handle PDF, CSV, TXT, JSON, and EPUB. LangChain chunks text into context-aware segments; Sentence-Transformers (all-MiniLM-L6-v2) converts them into 384-d vectors; FAISS performs sub-second similarity search; locally-hosted TinyLlama 1.1B generates conversational, grounded responses with file + page citations. Out-of-context detection flags unrelated questions. Dual interface: Streamlit web app + FastAPI REST backend.',
    impact: [
      { v: '98%', l: 'Citation Accuracy' },
      { v: '100%', l: 'Offline · Private' },
      { v: 'CPU', l: 'No GPU Required' },
    ],
    github: 'https://github.com/Perarasan247/RAG-Document-QA',
  },
  {
    id: 'tomato-disease',
    title: 'Tomato Disease Classification',
    cat: 'Computer Vision · Agriculture',
    blurb: 'End-to-end deep learning system that detects 9 tomato leaf diseases (plus healthy) from a single phone photo — 99.71% test accuracy.',
    stack: ['Python', 'PyTorch', 'EfficientNet-B0', 'FastAPI', 'JavaScript', 'scikit-learn'],
    art: 'art-grad-5',
    glyph: 'CAPTURE · CLASSIFY · DIAGNOSE',
    problem: 'Farmers and agronomists rely on manual leaf inspection to diagnose tomato crop disease — slow, error-prone, and dependent on expert availability. Delayed or wrong diagnosis can wipe out a season\'s yield.',
    solution: 'Fine-tuned EfficientNet-B0 in PyTorch with transfer learning and a custom multi-layer classification head (dropout + batch normalization) for stronger generalization across 10 classes. Deployed behind a FastAPI inference REST API with a responsive HTML / CSS / JavaScript frontend featuring drag-and-drop upload, instant predictions, and top-5 confidence scores. Helps farmers diagnose disease in seconds from a phone photo — enabling earlier intervention and reducing reliance on manual inspection.',
    impact: [
      { v: '99.71%', l: 'Test Accuracy' },
      { v: '10 classes', l: '9 Diseases + Healthy' },
      { v: 'Phone photo', l: 'Single-Image Diagnosis' },
    ],
    video: 'Project Video Demo/TDC.mp4',
    github: 'https://github.com/Perarasan247/Tomato-Disease-Classification',
  },
  {
    id: 'churn-prediction',
    title: 'Customer Churn Prediction',
    tag: 'CASE STUDY',
    cat: 'ML · Classification',
    blurb: 'End-to-end ML system predicting telecom customer churn — benchmarked 6 models and tuned thresholds to recover 82% of at-risk customers.',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'LightGBM', 'PyTorch', 'Pandas', 'Docker'],
    art: 'art-grad-4',
    glyph: 'PROFILE · PREDICT · RETAIN',
    problem: 'Telecom providers lose recurring revenue every month from churned customers who could have been retained with the right intervention. They needed an early-warning system to drive proactive retention campaigns before contracts lapsed.',
    solution: 'Analyzed 7,000+ customer records — surfacing month-to-month contracts, fiber optic service (42% churn), and tenure under 12 months (50% churn) as the dominant churn drivers. Applied binary + one-hot encoding to categorical features. Trained and benchmarked 6 models: Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM, and a PyTorch NN (128-64-32-1). Handled the 73/27 class imbalance with class_weight=balanced, scale_pos_weight, and weighted BCE loss. Tuned the decision threshold between 0.1–0.85 to maximize F1 — lifting recall from 72% → 82% without sacrificing precision.',
    impact: [
      { v: '0.8437', l: 'ROC-AUC' },
      { v: '82%', l: 'Churn Recall' },
      { v: '$5.18M', l: 'Projected Savings' },
    ],
    github: 'https://github.com/Perarasan247/Customer-Churn-Prediction',
  },
];

const EXPERIENCE = [
  {
    when: 'Feb 2026 · May 2026',
    role: 'AI Intern',
    co: 'Meraki Alai Labs',
    where: 'Chennai',
    bullets: [
      'Built a workflow automation system and shipped Generative AI products spanning computer vision, LLMs, and RAG.',
      'Owned features end-to-end across R&D and production, working closely with the team on real customer constraints.',
      'Grew into a stronger engineer through hands-on exposure to the edge cases and trade-offs that only surface in production.',
    ],
    stack: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'AWS', 'Docker'],
    ico: 'MA',
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
    cert: 'assets/certificates/Internship Certificates/project trainee at srm.pdf',
  },
  {
    when: 'Apr 2025 · Jun 2025',
    role: 'AWS AI-ML Virtual Intern',
    co: 'AICTE',
    where: 'Remote',
    bullets: [
      'Worked through the AWS AI/ML curriculum covering the foundations of machine learning, deep learning, and Amazon SageMaker.',
      'Implemented an end-to-end ML pipeline in SageMaker, from training and evaluation to deployment.',
      'Got introduced to AWS data services (RDS, DynamoDB) and applied AI areas including forecasting, computer vision, and NLP.',
    ],
    stack: ['AWS', 'SageMaker', 'RDS', 'DynamoDB', 'Python'],
    ico: 'AW',
    cert: 'assets/certificates/Internship Certificates/Perarasan D AI ML AWS.pdf',
  },
  {
    when: 'Jan 2025 · Mar 2025',
    role: 'AWS Cloud Virtual Intern',
    co: 'AICTE',
    where: 'Remote',
    bullets: [
      'Completed the AWS Cloud Foundations curriculum, covering common cloud concepts, core AWS services, and standard use cases.',
      'Built hands-on familiarity with EC2, S3, and AMIs while exploring the AWS platform end-to-end.',
      'Studied AWS cloud architectural principles, account security, and compliance through the Cloud Foundations track.',
    ],
    stack: ['AWS', 'EC2', 'S3', 'AMI', 'IAM'],
    ico: 'AW',
    cert: 'assets/certificates/Internship Certificates/Perarasan  D AWS Cloud.pdf',
  },
  {
    when: 'Jul 2024 · Sep 2024',
    role: 'Google AI-ML Virtual Intern',
    co: 'AICTE',
    where: 'Remote',
    bullets: [
      'Learned the fundamentals of neural networks and trained models using TensorFlow.',
      'Built and evaluated image classification models on benchmark datasets.',
      'Explored object detection workflows and the practical trade-offs of deploying computer vision systems.',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Pandas'],
    ico: 'GL',
    cert: 'assets/certificates/Internship Certificates/Perarasan  D Google AI ML.pdf',
  },
];

const EDUCATION = [
  {
    when: '2024 · 2026',
    degree: 'M.Sc Applied Data Science',
    institution: 'SRM Institute of Science and Technology',
    cgpa: '9.15 / 10',
    bullets: [
      'Pursuing M.Sc in Applied Data Science with focus on ML, AI, and data engineering.',
      'Coursework spans statistical modeling, deep learning, NLP, and cloud-based AI systems.',
    ],
    tags: ['Data Science', 'Machine Learning', 'Deep Learning', 'Research'],
  },
  {
    when: '2021 · 2024',
    degree: 'BCA — Bachelor of Computer Applications',
    institution: 'Agurchand Manmull Jain College',
    cgpa: '7.74 / 10',
    bullets: [
      'Foundation in computer science, programming, databases, and software engineering.',
      'Developed projects in web development, database management, and basic ML.',
    ],
    tags: ['Programming', 'Databases', 'Web Development', 'Computer Science'],
  },
];

const ACHIEVEMENTS = [
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

// ────────────────────────────────────────────────────────────
// SOCIAL ICONS (SVG)
// ────────────────────────────────────────────────────────────
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconTwitterX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.626 5.905-5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// ────────────────────────────────────────────────────────────
// HOOKS
// ────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
    };
  }, [breakpoint]);
  return isMobile;
}

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    const observe = (el) => io.observe(el);
    root.querySelectorAll('.reveal:not(.in)').forEach(observe);
    // Re-observe .reveal nodes added later (pagination, conditional renders, etc.)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches('.reveal:not(.in)')) observe(node);
          if (node.querySelectorAll) {
            node.querySelectorAll('.reveal:not(.in)').forEach(observe);
          }
        }
      }
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [rootRef]);
}

function useTimelineReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Trigger line draw when each timeline container enters view
    const timelines = root.querySelectorAll('.pf-timeline');
    const tlIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('tl-active');
          tlIo.unobserve(e.target);
        }
      }
    }, { threshold: 0.05 });
    timelines.forEach(t => tlIo.observe(t));
    return () => tlIo.disconnect();
  }, [rootRef]);
}

// ────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    const onMove = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      dot.style.opacity = '1';
    };
    const onLeave = () => { dot.style.opacity = '0'; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return <div ref={ref} className="pf-cursor-glow" style={{opacity: 0}} />;
}

function PhotoBlock({ onPlay }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    const w = wrapRef.current;
    if (!w) return;
    const onMove = (e) => {
      const r = w.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      w.style.transform = `perspective(1200px) rotateY(${px * -4}deg) rotateX(${py * 4}deg)`;
    };
    const onLeave = () => { w.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'; };
    w.addEventListener('mousemove', onMove);
    w.addEventListener('mouseleave', onLeave);
    return () => {
      w.removeEventListener('mousemove', onMove);
      w.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <div className="pf-photo-wrap" ref={wrapRef} onClick={onPlay}>
      <div className="pf-photo-frame"></div>
      <div className="pf-photo-img" style={{backgroundImage: 'url(assets/portrait.png)'}}></div>
      <div className="pf-photo-grid"></div>
      <div className="pf-photo-tag">PORTRAIT · 2025</div>
      <div className="pf-play" role="button" aria-label="Play intro video">
        <svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg>
      </div>
      <div className="pf-play-hint">Click to watch my intro</div>
    </div>
  );
}

function ArtBoneVision() {
  const boneFill = "rgba(255,255,255,0.06)";
  const boneStroke = "rgba(255,255,255,0.32)";
  const hiFill = "rgba(249,115,22,0.22)";
  const hiStroke = "rgba(249,115,22,0.95)";
  return (
    <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet" className="pf-art-svg">
      <defs>
        <filter id="bv-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Soft hand silhouette behind */}
      <path
        d="M 75 30 Q 70 100 78 145 L 60 165 Q 50 185 56 210 L 58 248 Q 60 275 100 280 L 160 280 Q 195 275 200 245 L 200 200 Q 200 180 188 165 L 162 145 Q 168 100 165 50 Q 158 28 145 32 Q 140 38 144 50 L 144 100 L 132 100 Q 130 35 122 28 Q 113 26 110 38 L 108 100 L 96 100 Q 96 35 86 30 Z"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Carpals (wrist) */}
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <ellipse cx="118" cy="276" rx="48" ry="7" />
        <ellipse cx="92" cy="262" rx="9" ry="6" />
        <ellipse cx="108" cy="258" rx="10" ry="7" />
        <ellipse cx="125" cy="258" rx="10" ry="7" />
        <ellipse cx="142" cy="262" rx="9" ry="6" />
      </g>

      {/* THUMB (1st) – angled outward */}
      <g transform="rotate(-30 72 245)" fill={boneFill} stroke={boneStroke} strokeWidth="1">
        {/* 1st metacarpal */}
        <rect x="65" y="195" width="14" height="48" rx="7" />
        <ellipse cx="72" cy="195" rx="8" ry="5" />
        <ellipse cx="72" cy="243" rx="9" ry="6" />
        {/* Proximal phalanx */}
        <rect x="66" y="160" width="12" height="32" rx="6" />
        <ellipse cx="72" cy="159" rx="7" ry="5" />
        {/* Distal phalanx */}
        <rect x="67" y="128" width="10" height="28" rx="5" />
        <ellipse cx="72" cy="127" rx="6" ry="4" />
      </g>

      {/* 2nd FINGER (HIGHLIGHTED METACARPAL) */}
      <g fill={hiFill} stroke={hiStroke} strokeWidth="1.5" filter="url(#bv-glow)">
        <rect x="80" y="160" width="14" height="86" rx="7" />
        <ellipse cx="87" cy="160" rx="8" ry="5" />
        <ellipse cx="87" cy="246" rx="9" ry="6" />
      </g>
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="81" y="108" width="12" height="48" rx="6" />
        <ellipse cx="87" cy="108" rx="7" ry="5" />
        <rect x="82" y="72" width="10" height="32" rx="5" />
        <ellipse cx="87" cy="72" rx="6" ry="4" />
        <rect x="83" y="42" width="8" height="26" rx="4" />
        <ellipse cx="87" cy="41" rx="5" ry="3" />
      </g>

      {/* 3rd FINGER (HIGHLIGHTED METACARPAL, longest) */}
      <g fill={hiFill} stroke={hiStroke} strokeWidth="1.5" filter="url(#bv-glow)">
        <rect x="111" y="152" width="14" height="94" rx="7" />
        <ellipse cx="118" cy="152" rx="8" ry="5" />
        <ellipse cx="118" cy="246" rx="9" ry="6" />
      </g>
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="112" y="96" width="12" height="52" rx="6" />
        <ellipse cx="118" cy="96" rx="7" ry="5" />
        <rect x="113" y="58" width="10" height="34" rx="5" />
        <ellipse cx="118" cy="58" rx="6" ry="4" />
        <rect x="114" y="24" width="8" height="30" rx="4" />
        <ellipse cx="118" cy="23" rx="5" ry="3" />
      </g>

      {/* 4th FINGER (HIGHLIGHTED METACARPAL) */}
      <g fill={hiFill} stroke={hiStroke} strokeWidth="1.5" filter="url(#bv-glow)">
        <rect x="141" y="158" width="14" height="88" rx="7" />
        <ellipse cx="148" cy="158" rx="8" ry="5" />
        <ellipse cx="148" cy="246" rx="9" ry="6" />
      </g>
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="142" y="104" width="12" height="50" rx="6" />
        <ellipse cx="148" cy="104" rx="7" ry="5" />
        <rect x="143" y="68" width="10" height="32" rx="5" />
        <ellipse cx="148" cy="68" rx="6" ry="4" />
        <rect x="144" y="38" width="8" height="26" rx="4" />
        <ellipse cx="148" cy="37" rx="5" ry="3" />
      </g>

      {/* 5th FINGER (PINKY) – tilted outward */}
      <g transform="rotate(12 175 250)" fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="168" y="180" width="13" height="68" rx="6" />
        <ellipse cx="174.5" cy="180" rx="7" ry="5" />
        <ellipse cx="174.5" cy="248" rx="8" ry="5" />
        <rect x="169" y="138" width="11" height="38" rx="5" />
        <ellipse cx="174.5" cy="138" rx="6" ry="4" />
        <rect x="170" y="108" width="9" height="26" rx="4" />
        <ellipse cx="174.5" cy="108" rx="5" ry="3" />
        <rect x="171" y="82" width="7" height="22" rx="3" />
      </g>

      {/* Length-measurement guide on 3rd metacarpal */}
      <g stroke="rgba(249,115,22,0.75)" strokeWidth="1">
        <line x1="131" y1="152" x2="139" y2="152" />
        <line x1="131" y1="246" x2="139" y2="246" />
        <line x1="135" y1="152" x2="135" y2="246" strokeDasharray="3 3" opacity="0.65" />
      </g>

      {/* Bone labels */}
      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9" fill="rgba(249,115,22,0.9)" textAnchor="middle" letterSpacing="0.05em">
        <text x="87" y="295">MC2</text>
        <text x="118" y="295">MC3</text>
        <text x="148" y="295">MC4</text>
      </g>
    </svg>
  );
}

function ArtDataAgent() {
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <svg viewBox="0 0 260 220" preserveAspectRatio="xMidYMid meet" className="pf-art-svg">
      <defs>
        <marker id="da-arr-c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L9,5 L0,10 z" fill="rgba(6,182,212,0.85)" />
        </marker>
        <marker id="da-arr-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L9,5 L0,10 z" fill="rgba(124,58,237,0.85)" />
        </marker>
        <marker id="da-arr-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L9,5 L0,10 z" fill="rgba(249,115,22,0.9)" />
        </marker>
        <filter id="da-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Top-left: CSV file input */}
      <g>
        <path d="M 12 14 L 56 14 L 64 22 L 64 50 L 12 50 Z" fill="rgba(7,6,17,0.65)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M 56 14 L 56 22 L 64 22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <text x="38" y="32" fontFamily={mono} fontSize="8" fill="rgba(255,255,255,0.85)" textAnchor="middle">data.csv</text>
        <text x="38" y="43" fontFamily={mono} fontSize="6" fill="rgba(124,58,237,0.85)" textAnchor="middle" letterSpacing="0.1em">7,043 ROWS</text>
      </g>

      {/* Top-right: question bubble */}
      <g>
        <rect x="160" y="14" width="92" height="36" rx="18" fill="rgba(124,58,237,0.14)" stroke="rgba(124,58,237,0.7)" strokeWidth="1" />
        <text x="206" y="32" fontFamily={mono} fontSize="9" fill="rgba(255,255,255,0.9)" textAnchor="middle">"avg sales by</text>
        <text x="206" y="42" fontFamily={mono} fontSize="9" fill="rgba(255,255,255,0.9)" textAnchor="middle">region?"</text>
      </g>

      {/* Input arrows down to agent */}
      <g stroke="rgba(124,58,237,0.55)" strokeWidth="1" fill="none" strokeDasharray="3 3">
        <path d="M 40 52 Q 60 85 105 102" markerEnd="url(#da-arr-v)" />
        <path d="M 210 52 Q 195 85 155 102" markerEnd="url(#da-arr-v)" />
      </g>

      {/* Center: Agent node */}
      <g>
        <circle cx="130" cy="116" r="32" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.95)" strokeWidth="1.6" filter="url(#da-glow)" />
        <circle cx="130" cy="116" r="22" fill="none" stroke="rgba(124,58,237,0.45)" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="130" y="114" fontFamily={mono} fontSize="11" fill="white" textAnchor="middle" fontWeight="700">AGENT</text>
        <text x="130" y="126" fontFamily={mono} fontSize="6.5" fill="rgba(255,255,255,0.55)" textAnchor="middle" letterSpacing="0.18em">LANGGRAPH</text>
      </g>

      {/* Tool nodes */}
      <g fill="rgba(7,6,17,0.6)" stroke="rgba(6,182,212,0.7)" strokeWidth="1">
        <rect x="12" y="100" width="50" height="32" rx="4" />
        <rect x="198" y="100" width="50" height="32" rx="4" />
      </g>
      <g fontFamily={mono} fontSize="11" fill="rgba(6,182,212,0.95)" textAnchor="middle" fontWeight="700">
        <text x="37" y="120">SQL</text>
        <text x="223" y="120">PY</text>
      </g>
      <g fontFamily={mono} fontSize="6" fill="rgba(6,182,212,0.6)" textAnchor="middle" letterSpacing="0.1em">
        <text x="37" y="129">DUCKDB</text>
        <text x="223" y="129">SANDBOX</text>
      </g>

      {/* Agent ↔ tools */}
      <g stroke="rgba(6,182,212,0.6)" strokeWidth="1" fill="none">
        <line x1="98" y1="116" x2="68" y2="116" markerEnd="url(#da-arr-c)" />
        <line x1="162" y1="116" x2="192" y2="116" markerEnd="url(#da-arr-c)" />
      </g>

      {/* Retry loop arc */}
      <g stroke="rgba(249,115,22,0.75)" strokeWidth="1.2" fill="none" strokeDasharray="3 3">
        <path d="M 222 134 Q 250 168 210 180 Q 170 178 162 142" markerEnd="url(#da-arr-o)" />
      </g>
      <text x="246" y="158" fontFamily={mono} fontSize="8" fill="rgba(249,115,22,0.92)" letterSpacing="0.08em" textAnchor="end">↺ RETRY</text>

      {/* Output: answer chart card */}
      <g>
        <rect x="80" y="166" width="100" height="40" rx="6" fill="rgba(7,6,17,0.65)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <text x="88" y="180" fontFamily={mono} fontSize="7" fill="rgba(255,255,255,0.55)" letterSpacing="0.15em">ANSWER</text>
        {/* Tiny bar chart */}
        <g fill="rgba(124,58,237,0.85)">
          <rect x="90" y="195" width="6" height="8" rx="1" />
          <rect x="100" y="190" width="6" height="13" rx="1" />
          <rect x="110" y="186" width="6" height="17" rx="1" />
          <rect x="120" y="192" width="6" height="11" rx="1" />
          <rect x="130" y="188" width="6" height="15" rx="1" />
        </g>
        <text x="172" y="200" fontFamily={mono} fontSize="9" fill="rgba(6,182,212,0.95)" textAnchor="end" fontWeight="700">$42k</text>
      </g>

      {/* Agent → answer arrow */}
      <line x1="130" y1="148" x2="130" y2="162" stroke="rgba(124,58,237,0.7)" strokeWidth="1" markerEnd="url(#da-arr-v)" />
    </svg>
  );
}

function ArtDocRag() {
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <svg viewBox="0 0 240 170" preserveAspectRatio="xMidYMid meet" className="pf-art-svg">
      <g>
        <rect x="36" y="22" width="98" height="128" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="28" y="14" width="98" height="128" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <rect x="20" y="6" width="98" height="128" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </g>
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round">
        <line x1="30" y1="22" x2="100" y2="22" />
        <line x1="30" y1="30" x2="108" y2="30" />
        <line x1="30" y1="38" x2="92" y2="38" />
        <line x1="30" y1="46" x2="104" y2="46" />
        <line x1="30" y1="54" x2="96" y2="54" />
        <line x1="30" y1="80" x2="108" y2="80" />
        <line x1="30" y1="88" x2="100" y2="88" />
        <line x1="30" y1="96" x2="106" y2="96" />
        <line x1="30" y1="104" x2="92" y2="104" />
        <line x1="30" y1="112" x2="104" y2="112" />
        <line x1="30" y1="120" x2="98" y2="120" />
      </g>
      <g>
        <rect x="28" y="60" width="90" height="12" rx="2" fill="rgba(249,115,22,0.20)" stroke="rgba(249,115,22,0.85)" strokeWidth="1" />
        <text x="124" y="70" fontFamily={mono} fontSize="10" fill="rgba(249,115,22,0.95)" fontWeight="700">[1]</text>
      </g>
      <path d="M 138 68 Q 168 68 175 88" stroke="rgba(6,182,212,0.5)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <g>
        <rect x="148" y="86" width="82" height="60" rx="4" fill="rgba(7,6,17,0.65)" stroke="rgba(6,182,212,0.7)" strokeWidth="1" />
        <text x="156" y="102" fontFamily={mono} fontSize="7" fill="rgba(6,182,212,0.9)" letterSpacing="0.15em">CITATION</text>
        <text x="156" y="117" fontFamily={mono} fontSize="8" fill="rgba(255,255,255,0.88)">[1] doc.pdf</text>
        <text x="156" y="129" fontFamily={mono} fontSize="7" fill="rgba(255,255,255,0.55)">page 47 · 0.98</text>
        <line x1="156" y1="136" x2="222" y2="136" stroke="rgba(6,182,212,0.35)" strokeWidth="1" />
        <line x1="156" y1="141" x2="200" y2="141" stroke="rgba(6,182,212,0.35)" strokeWidth="1" />
      </g>
    </svg>
  );
}

function ArtTomato() {
  return (
    <svg viewBox="0 0 240 175" preserveAspectRatio="xMidYMid meet" className="pf-art-svg">
      <defs>
        <filter id="tm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <path
        d="M 120 8 C 80 12 52 44 48 86 C 44 131 76 164 120 168 C 164 164 196 131 192 86 C 188 44 160 12 120 8 Z"
        fill="rgba(34,197,94,0.14)"
        stroke="rgba(34,197,94,0.75)"
        strokeWidth="1.5"
      />
      <line x1="120" y1="10" x2="120" y2="166" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" />
      <g stroke="rgba(34,197,94,0.4)" strokeWidth="1" fill="none">
        <path d="M 120 41 Q 95 46 70 64" />
        <path d="M 120 41 Q 145 46 170 64" />
        <path d="M 120 76 Q 88 81 60 101" />
        <path d="M 120 76 Q 152 81 180 101" />
        <path d="M 120 111 Q 92 116 72 131" />
        <path d="M 120 111 Q 148 116 168 131" />
      </g>
      <g fill="rgba(249,115,22,0.55)" stroke="rgba(249,115,22,0.95)" strokeWidth="0.8">
        <circle cx="82" cy="66" r="6" />
        <circle cx="95" cy="116" r="5" />
        <circle cx="145" cy="128" r="4" />
        <circle cx="105" cy="91" r="3" />
        <circle cx="155" cy="84" r="8" filter="url(#tm-glow)" />
      </g>
      <g stroke="rgba(249,115,22,0.95)" strokeWidth="1" fill="none">
        <circle cx="155" cy="84" r="14" strokeDasharray="3 3" />
        <line x1="135" y1="84" x2="143" y2="84" />
        <line x1="167" y1="84" x2="175" y2="84" />
        <line x1="155" y1="64" x2="155" y2="72" />
        <line x1="155" y1="96" x2="155" y2="104" />
      </g>
    </svg>
  );
}

function ArtChurn() {
  const COLS = 6, ROWS = 4;
  const atRisk = new Set(['1,1', '3,0', '4,2', '2,3', '0,2', '5,1']);
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  const out = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${col},${row}`;
      const risk = atRisk.has(key);
      const cx = 32 + col * 26;
      const cy = 24 + row * 26;
      if (risk) {
        out.push(<circle key={`${key}-r`} cx={cx} cy={cy} r="10" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth="1" strokeDasharray="2 2" />);
      }
      out.push(
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={risk ? 6 : 4.5}
          fill={risk ? 'rgba(249,115,22,0.9)' : 'rgba(255,255,255,0.10)'}
          stroke={risk ? 'rgba(249,115,22,1)' : 'rgba(255,255,255,0.35)'}
          strokeWidth={risk ? 1.4 : 1}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid meet" className="pf-art-svg">
      {out}
      <g>
        <rect x="200" y="18" width="26" height="116" rx="4" fill="rgba(7,6,17,0.55)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <rect x="203" y="53" width="20" height="78" rx="3" fill="rgba(249,115,22,0.45)" />
        <line x1="200" y1="53" x2="226" y2="53" stroke="rgba(249,115,22,0.95)" strokeWidth="1.2" />
        <text x="213" y="13" fontFamily={mono} fontSize="7" fill="rgba(255,255,255,0.6)" textAnchor="middle" letterSpacing="0.1em">RECALL</text>
        <text x="213" y="48" fontFamily={mono} fontSize="9" fill="rgba(249,115,22,0.95)" textAnchor="middle" fontWeight="700">82%</text>
      </g>
    </svg>
  );
}

function ArtPilot() {
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  const cx = 130, cy = 108;
  const agents = [
    { name: 'ORCH',    x: 130, y: 28,  highlight: true },
    { name: 'BROWSER', x: 38,  y: 88   },
    { name: 'DRIVE',   x: 222, y: 88   },
    { name: 'AUTH',    x: 38,  y: 158  },
    { name: 'FS',      x: 222, y: 158  },
  ];
  return (
    <svg viewBox="0 0 260 200" preserveAspectRatio="xMidYMid meet" className="pf-art-svg">
      <defs>
        <filter id="pl-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="rgba(6,182,212,0.5)" strokeWidth="1" strokeDasharray="3 3" fill="none">
        {agents.map(a => (
          <line key={a.name} x1={a.x} y1={a.y} x2={cx} y2={cy} />
        ))}
      </g>
      <g>
        <circle cx={cx} cy={cy} r="30" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.95)" strokeWidth="1.6" filter="url(#pl-glow)" />
        <circle cx={cx} cy={cy} r="20" fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x={cx} y={cy - 1} fontFamily={mono} fontSize="11" fill="white" fontWeight="700" textAnchor="middle">MCP</text>
        <text x={cx} y={cy + 11} fontFamily={mono} fontSize="6.5" fill="rgba(255,255,255,0.55)" letterSpacing="0.16em" textAnchor="middle">FASTAPI</text>
      </g>
      {agents.map(a => {
        const isOrch = a.highlight;
        const w = a.name.length * 6.5 + 18;
        return (
          <g key={a.name}>
            <rect
              x={a.x - w / 2}
              y={a.y - 13}
              width={w}
              height={26}
              rx={5}
              fill={isOrch ? 'rgba(249,115,22,0.18)' : 'rgba(7,6,17,0.65)'}
              stroke={isOrch ? 'rgba(249,115,22,0.95)' : 'rgba(6,182,212,0.7)'}
              strokeWidth="1"
            />
            <text
              x={a.x}
              y={a.y + 4}
              fontFamily={mono}
              fontSize="10"
              fill={isOrch ? 'rgba(249,115,22,0.98)' : 'rgba(6,182,212,0.95)'}
              textAnchor="middle"
              fontWeight="700"
            >{a.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

const PROJECT_ART = {
  bonevision: ArtBoneVision,
  pilot: ArtPilot,
  'data-analyst-agent': ArtDataAgent,
  'doc-rag': ArtDocRag,
  'tomato-disease': ArtTomato,
  'churn-prediction': ArtChurn,
};

function ProjectArt({ project }) {
  const Graphic = PROJECT_ART[project.id];
  return (
    <div className={`pf-proj-art ${project.art}`}>
      <div className="art-overlay-grid"></div>
      <div className="art-overlay-noise"></div>
      <div className="pf-art-figure">{Graphic && <Graphic />}</div>
      <div className="pf-art-glyph">{project.glyph}</div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  if (!project) return null;
  return (
    <div className="pf-modal-backdrop" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <button className="pf-modal-close" onClick={onClose} aria-label="Close">×</button>
        {project.video ? (
          <video
            key={project.id}
            className="pf-modal-video"
            src={encodeURI(project.video)}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="pf-modal-hero">
            <ProjectArt project={project} />
          </div>
        )}
        <div className="pf-modal-body">
          <div className="pf-modal-meta">
            <span className="accent">{project.cat}</span>
            <span>2025</span>
          </div>
          <h2 className="pf-modal-title">{project.title}</h2>
          <p className="pf-modal-tagline">{project.blurb}</p>
          <div className="pf-modal-tags">
            {project.stack.map(s => <span key={s}>{s}</span>)}
          </div>

          <div className="pf-section-bigtitle">Case Flow</div>
          <div className="pf-flow">
            <div className="pf-flow-step problem">
              <div className="label"><span className="num">01</span> Problem</div>
              <h4>What was broken</h4>
              <p>{project.problem}</p>
            </div>
            <div className="pf-flow-step solution">
              <div className="label"><span className="num">02</span> Solution</div>
              <h4>What I built</h4>
              <p>{project.solution}</p>
            </div>
            <div className="pf-flow-step impact">
              <div className="label"><span className="num">03</span> Impact</div>
              <h4>What it moved</h4>
              <p>Quantified outcomes shipped to production users.</p>
            </div>
          </div>

          <div className="pf-section-bigtitle">Outcomes</div>
          <div className="pf-impact-stats">
            {project.impact.map(s => (
              <div key={s.l}>
                <div className="v">{s.v}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>

          {(project.github || project.demo) && (
            <div className="pf-modal-cta">
              {project.github && (
                <a className="pf-btn pf-btn-primary" href={project.github} target="_blank" rel="noopener noreferrer">
                  <span>View on GitHub</span><span className="arr">↗</span>
                </a>
              )}
              {project.demo && (
                <a className="pf-btn pf-btn-ghost" href={project.demo} target="_blank" rel="noopener noreferrer">
                  <span>Live Demo</span><span className="arr">→</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({ current, total, onPage }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i);
  return (
    <nav className="pf-pagination" aria-label="Pagination">
      <button
        type="button"
        className="pf-page-arrow"
        onClick={() => onPage(current - 1)}
        disabled={current === 0}
        aria-label="Previous page"
      >←</button>
      <div className="pf-page-nums">
        {pages.map(p => (
          <button
            type="button"
            key={p}
            className={`pf-page-num${p === current ? ' active' : ''}`}
            onClick={() => onPage(p)}
            aria-current={p === current ? 'page' : undefined}
            aria-label={`Page ${p + 1}`}
          >{String(p + 1).padStart(2, '0')}</button>
        ))}
      </div>
      <button
        type="button"
        className="pf-page-arrow"
        onClick={() => onPage(current + 1)}
        disabled={current === total - 1}
        aria-label="Next page"
      >→</button>
    </nav>
  );
}

function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  if (!cert) return null;
  const ext = (cert.cert.split('.').pop() || '').toLowerCase();
  const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext);
  const isPdf = ext === 'pdf';
  return (
    <div className="pf-modal-backdrop" onClick={onClose}>
      <div className="pf-modal pf-cert-modal" onClick={e => e.stopPropagation()}>
        <button className="pf-modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="pf-cert-header">
          <div className="pf-cert-header-left">
            <div className="pf-ach-icon">{cert.ico}</div>
            <div>
              <div className="pf-modal-meta">
                <span className="accent">{cert.org}</span>
                <span>·</span>
                <span>{cert.year}</span>
              </div>
              <h2 className="pf-cert-title">{cert.title}</h2>
              {cert.desc && <p className="pf-cert-desc">{cert.desc}</p>}
            </div>
          </div>
        </div>
        <div className="pf-cert-viewer">
          {isPdf && (
            <iframe
              src={cert.cert + '#view=FitH&toolbar=0&navpanes=0'}
              title={cert.title}
              className="pf-cert-frame"
            />
          )}
          {isImage && (
            <img src={cert.cert} alt={cert.title} className="pf-cert-img" />
          )}
          {!isPdf && !isImage && (
            <div className="pf-cert-fallback">
              <p>Preview not available for this file type.</p>
            </div>
          )}
        </div>
        <div className="pf-cert-cta">
          <a className="pf-btn pf-btn-primary" href={cert.cert} target="_blank" rel="noopener noreferrer">
            <span>Open in new tab</span><span className="arr">↗</span>
          </a>
          <a className="pf-btn pf-btn-ghost" href={cert.cert} download>
            <span>Download</span><span className="arr">↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MAIN PORTFOLIO
// ────────────────────────────────────────────────────────────
function Portfolio() {
  const rootRef = useRef(null);
  const isMobile = useIsMobile();
  const [openProject, setOpenProject] = useState(null);
  const [openCert, setOpenCert] = useState(null);
  const [projectPage, setProjectPage] = useState(0);
  const [certPage, setCertPage] = useState(0);
  const projectsSecRef = useRef(null);
  const achievementsSecRef = useRef(null);
  useReveal(rootRef);
  useTimelineReveal(rootRef);

  const projectsPerPage = isMobile ? 3 : 5;
  const certsPerPage = 6;
  const projectTotalPages = Math.max(1, Math.ceil(PROJECTS.length / projectsPerPage));
  const certTotalPages = Math.max(1, Math.ceil(ACHIEVEMENTS.length / certsPerPage));

  // Clamp page indices if list size / viewport changes.
  useEffect(() => {
    if (projectPage > projectTotalPages - 1) setProjectPage(projectTotalPages - 1);
  }, [projectPage, projectTotalPages]);
  useEffect(() => {
    if (certPage > certTotalPages - 1) setCertPage(certTotalPages - 1);
  }, [certPage, certTotalPages]);

  const visibleProjects = PROJECTS.slice(projectPage * projectsPerPage, (projectPage + 1) * projectsPerPage);
  const visibleCerts = ACHIEVEMENTS.slice(certPage * certsPerPage, (certPage + 1) * certsPerPage);

  const goToProjectPage = (p) => {
    setProjectPage(p);
    if (projectsSecRef.current) {
      projectsSecRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const goToCertPage = (p) => {
    setCertPage(p);
    if (achievementsSecRef.current) {
      achievementsSecRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pf-root" ref={rootRef}>
      <div className="pf-stars"></div>
      <div className="pf-nebula"></div>
      {!isMobile && <CursorGlow />}

      <div className="pf-content">
        {/* NAV */}
        <nav className="pf-nav">
          <div className="pf-nav-mark">
            <div className="pf-mark-glyph"></div>
            <span>perarasan.dev</span>
          </div>
          {!isMobile && (
            <div className="pf-nav-links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#achievements">Achievements</a>
            </div>
          )}
          <a className="pf-nav-cta" href="#contact">Let's talk →</a>
        </nav>

        {/* HERO */}
        <section className="pf-hero">
          <div>
            <div className="pf-status reveal">
              <span className="pf-status-dot"></span>
              <span>{PROFILE.status} · Full-time</span>
            </div>
            <div className="pf-eyebrow reveal delay-1">Portfolio · 2025/26</div>
            <h1 className="pf-h1 reveal delay-1">
              {PROFILE.name.split(' ')[0]}<br />
              <span className="grad">{PROFILE.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="pf-tagline reveal delay-2">
              {PROFILE.tagline}
            </p>
            <div className="pf-role reveal delay-2">
              <span>AI/ML Engineer</span>
              <span className="pipe">|</span>
              <span>Data Scientist</span>
              <span className="pipe">|</span>
              <span>Software Engineer</span>
            </div>
            <div className="pf-cta-row reveal delay-3">
              <a className="pf-btn pf-btn-primary" href="#projects">
                <span>View Projects</span>
                <span className="arr">→</span>
              </a>
              <a className="pf-btn pf-btn-ghost" href="#contact">
                <span>Contact Me</span>
                <span className="arr">↗</span>
              </a>
            </div>
          </div>

          <div className="reveal delay-2">
            <PhotoBlock onPlay={() => setOpenProject(PROJECTS[0])} />
          </div>

          {!isMobile && (
            <div className="pf-scroll-cue">
              <span>Scroll</span>
              <div className="line"></div>
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section className="pf-section" id="about">
          <div className="pf-section-head">
            <div>
              <div className="pf-section-num">01 / About</div>
              <h2 className="pf-section-title reveal">I build <span style={{color:'var(--orange)'}}>AI systems</span> that actually <span style={{color:'#c4b5fd'}}>ship</span>.</h2>
            </div>
            <p className="pf-section-sub reveal delay-1">M.Sc Applied Data Science graduate, currently shipping production AI across computer vision, agents, and generative AI.</p>
          </div>
          <div className="pf-about">
            <div className="pf-about-text">
              <p className="reveal">I'm an M.Sc Applied Data Science Graduate at SRM Institute of Science and Technology and an AI Intern at Meraki Alai Labs in Chennai, where I built a workflow automation system and work across R&amp;D, generative AI products, and computer vision.</p>
              <p className="muted reveal delay-1">My recent work spans medical imaging (a multimodal deep learning system for SRM Medical College that predicts age, gender, and Bone Health Index from a single hand X-ray), agentic AI (an autonomous LangGraph agent that writes and debugs its own SQL and Python to answer data questions, plus multi-agent orchestration experiments), generative AI (a fully offline RAG system running on Gemma 4 on a phone), and process automation (a LangGraph workflow at Meraki that cut 5 hours of daily reporting down to under 30 minutes).</p>
              <p className="muted reveal delay-2">I'm fluent with AI coding tools and use them daily to ship faster without losing rigor. The things I care about are evaluation harnesses that catch silent regressions, retrieval pipelines that cite their sources, and the small reliability decisions that keep models alive in production. Equally comfortable in PyTorch and in shipping code, and drawn to problems where the right answer actually matters.</p>
              <div className="pf-about-meta">
                <div className="pf-meta-card reveal delay-2">
                  <div className="k">Based</div>
                  <div className="v">Chennai, India</div>
                </div>
                <div className="pf-meta-card reveal delay-2">
                  <div className="k">Open To</div>
                  <div className="v">Remote · Hybrid · Relocation</div>
                </div>
                <div className="pf-meta-card reveal delay-3">
                  <div className="k">Languages</div>
                  <div className="v">English · Tamil</div>
                </div>
                <div className="pf-meta-card reveal delay-3">
                  <div className="k">Available</div>
                  <div className="v">Immediate · Full-time</div>
                </div>
              </div>
            </div>
            <div className="pf-about-card reveal delay-1">
              <div className="pf-card-label">Currently</div>
              <ul className="pf-now-list">
                <li><span className="tag violet">build</span><span><b>BoneVision</b> — multimodal medical AI for SRM Medical College, plus workflow automation and on-device RAG at Meraki Alai Labs.</span></li>
                <li><span className="tag">read</span><span>LangGraph internals, on-device LLM patterns, and recent agentic-AI research.</span></li>
                <li><span className="tag orange">apply</span><span>Open to full-time AI/ML Engineer, Data Scientist, and Software Engineer roles.</span></li>
                <li><span className="tag">learn</span><span>Multimodal architectures, agent orchestration, and edge deployment of language models.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="pf-section" id="skills">
          <div className="pf-section-head">
            <div>
              <div className="pf-section-num">02 / Stack</div>
              <h2 className="pf-section-title reveal">Tools I reach for, ranked by how often they end up in production.</h2>
            </div>
            <p className="pf-section-sub reveal delay-1">Comfortable across the ML stack from data pipelines to deployment.</p>
          </div>
          <div className="pf-skills-grid">
            {SKILLS.map((cat, i) => (
              <div className="pf-skill-cat reveal" style={{transitionDelay: `${i * 80}ms`}} key={cat.cat}>
                <div className="cat-num">{cat.num}</div>
                <h3>{cat.cat}</h3>
                <div className="pf-skill-list">
                  {cat.items.map(it => (
                    <span className="pf-skill-pill" data-level={it.l} key={it.n}>
                      <span className="dot"></span>{it.n}
                    </span>
                  ))}
                </div>
                <div className="pf-skill-meta">
                  <span className="legend"><span className="dot" style={{background:'var(--violet)'}}></span>daily</span>
                  <span className="legend"><span className="dot" style={{background:'var(--cyan)'}}></span>fluent</span>
                  <span className="legend"><span className="dot" style={{background:'var(--ink-3)'}}></span>familiar</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="pf-section" id="projects" ref={projectsSecRef}>
          <div className="pf-section-head">
            <div>
              <div className="pf-section-num">03 / Selected work</div>
              <h2 className="pf-section-title reveal">Projects that shipped, taught, or surprised me.</h2>
            </div>
            <p className="pf-section-sub reveal delay-1">Click any card for the full case study — problem, approach, and measured impact.</p>
          </div>
          <div className="pf-proj-grid">
            {visibleProjects.map((p, i) => (
              <article
                key={p.id}
                className={`pf-proj-card reveal ${i === 0 && !isMobile ? 'featured' : ''}`}
                style={{transitionDelay: `${i * 60}ms`}}
                onClick={() => setOpenProject(p)}
              >
                <div className="pf-proj-thumb">
                  <div className="pf-proj-thumb-bg">
                    <ProjectArt project={p} />
                  </div>
                  <div className="pf-proj-overlay">
                    <span className="pf-view-pill">View Details →</span>
                  </div>
                </div>
                <div className="pf-proj-body">
                  <div className="pf-proj-meta">
                    <span className="accent">{p.cat}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.blurb}</p>
                  <div className="pf-proj-tags">
                    {p.stack.slice(0, 4).map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Pagination current={projectPage} total={projectTotalPages} onPage={goToProjectPage} />
        </section>

        {/* EXPERIENCE */}
        <section className="pf-section" id="experience">
          <div className="pf-section-head">
            <div>
              <div className="pf-section-num">04 / Timeline</div>
              <h2 className="pf-section-title reveal">A short, deliberate path through ML and shipping.</h2>
            </div>
            <p className="pf-section-sub reveal delay-1">A run of internships spanning AI/ML engineering, AWS cloud, generative AI, and applied data science.</p>
          </div>
          <div className="pf-timeline">
            {EXPERIENCE.map((e, i) => (
              <div className="pf-tl-item reveal" style={{transitionDelay: `${i * 220}ms`}} key={e.role}>
                <div className="pf-tl-when">
                  {e.now && <div className="now">● Currently</div>}
                  {e.when}
                </div>
                <div>
                  <h3 className="pf-tl-role">{e.role}</h3>
                  <div className="pf-tl-co"><b>{e.co}</b> <span className="at">·</span> {e.where}</div>
                  <ul className="pf-tl-bullets">
                    {e.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="pf-tl-stack">
                    {e.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                  {e.cert && (
                    <button
                      type="button"
                      className="pf-tl-cert"
                      onClick={() => setOpenCert({
                        ico: e.ico || 'EX',
                        title: e.role,
                        org: e.co,
                        year: e.when,
                        cert: e.cert,
                      })}
                    >
                      <span>View certificate</span><span className="arr">→</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="pf-section" id="education">
          <div className="pf-section-head">
            <div>
              <div className="pf-section-num">05 / Education</div>
              <h2 className="pf-section-title reveal">Where the foundation was built.</h2>
            </div>
            <p className="pf-section-sub reveal delay-1">Academic grounding in computer science and applied data science.</p>
          </div>
          <div className="pf-timeline">
            {EDUCATION.map((e, i) => (
              <div className="pf-tl-item reveal" style={{transitionDelay: `${i * 220}ms`}} key={e.degree}>
                <div className="pf-tl-when">
                  {e.current && <div className="now">● Current</div>}
                  {e.when}
                </div>
                <div>
                  <h3 className="pf-tl-role">{e.degree}</h3>
                  <div className="pf-tl-co"><b>{e.institution}</b> <span className="at">·</span> CGPA {e.cgpa}</div>
                  <ul className="pf-tl-bullets">
                    {e.bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="pf-tl-stack">
                    {e.tags.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="pf-section" id="achievements" ref={achievementsSecRef}>
          <div className="pf-section-head">
            <div>
              <div className="pf-section-num">06 / Credentials</div>
              <h2 className="pf-section-title reveal">Certifications that shaped my thinking.</h2>
            </div>
            <p className="pf-section-sub reveal delay-1">Structured learning alongside applied work — from fundamentals to frontier AI.</p>
          </div>
          <div className="pf-ach-grid">
            {visibleCerts.map((a, i) => {
              const ext = (a.cert.split('.').pop() || '').toLowerCase();
              const isImage = ['png','jpg','jpeg','webp','gif','svg'].includes(ext);
              const isPdf = ext === 'pdf';
              return (
                <div
                  className="pf-ach-card reveal"
                  style={{transitionDelay: `${i * 50}ms`}}
                  key={a.title}
                  onClick={() => setOpenCert(a)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenCert(a); } }}
                >
                  <div className="pf-ach-preview" aria-hidden="true">
                    {isPdf && (
                      <iframe
                        src={a.cert + '#view=FitH&toolbar=0&navpanes=0&scrollbar=0'}
                        title=""
                        tabIndex={-1}
                        loading="lazy"
                      />
                    )}
                    {isImage && (
                      <img src={a.cert} alt="" loading="lazy" />
                    )}
                    <div className="pf-ach-preview-scrim"></div>
                    <div className="pf-ach-preview-grid"></div>
                  </div>
                  <div className="pf-ach-body">
                    <div className="pf-ach-icon">{a.ico}</div>
                    <div className="yr">{a.year}</div>
                    <h4>{a.title}</h4>
                    <div className="org">{a.org}</div>
                    {a.desc && <p className="pf-ach-desc">{a.desc}</p>}
                    <div className="pf-ach-view">View certificate <span className="arr">→</span></div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination current={certPage} total={certTotalPages} onPage={goToCertPage} />
        </section>

        {/* FOOTER / CONTACT */}
        <section className="pf-footer" id="contact">
          <h2 className="pf-footer-cta reveal">
            Got a hard ML problem<br />or a role I'd love? <span>Let's talk.</span>
          </h2>
          <div className="pf-cta-row reveal delay-1">
            <a className="pf-btn pf-btn-primary" href={`mailto:${PROFILE.email}`}>
              <span>{PROFILE.email}</span><span className="arr">→</span>
            </a>
            <a className="pf-btn pf-btn-ghost" href="assets/Resume_PD.pdf" download="Perarasan_D_Resume.pdf">
              <span>Download Resume (PDF)</span><span className="arr">↓</span>
            </a>
          </div>
          <div className="pf-footer-row">
            <div>© 2026 Perarasan D · Crafted with React + nebula gradients</div>
            <div className="pf-socials">
              <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <IconGitHub />
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <IconLinkedIn />
              </a>
              <a href={PROFILE.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" title="Twitter / X">
                <IconTwitterX />
              </a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email" title="Email">
                <IconEmail />
              </a>
            </div>
          </div>
        </section>
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
      {openCert && <CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Portfolio />);
