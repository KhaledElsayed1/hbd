import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function HeartsCursor() {
  const [hs, setHs] = useState<{ id: number; x: number; y: number }[]>([])
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let last = 0, id = 0
    const move = (e: PointerEvent) => {
      const now = performance.now(); if (now - last < 110) return; last = now
      const h = { id: id++, x: e.clientX, y: e.clientY }
      setHs(s => [...s.slice(-12), h]); setTimeout(() => setHs(s => s.filter(x => x.id !== h.id)), 1400)
    }
    addEventListener('pointermove', move); return () => removeEventListener('pointermove', move)
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {hs.map(h => (
          <motion.span key={h.id} className="absolute text-rose" style={{ left: h.x, top: h.y }} initial={{ opacity: 0.8, scale: 0.4, y: 0 }} animate={{ opacity: 0, scale: 1, y: -50, x: (h.id % 2 ? 1 : -1) * 14 }} exit={{ opacity: 0 }} transition={{ duration: 1.3 }}>♥</motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
