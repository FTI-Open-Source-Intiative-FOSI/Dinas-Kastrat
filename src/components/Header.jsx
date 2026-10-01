import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, useTransform } from 'framer-motion'

const navLinks = [
  { label: 'Kajian', href: '#kajian' },
  { label: 'Aduan Mahasiswa', href: '#aduan' },
  { label: 'Program Kerja', href: '#proker' },
  { label: 'Tentang', href: '#tentang' },
]

export default function Header({ visibleMotion, show = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  let style = {}
  let className =
    'fixed top-0 left-0 right-0 z-50 header-glass transition-opacity duration-300'

  if (visibleMotion) {
    const y = useTransform(visibleMotion, [0, 1], [-100, 0])
    style = { opacity: visibleMotion, y }
    className += show ? ' pointer-events-auto' : ' pointer-events-none'
  } else {
    style = { opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(-100%)' }
    className += show ? ' pointer-events-auto' : ' pointer-events-none'
  }

  return (
    <motion.header style={style} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={className}>
      <div className="container flex items-center justify-between py-3.5">
        <a href="#" className="flex items-center gap-3 group">
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Kastrat — BEM FTI</h1>
            <p className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
              Kajian &amp; Aksi Strategis
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono text-zinc-300 tracking-widest uppercase">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-crimson/60 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-sm border border-white/10 hover:border-crimson/40 transition text-zinc-500 hover:text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-white/5 bg-void/95 backdrop-blur-lg">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileOpen(false);
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-2xl font-display uppercase tracking-widest text-zinc-400 hover:text-white transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </motion.header>
  )
}
