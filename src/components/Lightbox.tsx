import { useEffect, useCallback, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react'
import type { MediaItem } from './Work'

interface LightboxProps {
  media: MediaItem[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function Lightbox({ media, index, onClose, onIndexChange }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false)

  const prev = useCallback(() => {
    onIndexChange(index > 0 ? index - 1 : media.length - 1)
  }, [index, media.length, onIndexChange])

  const next = useCallback(() => {
    onIndexChange(index < media.length - 1 ? index + 1 : 0)
  }, [index, media.length, onIndexChange])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setZoomed(true)
    } else {
      document.exitFullscreen?.()
      setZoomed(false)
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'f' || e.key === 'F') toggleFullscreen()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, prev, next, toggleFullscreen])

  const item = media[index]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 lightbox-enter" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors hover:scale-110"
      >
        <X className="h-6 w-6" />
      </button>

      {media.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {media.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors hover:scale-110"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); toggleFullscreen() }}
        className="absolute bottom-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors hover:scale-110"
        title="Toggle fullscreen (F)"
      >
        {zoomed ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
      </button>

      <div className="max-w-[95vw] max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            muted
            playsInline
            className="max-h-[95vh] max-w-[95vw] rounded-lg"
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt ?? ''}
            className="max-h-[95vh] max-w-[95vw] object-contain rounded-lg select-none"
            draggable={false}
          />
        )}
      </div>

      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
          {index + 1} / {media.length}
        </div>
      )}
    </div>
  )
}
