import { alanTuringResume } from './alanTuringResume'
import { claudeShannonResume } from './claudeShannonResume'
import { linusTorvaldsResume } from './linusTorvaldsResume'

export const sampleResumes = [alanTuringResume, claudeShannonResume, linusTorvaldsResume]

export function getRandomSampleResume() {
  return sampleResumes[Math.floor(Math.random() * sampleResumes.length)]
}
