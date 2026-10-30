import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GrainOverlay from './effects/GrainOverlay'

const TERMINAL_LINES = [
  "> INITIALIZING K-SYSTEM V2.4...",
  "> ESTABLISHING SECURE CONNECTION...",
  "> BYPASSING FIREWALL...",
  "> DECRYPTING KASTRAT ARCHIVES...",
  "> LOADING ASSETS..."
]

export default function Preloader({ onComplete }) {
  const [lines, setLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [accessGranted, setAccessGranted] = useState(false)

  useEffect(() => {
    // Add lines one by one
    let currentLine = 0
    const lineInterval = setInterval(() => {
      if (currentLine < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[currentLine]])
        currentLine++
      } else {
        clearInterval(lineInterval)
      }
    }, 400) // 400ms per line

    // Progress bar simulation
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      const step = Math.floor(Math.random() * 15) + 5
      currentProgress = Math.min(100, currentProgress + step)
      setProgress(currentProgress)
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          setAccessGranted(true)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 800)
        }, 300)
      }
    }, 250) // update progress every 250ms

    return () => {
      clearInterval(lineInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      <GrainOverlay />
      
      <div className="w-full max-w-2xl relative z-10 flex flex-col h-full justify-center">
        {/* Terminal Window */}
        <div className="flex-1 max-h-[60vh] flex flex-col justify-end space-y-2 mb-12 text-sm md:text-base font-mono text-crimson/80 uppercase tracking-widest text-shadow-glow">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span>{line}</span>
            </motion.div>
          ))}
          {progress < 100 && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-5 bg-crimson inline-block mt-2"
            />
          )}
        </div>

        {/* Progress Bar Area */}
        <div className="w-full relative">
          <div className="flex justify-between text-xs font-mono text-zinc-500 mb-3 tracking-widest">
            <span>SYS_BOOT</span>
            <span>{progress}%</span>
          </div>
          
          <div className="w-full h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-crimson shadow-[0_0_15px_rgba(220,38,38,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.3 }}
            />
          </div>
        </div>

        {/* Access Granted Overlay */}
        {accessGranted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-[#050505]/80 backdrop-blur-sm p-8 border border-emerald-500/30 rounded-lg text-center animate-pulse">
              <h2 className="text-3xl md:text-5xl font-display text-emerald-400 tracking-[0.2em] uppercase text-shadow-glow">
                Access Granted
              </h2>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
