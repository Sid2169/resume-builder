import { createExperience } from '../../data/resumeModel'
import { BulletField } from './BulletField'
import { EmptyHint } from './EmptyHint'
import { EntryCard } from './EntryCard'
import { TextField } from './Field'
import { SectionCard } from './SectionCard'

export function ExperienceForm({ items, onChange }) {
  const update = (id, patch) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const remove = (id) => onChange(items.filter((item) => item.id !== id))
  const add = () => onChange([...items, createExperience()])

  return (
    <SectionCard
      eyebrow="03"
      title="Experience"
      action={
        <button type="button" className="btn btn--ghost btn--sm" onClick={add}>
          Add role
        </button>
      }
    >
      <div className="entry-list">
        {items.length === 0 && (
          <EmptyHint>No roles yet.</EmptyHint>
        )}

        {items.map((item, index) => (
          <EntryCard
            key={item.id}
            title={item.role || `Role ${index + 1}`}
            subtitle={[item.company, item.location].filter(Boolean).join(' · ')}
            onRemove={() => remove(item.id)}
          >
            <div className="field-grid">
              <TextField
                label="Job title"
                value={item.role}
                onChange={(value) => update(item.id, { role: value })}
                placeholder="Frontend Developer"
              />
              <TextField
                label="Company"
                value={item.company}
                onChange={(value) => update(item.id, { company: value })}
                placeholder="Nimbus Labs"
              />
              <TextField
                label="Location"
                value={item.location}
                onChange={(value) => update(item.id, { location: value })}
                placeholder="Bengaluru, India or Remote"
                className="field--wide"
              />
              <TextField
                label="Start date"
                value={item.start}
                onChange={(value) => update(item.id, { start: value })}
                placeholder="Jan 2024"
              />
              <TextField
                label="End date"
                value={item.end}
                onChange={(value) => update(item.id, { end: value })}
                placeholder="Present"
              />
            </div>

            <BulletField
              value={item.bullets}
              onChange={(bullets) => update(item.id, { bullets })}
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  )
}
