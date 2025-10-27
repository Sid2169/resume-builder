export function SectionCard({ eyebrow, title, description, action, children }) {
  return (
    <section className="section-card" id={`resume-${title.toLowerCase()}`} tabIndex={-1} aria-label={title}>
      <header className="section-card__header">
        <div className="section-card__heading">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action && <div className="section-card__action">{action}</div>}
      </header>
      <div className="section-card__body">{children}</div>
    </section>
  )
}
