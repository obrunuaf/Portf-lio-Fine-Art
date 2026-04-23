import { expeditions } from '../data/expeditions'
import { useReveal } from '../hooks/useReveal'

export default function Expeditions() {
  const sectionRef = useReveal()

  return (
    <section
      id="expedicoes"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-canvas border-t border-ink/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
          data-reveal
        >
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-accent font-bold">
              Em Planejamento
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-semibold text-ink leading-[1.1] mt-4">
              Próximas<br />
              <span className="font-light italic">Expedições</span>
            </h2>
          </div>
          <p className="font-sans text-muted text-sm leading-relaxed max-w-[22rem]">
            Destinos em estudo. Novas coleções formam-se onde poucos olhares chegaram do alto.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/[0.06]">
          {expeditions.map((exp, i) => (
            <div
              key={exp.id}
              className="group bg-canvas hover:bg-warm transition-colors duration-500 p-10 md:p-16 overflow-hidden relative"
              data-reveal
              style={{ transitionDelay: `${i * 0.12}s` } as React.CSSProperties}
            >
              {/* Ghost number */}
              <span
                className="absolute -bottom-6 -right-4 font-serif font-bold leading-none select-none pointer-events-none text-ink/[0.04]"
                style={{ fontSize: 'clamp(8rem, 14vw, 14rem)' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Coordinates */}
              <p className="font-mono text-[11px] text-muted/40 tracking-widest mb-10 relative z-10">
                {exp.coords}
              </p>

              {/* Destination */}
              <h3 className="font-serif text-4xl md:text-[3.25rem] font-semibold text-ink leading-[1.05] mb-4 relative z-10">
                {exp.destination}
              </h3>

              {/* Region & Date */}
              <div className="flex items-center gap-3 mt-5 relative z-10">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                  {exp.region}
                </span>
                <span className="w-0.5 h-0.5 rounded-full bg-muted/40" aria-hidden="true" />
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted">
                  {exp.date}
                </span>
              </div>

              {/* Status badge */}
              <div className="mt-8 relative z-10">
                <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.3em] text-accent px-3.5 py-1.5 border border-accent/25 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse" aria-hidden="true" />
                  {exp.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
