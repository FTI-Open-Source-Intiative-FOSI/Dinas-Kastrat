import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, PlayCircle } from 'lucide-react'


const prokerList = [
  {
    id: 1,
    title: 'Sekolah Pergerakan',
    description: 'Pendidikan kaderisasi awal untuk menanamkan nilai-nilai kritis dan analitis kepada mahasiswa baru FTI.',
    status: 'Selesai',
    date: 'Maret 2026'
  },
  {
    id: 2,
    title: 'Kajian Isu Strategis',
    description: 'Diskusi publik rutin membedah isu-isu hangat seputar birokrasi kampus dan kebijakan nasional.',
    status: 'Berjalan',
    date: 'Setiap Bulan'
  },
  {
    id: 3,
    title: 'Mimbar Bebas',
    description: 'Fasilitas orasi dan panggung kebebasan berekspresi bagi seluruh elemen mahasiswa.',
    status: 'Segera',
    date: 'Oktober 2026'
  },
  {
    id: 4,
    title: 'Aksi & Advokasi',
    description: 'Turun ke jalan atau jalur birokrasi untuk mengawal tuntutan dan hak-hak mahasiswa.',
    status: 'Segera',
    date: 'Menyesuaikan'
  }
]

const getStatusIcon = (status) => {
  switch(status) {
    case 'Selesai': return <CheckCircle2 size={16} className="text-emerald-500" />
    case 'Berjalan': return <PlayCircle size={16} className="text-amber-500" />
    case 'Segera': return <Clock size={16} className="text-zinc-500" />
    default: return null
  }
}

export default function ProkerSection() {
  return (
    <section id="proker" className="snap-start min-h-screen relative z-30 overflow-hidden flex items-center">
      
      <div className="container pt-24 pb-8 sm:pt-28 sm:pb-10 relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/10 pb-8 gap-4">
          <div>
            <p className="text-[11px] font-mono text-crimson tracking-[0.3em] uppercase mb-3 font-bold">
              — Direktori
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-white"
            >
              Program Kerja
            </motion.h2>
            <p className="mt-3 text-base text-zinc-300 max-w-lg leading-relaxed">
              Daftar agenda dan operasi strategis departemen KASTRAT selama satu periode kepengurusan.
            </p>
          </div>
        </div>

        {/* Cards grid / horizontal scroll on mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 custom-scrollbar md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
          {prokerList.map((proker, i) => (
            <motion.div
              key={proker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative archive-card transition-colors p-6 sm:p-8 rounded-sm overflow-hidden w-[85vw] sm:w-[340px] flex-shrink-0 snap-center md:w-auto md:flex-shrink"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-crimson transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 group-hover:border-crimson transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700 group-hover:border-crimson transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-crimson transition-colors" />
              
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl sm:text-2xl font-display uppercase tracking-wide text-zinc-200 group-hover:text-white transition-colors">
                  {proker.title}
                </h3>
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                  {getStatusIcon(proker.status)}
                  <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-300">
                    {proker.status}
                  </span>
                </div>
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-serif italic">
                "{proker.description}"
              </p>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                    Jadwal
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-300 bg-black/50 px-2 py-1 rounded">
                  {proker.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
