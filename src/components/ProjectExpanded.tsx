import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
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

function Slideshow({ project, onClose }: { project: Project; onClose: () => void }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))

  const preload = useCallback((index: number) => {
    if (loaded.has(index)) return
    const item = project.media[index]
    if (item.type !== 'image') {
      setLoaded((s) => new Set(s).add(index))
      return
    }
    const img = new Image()
    img.onload = () => {
      img.decode().then(() => setLoaded((s) => new Set(s).add(index))).catch(() => setLoaded((s) => new Set(s).add(index)))
    }
    img.src = item.src
  }, [loaded, project.media])

  useEffect(() => {
    preload(current)
    preload((current + 1) % project.media.length)
  }, [current, preload])

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current)
      setCurrent((i) => (i + 1) % project.media.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [current, project.media.length])

  const handleAnimationEnd = () => setPrev(null)

  function renderMedia(index: number) {
    const item = project.media[index]
    if (item.type === 'video') {
      return <video src={item.src} controls autoPlay muted playsInline className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" />
    }
    return <img src={item.src} alt={item.alt ?? ''} loading="eager" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" />
  }

  function renderBg(index: number) {
    const item = project.media[index]
    if (item.type === 'video') return null
    return (
      <img
        src={item.src}
        alt=""
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <button onClick={onClose} className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors">
        <X className="h-6 w-6" />
      </button>

      {prev !== null && loaded.has(prev) && (
        <div key={`bg-${prev}`} className="absolute inset-0 z-0 animate-fadeOut" onAnimationEnd={handleAnimationEnd}>
          {renderBg(prev)}
          <div className="absolute inset-0 z-[1] flex items-center justify-center">
            <div>{renderMedia(prev)}</div>
          </div>
        </div>
      )}

      {loaded.has(current) && (
        <div key={`bg-${current}`} className="absolute inset-0 z-[2] animate-fadeIn">
          {renderBg(current)}
          <div className="absolute inset-0 z-[3] flex items-center justify-center">
            <div>{renderMedia(current)}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectExpanded({ project, onClose }: ProjectExpandedProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (project.audioSrc) {
      audioRef.current = new Audio(project.audioSrc)
      audioRef.current.loop = true
      audioRef.current.play().catch(() => {})
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [project.audioSrc])

  if (project.slideshow) {
    return <Slideshow project={project} onClose={onClose} />
  }

  return <ExpandedGrid project={project} onClose={onClose} />
}

function ExpandedGrid({ project, onClose }: ProjectExpandedProps) {
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
