import { useState } from 'react'
import { media } from '../data/media'
const thumbs = media.photos.map(p => p.thumb)
const rand = () => thumbs[Math.floor(Math.random() * thumbs.length)]
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
/** Photos endlessly drift and flip behind the whole site; each one swaps to a new photo every time it loops. */
export default function BackgroundPhotos() {
  const [cards] = useState(() => { const n = innerWidth < 700 ? 7 : 12; return Array.from({ length: n }, (_, i) => ({ left: (i / n) * 100 + Math.random() * 6, w: 110 + Math.random() * 90, dur: 36 + Math.random() * 34, delay: -Math.random() * 70, dx: (Math.random() - 0.5) * 180, r: (Math.random() - 0.5) * 40, f: Math.random() > 0.5 ? 360 : -360 })) })
  const [src, setSrc] = useState(() => cards.map(rand))
  if (!thumbs.length || reduced) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {cards.map((c, i) => (
        <div key={i} className="bgcard" onAnimationIteration={e => { if (e.target === e.currentTarget) setSrc(s => s.map((x, j) => (j === i ? rand() : x))) }}
          style={{ left: `${c.left}%`, width: c.w, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, ['--dx' as string]: `${c.dx}px`, ['--r' as string]: `${c.r}deg`, ['--f' as string]: `${c.f}deg` }}>
          <img key={src[i]} src={`${import.meta.env.BASE_URL}images/${src[i]}`} alt="" />
        </div>
      ))}
      <div className="absolute inset-0 bg-wine/40" />
    </div>
  )
}
