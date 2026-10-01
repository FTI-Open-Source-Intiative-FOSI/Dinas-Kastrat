import React, { useRef, useCallback } from 'react'

/**
 * Wrapper that applies a subtle cursor-follow radial gradient
 * on archive/propaganda cards via CSS custom properties.
 */
export default function CursorFollowCard({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null)

  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--cursor-x', `${x}%`)
    el.style.setProperty('--cursor-y', `${y}%`)
    el.style.setProperty(
      '--cursor-gradient',
      `radial-gradient(circle at ${x}% ${y}%, rgba(220, 38, 38, 0.08) 0%, transparent 55%)`
    )
  }, [])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--cursor-gradient', 'none')
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
