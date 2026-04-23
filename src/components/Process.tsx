import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    number: '01',
    title: 'Planejamento',
    body: 'Estudo de condições climáticas, previsão de marés e análise de luz para definir a janela ideal de voo. Cada expedição é planejada com semanas de antecedência — o oceano não espera.',
  },
  {
    number: '02',
    title: 'Captura',
    body: 'DJI Air 3S em altitudes de 40 a 120 metros. Sensor 1" CMOS 50MP captura RAW com latitude dinâmica máxima. Cada frame é único — a maré não repete composições.',
  },
  {
    number: '03',
    title: 'Edição Fine Art',
    body: 'Tratamento colorimétrico artesanal em Capture One. Sem filtros predefinidos — cada obra desenvolve sua própria paleta, revelando o que o RAW continha desde o primeiro segundo.',
  },
]

export default function Process() {
  const sectionRef = useReveal()

  return (
    <section
      id="processo"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-warm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-20 md:mb-28" data-reveal>
          <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-8">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
              Método &amp; Processo
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-ink leading-[1.1]">
            Por Trás<br />
            <span className="font-light italic">da Lente</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">

          {/* Horizontal connector line — desktop only */}
          <div
            className="hidden md:block absolute top-[2.6rem] left-[calc(33.33%+2.5rem)] right-[calc(33.33%+2.5rem)] h-px bg-accent/20"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative p-0 md:pr-10 mb-16 md:mb-0"
              data-reveal
              style={{ transitionDelay: `${i * 0.12}s` } as React.CSSProperties}
            >
              {/* Step marker */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative z-10 w-[3.2rem] h-[3.2rem] rounded-full border border-accent/25 bg-warm flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-accent font-bold">
                    {step.number}
                  </span>
                </div>
                {/* Vertical connector — mobile only */}
                <div className="h-px flex-1 bg-accent/15 md:hidden" aria-hidden="true" />
              </div>

              {/* Large ghost number */}
              <span
                className="absolute top-0 left-0 font-serif font-bold leading-none select-none pointer-events-none text-ink/[0.04]"
                style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="font-sans text-muted text-sm md:text-base leading-[1.75] relative z-10 max-w-sm">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-20 md:mt-28 w-14 h-[2px] bg-accent/30" aria-hidden="true" />

        {/* Quote */}
        <blockquote className="mt-10 md:mt-12" data-reveal>
          <p className="font-serif italic text-ink/45 text-xl md:text-2xl lg:text-3xl leading-[1.5] max-w-2xl">
            "O drone não é apenas uma ferramenta — é a extensão do olhar que a gravidade sempre negou ao fotógrafo."
          </p>
        </blockquote>

      </div>
    </section>
  )
}
