import { useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Modal from './components/Modal'
import About from './components/About'
import Footer from './components/Footer'
import { artworks } from './data/artworks'

export default function App() {
  const [modalIndex, setModalIndex] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const openModal = useCallback((art) => {
    const idx = artworks.indexOf(art)
    if (idx !== -1) setModalIndex(idx)
  }, [])

  const closeModal = useCallback(() => setModalIndex(null), [])
  const prevArt = useCallback(() => setModalIndex(i => (i > 0 ? i - 1 : i)), [])
  const nextArt = useCallback(() => setModalIndex(i => (i < artworks.length - 1 ? i + 1 : i)), [])

  const modalArt = modalIndex !== null ? artworks[modalIndex] : null

  // U6: Scroll-to-top visibility + U7: smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <>
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <Hero />
      <Gallery onOpenModal={openModal} />
      <About />
      <Footer />
      {modalArt && (
        <Modal
          artwork={modalArt}
          onClose={closeModal}
          onPrev={modalIndex > 0 ? prevArt : null}
          onNext={modalIndex < artworks.length - 1 ? nextArt : null}
        />
      )}

      {/* U6: Scroll-to-top */}
      <button
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-ink/80 hover:bg-ink text-white flex items-center justify-center shadow-lg transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}

