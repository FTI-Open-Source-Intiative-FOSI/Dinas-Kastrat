import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Lock, X } from 'lucide-react'

export default function AdminLogin({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setPassword('')
      setError(false)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Hardcoded password for now
    if (password === 'kastrat1945') {
      onSuccess()
    } else {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.1)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Terminal size={14} />
                <span>RESTRICTED_ACCESS.exe</span>
              </div>
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-crimson/10 border border-crimson/30 flex items-center justify-center text-crimson mb-4 animate-pulse">
                  <Lock size={20} />
                </div>
                <h3 className="text-xl font-display uppercase tracking-widest text-white mb-1">
                  Security Clearance Required
                </h3>
                <p className="text-xs font-mono text-zinc-500">
                  Unauthorized access is strictly prohibited.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passphrase..."
                    className={`w-full bg-black/50 border ${error ? 'border-crimson text-crimson focus:border-crimson' : 'border-white/10 text-white focus:border-crimson/50'} rounded px-4 py-3 font-mono text-sm outline-none transition-colors`}
                  />
                  {error && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-crimson font-mono uppercase tracking-widest">
                      Access Denied
                    </span>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
