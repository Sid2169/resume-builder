# Resume Builder

An ATS-friendly resume editor with a live A4 preview, browser autosave, and one-click PDF export.

**Live app:** https://sid2169.github.io/resume-builder/

**Creator:** [Siddhartha](https://sidsingh.vercel.app/) · [GitHub](https://github.com/Sid2169) · [LinkedIn](https://www.linkedin.com/in/siddhartha-suman-952a64256/)

## Features

- Contact details, professional summary, experience, education, skills, and projects
- Add and remove experience, education, and project entries
- Live A4 preview that stays in sync with every edit
- Autosave to `localStorage` with a visible save status
- Sample resume for a quick start and a clear/reset action
- Clean, single-column, ATS-friendly PDF export
- Responsive editor with Edit/Preview tabs on mobile
- Dark cyan editor theme with a print-first white paper preview

## Tech stack

- React 19
- Vite 7
- Plain CSS with custom properties
- `@react-pdf/renderer` for PDF generation
- GitHub Actions and GitHub Pages for deployment

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## How it works

- Resume state lives in a single normalized model in `src/data/resumeModel.js`.
- Changes are debounced and saved to `localStorage` under `resume-builder:resume:v1`.
- The preview and PDF share the same formatting helpers so the exported document
  matches what you see.
- The PDF library is loaded on demand when you click **Download PDF**, keeping the
  initial page load small.
- Everything runs in the browser. No resume data is sent to a server.

## Deployment

The workflow in `.github/workflows/deploy.yml` builds and deploys the app to
GitHub Pages on every push to `main`.

For a fresh repository, enable GitHub Pages with **Source: GitHub Actions** under
Settings → Pages.

Vite uses `base: './'`, so the build works from the `/resume-builder/` project path.

## Project structure

```text
src/
  components/
    editor/     Form primitives and section editors
    preview/    Live A4 preview and scaling
  data/         Resume model and sample resume
  hooks/        localStorage-backed resume state
  pdf/          ATS PDF document and download helper
  utils/        Shared formatting helpers
docs/
  PROJECT_BRIEF.md  Recorded preferences, scope, and design direction
```

## Design

The editor follows the dark, cyan-accented visual language used in earlier
projects (notably TicTac), with solid surface colors and flat CTA fills instead
of gradients or glass effects. The resume itself is a white, single-column,
print-first document. See `docs/PROJECT_BRIEF.md` for the full brief.
