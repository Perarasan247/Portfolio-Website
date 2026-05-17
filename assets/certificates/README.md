# Certificates

Drop your certificate files here. The portfolio expects these filenames:

## Certifications (06 / Credentials)
| Achievement                                          | Filename                                                  |
| ---------------------------------------------------- | --------------------------------------------------------- |
| Python Course from Basics to Advanced (Udemy)        | `python certificate.pdf`                                  |
| Complete Machine Learning and Data Science (GfG)     | `GeeksforGeeks Certificate.pdf`                           |
| Mathematics for ML and Data Science (DeepLearning.AI)| `Mathematics for Machine Learning and Data Science.pdf`   |
| IBM RAG and Agentic AI (IBM)                         | `IBM RAG And Agentic AI Certificate.pdf`                  |
| Machine Learning in Production (DeepLearning.AI)     | `Machine Learning in Production.pdf`                      |

Each entry in `ACHIEVEMENTS` (in `portfolio.jsx`) also supports an optional
`desc:` field — a one-sentence description shown on the card and inside the
preview modal. Edit the placeholder text there to match your own framing.

## Internships (04 / Timeline)
| Role / Company                                        | Filename                  |
| ----------------------------------------------------- | ------------------------- |
| AI/ML Intern — Alai Technology Labs                   | `alai-tech-labs.pdf`      |
| Project Trainee — SRM Institute                       | `srm-trainee.pdf`         |
| AWS AI-ML Virtual Intern — AICTE                      | `aws-ml-aicte.pdf`        |
| AWS Cloud Virtual Intern — AICTE                      | `aws-cloud-aicte.pdf`     |

Supported formats: **PDF, PNG, JPG, JPEG, WEBP**.

If you use a different extension (e.g. `python-udemy.png`), update the matching
`cert:` path in `portfolio.jsx` (`ACHIEVEMENTS` for certifications,
`EXPERIENCE` for internships).

> The certification cards show a live preview of the PDF (first page). The
> internship "View certificate" link opens the same modal without a preview.
> Until you upload a file, the preview area will show the browser's 404 page.
