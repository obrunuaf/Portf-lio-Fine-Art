import ArtImage from './ArtImage'
import { getImageSrc } from '../data/artworks'

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>
      <div className="absolute inset-0">
        <ArtImage
          src={getImageSrc("Solidão Náutica.jpg")}
          alt="Solidão Náutica — Maragogi Secret"
          className="w-full h-full object-cover ken-burns"
          style={{ minHeight: '100vh' }}
          eager={true}
        />
      </div>
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 text-center px-6">
        <p className="font-sans text-white text-xs uppercase tracking-[0.3em] mb-4 fade-in-up hero-sub" style={{opacity: 0.9}}>
          Fotografia Aérea Fine Art
        </p>
        <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] fade-in-up stagger-2 hero-text">
          Bruno
          <br />
          <span className="font-light italic">França</span>
        </h1>
        <p className="font-sans text-white text-sm md:text-base mt-6 max-w-lg leading-relaxed fade-in-up stagger-4 hero-sub" style={{opacity: 0.85}}>
          Revelando, do alto, paisagens que o olhar terrestre não alcança.
        </p>
        <a href="#galeria" className="mt-10 fade-in-up stagger-6">
          <svg
            className="w-6 h-6 text-white/50 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
