import { useState, type CSSProperties } from 'react'

// Fixed particle positions avoid randomness and frame-by-frame React updates.
const flakes = Array.from({ length: 48 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  '--size': `${2 + (index % 5)}px`,
  '--duration': `${12 + (index % 13)}s`,
  '--delay': `${-((index * 7) % 27)}s`,
  '--drift': `${((index * 19) % 160) - 80}px`,
  '--opacity': `${0.2 + (index % 5) * 0.12}`,
}) as CSSProperties)

export function WinterAtmosphere() {
  const [paused, setPaused] = useState(false)

  return (
    <>
      <div className={`snowfall ${paused ? 'is-paused' : ''}`} aria-hidden="true">
        {flakes.map((style, index) => <span className="snowflake" key={index} style={style} />)}
      </div>
      <button className="snow-control" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <span aria-hidden="true">❄</span> {paused ? 'Pornește ninsoarea' : 'Oprește ninsoarea'}
      </button>
    </>
  )
}
