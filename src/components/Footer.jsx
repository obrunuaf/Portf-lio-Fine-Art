import { useState } from 'react'
import InstagramIcon from './InstagramIcon'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('brunoafranca97@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer id="contato" className="bg-ink text-white pt-32 pb-16 md:pt-48 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 safe-bottom">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 md:gap-16 items-start mb-32 md:mb-48">
          
          {/* Brand Column - Span 5 */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-6 mb-12">
              <div className="p-3 bg-accent/10 border border-white/10 rounded-2xl shadow-inner">
                <img src="/logo-bf.png" alt="Bruno França" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-4xl font-semibold leading-none mb-3">
                  Bruno <span className="font-light italic text-accent-light">França</span>
                </h3>
                <p className="font-sans text-[11px] uppercase tracking-[0.5em] text-white/40 font-bold">
                  Aerial Fine Art Photographer
                </p>
              </div>
            </div>
            <p className="font-sans text-white/50 text-base md:text-lg leading-relaxed max-w-sm mb-12">
              A fotografia como uma nova forma de ver o mundo. Revelando a beleza abstrata das costas brasileiras através de lentes aéreas.
            </p>
            <div className="flex items-center gap-10">
               <a
                href="https://instagram.com/obrunuaf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-accent transition-all duration-300 group shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/5534993183916"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-accent transition-all duration-300 group shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column - Span 3 */}
          <div className="md:col-span-3">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.4em] text-white/20 font-bold mb-12">
              Navegação
            </h4>
            <ul className="space-y-6">
              {['Galeria', 'Sobre', 'Contato'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="font-sans text-lg text-white/40 hover:text-accent-light transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column - Span 4 */}
          <div className="md:col-span-4">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.4em] text-white/20 font-bold mb-12">
              Orçamentos & Info
            </h4>
            <div className="space-y-16">
              <button
                onClick={handleCopyEmail}
                className="flex flex-col group relative w-fit text-left"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent/50 mb-3 group-hover:text-accent-light transition-colors font-bold">E-mail</span>
                <span className="font-sans text-xl md:text-2xl text-white/80 group-hover:text-white transition-colors">brunoafranca97@gmail.com</span>
                
                {copied && (
                  <span className="absolute -top-12 left-0 px-3 py-1.5 bg-accent text-[10px] text-white uppercase tracking-widest rounded-lg animate-fade-in shadow-2xl z-10">
                    Copiado para a área de transferência!
                  </span>
                )}
              </button>

              <div className="pt-10 border-t border-white/5">
                <p className="font-sans text-base text-white/30 leading-relaxed max-w-xs italic">
                  "Para projetos personalizados e licenciamento Fine Art, entre em contato."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row items-center justify-between gap-10 opacity-30 hover:opacity-100 transition-opacity duration-700">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
            <p className="font-sans text-xs uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Bruno França
            </p>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] font-medium hidden md:block">
              Alagoas, Brasil • Fine Art Photography
            </p>
          </div>
          <div className="flex items-center gap-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.6em] font-bold">
              obrunuaf.com.br
            </p>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="p-3.5 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 group shadow-lg"
              aria-label="Voltar ao topo"
            >
              <svg className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
