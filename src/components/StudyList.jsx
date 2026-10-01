import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useStudies } from '../context/StudiesContext'
import StudyCard from './StudyCard'
import SkeletonCard from './SkeletonCard'
import EmptyState from './EmptyState'
import AmbientGlow from './effects/AmbientGlow'
import StatusIndicator from './effects/StatusIndicator'
import { RotateCw } from 'lucide-react'
import DetailModal from './DetailModal'

export default function StudyList() {
  const { studies, loading, refresh } = useStudies()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleCardClick = (item) => {
    setSelectedItem(item)
    setIsDetailOpen(true)
  }

  return (
    <section id="kajian" className="snap-start min-h-screen relative z-30 overflow-hidden flex items-center">
      <div className="container pt-24 pb-8 sm:pt-28 sm:pb-10 relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/10 pb-8 gap-4">
          <div>
            <p className="text-[11px] font-mono text-crimson tracking-[0.3em] uppercase mb-3 font-bold">
              — Arsip Kajian
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-white"
            >
              Daftar Kajian
            </motion.h2>
            <p className="mt-3 text-base text-zinc-300 max-w-lg leading-relaxed">
              Dokumen investigatif dan analisis kritis isu kampus &amp; kebangsaan.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <StatusIndicator status="live" />
            <button
              onClick={refresh}
              className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white border border-white/10 hover:border-crimson/30 px-3 py-2 rounded-sm transition-all duration-200"
            >
              <RotateCw size={12} />
              Segarkan
            </button>
          </div>
        </div>

        {/* Cards grid / horizontal scroll on mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 custom-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && studies.length === 0 && <EmptyState />}
          {!loading &&
            studies.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full cursor-pointer w-[85vw] sm:w-[340px] flex-shrink-0 snap-center md:w-auto md:flex-shrink"
                onClick={() => handleCardClick(s)}
              >
                <StudyCard study={s} />
              </motion.div>
            ))}
        </div>
      </div>
      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} item={selectedItem} type="study" />
    </section>
  )
}
