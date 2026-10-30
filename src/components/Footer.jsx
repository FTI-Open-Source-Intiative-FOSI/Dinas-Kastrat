import React, { useState, useRef } from 'react'
import { Mail, MessageCircle, Linkedin, Twitter } from 'lucide-react'

export default function Footer({ onSecretTrigger }) {
  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  const handleSecretClick = () => {
    clickCount.current += 1
    
    if (clickCount.current >= 3) { // Changed to 3 clicks to make it easier
      if (onSecretTrigger) onSecretTrigger()
      clickCount.current = 0
    }

    // Reset count if they stop clicking
    clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 2000)
  }

  return (
    <footer className="bg-void border-t border-white/10 snap-end">
      <div className="container py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/5">
          {/* About section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <button 
                onClick={handleSecretClick}
                className="w-8 h-8 rounded-sm border border-crimson/30 flex items-center justify-center text-white text-xs font-display tracking-wider bg-crimson/10 outline-none select-none cursor-default"
                title="Kastrat BEM FTI"
              >
                KB
              </button>
              <div>
                <h3 className="text-sm font-bold text-white">Kastrat BEM FTI</h3>
                <p className="text-[10px] font-mono text-zinc-500">Kajian & Aksi Strategis</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Wadah kajian kritis dan aksi strategis mahasiswa FTI Unand dalam menyuarakan isu-isu kebangsaan dan kebijakan kampus.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-white tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#kajian" className="text-zinc-400 hover:text-white transition-colors">Arsip Kajian</a>
              </li>
              <li>
                <a href="#aduan" className="text-zinc-400 hover:text-white transition-colors">Aduan Mahasiswa</a>
              </li>
              <li>
                <a href="#tentang" className="text-zinc-400 hover:text-white transition-colors">Tentang Kami</a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Program Kerja</a>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="text-xs font-mono text-white tracking-[0.2em] uppercase mb-4 border-b border-white/10 pb-2">
              Hubungi Kami
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-crimson" />
                <a href="mailto:kastrat@bem-fti.unand.ac.id" className="text-xs text-zinc-400 hover:text-white transition-colors truncate">
                  kastrat@bem-fti.unand.ac.id
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-crimson" />
                <a href="https://wa.me/62812345678" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-white transition-colors">
                  +62 812-345-678
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
            © {new Date().getFullYear()} Kastrat — Dinas Kastrat BEM KM FTI UNAND
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-zinc-600 hover:text-crimson transition-colors" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-zinc-600 hover:text-crimson transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="#" className="text-zinc-600 hover:text-crimson transition-colors" aria-label="Instagram">
              <MessageCircle size={16} />
            </a>
          </div>
          <p className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase">
            Advokasi · Kajian · Aksi Strategis
          </p>
        </div>
      </div>
    </footer>
  )
}
