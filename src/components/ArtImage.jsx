import { useState } from 'react'

export default function ArtImage({ src, alt, className, style, onLoad, eager, protected: isProtected = true }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // P1: Block right-click and drag
  const preventDownload = (e) => e.preventDefault()

  if (failed) {
    return (
      <div
        className={`img-placeholder ${className || ""}`}
        style={{ minHeight: 220, ...style }}
      >
        <span>{alt}</span>
      </div>
    )
  }

  return (
    <div
      className="relative"
      style={{ ...style, userSelect: 'none', WebkitUserSelect: 'none' }}
      onContextMenu={isProtected ? preventDownload : undefined}
    >
      {!loaded && (
        <div className={`img-shimmer absolute inset-0 ${className || ""}`} style={{ minHeight: 220 }} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
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
          className="absolute inset-0 z-[1]"
          onContextMenu={preventDownload}
          onDragStart={preventDownload}
          style={{ WebkitTouchCallout: 'none' }}
        />
      )}
    </div>
  )
}
