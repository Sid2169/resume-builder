import { TextField } from './Field'
import { SectionCard } from './SectionCard'

const contactFields = [
  {
    key: 'name',
    label: 'Full name',
    placeholder: 'Aarav Mehta',
    autoComplete: 'name',
  },
  {
    key: 'title',
    label: 'Professional title',
    placeholder: 'Frontend Developer',
    autoComplete: 'organization-title',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+91 98765 43210',
    autoComplete: 'tel',
  },
  {
    key: 'location',
    label: 'Location',
    placeholder: 'City, Country',
    autoComplete: 'address-level2',
  },
  {
    key: 'website',
    label: 'Website',
    placeholder: 'yourname.dev',
    autoComplete: 'url',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'linkedin.com/in/yourname',
    autoComplete: 'url',
    className: 'field--wide',
  },
]

export function ContactForm({ contact, onChange }) {
  const update = (key, value) => onChange({ ...contact, [key]: value })

  return (
    <SectionCard
      eyebrow="01"
      title="Contact"
      description="The essentials at the top of your resume. Keep this line short."
    >
      <div className="field-grid">
        {contactFields.map((field) => (
          <TextField
            key={field.key}
            label={field.label}
            value={contact[field.key]}
            onChange={(value) => update(field.key, value)}
            placeholder={field.placeholder}
            type={field.type}
            autoComplete={field.autoComplete}
            className={field.className}
          />
        ))}
      </div>
    </SectionCard>
  )
}
