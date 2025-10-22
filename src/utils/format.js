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
