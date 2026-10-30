import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import StatusIndicator from './effects/StatusIndicator'

export default function DetailModal({ isOpen, onClose, item, type }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted || !item) return null;

  const isComplaint = type === 'complaint';

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" style={{ position: 'fixed' }}>
      <div className="bg-[#11151b] border border-white/10 rounded-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={isComplaint && item.type === 'Perempuan' ? 'badge-classified' : 'badge-redaksi'}>
            {isComplaint && item.type === 'Perempuan' ? 'Pemberdayaan Perempuan' : item.category}
          </span>
          {isComplaint ? (
            <StatusIndicator status={item.status} />
          ) : (
            <span className={item.classification === 'Terbuka' ? 'text-emerald-400 text-[10px] font-mono border border-emerald-400/30 px-2 py-0.5 rounded' : 'text-crimson text-[10px] font-mono border border-crimson/30 px-2 py-0.5 rounded'}>
              {item.classification}
            </span>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wide text-white mb-4 leading-tight">
          {item.headline || item.title}
        </h2>
        
        <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 border-b border-white/10 pb-4 mb-6">
          <div className="flex flex-col">
            <span className="uppercase tracking-widest text-[9px] text-zinc-600 mb-1">Tanggal</span>
            <span>{new Date(item.timestamp || item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {!isComplaint && item.author && (
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[9px] text-zinc-600 mb-1">Penulis</span>
              <span className="text-crimson">{item.author}</span>
            </div>
          )}
          {isComplaint && item.classification && (
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[9px] text-zinc-600 mb-1">Urgensi</span>
              <span className={item.classification === 'Kritis' ? 'text-crimson' : 'text-zinc-300'}>{item.classification}</span>
            </div>
          )}
        </div>
        
        <div className="prose prose-invert prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-crimson max-w-none">
          <p className="text-lg font-medium text-white mb-4 border-l-4 border-crimson pl-4">
            {item.excerpt}
          </p>
          
          <div className="whitespace-pre-wrap text-sm text-zinc-400">
            {item.content || item.excerpt}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
