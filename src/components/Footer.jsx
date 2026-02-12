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
    <footer id="contato" className="bg-ink text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 safe-bottom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo-bf.png" alt="Bruno França" className="w-10 h-10 rounded-md object-contain" style={{background: 'rgba(255,255,255,0.1)', padding: '2px'}} />
              <h3 className="font-serif text-2xl font-semibold">
                Bruno <span className="font-light italic text-accent-light">França</span>
              </h3>
            </div>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              Fotografia aérea fine art
              <br />
              do litoral brasileiro.
            </p>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/obrunuaf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-5 h-5 flex-shrink-0" />
                <span className="font-sans text-sm">@obrunuaf</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group relative w-fit"
                title="Clique para copiar o e-mail"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="font-sans text-sm">brunoafranca97@gmail.com</span>
                
                {copied && (
                  <span className="absolute left-full ml-4 px-2 py-1 bg-accent text-[10px] text-white uppercase tracking-widest rounded animate-fade-in whitespace-nowrap">
                    Copiado!
                  </span>
                )}
              </button>
              <a
                href="https://wa.me/5534993183916"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-sans text-sm">WhatsApp</span>
              </a>
            </div>
          </div>
          {/* Info */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
              Informações
            </h4>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              Todas as imagens são protegidas por direitos autorais. Para
              licenciamento, impressões ou colaborações, entre em contato.
            </p>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 safe-bottom">
          <p className="font-sans text-white/30 text-xs">
            © {new Date().getFullYear()} Bruno França. Todos os direitos reservados.
          </p>
          <p className="font-sans text-white/30 text-xs">
            obrunuaf.com.br
          </p>
        </div>
      </div>
    </footer>
  )
}
