import { TextAreaField } from './Field'
import { SectionCard } from './SectionCard'

export function SummaryForm({ summary, onChange }) {
  return (
    <SectionCard
      eyebrow="02"
      title="Summary"
      description="Two or three sentences on what you do and the value you bring."
    >
      <TextAreaField
        label="Professional summary"
        value={summary}
        onChange={onChange}
        rows={4}
        placeholder="Frontend developer with experience building accessible, responsive web applications…"
        hint="Write in first person without pronouns, for example: “Frontend developer with 3 years of experience…”"
      />
    </SectionCard>
  )
}
