import { TextAreaField } from './Field'
import { SectionCard } from './SectionCard'

export function SkillsForm({ value, onChange }) {
  return (
    <SectionCard
      eyebrow="05"
      title="Skills"
      description="Group the tools and technologies you would be comfortable discussing."
    >
      <TextAreaField
        label="Skills"
        value={value}
        onChange={onChange}
        rows={3}
        placeholder="JavaScript, React, TypeScript, HTML5, CSS3, Git"
        hint="Separate skills with commas or one per line. Keep the list focused."
      />
    </SectionCard>
  )
}
