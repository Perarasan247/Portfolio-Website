# Perarasan D — Portfolio

Personal portfolio built with **React 18 + TypeScript + Vite**.

## Scripts

| Command             | Purpose                         |
| ------------------- | ------------------------------- |
| `npm install`       | Install dependencies            |
| `npm run dev`       | Start the dev server            |
| `npm run build`     | Type-check and build to `dist/` |
| `npm run preview`   | Serve the production build      |
| `npm run lint`      | Run ESLint                      |
| `npm run typecheck` | Run the TypeScript compiler     |
| `npm run format`    | Format with Prettier            |

## Structure

```
public/            Static files served as-is (portrait, resume, certificates, demo video)
src/
  data/            Content: profile, skills, projects, experience, education, achievements
  types/           Shared TypeScript types
  components/      UI grouped by section (hero, about, skills, projects, ...)
  hooks/           useReveal, useScrollSpy, useScrollProgress, useModal
  utils/           asset() path helper, file-type detection
  styles/          Design tokens (tokens.css) + per-section CSS, imported via styles/index.css
```

To update content, edit the files in `src/data/`. Static files go in `public/` and are
referenced by relative path (e.g. `assets/certificates/foo.pdf`).

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to
`main`. In the repository settings, set **Pages → Source** to **GitHub Actions**.
