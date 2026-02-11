import ArtImage from './ArtImage'
import InstagramIcon from './InstagramIcon'

export default function About() {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-warm">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl">
                <ArtImage
                  src="/foto-perfil.jpg"
                  alt="Bruno França — Fotógrafo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-accent text-white rounded-full px-4 py-2 shadow-lg">
                <span className="font-sans text-[10px] uppercase tracking-widest">
                  DJI Air 3S
                </span>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="order-2 md:order-1">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-3">
              Sobre o Fotógrafo
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-tight">
              Bruno França
            </h2>
            <div className="about-divider mt-6 mb-6" />
            <p className="font-sans text-muted text-sm md:text-base leading-relaxed mb-4">
              Fotógrafo aéreo especializado em capturar paisagens do litoral brasileiro sob uma perspectiva inédita. Utilizando o drone <strong className="text-ink">DJI Air 3S</strong> com sensor de 1 polegada e 50 megapixels, busco revelar padrões, texturas e composições invisíveis ao olhar terrestre.
            </p>
            <p className="font-sans text-muted text-sm md:text-base leading-relaxed mb-4">
              A coleção <strong className="text-ink">Maragogi Secret</strong> é o resultado de expedições sobre a costa de Maragogi, Alagoas — um dos destinos mais preservados do Brasil. Cada imagem transforma recifes em mapas, embarcações em estrelas e o turquesa do mar em tela.
            </p>
            <p className="font-sans text-muted text-sm md:text-base leading-relaxed">
              Meu trabalho explora a fronteira entre fotografia documental e arte visual, buscando transformar o registro aéreo em peças que dialogam com a estética fine art.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://instagram.com/obrunuaf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
              >
                <InstagramIcon />
                <span className="font-sans text-sm font-medium">@obrunuaf</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
