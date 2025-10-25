import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { formatDateRange, getContactItems, splitSkills, toHref } from '../utils/format'

const ACCENT = '#0e7490'
const INK = '#111827'
const BODY = '#374151'
const MUTED = '#6b7280'
const RULE = '#d1d5db'

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.4,
    color: BODY,
  },
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    lineHeight: 1.18,
    color: INK,
    letterSpacing: 0.2,
  },
  role: {
    fontSize: 10.5,
    lineHeight: 1.33,
    color: ACCENT,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 7,
    fontSize: 8.5,
    lineHeight: 1.3,
    color: MUTED,
  },
  contactItem: {
    color: MUTED,
  },
  contactLink: {
    color: ACCENT,
    textDecoration: 'none',
  },
  contactSeparator: {
    color: RULE,
    marginHorizontal: 5,
  },
  section: {
    marginTop: 13,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    lineHeight: 1.33,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: ACCENT,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
    paddingBottom: 3,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.47,
    color: BODY,
  },
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryHeading: {
    flexGrow: 1,
    paddingRight: 12,
  },
  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    lineHeight: 1.3,
    color: INK,
  },
  entrySubtitle: {
    fontSize: 8.5,
    lineHeight: 1.3,
    color: MUTED,
    marginTop: 1,
  },
  dates: {
    fontSize: 8.5,
    lineHeight: 1.3,
    color: MUTED,
    textAlign: 'right',
    flexShrink: 0,
  },
  bullets: {
    marginTop: 3,
    paddingLeft: 0,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  bulletMark: {
    width: 9,
    fontSize: 9.5,
    lineHeight: 1.47,
    color: ACCENT,
  },
  bulletText: {
    flexGrow: 1,
    fontSize: 9.5,
    lineHeight: 1.47,
    color: BODY,
  },
  details: {
    fontSize: 9,
    lineHeight: 1.44,
    color: BODY,
    marginTop: 2,
  },
  skills: {
    fontSize: 9.5,
    lineHeight: 1.47,
    color: BODY,
  },
  projectHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  projectName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    lineHeight: 1.3,
    color: INK,
    marginRight: 8,
  },
  projectLink: {
    fontSize: 8.5,
    lineHeight: 1.3,
    color: ACCENT,
    textDecoration: 'none',
  },
})

function ContactLine({ contact }) {
  const items = getContactItems(contact)
  if (items.length === 0) return null

  return (
    <View style={styles.contact}>
      {items.map((item, index) => (
        <View key={item.key} style={{ flexDirection: 'row' }}>
          {index > 0 && <Text style={styles.contactSeparator}>·</Text>}
          {item.href && item.key !== 'phone' ? (
            <Link src={item.href} style={styles.contactLink}>
              {item.label}
            </Link>
          ) : (
            <Text style={styles.contactItem}>{item.label}</Text>
          )}
        </View>
      ))}
    </View>
  )
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

export function ResumeDocument({ resume }) {
  const { contact, summary, experience, education, skills, projects } = resume
  const skillList = splitSkills(skills)

  return (
    <Document
      title={`${contact.name || 'Resume'} — Resume`}
      author={contact.name || 'Resume Builder'}
      subject="Resume"
      creator="Resume Builder"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{contact.name || 'Your Name'}</Text>
          {contact.title && <Text style={styles.role}>{contact.title}</Text>}
          <ContactLine contact={contact} />
        </View>

        {summary.trim() && (
          <Section title="Summary">
            <Text style={styles.paragraph}>{summary}</Text>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((job) => {
              const bullets = job.bullets.filter((bullet) => bullet.trim())
              const dates = formatDateRange(job.start, job.end, true)

              return (
                <View key={job.id} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryHeading}>
                      <Text style={styles.entryTitle}>{job.role || 'Role'}</Text>
                      <Text style={styles.entrySubtitle}>
                        {[job.company, job.location].filter(Boolean).join(' · ')}
                      </Text>
                    </View>
                    {dates && <Text style={styles.dates}>{dates}</Text>}
                  </View>
                  {bullets.length > 0 && (
                    <View style={styles.bullets}>
                      {bullets.map((bullet, index) => (
                        <View key={`${job.id}-bullet-${index}`} style={styles.bulletRow}>
                          <Text style={styles.bulletMark}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )
            })}
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((item) => {
              const dates = formatDateRange(item.start, item.end)

              return (
                <View key={item.id} style={styles.entry} wrap={false}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryHeading}>
                      <Text style={styles.entryTitle}>{item.degree || 'Degree'}</Text>
                      <Text style={styles.entrySubtitle}>
                        {[item.school, item.location].filter(Boolean).join(' · ')}
                      </Text>
                    </View>
                    {dates && <Text style={styles.dates}>{dates}</Text>}
                  </View>
                  {item.details.trim() && (
                    <Text style={styles.details}>{item.details}</Text>
                  )}
                </View>
              )
            })}
          </Section>
        )}

        {skillList.length > 0 && (
          <Section title="Skills">
            <Text style={styles.skills}>{skillList.join(', ')}</Text>
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((project) => (
              <View key={project.id} style={styles.entry} wrap={false}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{project.name || 'Project'}</Text>
                  {project.link && (
                    <Link src={toHref(project.link)} style={styles.projectLink}>
                      {project.link}
                    </Link>
                  )}
                </View>
                {project.description.trim() && (
                  <Text style={styles.details}>{project.description}</Text>
                )}
              </View>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  )
}
