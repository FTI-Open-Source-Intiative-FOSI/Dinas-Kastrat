import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import CursorFollowCard from './ui/CursorFollowCard'
import StatusIndicator from './effects/StatusIndicator'

function formatAuditTimestamp(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ComplaintCard({ item }) {
  // Format ID to look like a ticket #TKT-001
  const ticketId = `#TKT-${item.id.toString().padStart(3, '0')}`;
  
  return (
    <CursorFollowCard as="article" className="archive-card group h-full flex flex-col bg-[#161a22] border border-white/5 shadow-xl hover:border-white/10 transition-colors p-5 rounded-lg relative overflow-hidden">
      {/* Top subtle glow for ticket effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Header row: Ticket ID + category + status */}
      <div className="relative z-10 flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-500 font-bold">{ticketId}</span>
          <span className={item.type === 'Perempuan' ? 'badge-classified' : 'badge-redaksi'}>
            {item.type === 'Perempuan' ? 'Pemberdayaan Perempuan' : item.category}
          </span>
        </div>
        <StatusIndicator status={item.status} />
      </div>

      {/* Headline */}
      <h3 className="relative z-10 font-display text-xl sm:text-2xl uppercase tracking-wide text-white leading-tight mb-2 group-hover:text-crimson-glow transition-colors duration-300">
        {item.headline}
      </h3>

      {/* Excerpt */}
      <p className="relative z-10 text-zinc-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
        {item.excerpt}
      </p>

      {/* Footer meta */}
      <div className="relative z-10 flex items-center justify-between mt-auto pt-3 border-t border-white/5 bg-black/20 -mx-5 px-5 -mb-5 pb-5">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Dikirim Pada</span>
            <span className="text-[10px] font-mono text-zinc-300">
              {formatAuditTimestamp(item.timestamp)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Urgensi</span>
            <span className={item.classification === 'Kritis' ? 'text-crimson text-[10px] font-bold font-mono' : 'text-[10px] text-zinc-300 font-mono'}>
              {item.classification}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 bg-crimson/10 px-2 py-1 rounded">
          Lihat <ArrowUpRight size={12} />
        </div>
      </div>
    </CursorFollowCard>
  )
}
