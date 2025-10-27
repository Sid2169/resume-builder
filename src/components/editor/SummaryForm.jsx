import { TextAreaField } from './Field'
import { SectionCard } from './SectionCard'

export function SummaryForm({ summary, onChange }) {
  return (
    <SectionCard
      eyebrow="02"
      title="Summary"
    >
      <TextAreaField
        label="Professional summary"
        value={summary}
        onChange={onChange}
        rows={4}
        placeholder="Frontend developer with experience building accessible, responsive web applications…"
      />
    </SectionCard>
  )
}
