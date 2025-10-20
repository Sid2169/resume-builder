export function EntryCard({ title, subtitle, onRemove, children }) {
  return (
    <article className="entry-card">
      <header className="entry-card__header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <button
          type="button"
          className="btn btn--danger btn--sm"
          onClick={onRemove}
          aria-label={`Remove ${title}`}
        >
          Remove
        </button>
      </header>
      <div className="entry-card__body">{children}</div>
    </article>
  )
}
