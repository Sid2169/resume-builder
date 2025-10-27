import { TextAreaField } from './Field'
import { SectionCard } from './SectionCard'

export function SkillsForm({ value, onChange }) {
  return (
    <SectionCard
      eyebrow="05"
      title="Skills"
    >
      <TextAreaField
        label="Skills"
        value={value}
        onChange={onChange}
        rows={3}
        placeholder="JavaScript, React, TypeScript, HTML5, CSS3, Git"
      />
    </SectionCard>
  )
}
