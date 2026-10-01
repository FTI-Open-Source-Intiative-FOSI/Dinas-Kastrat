import React from 'react'
import { FileText } from 'lucide-react'

export default function EmptyState({ message = 'Belum ada kajian.' }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded border border-white/10 flex items-center justify-center mb-5">
        <FileText size={24} className="text-zinc-700" />
      </div>
      <p className="text-zinc-400 font-mono text-sm mb-1">{message}</p>
      <p className="text-zinc-700 font-mono text-xs">Coba segarkan atau tambahkan kajian baru.</p>
    </div>
  )
}
