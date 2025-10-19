import { useCallback, useEffect, useRef, useState } from 'react'
import {
  STORAGE_KEY,
  createEmptyResume,
  normalizeResume,
} from '../data/resumeModel'

function readStoredResume() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return createEmptyResume()

    return normalizeResume(JSON.parse(stored))
  } catch {
    return createEmptyResume()
  }
}

export function usePersistentResume() {
  const [resume, setResume] = useState(readStoredResume)
  const [saveState, setSaveState] = useState('idle')
  const lastSaved = useRef(JSON.stringify(resume))

  useEffect(() => {
    const serialized = JSON.stringify(resume)
    if (serialized === lastSaved.current) return undefined

    setSaveState('saving')
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, serialized)
        lastSaved.current = serialized
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    }, 350)

    return () => window.clearTimeout(timer)
  }, [resume])

  const replaceResume = useCallback((next) => {
    setResume(normalizeResume(next))
  }, [])

  const resetResume = useCallback(() => {
    setResume(createEmptyResume())
  }, [])

  return { resume, setResume, replaceResume, resetResume, saveState }
}
