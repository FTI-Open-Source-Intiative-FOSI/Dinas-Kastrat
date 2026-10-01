import React from 'react'

const config = {
  live: {
    dotClass: 'status-dot--live',
    label: 'Live Feed',
    labelClass: 'text-emerald-400/80',
  },
  error: {
    dotClass: 'status-dot--error',
    label: 'Sistem Error',
    labelClass: 'text-crimson-glow/80',
  },
  classified: {
    dotClass: 'status-dot--classified',
    label: 'Classified',
    labelClass: 'text-amber-400/80',
  },
}

/** Pulsing status indicator — CSS-only ping animation */
export default function StatusIndicator({ status = 'live', className = '' }) {
  const { dotClass, label, labelClass } = config[status] ?? config.live

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} role="status">
      <span className={`status-dot ${dotClass}`} aria-hidden="true" />
      <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${labelClass}`}>
        {label}
      </span>
    </div>
  )
}
