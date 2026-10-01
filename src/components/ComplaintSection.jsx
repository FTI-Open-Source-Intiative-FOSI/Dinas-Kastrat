import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { propagandaItems as mockPropaganda } from '../data/mockPropaganda'
import ComplaintCard from './ComplaintCard'
import AmbientGlow from './effects/AmbientGlow'
import StatusIndicator from './effects/StatusIndicator'
import ComplaintForm from './ComplaintForm'
import DetailModal from './DetailModal'

export default function ComplaintSection() {
  const [items, setItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  useEffect(() => {
    fetch('http://localhost:3000/api/complaints')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) setItems(data)
        else setItems(mockPropaganda)
      })
      .catch(() => setItems(mockPropaganda))
  }, [])

  const handleCardClick = (item) => {
    setSelectedItem(item)
    setIsDetailOpen(true)
  }

  return (
    <section id="aduan" className="snap-start min-h-screen relative z-30 overflow-hidden flex items-center">
      <div className="container pt-24 pb-8 sm:pt-28 sm:pb-10 relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/10 pb-8 gap-4">
          <div>
            <p className="text-[11px] font-mono text-crimson tracking-[0.3em] uppercase mb-3 font-bold">
              — Aduan Mahasiswa
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-white"
            >
              Aduan Mahasiswa
            </motion.h2>
            <p className="mt-3 text-base text-zinc-300 max-w-lg leading-relaxed mb-4">
              Ruang untuk menyalurkan keluhan, persoalan kampus, dan kebutuhan mahasiswa secara terbuka dan terdokumentasi.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-crimson/50 text-crimson text-xs font-mono uppercase tracking-widest hover:bg-crimson/10 transition-colors"
            >
              + Ajukan Aduan
            </button>
          </div>

          <StatusIndicator status="live" />
        </div>

        {/* Cards grid / horizontal scroll on mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 custom-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full cursor-pointer w-[85vw] sm:w-[340px] flex-shrink-0 snap-center md:w-auto md:flex-shrink"
              onClick={() => handleCardClick(item)}
            >
              <ComplaintCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
      <ComplaintForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} item={selectedItem} type="complaint" />
    </section>
  )
}
