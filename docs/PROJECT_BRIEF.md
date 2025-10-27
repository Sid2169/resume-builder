# Resume Builder — Project Brief

## Goal

Finish the resume builder as a genuinely useful, ATS-friendly tool: edit a resume,
see a true-to-print A4 preview, keep work saved in the browser, and export a clean PDF.

## Recorded preferences

Answers captured before implementation started:

| Decision | Choice |
| --- | --- |
| Feature set | Standard: contact, summary, experience, education, skills, projects |
| Editing UX | Live preview, autosave, load sample resume |
| Templates | One ATS-friendly single-column layout |
| Visual theme | Dark editor, white paper, cyan accent (TicTac-inspired) |
| Page size | A4, no photo |
| Delivery | One feature branch and one PR, merge commit (no squash), delete local and remote branch |
| Deployment | GitHub Pages via GitHub Actions |
| Repository visibility | Public (required for Pages on the free plan) |
| Quality bar | Lint and production build |

## Desired features (in scope)

- Contact details: name, professional title, email, phone, location, website, LinkedIn
- Professional summary
- Work experience with role, company, location, dates, and bullet highlights
- Education with degree, school, location, dates, and an optional details line
- Skills entered as a comma- or newline-separated list
- Projects with name, link, and description
- Add and remove experience, education, and project entries
- Live A4 preview that matches the exported PDF
- Autosave to `localStorage` with visible save status
- One-click sample resume and a clear/reset action
- ATS-friendly PDF export using `@react-pdf/renderer`
- Responsive layout with Edit/Preview tabs on small screens
- GitHub Pages deployment workflow

## Out of scope

- Photo upload
- JSON import/export
- Drag-and-drop reordering
- Multiple named resumes or a dashboard
- Multiple resume templates
- Automated unit tests (lean quality bar: lint + build)
- Backend, accounts, or cloud sync

## Design direction

Derived from the deployed projects that predate this repository
(`sketch`, `Calc`, `TicTac`, `Travel`, `Restaurant`):

- Dark surfaces with a single saturated accent, generous rounding, soft depth
- Solid color styling: flat fills for surfaces and CTAs, no gradients, no
  backdrop blur, and no glass effects
- Cyan primary accent (`#00ADB5`) with mint highlight (`#17E3A1`) and warm gold
  (`#F8B400`) as a secondary accent, following the TicTac theme tokens
- Uppercase micro-labels with tracked letters
- Rounded cards, pill-shaped primary actions, clear hover and focus states
- Subtle motion: fade-in, save pulse, hover lift; respects reduced-motion
- The resume itself stays white, single-column, and print-first: standard fonts,
  no tables, no graphics, selectable text

## Technical notes

- React 19 + Vite 7
- Plain CSS custom properties; no UI framework
- `@react-pdf/renderer` 4.3.1 for A4 PDF generation
- Resume state shape kept in one model module with normalization for safe reloads
- Sample data is clearly fictional and safe to show in a public demo
- Vite `base: './'` so the build works from the GitHub Pages project path
- Pages sourced from GitHub Actions; deploy workflow runs on pushes to `main`
- The repository was archived and private at kickoff; it is unarchived and made
  public so Pages can serve the demo on the current plan

## Git plan

- Work happens on `feat/resume-builder-v1`
- Atomic conventional commits, backdated between 2025-10-19 and 2025-10-27 so the
  project reads as finished within ten days of the first commit (2025-10-18)
- PR merged with a merge commit, never squashed
- Original branch deleted locally and remotely after merge

Note: `main` was later rewritten so the merge commit is also backdated to
2025-10-27. GitHub's PR metadata still records the original merged-at timestamp
and merge SHA because those fields are immutable.
