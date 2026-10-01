import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, FileText, AlertTriangle, Briefcase, Plus, Settings, X } from 'lucide-react'
import GrainOverlay from './effects/GrainOverlay'
import { useStudies } from '../context/StudiesContext'

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('kajian')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { studies, addStudy } = useStudies()

  const tabs = [
    { id: 'kajian', label: 'Arsip Kajian', icon: FileText },
    { id: 'aduan', label: 'Aduan Masuk', icon: AlertTriangle },
    { id: 'proker', label: 'Program Kerja', icon: Briefcase },
  ]

  return (
    <div className="min-h-screen bg-void text-ivory font-editorial selection:bg-crimson/40 relative">
      <GrainOverlay />
      
      {/* Sidebar & Header for Admin */}
      <div className="flex h-screen overflow-hidden relative z-10">
        
        {/* Sidebar */}
        <aside className="w-64 bg-black/80 border-r border-white/10 backdrop-blur-md flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-xl font-display uppercase tracking-widest text-white mb-1">
              Kastrat DB
            </h1>
            <p className="text-[10px] font-mono text-crimson uppercase tracking-[0.2em]">
              Admin Clearance: Level 5
            </p>
          </div>
          
          <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-mono tracking-wider uppercase transition-colors ${
                    isActive 
                      ? 'bg-crimson/10 text-crimson border border-crimson/20' 
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded text-sm font-mono tracking-wider uppercase text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut size={16} />
              Tutup Akses
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#050505]">
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-sm">
            <h2 className="text-2xl font-display uppercase tracking-widest text-white">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <button 
              onClick={() => {
                if(activeTab === 'kajian') setIsAddModalOpen(true)
                else alert('Fitur tambah data untuk tab ini akan segera datang!')
              }}
              className="flex items-center gap-2 bg-crimson hover:bg-crimson-glow text-white px-4 py-2 rounded text-xs font-mono uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              <Plus size={14} />
              Data Baru
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="border border-white/10 bg-black/40 rounded-lg overflow-hidden">
              {/* Dummy Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-500 bg-white/5">
                    <th className="p-4 font-normal">ID</th>
                    <th className="p-4 font-normal">Judul / Subjek</th>
                    <th className="p-4 font-normal">Status</th>
                    <th className="p-4 font-normal text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-serif">
                  {activeTab === 'kajian' ? (
                    studies.map((item, i) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="p-4 font-mono text-xs text-zinc-500">#{item.id}</td>
                        <td className="p-4 text-zinc-300">
                          {item.title}
                          <div className="text-[10px] text-zinc-500 font-mono mt-1">{item.classification}</div>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Terpublikasi
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-zinc-500 hover:text-white transition-colors p-2">
                            <Settings size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    [1, 2, 3].map((item) => (
                      <tr key={item} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="p-4 font-mono text-xs text-zinc-500">#00{item}</td>
                        <td className="p-4 text-zinc-300">Data Mockup {item}</td>
                        <td className="p-4">
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                            Draft
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-zinc-500 hover:text-white transition-colors p-2">
                            <Settings size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <p className="mt-6 text-xs font-mono text-zinc-600 text-center">
              (Data Kajian sudah terhubung dengan LocalStorage. Data lain masih prototype.)
            </p>
          </div>
        </main>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddStudyModal 
            onClose={() => setIsAddModalOpen(false)}
            onSave={(data) => {
              addStudy(data)
              setIsAddModalOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function AddStudyModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: 'Tim Kastrat',
    tags: '',
    classification: 'Arsip Terbuka'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      id: 's' + Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      author: formData.author,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      classification: formData.classification,
      timestamp: new Date().toISOString()
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-[#0a0a0c] border border-white/10 rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <h3 className="text-xs font-mono tracking-widest uppercase text-white">
            Tambah Arsip Kajian
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Judul Kajian</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white rounded px-3 py-2 text-sm outline-none focus:border-crimson/50" />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Ringkasan (Excerpt)</label>
            <textarea required rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white rounded px-3 py-2 text-sm outline-none focus:border-crimson/50 resize-none custom-scrollbar" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Author</label>
              <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white rounded px-3 py-2 text-sm outline-none focus:border-crimson/50" />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Klasifikasi</label>
              <select value={formData.classification} onChange={e => setFormData({...formData, classification: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white rounded px-3 py-2 text-sm outline-none focus:border-crimson/50">
                <option value="Arsip Terbuka">Arsip Terbuka</option>
                <option value="Dokumen Rahasia">Dokumen Rahasia</option>
                <option value="Aksi Strategis">Aksi Strategis</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Tags (Pisahkan dengan koma)</label>
            <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="politik, kampus, kebijakan" className="w-full bg-black/50 border border-white/10 text-white rounded px-3 py-2 text-sm outline-none focus:border-crimson/50" />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
              Batal
            </button>
            <button type="submit" className="bg-crimson hover:bg-crimson-glow text-white px-6 py-2 rounded text-xs font-mono uppercase tracking-widest transition-all">
              Simpan Data
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
