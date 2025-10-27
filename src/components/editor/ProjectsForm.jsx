import { createProject } from '../../data/resumeModel'
import { EmptyHint } from './EmptyHint'
import { EntryCard } from './EntryCard'
import { TextAreaField, TextField } from './Field'
import { SectionCard } from './SectionCard'

export function ProjectsForm({ items, onChange, title = 'Projects' }) {
  const isResearch = title === 'Research'
  const update = (id, patch) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const remove = (id) => onChange(items.filter((item) => item.id !== id))
  const add = () => onChange([...items, createProject()])

  return (
    <SectionCard
      id="resume-projects"
      eyebrow="06"
      title={title}
      action={
        <button type="button" className="btn btn--ghost btn--sm" onClick={add}>
          {isResearch ? 'Add paper' : 'Add project'}
        </button>
      }
    >
      <div className="entry-list">
        {items.length === 0 && (
          <EmptyHint>{isResearch ? 'No research papers yet.' : 'No projects yet.'}</EmptyHint>
        )}

        {items.map((item, index) => (
          <EntryCard
            key={item.id}
            title={item.name || `${isResearch ? 'Paper' : 'Project'} ${index + 1}`}
            subtitle={item.link}
            onRemove={() => remove(item.id)}
          >
            <div className="field-grid">
              <TextField
                label={isResearch ? 'Paper title' : 'Project name'}
                value={item.name}
                onChange={(value) => update(item.id, { name: value })}
                placeholder={isResearch ? 'Research paper title' : 'Travel Explorer'}
              />
              <TextField
                label={isResearch ? 'Paper link' : 'Link'}
                value={item.link}
                onChange={(value) => update(item.id, { link: value })}
                placeholder={isResearch ? 'https://doi.org/…' : 'yourproject.vercel.app'}
              />
            </div>

            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => update(item.id, { description: value })}
              rows={2}
              placeholder={isResearch ? 'Research summary' : 'Project description'}
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  )
}
