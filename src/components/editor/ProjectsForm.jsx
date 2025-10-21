import { createProject } from '../../data/resumeModel'
import { EmptyHint } from './EmptyHint'
import { EntryCard } from './EntryCard'
import { TextAreaField, TextField } from './Field'
import { SectionCard } from './SectionCard'

export function ProjectsForm({ items, onChange }) {
  const update = (id, patch) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const remove = (id) => onChange(items.filter((item) => item.id !== id))
  const add = () => onChange([...items, createProject()])

  return (
    <SectionCard
      eyebrow="06"
      title="Projects"
      description="Show work that proves the skills you want to be hired for."
      action={
        <button type="button" className="btn btn--ghost btn--sm" onClick={add}>
          Add project
        </button>
      }
    >
      <div className="entry-list">
        {items.length === 0 && (
          <EmptyHint>No projects yet. Two or three strong projects are plenty.</EmptyHint>
        )}

        {items.map((item, index) => (
          <EntryCard
            key={item.id}
            title={item.name || `Project ${index + 1}`}
            subtitle={item.link}
            onRemove={() => remove(item.id)}
          >
            <div className="field-grid">
              <TextField
                label="Project name"
                value={item.name}
                onChange={(value) => update(item.id, { name: value })}
                placeholder="Travel Explorer"
              />
              <TextField
                label="Link"
                value={item.link}
                onChange={(value) => update(item.id, { link: value })}
                placeholder="yourproject.vercel.app"
              />
            </div>

            <TextAreaField
              label="Description"
              value={item.description}
              onChange={(value) => update(item.id, { description: value })}
              rows={2}
              placeholder="What it does, the stack, and one result you are proud of."
              hint="One or two lines. Lead with impact."
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  )
}
