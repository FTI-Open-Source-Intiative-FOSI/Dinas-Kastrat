import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Music, X, Minus, Play, Pause, Radio } from 'lucide-react'
import ReactPlayer from 'react-player'

export default function SoundCloudPlayer() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const playerRef = useRef(null)

  // Gunakan track public sementara untuk testing
  const playlistUrl = "https://soundcloud.com/miami-nights-1984/accelerated"

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#11151b] border border-white/10 hover:border-crimson/50 text-zinc-400 hover:text-crimson transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      >
        <Music size={20} className="group-hover:scale-110 transition-transform" />
        <span className="absolute left-14 bg-black/80 px-2 py-1 text-[10px] font-mono text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Buka Pemutar Musik
        </span>
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 left-6 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden flex flex-col transition-all duration-500 ease-out ${isMinimized ? 'w-48 h-12' : 'w-[320px] sm:w-[340px]'}`}
    >
      {/* Background Gradient */}
      {!isMinimized && (
        <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 to-transparent pointer-events-none" />
      )}

      {/* Header Bar */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5 ${isMinimized ? 'h-full' : ''}`}>
        <div className="flex items-center gap-2 text-crimson">
          <Radio size={14} className={isPlaying ? "animate-pulse" : ""} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
            {isMinimized && isPlaying ? "Now Playing..." : "Kastrat Radio"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Minus size={14} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-crimson transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Custom Player UI (Visible when not minimized) */}
      {!isMinimized && (
        <div className="p-5 flex items-center gap-4 relative z-10">
          {/* Animated Disc/Cover */}
          <div className="relative w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.15)] flex-shrink-0 bg-black flex items-center justify-center">
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=200&h=200&fit=crop')] bg-cover bg-center opacity-50"
            />
            <div className="w-4 h-4 bg-[#0a0a0a] rounded-full border border-white/20 z-10" />
          </div>

          {/* Controls & Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate mb-1">
              Kastrat Official Playlist
            </h3>
            <div className="flex items-center gap-2 mb-3">
              {/* Visualizer Bars */}
              <div className="flex items-end gap-[2px] h-3">
                {[1, 2, 3, 4].map((bar) => (
                  <motion.div
                    key={bar}
                    animate={isPlaying ? {
                      height: ["20%", "100%", "40%", "80%", "20%"]
                    } : { height: "20%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1 + (bar * 0.2),
                      ease: "easeInOut"
                    }}
                    className="w-1 bg-crimson rounded-t-sm"
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                {isReady ? (isPlaying ? 'Playing' : 'Paused') : 'Loading...'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                disabled={!isReady}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isPlaying 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-crimson text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-1" />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden ReactPlayer for audio control */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={playlistUrl}
          playing={isPlaying}
          onReady={() => setIsReady(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          width="0"
          height="0"
          config={{
            soundcloud: {
              options: {
                auto_play: false
              }
            }
          }}
        />
      </div>
    </motion.div>
  )
}
