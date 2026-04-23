import { useMemo } from 'react'
import { artworks, getImageSrc, Artwork } from '../data/artworks'
import ArtImage from './ArtImage'
import { useReveal } from '../hooks/useReveal'

const SIZES = ['40 × 60 cm', '60 × 90 cm', '80 × 120 cm']

function PrintCard({ art, index }: { art: Artwork; index: number }) {
  const subject = encodeURIComponent(`Orçamento Print — ${art.title}`)
  const body = encodeURIComponent(
    `Olá Bruno,\n\nTenho interesse no print "${art.title}" (Edição Limitada — ${art.edition} exemplares).\n\nTamanho desejado: \nInformações adicionais: \n\nAguardo retorno.`
  )

  return (
    <article
      className="group relative bg-[#111] overflow-hidden"
      data-reveal
      style={{ transitionDelay: `${index * 0.1}s` } as React.CSSProperties}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <ArtImage
          src={getImageSrc(art.filename)}
          alt={art.title}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          placeholderColor={art.details.color}
          style={{ width: '100%', height: '100%' }}
        />
        {/* Edition badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/10">
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/65">
            Ed. Limitada &mdash; {art.edition} exemplares
          </span>
        </div>
        {/* Subtle gradient bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
          aria-hidden="true"
        />
      </div>

      {/* Info */}
      <div className="p-8 md:p-10 border-t border-white/[0.06]">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-accent-light font-bold">
              {art.category}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mt-1 leading-tight">
              {art.title}
            </h3>
          </div>
          <span className="font-sans text-[10px] text-white/20 tracking-[0.15em] pt-1 flex-shrink-0">
            {String(index + 1).padStart(2, '0')} / {String(artworks.filter(a => a.printAvailable).length).padStart(2, '0')}
          </span>
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SIZES.map((size) => (
            <span
              key={size}
              className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/35 px-3 py-1.5 border border-white/[0.08]"
            >
              {size}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`mailto:brunoafranca97@gmail.com?subject=${subject}&body=${body}`}
          className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-white border border-white/20 px-6 py-3.5 hover:bg-white hover:text-ink transition-all duration-300 group/btn"
        >
          Solicitar Orçamento
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export default function Prints() {
  const sectionRef = useReveal()
  const prints = useMemo(() => artworks.filter((a) => a.printAvailable), [])

  return (
    <section
      id="prints"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-ink"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20" data-reveal>
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-accent-light font-bold">
              Edições Limitadas
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-semibold text-white leading-[1.1] mt-4">
              Adquirir<br />
              <span className="font-light italic">Obras</span>
            </h2>
          </div>
          <p className="font-sans text-white/45 text-sm md:text-base leading-relaxed max-w-xs">
            Cada obra impressa em papel Fine Art 300g, certificada e assinada. Quando a edição esgota, não reimprime.
          </p>
        </div>

        {/* Grid — gap-px cria linhas finas entre os cards (efeito galeria) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
          {prints.map((art, i) => (
            <PrintCard key={art.id} art={art} index={i} />
          ))}
        </div>

        {/* Fine print */}
        <p className="font-sans text-white/20 text-[9px] uppercase tracking-[0.35em] mt-10 text-center">
          Papel Hahnemühle Photo Rag · Tinta pigmentada archival · Garantia 100+ anos
        </p>

      </div>
    </section>
  )
}
