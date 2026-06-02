import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Project, MediaItem } from './Work'

interface ProjectExpandedProps {
  project: Project
  onClose: () => void
}

function ExpandedLightbox({ media, index, onClose }: { media: MediaItem[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)

  const prev = () => setCurrent((i) => (i > 0 ? i - 1 : media.length - 1))
  const next = () => setCurrent((i) => (i < media.length - 1 ? i + 1 : 0))

  const item = media[current]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {media.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {media.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div className="max-w-[85vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video src={item.src} controls autoPlay muted playsInline className="max-h-[95vh] max-w-[95vw] rounded-lg" />
        ) : (
          <img src={item.src} alt={item.alt ?? ''} className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg" />
        )}
      </div>

      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
          {current + 1} / {media.length}
        </div>
      )}
    </div>
  )
}

export function ProjectExpanded({ project, onClose }: ProjectExpandedProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto" onClick={onClose}>
        <div className="min-h-screen p-6 md:p-12" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-white">{project.title}</h2>
              <p className="text-gray-400 mt-1">{project.location} &middot; {project.year}</p>
              <p className="text-gray-500 mt-2 max-w-xl">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors shrink-0"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.media.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="overflow-hidden rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white/30 text-left"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt ?? project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/50 p-3">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ExpandedLightbox
          media={project.media}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
