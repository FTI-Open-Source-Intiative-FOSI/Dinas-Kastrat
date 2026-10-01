import React from 'react'

/** Fixed full-viewport film grain overlay — mount once in App root */
export default function GrainOverlay() {
  return <div className="global-grain" aria-hidden="true" />
}
