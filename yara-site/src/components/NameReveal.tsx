import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../data/config'
export default function NameReveal() {
  const [k, setK] = useState(0)
  const letters = config.name.toUpperCase().split('')
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 text-center" aria-label={config.name}>
      <div aria-hidden className="absolute h-[70vmin] w-[70vmin] rounded-full bg-rose/30 blur-[120px]" />
      <h2 key={k} aria-label={config.name} className="relative flex gap-[0.08em] font-serif text-[26vw] font-medium leading-none sm:text-[18vw] md:text-[15rem]">
        {letters.map((l, i) => (
          <motion.span key={i} aria-hidden className="gold-text inline-block" initial={{ opacity: 0, y: 60, filter: 'blur(24px)', scale: 1.3 }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }} viewport={{ once: true, margin: '-20%' }} transition={{ delay: i * 0.45, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
        ))}
      </h2>
      <motion.p className="relative mt-8 max-w-lg font-serif text-xl italic text-blush/90 sm:text-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: letters.length * 0.45 + 0.8, duration: 1.4 }}>{config.yaraMeaning}</motion.p>
      <button onClick={() => setK(k + 1)} className="btn btn-ghost relative mt-10 !py-2.5 text-xs">Watch it again</button>
    </section>
  )
}
