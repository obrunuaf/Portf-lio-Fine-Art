import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.showcase-piece') || target.closest('a') || target.closest('button')) {
        setHovered(true)
      }
    }

    const onHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.showcase-piece') && !target.closest('a') && !target.closest('button')) {
        setHovered(false)
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onHoverStart, { passive: true })
    document.addEventListener('mouseout', onHoverEnd, { passive: true })

    // Lerp animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12)
      current.current.y = lerp(current.current.y, pos.current.y, 0.12)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onHoverStart)
      document.removeEventListener('mouseout', onHoverEnd)
      cancelAnimationFrame(raf.current)
    }
  }, [visible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    >
      <div
        className={`rounded-full border border-ink/40 flex items-center justify-center transition-all duration-200 ${
          hovered
            ? 'w-16 h-16 bg-ink/5 backdrop-blur-sm'
            : 'w-5 h-5 bg-ink/20'
        } ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {hovered && (
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink/70 select-none">
            Ver
          </span>
        )}
      </div>
    </div>
  )
}
