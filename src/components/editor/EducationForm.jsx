import { createEducation } from '../../data/resumeModel'
import { EmptyHint } from './EmptyHint'
import { EntryCard } from './EntryCard'
import { TextAreaField, TextField } from './Field'
import { SectionCard } from './SectionCard'

export function EducationForm({ items, onChange }) {
  const update = (id, patch) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const remove = (id) => onChange(items.filter((item) => item.id !== id))
  const add = () => onChange([...items, createEducation()])

  return (
    <SectionCard
      eyebrow="04"
      title="Education"
      action={
        <button type="button" className="btn btn--ghost btn--sm" onClick={add}>
          Add education
        </button>
      }
    >
      <div className="entry-list">
        {items.length === 0 && (
          <EmptyHint>No education added yet.</EmptyHint>
        )}

        {items.map((item, index) => (
          <EntryCard
            key={item.id}
            title={item.degree || `Education ${index + 1}`}
            subtitle={[item.school, item.location].filter(Boolean).join(' · ')}
            onRemove={() => remove(item.id)}
          >
            <div className="field-grid">
              <TextField
                label="Degree or program"
                value={item.degree}
                onChange={(value) => update(item.id, { degree: value })}
                placeholder="B.Tech in Computer Science"
              />
              <TextField
                label="School"
                value={item.school}
                onChange={(value) => update(item.id, { school: value })}
                placeholder="Vellore Institute of Technology"
              />
              <TextField
                label="Location"
                value={item.location}
                onChange={(value) => update(item.id, { location: value })}
                placeholder="Vellore, India"
                className="field--wide"
              />
              <TextField
                label="Start year"
                value={item.start}
                onChange={(value) => update(item.id, { start: value })}
                placeholder="2019"
              />
              <TextField
                label="End year"
                value={item.end}
                onChange={(value) => update(item.id, { end: value })}
                placeholder="2023"
              />
            </div>

            <TextAreaField
              label="Details (optional)"
              value={item.details}
              onChange={(value) => update(item.id, { details: value })}
              rows={2}
              placeholder="CGPA: 8.6/10 · Relevant coursework or activities"
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  )
}
