import InstagramIcon from './InstagramIcon'

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`mobile-menu ${open ? "open" : ""} absolute right-0 top-0 bottom-0 w-72 bg-canvas shadow-2xl flex flex-col px-8`}
        style={{ paddingTop: 'calc(20px + var(--sat))', paddingBottom: 'var(--sab)', paddingRight: 'var(--sar)' }}
      >
        <button
          className="absolute text-ink p-2"
          style={{ top: 'calc(20px + var(--sat))', right: 'calc(20px + var(--sar))' }}
          onClick={onClose}
          aria-label="Fechar Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <a href="#hero" onClick={onClose} className="font-serif text-2xl text-ink mb-6 hover:text-accent transition-colors">
          Home
        </a>
        <a href="#galeria" onClick={onClose} className="font-serif text-2xl text-ink mb-6 hover:text-accent transition-colors">
          Galeria
        </a>
        <a href="#sobre" onClick={onClose} className="font-serif text-2xl text-ink mb-6 hover:text-accent transition-colors">
          Sobre
        </a>
        <a href="#contato" onClick={onClose} className="font-serif text-2xl text-ink mb-6 hover:text-accent transition-colors">
          Contato
        </a>
        <div className="mt-auto mb-8">
          <a
            href="https://instagram.com/obrunuaf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted hover:text-ink transition-colors"
          >
            <InstagramIcon />
            <span className="text-sm font-sans">@obrunuaf</span>
          </a>
        </div>
      </div>
    </div>
  )
}
