import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import CursorFollowCard from './ui/CursorFollowCard'

const tagColors = {
  politik: 'text-red-400 border-red-400/30',
  kampus: 'text-amber-400 border-amber-400/30',
  partisipasi: 'text-sky-400 border-sky-400/30',
  lingkungan: 'text-emerald-400 border-emerald-400/30',
  aksi: 'text-orange-400 border-orange-400/30',
  kebijakan: 'text-violet-400 border-violet-400/30',
  pendidikan: 'text-cyan-400 border-cyan-400/30',
}

function formatAuditTimestamp(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function StudyCard({ study }) {
  return (
    <CursorFollowCard as="article" className="archive-card group h-full">
      {/* Redaksi header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span className="badge-redaksi">Arsip Rahasia</span>
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.15em]">
          {study.classification ?? 'Terbuka'}
        </span>
      </div>

      {/* Accent line */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-crimson/50 via-white/10 to-transparent mb-4" />

      <h3 className="relative z-10 text-lg font-bold text-white leading-snug mb-3 group-hover:text-crimson-glow transition-colors duration-300">
        {study.title}
      </h3>

      <p className="relative z-10 text-zinc-300 text-sm leading-relaxed mb-4 flex-1">
        {study.excerpt}
      </p>

      <div className="relative z-10 flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-1">
          {study.tags.map((t) => (
            <span
              key={t}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border bg-transparent tracking-wide ${tagColors[t] ?? 'text-zinc-400 border-zinc-700'}`}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href="#"
          className="flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors duration-200 shrink-0 ml-2"
        >
          Baca <ArrowUpRight size={11} />
        </a>
      </div>

      <div className="relative z-10 mt-4 pt-3 border-t border-white/8 flex items-center justify-between text-xs">
        <span className="font-mono text-zinc-400 tracking-widest uppercase">
          {study.author}
        </span>
        <span className="font-mono text-zinc-500 tracking-[0.15em]">
          Audit: {formatAuditTimestamp(study.timestamp)}
        </span>
      </div>
    </CursorFollowCard>
  )
}
