import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
export default function HeartBurst({ label }: { label: string }) {
  const [n, setN] = useState(0)
  const [bursts, setBursts] = useState<number[]>([])
  const click = () => { const id = Date.now(); setN(n + 1); setBursts(b => [...b, id]); setTimeout(() => setBursts(b => b.filter(x => x !== id)), 1600) }
  return (
    <div className="relative flex flex-col items-center">
      <motion.button onClick={click} aria-label={label} whileTap={{ scale: 0.88 }} animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="relative rounded-full p-6 text-rose drop-shadow-[0_0_35px_rgba(179,37,74,.9)]"><Heart size={110} fill="currentColor" strokeWidth={0} /></motion.button>
      <AnimatePresence>{bursts.map(id => Array.from({ length: 12 }, (_, i) => <motion.span key={id + '-' + i} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 text-xl text-blush" initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }} animate={{ x: Math.cos(i * 0.52) * 160, y: Math.sin(i * 0.52) * -160 - 40, opacity: 0, scale: 1.2 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: 'easeOut' }}>♥</motion.span>))}</AnimatePresence>
      <p className="mt-3 text-sm text-gold" aria-live="polite">{n === 0 ? label : `${n} ${n === 1 ? 'heart' : 'hearts'} sent with love`}</p>
    </div>
  )
}
