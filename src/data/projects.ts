import type { Project, ProjectDomain } from '../types';

export const DOMAIN_LABELS: Record<ProjectDomain, string> = {
  cv: 'Computer vision',
  agents: 'Agents & LLMs',
  ml: 'Classical ML',
};

export const PROJECTS: Project[] = [
  {
    id: 'bonevision',
    domain: 'cv',
    title: 'BoneVision',
    tag: 'CASE STUDY',
    cat: 'Medical AI · Computer Vision',
    blurb:
      'End-to-end medical AI built for SRM Medical College as an internal alternative to Bonexpert — predicts Age, Gender, and Bone Health Index from a single hand X-ray in under 5 seconds.',
    stack: ['PyTorch', 'EfficientNet-B3', 'YOLOv8', 'FastAPI', 'Streamlit', 'DICOM'],
    art: 'art-grad-1',
    glyph: 'SCAN · SEGMENT · DIAGNOSE',
    featured: true,
    problem:
      'Radiologists spend 7–10 minutes manually measuring metacarpals to compute the Bone Health Index for every hand X-ray. SRM Medical College needed an internal alternative to Bonexpert that could deliver clinically-accurate Age, Gender, and BHI predictions in seconds rather than minutes.',
    solution:
      'Two-model pipeline. (1) EfficientNet-B3 with transfer learning and a custom attention mechanism, trained on the RSNA Bone Age Challenge dataset with CLAHE preprocessing — age as regression, gender as classification. (2) Custom YOLOv8 segmentation model trained on 319 clinical DICOM X-rays (2nd/3rd/4th metacarpals polygon-annotated in Roboflow) that extracts length, width, and cortical thickness and applies the clinical BHI formula. DICOM pixel spacing is read from metadata for clinically-accurate measurements; calibrated default for PNG/JPG. Served via FastAPI backend + Streamlit frontend with drag-and-drop upload.',
    impact: [
      { v: '< 5s', l: 'Per X-ray' },
      { v: '95.77%', l: 'Gender Accuracy' },
      { v: '94.2%', l: 'Segmentation mAP' },
    ],
    github: 'https://github.com/Perarasan247/BoneVision',
  },
  {
    id: 'pilot',
    domain: 'agents',
    title: 'Pilot',
    cat: 'Multi-Agent · RPA',
    blurb:
      'A multi-agent pilot for cloud workflows that autonomously navigates Google Drive end-to-end, from login (with 2FA detection) to locating, downloading, and relocating files, without any human intervention.',
    stack: ['Python', 'Google ADK', 'Gemini', 'MCP', 'FastAPI', 'Playwright', 'Pydantic'],
    art: 'art-grad-6',
    glyph: 'PLAN · ORCHESTRATE · ACT',
    problem:
      "Manual cloud workflows like navigating Google Drive, downloading files, and relocating them across folders are tedious and don't scale. Off-the-shelf RPA tools break when the UI changes, and most browser automation falls apart on real auth flows like Google 2FA.",
    solution:
      "Engineered an enterprise-grade RPA platform built around Google's Agent Development Kit (ADK) with five specialized Gemini 2.0 Flash agents (Orchestrator, Browser, Auth, Drive, Filesystem) communicating through a custom Model Context Protocol (MCP) server built on FastAPI, exposing 20+ typed tool endpoints over async HTTP. Powered by Playwright stealth automation, Pydantic-validated schemas, Loguru structured logging, Watchdog-based file monitoring, and a rubric-based evaluation suite using ADK's AgentEvaluator with both quality metrics passing at the > 0.8 threshold.",
    impact: [
      { v: '5 agents', l: 'Multi-Agent System' },
      { v: '20+', l: 'MCP Tool Endpoints' },
      { v: '> 0.8', l: 'Eval Quality Score' },
    ],
  },
  {
    id: 'data-analyst-agent',
    domain: 'agents',
    title: 'Autonomous Data Analyst Agent',
    tag: 'SHIPPED',
    cat: 'LLM · Agents',
    blurb:
      'Ask any question about your data — the agent writes its own code, runs it in a sandbox, fixes its own mistakes, and answers.',
    stack: ['Python', 'LangGraph', 'Gemini', 'DuckDB', 'Streamlit', 'Docker', 'Redis'],
    art: 'art-grad-2',
    glyph: 'PLAN · EXECUTE · SELF-CORRECT',
    problem:
      "Non-technical users sit on top of CSVs and spreadsheets but can't write SQL or Python. Existing chatbots either hallucinate summaries or break the moment a question requires real computation over the data.",
    solution:
      'A LangGraph state machine with Google Gemini as planner and synthesizer. The agent decides for itself whether to write SQL (DuckDB directly over raw CSVs), run Python (subprocess-isolated for safety), or render a chart — then observes the result and self-corrects in a retry loop until the answer is right. A ChatGPT-style Streamlit interface keeps every past question, answer, and chart visible as a scrollable conversation.',
    impact: [
      { v: 'Self-heal', l: 'Retry Loop' },
      { v: 'Sandboxed', l: 'Code Execution' },
      { v: 'CSV / XLSX', l: 'Direct Upload' },
    ],
    github: 'https://github.com/Perarasan247/Autonomous-Data-Analyst-Agent',
  },
  {
    id: 'doc-rag',
    domain: 'agents',
    title: 'Document Q&A with RAG',
    tag: 'OPEN SOURCE',
    cat: 'LLM · RAG',
    blurb:
      'A fully-offline RAG system — upload any document, ask in plain English, get cited answers with file + page traceability. No API costs, no data leaves your machine.',
    stack: [
      'Python',
      'LangChain',
      'FAISS',
      'Sentence-Transformers',
      'TinyLlama',
      'FastAPI',
      'Streamlit',
    ],
    art: 'art-grad-3',
    glyph: 'PARSE · EMBED · CITE',
    problem:
      'Reading long PDFs, reports, or research papers to find one specific answer is slow and frustrating. Cloud-based AI tools solve it — but at the cost of privacy, recurring API fees, and dependency on internet access.',
    solution:
      "Self-contained RAG pipeline that runs entirely on the user's machine. Multi-format parsers (PyMuPDF, Pandas, ebooklib) handle PDF, CSV, TXT, JSON, and EPUB. LangChain chunks text into context-aware segments; Sentence-Transformers (all-MiniLM-L6-v2) converts them into 384-d vectors; FAISS performs sub-second similarity search; locally-hosted TinyLlama 1.1B generates conversational, grounded responses with file + page citations. Out-of-context detection flags unrelated questions. Dual interface: Streamlit web app + FastAPI REST backend.",
    impact: [
      { v: '98%', l: 'Citation Accuracy' },
      { v: '100%', l: 'Offline · Private' },
      { v: 'CPU', l: 'No GPU Required' },
    ],
    github: 'https://github.com/Perarasan247/RAG-Document-QA',
  },
  {
    id: 'tomato-disease',
    domain: 'cv',
    title: 'Tomato Disease Classification',
    cat: 'Computer Vision · Agriculture',
    blurb:
      'End-to-end deep learning system that detects 9 tomato leaf diseases (plus healthy) from a single phone photo — 99.71% test accuracy.',
    stack: ['Python', 'PyTorch', 'EfficientNet-B0', 'FastAPI', 'JavaScript', 'scikit-learn'],
    art: 'art-grad-5',
    glyph: 'CAPTURE · CLASSIFY · DIAGNOSE',
    problem:
      "Farmers and agronomists rely on manual leaf inspection to diagnose tomato crop disease — slow, error-prone, and dependent on expert availability. Delayed or wrong diagnosis can wipe out a season's yield.",
    solution:
      'Fine-tuned EfficientNet-B0 in PyTorch with transfer learning and a custom multi-layer classification head (dropout + batch normalization) for stronger generalization across 10 classes. Deployed behind a FastAPI inference REST API with a responsive HTML / CSS / JavaScript frontend featuring drag-and-drop upload, instant predictions, and top-5 confidence scores. Helps farmers diagnose disease in seconds from a phone photo — enabling earlier intervention and reducing reliance on manual inspection.',
    impact: [
      { v: '99.71%', l: 'Test Accuracy' },
      { v: '10 classes', l: '9 Diseases + Healthy' },
      { v: 'Phone photo', l: 'Single-Image Diagnosis' },
    ],
    video: 'videos/TDC.mp4',
    github: 'https://github.com/Perarasan247/Tomato-Disease-Classification',
  },
  {
    id: 'churn-prediction',
    domain: 'ml',
    title: 'Customer Churn Prediction',
    tag: 'CASE STUDY',
    cat: 'ML · Classification',
    blurb:
      'End-to-end ML system predicting telecom customer churn — benchmarked 6 models and tuned thresholds to recover 82% of at-risk customers.',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'LightGBM', 'PyTorch', 'Pandas', 'Docker'],
    art: 'art-grad-4',
    glyph: 'PROFILE · PREDICT · RETAIN',
    problem:
      'Telecom providers lose recurring revenue every month from churned customers who could have been retained with the right intervention. They needed an early-warning system to drive proactive retention campaigns before contracts lapsed.',
    solution:
      'Analyzed 7,000+ customer records — surfacing month-to-month contracts, fiber optic service (42% churn), and tenure under 12 months (50% churn) as the dominant churn drivers. Applied binary + one-hot encoding to categorical features. Trained and benchmarked 6 models: Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM, and a PyTorch NN (128-64-32-1). Handled the 73/27 class imbalance with class_weight=balanced, scale_pos_weight, and weighted BCE loss. Tuned the decision threshold between 0.1–0.85 to maximize F1 — lifting recall from 72% → 82% without sacrificing precision.',
    impact: [
      { v: '0.8437', l: 'ROC-AUC' },
      { v: '82%', l: 'Churn Recall' },
      { v: '$5.18M', l: 'Projected Savings' },
    ],
    github: 'https://github.com/Perarasan247/Customer-Churn-Prediction',
  },
];
