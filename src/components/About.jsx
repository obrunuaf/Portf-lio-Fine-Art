import ArtImage from './ArtImage'
import InstagramIcon from './InstagramIcon'

export default function About() {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Photo Column */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative group">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
              
              <div className="relative w-64 h-64 md:w-85 md:h-85 rounded-full p-2 border border-accent/10 shadow-2xl bg-white/50 backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ArtImage
                    src="/foto-perfil.jpg"
                    alt="Bruno França — Fotógrafo"
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Hardware Badge - Redesigned to be more subtle and professional */}
              <div className="absolute -bottom-2 -right-4 md:-right-6 bg-ink/90 backdrop-blur-md text-white/90 px-4 py-2 rounded-full shadow-lg border border-white/10 flex items-center gap-2 group-hover:bg-accent transition-colors duration-500">
                <svg className="w-3 h-3 text-accent-light group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
                <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
                  Hardware: DJI Air 3S
                </span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="order-2 md:order-1 px-2 md:px-0">
            <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full mb-8 md:mb-10 text-center md:text-left w-full md:w-auto">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                A Jornada por trás da lente
              </span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-ink leading-[1.1] mb-10">
              Bruno <span className="font-light italic text-accent">França</span>
            </h2>

            <div className="space-y-8 md:space-y-10 text-muted leading-relaxed max-w-xl">
              <p className="font-sans text-base md:text-lg">
                Fotógrafo aéreo especializado em capturar paisagens do litoral brasileiro sob uma perspectiva inédita. Utilizando o drone <strong className="text-ink font-semibold border-b border-accent/20">DJI Air 3S</strong> com sensor de 1 polegada, busco revelar padrões e composições invisíveis ao olhar terrestre.
              </p>
              
              <p className="font-sans text-base md:text-lg">
                A coleção <strong className="text-ink font-semibold">Maragogi Secret</strong> é o resultado de expedições sobre a costa de Alagoas. Cada imagem transforma recifes em mapas orgânicos e o turquesa do mar em uma tela abstrata.
              </p>

              <blockquote className="border-l-3 border-accent/30 pl-8 py-2 my-12 md:my-16">
                <p className="font-serif italic text-ink/70 text-xl md:text-2xl leading-relaxed">
                  "Minha fotografia explora a fronteira entre o registro documental e a arte visual, transformando a geografia em emoção."
                </p>
              </blockquote>
            </div>

            <div className="mt-14 md:mt-16 flex items-center justify-center md:justify-start gap-6">
              <a
                href="https://instagram.com/obrunuaf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink bg-white hover:bg-ink hover:text-white border border-ink/10 px-6 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <InstagramIcon className="group-hover:scale-110 transition-transform" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest">@obrunuaf</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
