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
  data/         Resume model, three sample profiles, and random selection
  hooks/        localStorage-backed resume state
  pdf/          ATS PDF document and download helper
  utils/        Shared formatting helpers
docs/
  PROJECT_BRIEF.md  Recorded preferences, scope, and design direction
```

## Sample resumes

Each confirmed click on **Load sample** randomly selects one of three profiles
with equal probability. Repeats are possible. Existing content requires
confirmation before replacement; ordinary edits and reloads do not reroll the
sample. The selected profile is editable and autosaved like any other resume.

- **Alan Turing (1912–1954):** Manchester, NPL, and Bletchley Park work; Cambridge
  and Princeton education; a Research section linking three landmark papers.
- **Claude Shannon (1916–2001):** MIT, Bell Labs, and IAS work; Michigan and MIT
  education; a Research section linking information theory, cryptography, and
  switching-circuit publications.
- **Linus Torvalds:** Linux Foundation, OSDL, and Transmeta work; Helsinki
  education; a Projects section linking Linux, Git, and Subsurface.

These are biographical adaptations into a modern resume format, not resumes
authored or endorsed by their subjects. Email, phone, and LinkedIn fields are
blank. Turing and Shannon have no personal website listed; Torvalds links to his
public GitHub profile. Locations for historical profiles are historical.

Sources:
- Turing: [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Turing/),
  [National Physical Laboratory](https://www.npl.co.uk/famous-faces/alan-turing).
- Shannon: [MIT biography](https://news.mit.edu/2001/shannon),
  [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Shannon/).
- Torvalds: [Linux Foundation biography](https://www.linuxfoundation.org/about/leadership#team-bio-linus-torvalds),
  [biographical chronology](https://en.wikipedia.org/wiki/Linus_Torvalds),
  [official Git history](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git).

## Design

The editor follows the dark, cyan-accented visual language used in earlier
projects (notably TicTac), with solid surface colors and flat CTA fills instead
of gradients or glass effects. The resume itself is a white, single-column,
print-first document. See `docs/PROJECT_BRIEF.md` for the full brief.
