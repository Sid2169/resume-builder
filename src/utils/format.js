export function formatDateRange(start, end, presentFallback = false) {
  const from = (start || '').trim()
  const to = (end || '').trim()

  if (!from && !to) return ''
  if (!from) return to
  if (!to) return presentFallback ? `${from} – Present` : from

  return `${from} – ${to}`
}

export function toHref(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return ''
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed

  return `https://${trimmed}`
}

export function getContactItems(contact = {}) {
  const items = []

  if (contact.email) {
    items.push({ key: 'email', label: contact.email, href: `mailto:${contact.email}` })
  }
  if (contact.phone) {
    items.push({
      key: 'phone',
      label: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, '')}`,
    })
  }
  if (contact.location) {
    items.push({ key: 'location', label: contact.location })
  }
  if (contact.website) {
    items.push({ key: 'website', label: contact.website, href: toHref(contact.website) })
  }
  if (contact.linkedin) {
    items.push({ key: 'linkedin', label: contact.linkedin, href: toHref(contact.linkedin) })
  }

  return items
}

export function splitSkills(value) {
  return (value || '')
    .split(/[\n,]+/)
    .map((skill) => skill.trim())
    .filter(Boolean)
}

export function resumeFileName(name) {
  const slug = (name || 'resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${slug || 'resume'}-resume.pdf`
}
