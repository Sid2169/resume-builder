export const STORAGE_KEY = 'resume-builder:resume:v1'

export function createId(prefix = 'id') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function text(value) {
  return typeof value === 'string' ? value : ''
}

function normalizeBullets(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string')
  }

  if (typeof value === 'string') {
    return value.split('\n')
  }

  return []
}

function normalizeContact(value) {
  const source = value && typeof value === 'object' ? value : {}

  return {
    name: text(source.name),
    title: text(source.title),
    email: text(source.email),
    phone: text(source.phone),
    location: text(source.location),
    website: text(source.website),
    linkedin: text(source.linkedin),
  }
}

function normalizeExperience(value) {
  const source = value && typeof value === 'object' ? value : {}

  return {
    id: text(source.id) || createId('exp'),
    role: text(source.role),
    company: text(source.company),
    location: text(source.location),
    start: text(source.start),
    end: text(source.end),
    bullets: normalizeBullets(source.bullets),
  }
}

function normalizeEducation(value) {
  const source = value && typeof value === 'object' ? value : {}

  return {
    id: text(source.id) || createId('edu'),
    degree: text(source.degree),
    school: text(source.school),
    location: text(source.location),
    start: text(source.start),
    end: text(source.end),
    details: text(source.details),
  }
}

function normalizeProject(value) {
  const source = value && typeof value === 'object' ? value : {}

  return {
    id: text(source.id) || createId('project'),
    name: text(source.name),
    link: text(source.link),
    description: text(source.description),
  }
}

export function createEmptyResume() {
  return {
    contact: normalizeContact(),
    summary: '',
    experience: [],
    education: [],
    skills: '',
    projectsLabel: 'Projects',
    projects: [],
  }
}

export function createExperience() {
  return normalizeExperience({})
}

export function createEducation() {
  return normalizeEducation({})
}

export function createProject() {
  return normalizeProject({})
}

export function normalizeResume(value) {
  const source = value && typeof value === 'object' ? value : {}

  return {
    contact: normalizeContact(source.contact),
    summary: text(source.summary),
    experience: Array.isArray(source.experience)
      ? source.experience.map(normalizeExperience)
      : [],
    education: Array.isArray(source.education)
      ? source.education.map(normalizeEducation)
      : [],
    skills: text(source.skills),
    projectsLabel: source.projectsLabel === 'Research' ? 'Research' : 'Projects',
    projects: Array.isArray(source.projects)
      ? source.projects.map(normalizeProject)
      : [],
  }
}

export function hasResumeContent(resume) {
  if (!resume) return false

  const contact = resume.contact || {}
  const contactFields = ['name', 'title', 'email', 'phone', 'location', 'website', 'linkedin']

  return (
    contactFields.some((field) => text(contact[field]).trim().length > 0) ||
    text(resume.summary).trim().length > 0 ||
    text(resume.skills).trim().length > 0 ||
    (resume.experience || []).length > 0 ||
    (resume.education || []).length > 0 ||
    (resume.projects || []).length > 0
  )
}
