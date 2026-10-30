import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ComplaintForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    type: 'Umum',
    headline: '',
    excerpt: '',
    category: 'Fasilitas',
    classification: 'Biasa'
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('http://localhost:3000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          // Reload page or trigger refetch to show new complaint
          window.location.reload(); 
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
    
    setSubmitting(false);
  }

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" style={{ position: 'fixed' }}>
      <div className="bg-[#11151b] border border-white/10 rounded-lg w-full max-w-lg p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-display uppercase tracking-wide text-white mb-4">
          Ajukan Aduan
        </h2>
        
        {success ? (
          <div className="text-emerald-400 font-mono text-sm">
            Aduan berhasil dikirim. Menunggu diproses...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Jenis Aduan</label>
              <select 
                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-crimson outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="Umum">Aduan Umum</option>
                <option value="Perempuan">Aduan Pemberdayaan Perempuan (Pelecehan, dsb)</option>
              </select>
              {formData.type === 'Perempuan' && (
                <p className="mt-1 text-[10px] font-mono text-crimson-glow">
                  *Aduan ini akan ditangani secara khusus dan dirahasiakan penuh.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Judul Aduan</label>
              <input 
                required
                type="text" 
                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-crimson outline-none"
                value={formData.headline}
                onChange={e => setFormData({...formData, headline: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Kategori</label>
              <select 
                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-crimson outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Fasilitas">Fasilitas</option>
                <option value="Akademik">Akademik</option>
                <option value="Kemahasiswaan">Kemahasiswaan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Tingkat Urgensi</label>
              <select 
                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-crimson outline-none"
                value={formData.classification}
                onChange={e => setFormData({...formData, classification: e.target.value})}
              >
                <option value="Biasa">Biasa</option>
                <option value="Penting">Penting</option>
                <option value="Kritis">Kritis</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Detail Aduan</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-crimson outline-none"
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-crimson hover:bg-red-700 text-white font-mono text-sm py-2 rounded transition-colors"
            >
              {submitting ? 'Mengirim...' : 'Kirim Aduan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
