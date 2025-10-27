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
      </footer>
    </div>
  )
}

export default App
