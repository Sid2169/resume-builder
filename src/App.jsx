import { useState } from 'react'
import './App.css'
import { ContactForm } from './components/editor/ContactForm'
import { EducationForm } from './components/editor/EducationForm'
import { ExperienceForm } from './components/editor/ExperienceForm'
import { ProjectsForm } from './components/editor/ProjectsForm'
import { SkillsForm } from './components/editor/SkillsForm'
import { SummaryForm } from './components/editor/SummaryForm'
import { PaperPreview } from './components/preview/PaperPreview'
import { hasResumeContent } from './data/resumeModel'
import { sampleResume } from './data/sampleResume'
import { usePersistentResume } from './hooks/usePersistentResume'

const SAVE_LABELS = {
  idle: 'Autosave ready',
  saving: 'Saving…',
  saved: 'Saved locally',
  error: 'Save failed',
}

const PDF_LABELS = {
  idle: 'Download PDF',
  working: 'Preparing PDF…',
  done: 'Downloaded',
  error: 'Try again',
}

function App() {
  const { resume, setResume, replaceResume, resetResume, saveState } = usePersistentResume()
  const [view, setView] = useState('edit')
  const [pdfState, setPdfState] = useState('idle')

  const updateSection = (section, value) => {
    setResume((current) => ({ ...current, [section]: value }))
  }

  const handleLoadSample = () => {
    if (
      hasResumeContent(resume) &&
      !window.confirm('Replace the current resume with the sample resume?')
    ) {
      return
    }

    replaceResume(sampleResume)
    setView('edit')
  }

  const handleReset = () => {
    if (!hasResumeContent(resume) || window.confirm('Clear all resume data? This cannot be undone.')) {
      resetResume()
      setView('edit')
    }
  }

  const handleDownload = async () => {
    setPdfState('working')

    try {
      const { downloadResumePdf } = await import('./pdf/downloadResumePdf')
      await downloadResumePdf(resume)
      setPdfState('done')
      window.setTimeout(() => setPdfState('idle'), 1800)
    } catch (error) {
      console.error('Could not generate the PDF', error)
      setPdfState('error')
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            R
          </span>
          <div className="brand__text">
            <h1>Resume Builder</h1>
            <p>ATS-friendly · A4 · Saves in your browser</p>
          </div>
        </div>

        <div className="app-header__actions">
          <span
            className={`save-state save-state--${saveState}`}
            role="status"
            aria-live="polite"
          >
            <span className="save-state__dot" aria-hidden="true" />
            {SAVE_LABELS[saveState]}
          </span>

          <button type="button" className="btn btn--ghost" onClick={handleLoadSample}>
            Load sample
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            Clear
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleDownload}
            disabled={pdfState === 'working'}
          >
            {PDF_LABELS[pdfState]}
          </button>
        </div>
      </header>

      <main className="workspace">
        <div className="view-tabs" aria-label="Editor view">
          <button
            type="button"
            className={`view-tabs__button ${view === 'edit' ? 'is-active' : ''}`}
            aria-pressed={view === 'edit'}
            onClick={() => setView('edit')}
          >
            Edit
          </button>
          <button
            type="button"
            className={`view-tabs__button ${view === 'preview' ? 'is-active' : ''}`}
            aria-pressed={view === 'preview'}
            onClick={() => setView('preview')}
          >
            Preview
          </button>
        </div>

        <section
          className={`workspace__panel workspace__panel--editor ${
            view === 'preview' ? 'is-hidden-mobile' : ''
          }`}
          aria-label="Resume editor"
        >
          <div className="editor">
            <ContactForm
              contact={resume.contact}
              onChange={(value) => updateSection('contact', value)}
            />
            <SummaryForm
              summary={resume.summary}
              onChange={(value) => updateSection('summary', value)}
            />
            <ExperienceForm
              items={resume.experience}
              onChange={(value) => updateSection('experience', value)}
            />
            <EducationForm
              items={resume.education}
              onChange={(value) => updateSection('education', value)}
            />
            <SkillsForm
              value={resume.skills}
              onChange={(value) => updateSection('skills', value)}
            />
            <ProjectsForm
              items={resume.projects}
              onChange={(value) => updateSection('projects', value)}
            />
          </div>
        </section>

        <aside
          className={`workspace__panel workspace__panel--preview ${
            view === 'edit' ? 'is-hidden-mobile' : ''
          }`}
          aria-label="Resume preview panel"
        >
          <div className="preview-panel">
            <div className="preview-panel__header">
              <div>
                <span className="eyebrow">Live preview</span>
                <p className="preview-panel__meta">A4 · 210 × 297 mm</p>
              </div>
              <span className="preview-panel__badge">ATS-ready</span>
            </div>
            <PaperPreview resume={resume} />
          </div>
        </aside>
      </main>

      <footer className="app-footer">
        <p>
          Built with React, Vite, and @react-pdf/renderer. Your data never leaves
          this browser.
        </p>
        <p className="app-footer__credit">
          <span className="app-footer__role">Created by</span>
          <a
            className="app-footer__link"
            href="https://sidsingh.vercel.app/"
            target="_blank"
            rel="me noopener"
            title="Visit Siddhartha's landing page"
            aria-label="Visit Siddhartha's landing page (opens in a new tab)"
          >
            Siddhartha
            <span className="app-footer__external" aria-hidden="true">
              ↗
            </span>
          </a>
        </p>
        <nav className="app-footer__links" aria-label="Siddhartha's profiles">
          <a
            className="app-footer__icon-link"
            href="https://github.com/Sid2169"
            target="_blank"
            rel="me noopener"
            title="Siddhartha on GitHub"
            aria-label="Visit Siddhartha's GitHub profile (opens in a new tab)"
          >
            <svg
              className="app-footer__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
          <a
            className="app-footer__icon-link"
            href="https://www.linkedin.com/in/siddhartha-suman-952a64256/"
            target="_blank"
            rel="me noopener"
            title="Siddhartha on LinkedIn"
            aria-label="Visit Siddhartha's LinkedIn profile (opens in a new tab)"
          >
            <svg
              className="app-footer__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default App
