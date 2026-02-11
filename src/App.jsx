import { useState, useCallback } from 'react'
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

  const openModal = useCallback((art) => {
    const idx = artworks.indexOf(art)
    if (idx !== -1) setModalIndex(idx)
  }, [])

  const closeModal = useCallback(() => setModalIndex(null), [])
  const prevArt = useCallback(() => setModalIndex(i => (i > 0 ? i - 1 : i)), [])
  const nextArt = useCallback(() => setModalIndex(i => (i < artworks.length - 1 ? i + 1 : i)), [])

  const modalArt = modalIndex !== null ? artworks[modalIndex] : null

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
    </>
  )
}
