import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="archive-card animate-pulse">
      <div className="h-4 w-24 bg-white/5 rounded-sm mb-4" />
      <div className="h-px w-full bg-white/5 mb-4" />
      <div className="h-5 w-3/4 bg-white/5 rounded-sm mb-3" />
      <div className="h-3 w-full bg-white/5 rounded-sm mb-2" />
      <div className="h-3 w-5/6 bg-white/5 rounded-sm mb-4" />
      <div className="flex gap-2 mt-auto">
        <div className="h-5 w-14 bg-white/5 rounded-sm" />
        <div className="h-5 w-14 bg-white/5 rounded-sm" />
      </div>
    </div>
  )
}
