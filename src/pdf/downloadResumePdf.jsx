import { pdf } from '@react-pdf/renderer'
import { resumeFileName } from '../utils/format'
import { ResumeDocument } from './ResumeDocument'

export async function downloadResumePdf(resume) {
  const blob = await pdf(<ResumeDocument resume={resume} />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = resumeFileName(resume?.contact?.name)
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
