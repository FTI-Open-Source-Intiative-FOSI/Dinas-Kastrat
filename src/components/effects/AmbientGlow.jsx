import React from 'react'

/**
 * Ambient radial glow for section depth.
 * @param {'crimson' | 'neutral'} variant
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'} position
 */
export default function AmbientGlow({ variant = 'crimson', position = 'top-right', className = '' }) {
  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
    'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
    'bottom-right': 'bottom-0 right-0 translate-x-1/3 translate-y-1/3',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }

  const sizes = {
    'top-left': 'w-[500px] h-[500px]',
    'top-right': 'w-[600px] h-[600px]',
    'bottom-left': 'w-[450px] h-[450px]',
    'bottom-right': 'w-[550px] h-[550px]',
    center: 'w-[700px] h-[700px]',
  }

  return (
    <div
      aria-hidden="true"
      className={`ambient-glow ambient-glow--${variant} ${positions[position]} ${sizes[position]} ${className}`}
    />
  )
}
