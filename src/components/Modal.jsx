import { useState, useEffect, useRef, useCallback } from 'react'
import ZoomableImage from './ZoomableImage'
import { artworks, getImageSrc } from '../data/artworks'

export default function Modal({ artwork, onClose, onPrev, onNext }) {
  const [closing, setClosing] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [photoKey, setPhotoKey] = useState(0) // U8: triggers fade animation
  const [direction, setDirection] = useState('next') // U12: slide direction

  const hideControlsTimer = useRef(null)
  const originalTitle = useRef(document.title) // U10: save original title
  const lastActiveElement = useRef(null) // A4: save focus for restoration

  // Current position (e.g. "3 / 10")
  const currentIndex = artworks.indexOf(artwork)
  const positionLabel = currentIndex !== -1 ? `${currentIndex + 1} / ${artworks.length}` : ''

  // Reset states when navigating between artworks
  useEffect(() => {
    setClosing(false)
    setControlsVisible(true)
    setPhotoKey(k => k + 1) // U8: increment key → re-trigger fade

    // U10: Dynamic document.title
    document.title = `${artwork.title} — Bruno França`

    // U9: Preload adjacent images
    if (currentIndex > 0) {
      const prev = new Image()
      prev.src = getImageSrc(artworks[currentIndex - 1].filename)
    }
    if (currentIndex < artworks.length - 1) {
      const next = new Image()
      next.src = getImageSrc(artworks[currentIndex + 1].filename)
    }
  }, [artwork, currentIndex])

  const handleClose = useCallback(() => {
    setClosing(true)
    document.title = originalTitle.current // U10: restore title
    setTimeout(() => onClose(), 250)
  }, [onClose])

  // Auto-hide controls after 2.5s of inactivity
  const resetHideTimer = useCallback(() => {
    setControlsVisible(true)
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false)
    }, 2500)
  }, [])

  const handleMouseMove = useCallback(() => {
    resetHideTimer()
  }, [resetHideTimer])

  useEffect(() => {
    // A4: Save focus on mount
    lastActiveElement.current = document.activeElement

    const handleKey = (e) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft" && onPrev) {
        setDirection('prev')
        onPrev()
      }
      if (e.key === "ArrowRight" && onNext) {
        setDirection('next')
        onNext()
      }
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    resetHideTimer()

    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
      document.title = originalTitle.current // U10: restore on unmount
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)

      // A4: Restore focus on unmount
      if (lastActiveElement.current && lastActiveElement.current.focus) {
        lastActiveElement.current.focus()
      }
    }
  }, [handleClose, onPrev, onNext, resetHideTimer])

  // Swipe support (mobile)
  const touchStartX = useRef(null)
  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX }
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return
    const dist = touchStartX.current - e.changedTouches[0].clientX
    if (dist > 50 && onNext) {
      setDirection('next')
      onNext()
    }
    if (dist < -50 && onPrev) {
      setDirection('prev')
      onPrev()
    }
    touchStartX.current = null
  }

  if (!artwork) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black ${closing ? 'backdrop-exit' : 'backdrop-enter'}`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
    >
      {/* ─── Top Bar (auto-hide) ─── */}
      <div 
        className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 md:px-8 md:py-5 transition-opacity duration-500 ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ paddingTop: 'calc(1rem + var(--sat))', paddingLeft: 'calc(1.25rem + var(--sal))', paddingRight: 'calc(1.25rem + var(--sar))' }}
      >
        <span className="text-white/60 text-[13px] font-sans font-medium tracking-wider">
          {positionLabel}
        </span>
        <button
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200"
          onClick={handleClose}
          aria-label="Fechar"
        >
          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ─── Navigation Arrows (auto-hide) ─── */}
      {onPrev && (
        <button
          className={`absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={(e) => { 
            e.stopPropagation()
            setDirection('prev')
            onPrev() 
          }}
          aria-label="Foto anterior"
        >
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {onNext && (
        <button
          className={`absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={(e) => { 
            e.stopPropagation()
            setDirection('next')
            onNext() 
          }}
          aria-label="Próxima foto"
        >
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* ─── Photo Fullscreen ─── */}
      <div
        className="w-full h-full"
        onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      >
        {/* U12: photo-slide-[direction] handles horizontal entering transition */}
        <div key={photoKey} className={`relative w-full h-screen flex items-center justify-center ${direction === 'next' ? 'photo-slide-next' : 'photo-slide-prev'}`}>
          <div className="w-full h-full flex items-center justify-center px-4 py-14 md:px-16 md:py-16">
            <ZoomableImage
              src={getImageSrc(artwork.filename)}
              alt={artwork.title}
              className="w-full h-full object-contain"
              placeholderColor={artwork.details?.color}
            />
          </div>

          {/* Overlay — Title, Category & Description */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-10 pointer-events-none transition-opacity duration-500 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)' }}
          >
            <div 
              className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-10 md:pb-14 pt-32"
              style={{ paddingBottom: 'calc(2.5rem + var(--sab))' }}
            >
              <div className="max-w-3xl">
                <span className="font-sans text-white/45 text-[10px] uppercase tracking-[0.3em] font-medium block mb-2">
                  {artwork.category}
                </span>
                <h2 className="font-serif text-white text-xl md:text-3xl font-semibold leading-snug mb-3">
                  {artwork.title}
                </h2>
                <p className="font-sans text-white/45 text-xs md:text-sm leading-relaxed line-clamp-2">
                  {artwork.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


