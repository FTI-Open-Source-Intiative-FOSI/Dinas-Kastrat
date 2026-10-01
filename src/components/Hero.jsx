import React from 'react'
import { motion, useTransform } from 'framer-motion'

const Hero = React.forwardRef(function Hero(
  { rotateX, translateY, scale, opacity, scrollProgress },
  ref
) {
  const paper1Y = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -30]) : 0
  const paper1Rotate = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -2]) : 0
  const paper1Opacity = scrollProgress ? useTransform(scrollProgress, [0, 0.6, 1], [0.6, 0.3, 0]) : 0.6

  const paper2Y = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -60]) : 0
  const paper2Rotate = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -4]) : 0
  const paper2Opacity = scrollProgress ? useTransform(scrollProgress, [0, 0.5, 1], [0.45, 0.2, 0]) : 0.45

  const paper3Y = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -90]) : 0
  const paper3Rotate = scrollProgress ? useTransform(scrollProgress, [0, 1], [0, -6]) : 0
  const paper3Opacity = scrollProgress ? useTransform(scrollProgress, [0, 0.4, 1], [0.3, 0.1, 0]) : 0.3

  const garudaScale = scrollProgress ? useTransform(scrollProgress, [0, 1], [1, 0.85]) : 1
  const garudaOpacity = scrollProgress ? useTransform(scrollProgress, [0, 0.8, 1], [1, 0.6, 0.45]) : 1

  return (
    <motion.section
      ref={ref}
      style={{ rotateX, y: translateY, scale, opacity, perspective: 1200 }}
      className="
        w-full h-screen
        bg-void
        snap-start z-40
        crt paper-backdrop
        flex flex-col items-center justify-center
        overflow-hidden
        relative
      "
    >
      {/* Paper stack layers — peel away on scroll */}
      <motion.div className="paper-layer paper-layer--1" style={{ y: paper1Y, rotateX: paper1Rotate, opacity: paper1Opacity }} aria-hidden="true" />
      <motion.div className="paper-layer paper-layer--2" style={{ y: paper2Y, rotateX: paper2Rotate, opacity: paper2Opacity }} aria-hidden="true" />
      <motion.div className="paper-layer paper-layer--3" style={{ y: paper3Y, rotateX: paper3Rotate, opacity: paper3Opacity }} aria-hidden="true" />

      {/* Garuda — background layer */}
      <motion.div
        className="garuda-bg"
        style={{ scale: garudaScale, opacity: garudaOpacity }}
        aria-hidden="true"
      >
        <img src="/garuda.gif" alt="" draggable={false} />
      </motion.div>

      {/* Gradient overlay for readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-5" 
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Distortion & texture overlays */}
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />
      <div className="tv-glitch tv-glitch--red" aria-hidden="true" />
      <div className="tv-glitch tv-glitch--cyan" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center w-full max-w-3xl mx-auto">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-[10px] font-mono uppercase tracking-[0.25em] text-crimson-glow select-none"
        >
          Badan Eksekutif Mahasiswa · FTI UNAND
        </motion.p>

        {/* Title — display typography with glitch slice */}
        <div>
          
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-wider text-white leading-none slice">
              Kastrat
            </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="mt-3 text-xs sm:text-sm font-mono text-zinc-300 tracking-[0.35em] uppercase"
          >
            Kajian &amp; Aksi Strategis
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-crimson/60 to-transparent origin-center"
        />

        {/* Description — editorial serif */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-zinc-200 text-base sm:text-lg max-w-md leading-relaxed italic"
        >
          Wadah kajian kritis dan aksi strategis mahasiswa dalam menyuarakan isu-isu kebangsaan.
        </motion.p>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 select-none">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-400">Gulir untuk arsip</span>
          <div className="w-px h-8 bg-gradient-to-b from-crimson/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner-mark top-8 left-8" aria-hidden="true" />
      <div className="corner-mark top-8 right-8 rotate-90" aria-hidden="true" />
      <div className="corner-mark bottom-8 left-8 -rotate-90" aria-hidden="true" />
      <div className="corner-mark bottom-8 right-8 rotate-180" aria-hidden="true" />
    </motion.section>
  )
})

export default Hero
