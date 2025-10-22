import { hasResumeContent } from '../../data/resumeModel'
import { formatDateRange, splitSkills, toHref } from '../../utils/format'

function PreviewSection({ title, children }) {
  return (
    <section className="paper__section">
      <h2 className="paper__section-title">{title}</h2>
      {children}
    </section>
  )
}

function contactItemsFor(contact) {
  const items = []

  if (contact.email) {
    items.push({ key: 'email', label: contact.email, href: `mailto:${contact.email}` })
  }
  if (contact.phone) {
    items.push({ key: 'phone', label: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, '')}` })
  }
  if (contact.location) {
    items.push({ key: 'location', label: contact.location })
  }
  if (contact.website) {
    items.push({ key: 'website', label: contact.website, href: toHref(contact.website) })
  }
  if (contact.linkedin) {
    items.push({ key: 'linkedin', label: contact.linkedin, href: toHref(contact.linkedin) })
  }

  return items
}

export function ResumePreview({ resume }) {
  const { contact, summary, experience, education, skills, projects } = resume
  const contactItems = contactItemsFor(contact)
  const skillList = splitSkills(skills)
  const hasContent = hasResumeContent(resume)

  return (
    <div className="paper__content">
      <header className="paper__header">
        <h1>{contact.name || 'Your Name'}</h1>
        {contact.title && <p className="paper__title">{contact.title}</p>}
        {contactItems.length > 0 && (
          <p className="paper__contact">
            {contactItems.map((item, index) => (
              <span className="paper__contact-item" key={item.key}>
                {index > 0 && (
                  <span className="paper__separator" aria-hidden="true">
                    ·
                  </span>
                )}
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </span>
            ))}
          </p>
        )}
      </header>

      {!hasContent && (
        <div className="paper__empty">
          <p>Your resume preview will appear here.</p>
          <p>Start with the contact section or load the sample resume.</p>
        </div>
      )}

      {summary.trim() && (
        <PreviewSection title="Summary">
          <p className="paper__summary">{summary}</p>
        </PreviewSection>
      )}

      {experience.length > 0 && (
        <PreviewSection title="Experience">
          {experience.map((job) => {
            const bullets = job.bullets.filter((bullet) => bullet.trim())
            const dates = formatDateRange(job.start, job.end, true)

            return (
              <article className="paper__entry" key={job.id}>
                <div className="paper__entry-head">
                  <div>
                    <h3>{job.role || 'Role'}</h3>
                    <p className="paper__entry-sub">
                      {[job.company, job.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  {dates && <span className="paper__dates">{dates}</span>}
                </div>
                {bullets.length > 0 && (
                  <ul className="paper__bullets">
                    {bullets.map((bullet, index) => (
                      <li key={`${job.id}-bullet-${index}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </PreviewSection>
      )}

      {education.length > 0 && (
        <PreviewSection title="Education">
          {education.map((item) => {
            const dates = formatDateRange(item.start, item.end)

            return (
              <article className="paper__entry" key={item.id}>
                <div className="paper__entry-head">
                  <div>
                    <h3>{item.degree || 'Degree'}</h3>
                    <p className="paper__entry-sub">
                      {[item.school, item.location].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  {dates && <span className="paper__dates">{dates}</span>}
                </div>
                {item.details.trim() && <p className="paper__details">{item.details}</p>}
              </article>
            )
          })}
        </PreviewSection>
      )}

      {skillList.length > 0 && (
        <PreviewSection title="Skills">
          <p className="paper__skills">{skillList.join(', ')}</p>
        </PreviewSection>
      )}

      {projects.length > 0 && (
        <PreviewSection title="Projects">
          {projects.map((project) => (
            <article className="paper__entry paper__entry--project" key={project.id}>
              <div className="paper__project-head">
                <h3>{project.name || 'Project'}</h3>
                {project.link && (
                  <a
                    className="paper__project-link"
                    href={toHref(project.link)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.link}
                  </a>
                )}
              </div>
              {project.description.trim() && (
                <p className="paper__details">{project.description}</p>
              )}
            </article>
          ))}
        </PreviewSection>
      )}
    </div>
  )
}
