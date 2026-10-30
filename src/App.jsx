import React, { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Instagram, Linkedin, Twitter } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import StudyList from './components/StudyList'
import ComplaintSection from './components/ComplaintSection'
import ProkerSection from './components/ProkerSection'
import Footer from './components/Footer'
import GrainOverlay from './components/effects/GrainOverlay'
import AmbientGlow from './components/effects/AmbientGlow'
import SoundCloudPlayer from './components/SoundCloudPlayer'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import Preloader from './components/Preloader'
import { StudiesProvider } from './context/StudiesContext'

export default function App() {
  const mainRef = useRef(null)
  const heroRef = useRef(null)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 14])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0.2])

  const [showHeaderBool, setShowHeaderBool] = useState(false)

  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => setShowHeaderBool(v > 0.08))
    return () => unsub()
  }, [scrollYProgress])

  return (
    <StudiesProvider>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {isAdminMode ? (
        <AdminDashboard onLogout={() => setIsAdminMode(false)} />
      ) : (
      <div className={`bg-void text-ivory min-h-screen ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <GrainOverlay />
        <Header show={showHeaderBool} />

        <main ref={mainRef} className="scroll-smooth">
          <Hero
            ref={heroRef}
            rotateX={rotateX}
            translateY={translateY}
            scale={scale}
            opacity={opacity}
            scrollProgress={scrollYProgress}
          />

          <div className="unified-background relative bg-void">
            <div className="section-grid" aria-hidden="true" />
            <div className="watermark-sticky" aria-hidden="true">
              <AmbientGlow variant="crimson" position="top-left" />
              <AmbientGlow variant="neutral" position="bottom-right" />
            </div>
            
            <StudyList />
            <ComplaintSection />
            <ProkerSection />

            <section id="tentang" className="snap-start min-h-screen relative z-30 overflow-hidden flex items-center">
              <div className="container pt-24 pb-8 sm:pt-28 sm:pb-10 relative z-10 w-full">
                <div className="max-w-4xl mb-12">
                  <p className="text-[11px] font-mono text-crimson tracking-[0.3em] uppercase mb-3 font-bold">
                    — Tentang
                  </p>
                  <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-white">
                    Kastrat BEM FTI
                  </h2>
                  <p className="mt-4 text-base text-zinc-300 leading-relaxed max-w-2xl">
                    Kastrat adalah wadah resmi BEM FTI yang menjadi ruang berbagi kajian, penguatan literasi kebangsaan,
                    serta kanal aspirasi mahasiswa untuk menyampaikan permasalahan kampus dan kebutuhan strategis secara
                    terstruktur, cepat, dan terdokumentasi.
                  </p>
                </div>

              {/* Profile cards grid / horizontal scroll on mobile */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 custom-scrollbar md:grid md:grid-cols-2 xl:grid-cols-4 md:overflow-visible md:pb-0">
                {[
                  { name: 'Bayu Mutawakkil', role: 'Ketua Dinas', username: 'bayum', image: 'https://i.pravatar.cc/150?u=bayu', ig: '#', in: '#' },
                  { name: 'Rajel Novita', role: 'Sekretaris Dinas', username: 'rajel', image: 'https://i.pravatar.cc/150?u=rajel', ig: '#', in: '#' },
                  { name: 'Budi Santoso', role: 'Bendahara', username: 'budis', image: 'https://i.pravatar.cc/150?u=budi', ig: '#', in: '#' },
                  { name: 'Siti Aminah', role: 'Staff Kastrat', username: 'sitiam', image: 'https://i.pravatar.cc/150?u=siti', ig: '#', in: '#' },
                  { name: 'Ahmad Fauzi', role: 'Staff Kastrat', username: 'ahmadf', image: 'https://i.pravatar.cc/150?u=ahmad', ig: '#', in: '#' },
                  { name: 'Rina Wati', role: 'Staff Kastrat', username: 'rinaw', image: 'https://i.pravatar.cc/150?u=rina', ig: '#', in: '#' },
                  { name: 'Eko Prasetyo', role: 'Staff Kastrat', username: 'ekop', image: 'https://i.pravatar.cc/150?u=eko', ig: '#', in: '#' },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="group rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm hover:border-crimson/50 hover:bg-crimson/5 transition-all duration-300 relative overflow-hidden flex flex-col w-[75vw] sm:w-[280px] flex-shrink-0 snap-center md:w-auto md:flex-shrink"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div className="relative z-10 flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-full border-2 border-crimson/30 overflow-hidden bg-crimson/10 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                        {person.image ? (
                          <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                          <span className="text-sm font-bold text-white uppercase">
                            {person.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <a href={person.in} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-sky-500 transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full" title="LinkedIn">
                          <Linkedin size={14} />
                        </a>
                        <a href={person.ig} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-500 transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full" title="Instagram">
                          <Instagram size={14} />
                        </a>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-[10px] font-mono text-crimson tracking-[0.25em] uppercase mb-1">
                        {person.role}
                      </p>
                      <h3 className="text-lg font-semibold text-white mb-1">{person.name}</h3>
                      <p className="text-xs font-mono text-zinc-400">{person.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
          
          {!isLoading && <SoundCloudPlayer />}
          <Footer onSecretTrigger={() => setIsLoginModalOpen(true)} />
          </div>
        </main>
        
        <AdminLogin 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => {
            setIsLoginModalOpen(false)
            setIsAdminMode(true)
          }}
        />
      </div>
      )}
    </StudiesProvider>
  )
}
