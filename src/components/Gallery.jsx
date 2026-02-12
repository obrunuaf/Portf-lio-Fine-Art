import { useState, useEffect, useRef } from 'react'
import ArtImage from './ArtImage'
import { artworks, getImageSrc } from '../data/artworks'

export default function Gallery({ onOpenModal }) {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const observerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems(
                (prev) => new Set([...prev, entry.target.dataset.id]),
              )
              observerRef.current?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15 },
      )

      document.querySelectorAll(".showcase-piece").forEach((el) => {
        observerRef.current.observe(el)
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [])

  const isVisible = (id) => visibleItems.has(String(id))
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section id="galeria" className="py-20 md:py-32 overflow-x-hidden">
      {/* Section Header */}
      <div className="text-center mb-14 md:mb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src="/logo-maragogi-secret.png"
            alt="Maragogi Secret — Fine Art Photography Collection"
            className="w-40 h-40 md:w-52 md:h-52 object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        </div>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-3">
          Coleção em Destaque
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-ink">
          Maragogi <span className="font-light italic">Secret</span>
        </h2>
        <p className="font-sans text-muted text-sm mt-4 max-w-lg mx-auto leading-relaxed">
          Dez perspectivas aéreas exclusivas sobre o litoral de Maragogi, Alagoas — recifes, embarcações e paisagens capturadas a dezenas de metros de altitude com o DJI Air 3S.
        </p>
      </div>

      <div className="showcase-section">

        {/* ═══ #1: HERO — Solidão Náutica ═══ */}
        <div
          className={`showcase-piece showcase-hero ${isVisible(1) ? 'fade-in-up' : 'opacity-0'}`}
          data-id="1"
          onClick={() => onOpenModal(artworks[0])}
          role="button" tabIndex={0} aria-label={`Ver ${artworks[0].title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(artworks[0])}
        >
          <ArtImage
            src={getImageSrc(artworks[0].filename)}
            alt={artworks[0].title}
            className="w-full h-full object-cover"
            placeholderColor={artworks[0].details.color}
            style={{ minHeight: '100%' }}
          />
          <div className="hero-info">
            <div className="max-w-7xl mx-auto w-full flex items-end gap-6 md:gap-10 px-6 md:px-10">
              <span className="piece-number">{pad(1)}</span>
              <div className="pb-2">
                <span className="font-sans text-white/50 text-[10px] uppercase tracking-[0.25em]">
                  {artworks[0].category}
                </span>
                <h3 className="font-serif text-white text-3xl md:text-5xl font-semibold mt-1" style={{textShadow: '0 2px 12px rgba(0,0,0,0.4)'}}>
                  {artworks[0].title}
                </h3>
                <p className="font-sans text-white/70 text-sm mt-3 max-w-md hidden md:block leading-relaxed">
                  {artworks[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-spacer-lg" />

        {/* ═══ #2: SPLIT — Arquitetura de Coral (Portrait) ═══ */}
        <div
          className={`showcase-piece showcase-split ${isVisible(2) ? 'fade-in-up' : 'opacity-0'}`}
          data-id="2"
          onClick={() => onOpenModal(artworks[1])}
          role="button" tabIndex={0} aria-label={`Ver ${artworks[1].title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(artworks[1])}
        >
          <div className="split-image">
            <ArtImage
              src={getImageSrc(artworks[1].filename)}
              alt={artworks[1].title}
              className="w-full h-full object-cover"
              placeholderColor={artworks[1].details?.color}
              style={{ minHeight: '100%' }}
            />
          </div>
          <div className="split-text">
            <span className="piece-number">{pad(2)}</span>
            <span className="font-sans text-accent text-[10px] uppercase tracking-[0.25em] font-medium">
              {artworks[1].category}
            </span>
            <h3 className="font-serif text-ink text-3xl md:text-4xl font-semibold mt-2">
              {artworks[1].title}
            </h3>
            <p className="font-sans text-muted text-sm leading-relaxed mt-4 max-w-sm">
              {artworks[1].description}
            </p>
            <div className="mt-6 font-sans text-accent text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2">
              Ver detalhes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="showcase-spacer" />

        {/* ═══ #3-4: DUO — Fronteira de Sal + Caminho do Mar ═══ */}
        <div className="showcase-duo px-6 md:px-10">
          {[artworks[2], artworks[3]].map((art, i) => (
            <div
              key={art.id}
              className={`showcase-piece showcase-duo-item ${isVisible(art.id) ? 'fade-in-up' : 'opacity-0'}`}
              data-id={art.id}
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => onOpenModal(art)}
              role="button" tabIndex={0} aria-label={`Ver ${art.title}`}
              onKeyDown={(e) => e.key === 'Enter' && onOpenModal(art)}
            >
              <span className="duo-number">{pad(art.id)}</span>
              <ArtImage
                src={getImageSrc(art.filename)}
                alt={art.title}
                className="w-full object-cover"
                placeholderColor={art.details?.color}
                style={{ aspectRatio: '16/10' }}
              />
              <div className="duo-info">
                <span className="font-sans text-white/50 text-[10px] uppercase tracking-[0.25em]">
                  {art.category}
                </span>
                <h3 className="font-serif text-white text-xl md:text-2xl font-semibold mt-1" style={{textShadow: '0 2px 8px rgba(0,0,0,0.4)'}}>
                  {art.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="showcase-spacer-lg" />

        {/* ═══ #5: HERO — Porto Seguro ═══ */}
        <div
          className={`showcase-piece showcase-hero ${isVisible(5) ? 'fade-in-up' : 'opacity-0'}`}
          data-id="5"
          onClick={() => onOpenModal(artworks[4])}
          role="button" tabIndex={0} aria-label={`Ver ${artworks[4].title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(artworks[4])}
        >
          <ArtImage
            src={getImageSrc(artworks[4].filename)}
            alt={artworks[4].title}
            className="w-full h-full object-cover"
            placeholderColor={artworks[4].details.color}
            style={{ minHeight: '100%' }}
          />
          <div className="hero-info">
            <div className="max-w-7xl mx-auto w-full flex items-end gap-6 md:gap-10 px-6 md:px-10">
              <span className="piece-number">{pad(5)}</span>
              <div className="pb-2">
                <span className="font-sans text-white/50 text-[10px] uppercase tracking-[0.25em]">
                  {artworks[4].category}
                </span>
                <h3 className="font-serif text-white text-3xl md:text-5xl font-semibold mt-1" style={{textShadow: '0 2px 12px rgba(0,0,0,0.4)'}}>
                  {artworks[4].title}
                </h3>
                <p className="font-sans text-white/70 text-sm mt-3 max-w-md hidden md:block leading-relaxed">
                  {artworks[4].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-spacer-lg" />

        {/* ═══ #6: SPLIT REVERSE — Esmeralda Bruta ═══ */}
        <div
          className={`showcase-piece showcase-split reverse dark ${isVisible(6) ? 'fade-in-up' : 'opacity-0'}`}
          data-id="6"
          onClick={() => onOpenModal(artworks[5])}
          role="button" tabIndex={0} aria-label={`Ver ${artworks[5].title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(artworks[5])}
        >
          <div className="split-text">
            <span className="piece-number">{pad(6)}</span>
            <span className="font-sans text-accent-light text-[10px] uppercase tracking-[0.25em] font-medium">
              {artworks[5].category}
            </span>
            <h3 className="font-serif text-white text-3xl md:text-4xl font-semibold mt-2">
              {artworks[5].title}
            </h3>
            <p className="font-sans text-white/60 text-sm leading-relaxed mt-4 max-w-sm">
              {artworks[5].description}
            </p>
            <div className="mt-6 font-sans text-accent-light text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2">
              Ver detalhes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          <div className="split-image">
            <ArtImage
              src={getImageSrc(artworks[5].filename)}
              alt={artworks[5].title}
              className="w-full h-full object-cover"
              placeholderColor={artworks[5].details?.color}
              style={{ minHeight: '100%' }}
            />
          </div>
        </div>

        <div className="showcase-spacer-lg" />

        {/* ═══ #7-8: DUO — Aquarela Costeira + Divisa Natural ═══ */}
        <div className="showcase-duo px-6 md:px-10">
          {[artworks[6], artworks[7]].map((art, i) => (
            <div
              key={art.id}
              className={`showcase-piece showcase-duo-item ${isVisible(art.id) ? 'fade-in-up' : 'opacity-0'}`}
              data-id={art.id}
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => onOpenModal(art)}
              role="button" tabIndex={0} aria-label={`Ver ${art.title}`}
              onKeyDown={(e) => e.key === 'Enter' && onOpenModal(art)}
            >
              <span className="duo-number">{pad(art.id)}</span>
              <ArtImage
                src={getImageSrc(art.filename)}
                alt={art.title}
                className="w-full object-cover"
                placeholderColor={art.details?.color}
                style={{ aspectRatio: '16/10' }}
              />
              <div className="duo-info">
                <span className="font-sans text-white/50 text-[10px] uppercase tracking-[0.25em]">
                  {art.category}
                </span>
                <h3 className="font-serif text-white text-xl md:text-2xl font-semibold mt-1" style={{textShadow: '0 2px 8px rgba(0,0,0,0.4)'}}>
                  {art.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="showcase-spacer" />

        {/* ═══ #9: HERO — Oásis de Areia ═══ */}
        <div
          className={`showcase-piece showcase-hero ${isVisible(9) ? 'fade-in-up' : 'opacity-0'}`}
          data-id="9"
          onClick={() => onOpenModal(artworks[8])}
          role="button" tabIndex={0} aria-label={`Ver ${artworks[8].title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(artworks[8])}
        >
          <ArtImage
            src={getImageSrc(artworks[8].filename)}
            alt={artworks[8].title}
            className="w-full h-full object-cover"
            placeholderColor={artworks[8].details.color}
            style={{ minHeight: '100%' }}
          />
          <div className="hero-info">
            <div className="max-w-7xl mx-auto w-full flex items-end gap-6 md:gap-10 px-6 md:px-10">
              <span className="piece-number">{pad(9)}</span>
              <div className="pb-2">
                <span className="font-sans text-white/50 text-[10px] uppercase tracking-[0.25em]">
                  {artworks[8].category}
                </span>
                <h3 className="font-serif text-white text-3xl md:text-5xl font-semibold mt-1" style={{textShadow: '0 2px 12px rgba(0,0,0,0.4)'}}>
                  {artworks[8].title}
                </h3>
                <p className="font-sans text-white/70 text-sm mt-3 max-w-md hidden md:block leading-relaxed">
                  {artworks[8].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-spacer-lg" />

        {/* ═══ #10: SPLIT — Constelação Náutica ═══ */}
        <div
          className={`showcase-piece showcase-split ${isVisible(10) ? 'fade-in-up' : 'opacity-0'}`}
          data-id="10"
          onClick={() => onOpenModal(artworks[9])}
          role="button" tabIndex={0} aria-label={`Ver ${artworks[9].title}`}
          onKeyDown={(e) => e.key === 'Enter' && onOpenModal(artworks[9])}
        >
          <div className="split-image">
            <ArtImage
              src={getImageSrc(artworks[9].filename)}
              alt={artworks[9].title}
              className="w-full h-full object-cover"
              placeholderColor={artworks[9].details?.color}
              style={{ minHeight: '100%' }}
            />
          </div>
          <div className="split-text">
            <span className="piece-number">{pad(10)}</span>
            <span className="font-sans text-accent text-[10px] uppercase tracking-[0.25em] font-medium">
              {artworks[9].category}
            </span>
            <h3 className="font-serif text-ink text-3xl md:text-4xl font-semibold mt-2">
              {artworks[9].title}
            </h3>
            <p className="font-sans text-muted text-sm leading-relaxed mt-4 max-w-sm">
              {artworks[9].description}
            </p>
            <div className="mt-6 font-sans text-accent text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2">
              Ver detalhes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
