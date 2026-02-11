import { useState, useRef, useCallback, useEffect } from 'react'
import ArtImage from './ArtImage'

// Flickr-style 3-level zoom: FIT → FILL → FULL
const ZOOM_LEVELS = {
  FIT: 'fit',     // Photo fits in container
  FILL: 'fill',   // Photo fills width (~1.5x)
  FULL: 'full',   // 100% resolution (up to 4x)
}

export default function ZoomableImage({ src, alt, className }) {
  const [zoomLevel, setZoomLevel] = useState(ZOOM_LEVELS.FIT)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const posStart = useRef({ x: 0, y: 0 })
  const pinchStartDist = useRef(null)
  const pinchStartScale = useRef(1)
  const [customScale, setCustomScale] = useState(3)

  const isZoomed = zoomLevel !== ZOOM_LEVELS.FIT

  // Get the actual scale value for the current zoom level
  const getScale = useCallback(() => {
    if (zoomLevel === ZOOM_LEVELS.FIT) return 1
    if (zoomLevel === ZOOM_LEVELS.FILL) return 1.5
    if (zoomLevel === ZOOM_LEVELS.FULL) return customScale
    return 1
  }, [zoomLevel, customScale])

  const scale = getScale()

  // Reset zoom when src changes
  useEffect(() => {
    setZoomLevel(ZOOM_LEVELS.FIT)
    setPosition({ x: 0, y: 0 })
    setCustomScale(3)
  }, [src])

  // Clamp position
  const clampPosition = useCallback((pos, s) => {
    if (s <= 1) return { x: 0, y: 0 }
    const maxOffset = ((s - 1) / s) * 50
    return {
      x: Math.max(-maxOffset, Math.min(maxOffset, pos.x)),
      y: Math.max(-maxOffset, Math.min(maxOffset, pos.y)),
    }
  }, [])


  // Cursor style based on zoom level
  const getCursor = () => {
    if (isDragging) return 'grabbing'
    if (zoomLevel === ZOOM_LEVELS.FIT) return 'zoom-in'
    if (zoomLevel === ZOOM_LEVELS.FILL) return 'zoom-in'
    if (zoomLevel === ZOOM_LEVELS.FULL) return 'zoom-out' // Click to zoom out
    return 'zoom-in'
  }

  // Click to cycle through zoom levels (Flickr-style)
  const handleClick = useCallback((e) => {
    // Don't trigger if user was dragging
    if (isDragging) return
    
    e.stopPropagation()

    const rect = containerRef.current?.getBoundingClientRect()

    if (zoomLevel === ZOOM_LEVELS.FIT) {
      // FIT → FILL (1.5x, center on click)
      if (rect) {
        const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * -25
        const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * -25
        setPosition(clampPosition({ x: xPct, y: yPct }, 1.5))
      }
      setZoomLevel(ZOOM_LEVELS.FILL)
    } else if (zoomLevel === ZOOM_LEVELS.FILL) {
      // FILL → FULL (3x, center on click)
      if (rect) {
        const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * -40
        const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * -40
        setPosition(clampPosition({ x: xPct, y: yPct }, 3))
      }
      setCustomScale(3)
      setZoomLevel(ZOOM_LEVELS.FULL)
    } else {
      // FULL → FIT (reset)
      setZoomLevel(ZOOM_LEVELS.FIT)
      setPosition({ x: 0, y: 0 })
      setCustomScale(3)
    }
  }, [zoomLevel, isDragging, clampPosition])


  // Mouse drag for panning (only when zoomed)
  const handleMouseDown = useCallback((e) => {
    if (!isZoomed) return
    e.preventDefault()
    dragStart.current = { x: e.clientX, y: e.clientY }
    posStart.current = { ...position }
    // Don't set isDragging yet - wait for actual movement
  }, [isZoomed, position])

  const handleMouseMove = useCallback((e) => {
    if (!isZoomed) return
    if (!dragStart.current.x) return
    
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    const distance = Math.hypot(dx, dy)
    
    // Only start dragging if moved more than 5px (threshold to prevent accidental drag on click)
    if (!isDragging && distance < 5) return
    
    if (!isDragging) setIsDragging(true)
    
    const dxPct = (dx / rect.width) * 100
    const dyPct = (dy / rect.height) * 100
    setPosition(clampPosition({
      x: posStart.current.x + dxPct,
      y: posStart.current.y + dyPct,
    }, scale))
  }, [isDragging, isZoomed, scale, clampPosition])

  const handleMouseUp = useCallback(() => {
    dragStart.current = { x: 0, y: 0 }
    setTimeout(() => setIsDragging(false), 50)
  }, [])



  // Touch: pinch to zoom + drag to pan
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDist.current = Math.hypot(dx, dy)
      pinchStartScale.current = scale
    } else if (e.touches.length === 1 && isZoomed) {
      setIsDragging(true)
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      posStart.current = { ...position }
    }
  }, [scale, isZoomed, position])

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && pinchStartDist.current) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const newScale = Math.max(1, Math.min(5, pinchStartScale.current * (dist / pinchStartDist.current)))
      setCustomScale(newScale)
      if (newScale > 1) {
        setZoomLevel(ZOOM_LEVELS.FULL)
      } else {
        setZoomLevel(ZOOM_LEVELS.FIT)
        setPosition({ x: 0, y: 0 })
      }
    } else if (e.touches.length === 1 && isDragging && isZoomed) {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const dx = ((e.touches[0].clientX - dragStart.current.x) / rect.width) * 100
      const dy = ((e.touches[0].clientY - dragStart.current.y) / rect.height) * 100
      setPosition(clampPosition({
        x: posStart.current.x + dx,
        y: posStart.current.y + dy,
      }, scale))
    }
  }, [isDragging, isZoomed, scale, clampPosition])

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length < 2) pinchStartDist.current = null
    if (e.touches.length === 0) setTimeout(() => setIsDragging(false), 50)
  }, [])

  // Double tap to toggle zoom (mobile)
  const lastTap = useRef(0)
  const handleTouchEndDoubleTap = useCallback((e) => {
    handleTouchEnd(e)
    const now = Date.now()
    if (now - lastTap.current < 300) {
      if (zoomLevel === ZOOM_LEVELS.FIT) {
        setZoomLevel(ZOOM_LEVELS.FILL)
      } else {
        setZoomLevel(ZOOM_LEVELS.FIT)
        setPosition({ x: 0, y: 0 })
      }
    }
    lastTap.current = now
  }, [zoomLevel, handleTouchEnd])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative select-none"
      style={{
        cursor: getCursor(),
        touchAction: isZoomed ? 'none' : 'auto',
        borderRadius: isZoomed ? 0 : undefined,
      }}
      onClick={handleClick}

      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEndDoubleTap}
    >
      <div
        style={{
          transform: `scale(${scale}) translate(${position.x}%, ${position.y}%)`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <ArtImage
          src={src}
          alt={alt}
          className={className}
        />
      </div>
    </div>
  )
}
