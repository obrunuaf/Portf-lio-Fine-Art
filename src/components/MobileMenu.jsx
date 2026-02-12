import InstagramIcon from './InstagramIcon'

export default function MobileMenu({ open, onClose }) {
  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div
        className={`mobile-menu ${open ? "open shadow-[0_0_50px_rgba(0,0,0,0.3)]" : ""} absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-canvas flex flex-col pt-32 pb-12 px-10 transition-transform duration-500 ease-out translate-x-full`}
        style={{ 
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          paddingTop: 'calc(8rem + var(--sat))', 
          paddingBottom: 'calc(3rem + var(--sab))', 
          paddingRight: 'calc(2.5rem + var(--sar))' 
        }}
      >
        {/* Close Button */}
        <button
          className="absolute p-4 text-ink/40 hover:text-ink transition-colors"
          style={{ top: 'calc(1.5rem + var(--sat))', right: 'calc(1.5rem + var(--sar))' }}
          onClick={onClose}
          aria-label="Fechar Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-8">
          {[
            { label: 'Home', href: '#hero' },
            { label: 'Galeria', href: '#galeria' },
            { label: 'Sobre', href: '#sobre' },
            { label: 'Contato', href: '#contato' }
          ].map((item, idx) => (
            <a 
              key={item.label}
              href={item.href} 
              onClick={onClose} 
              className="group flex items-baseline gap-4"
            >
              <span className="font-sans text-[10px] text-accent/40 font-bold group-hover:text-accent transition-colors">0{idx + 1}</span>
              <span className="font-serif text-4xl md:text-5xl text-ink font-semibold group-hover:text-accent transition-all duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Brand/Social Footer */}
        <div className="mt-auto space-y-10">
          <div className="pt-10 border-t border-ink/5">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-ink/30 font-bold mb-4">Social</p>
            <a
              href="https://instagram.com/obrunuaf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-ink shadow-sm bg-white border border-ink/5 px-6 py-4 rounded-full hover:bg-ink hover:text-white transition-all duration-300 group"
            >
              <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold font-sans uppercase tracking-widest">@obrunuaf</span>
            </a>
          </div>
          
          <div className="flex items-center gap-3 opacity-20">
            <img src="/logo-bf.png" alt="" className="w-6 h-6 grayscale" />
            <span className="font-sans text-[9px] uppercase tracking-widest font-bold text-ink">Bruno França © 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
