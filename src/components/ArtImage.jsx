import { useState } from 'react'

export default function ArtImage({ src, alt, className, style, onLoad, eager, placeholderColor, protected: isProtected = true }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // P1: Block right-click and drag
  const preventDownload = (e) => e.preventDefault()

  if (failed) {
    return (
      <div
        className={`img-placeholder ${className || ""}`}
        style={{ minHeight: 220, backgroundColor: placeholderColor || '#e2e8f0', ...style }}
      >
        <span className="opacity-50">{alt}</span>
      </div>
    )
  }

  // Split className into container parts (w-full, h-full, object-cover)
  // We apply layout classes to the wrapper and image specific classes to the img
  const isFill = className?.includes('w-full') && className?.includes('h-full')

  return (
    <div
      className={`relative overflow-hidden ${className || ''}`}
      style={{ ...style, userSelect: 'none', WebkitUserSelect: 'none' }}
      onContextMenu={isProtected ? preventDownload : undefined}
    >
      {!loaded && (
        <div 
          className="absolute inset-0 z-0 animate-pulse" 
          style={{ 
            backgroundColor: placeholderColor || '#f5f0eb',
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }} 
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} relative z-[1] ${isFill ? 'object-cover' : 'object-contain'}`}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        onError={() => setFailed(true)}
        onLoad={() => { setLoaded(true); onLoad && onLoad() }}
        onContextMenu={isProtected ? preventDownload : undefined}
        onDragStart={isProtected ? preventDownload : undefined}
        style={{ pointerEvents: isProtected ? 'none' : 'auto' }}
      />
      {/* P1: Transparent overlay to block interactions with the image */}
      {isProtected && (
        <div
          className="absolute inset-0 z-2"
          onContextMenu={preventDownload}
          onDragStart={preventDownload}
          style={{ WebkitTouchCallout: 'none' }}
        />
      )}
    </div>
  )
}
