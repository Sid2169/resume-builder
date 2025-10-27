import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'contact', label: 'Contact', path: 'M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z' },
  { id: 'summary', label: 'Summary', path: 'M8 3H5v18h14V7l-4-4H8Zm6 0v5h5M8 12h8M8 16h6' },
  { id: 'experience', label: 'Experience', path: 'M8 6V3h8v3M3 6h18v15H3V6Zm0 6a22 22 0 0 0 18 0M12 11v4' },
  { id: 'education', label: 'Education', path: 'm2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6M22 9v8' },
  { id: 'skills', label: 'Skills', path: 'm8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18' },
  { id: 'projects', label: 'Projects', path: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z' },
]

export function SectionNav({ view, onNavigate, onPreview, projectsLabel = 'Projects' }) {
  const [activeSection, setActiveSection] = useState('contact')
  const sections = SECTIONS.map((section) =>
    section.id === 'projects' ? { ...section, label: projectsLabel } : section,
  )

  useEffect(() => {
    let frame
    const updateActiveSection = () => {
      const firstSection = document.getElementById('resume-contact')
      if (!firstSection?.getClientRects().length) return

      const headerBottom = document.querySelector('.app-header')?.getBoundingClientRect().bottom || 0
      let active = 'contact'
      SECTIONS.forEach(({ id }) => {
        const section = document.getElementById(`resume-${id}`)
        if (section && section.getBoundingClientRect().top <= headerBottom + 32) active = id
      })
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        active = 'projects'
      }
      setActiveSection(active)
    }
    const handleScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateActiveSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [view])

  return (
    <nav className="section-nav" aria-label="Resume sections">
      {sections.map(({ id, label, path }) => (
        <a
          key={id}
          className={`section-nav__link${view !== 'preview' && activeSection === id ? ' is-active' : ''}`}
          href={`#resume-${id}`}
          aria-label={label}
          aria-current={view !== 'preview' && activeSection === id ? 'location' : undefined}
          aria-describedby={`nav-tooltip-${id}`}
          onClick={(event) => {
            event.preventDefault()
            setActiveSection(id)
            onNavigate(id)
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={path} />
          </svg>
          <span className="section-nav__tooltip" id={`nav-tooltip-${id}`} role="tooltip">
            {label}
          </span>
        </a>
      ))}
      <span className="section-nav__divider" aria-hidden="true" />
      <a
        className={`section-nav__link${view === 'preview' ? ' is-active' : ''}`}
        href="#resume-preview"
        aria-label="Preview"
        aria-current={view === 'preview' ? 'location' : undefined}
        aria-describedby="nav-tooltip-preview"
        onClick={(event) => {
          event.preventDefault()
          onPreview()
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="section-nav__tooltip" id="nav-tooltip-preview" role="tooltip">
          Preview
        </span>
      </a>
    </nav>
  )
}
