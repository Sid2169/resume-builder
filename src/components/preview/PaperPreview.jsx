import { useLayoutEffect, useRef, useState } from 'react'
import { ResumePreview } from './ResumePreview'

const PAPER_WIDTH = 794

export function PaperPreview({ resume }) {
  const viewportRef = useRef(null)
  const paperRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [paperHeight, setPaperHeight] = useState(1123)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const paper = paperRef.current
    if (!viewport || !paper) return undefined

    const update = () => {
      const availableWidth = viewport.clientWidth
      const nextScale = Math.min(1, Math.max(0.35, (availableWidth - 8) / PAPER_WIDTH))

      setScale((current) => (Math.abs(current - nextScale) < 0.001 ? current : nextScale))
      setPaperHeight((current) => (current === paper.scrollHeight ? current : paper.scrollHeight))
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(viewport)
    observer.observe(paper)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="paper-viewport" ref={viewportRef}>
      <div
        className="paper-stage"
        style={{ width: PAPER_WIDTH * scale, height: paperHeight * scale }}
      >
        <div
          className="paper"
          ref={paperRef}
          role="document"
          aria-label="Resume preview"
          style={{ transform: `scale(${scale})` }}
        >
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  )
}
