import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../data/config'
import Reveal from './Reveal'
export default function Reasons() {
  const [open, setOpen] = useState<number[]>([])
  const toggle = (i: number) => setOpen(o => (o.includes(i) ? o.filter(x => x !== i) : [...o, i]))
  return (
    <section className="sec" aria-labelledby="re-h">
      <Reveal className="mb-14 text-center"><h2 id="re-h" className="h2">Reasons Why I Love You</h2><p className="mt-4 font-serif text-xl italic text-blush/80">Tap a card. There are more than I can count.</p></Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {config.reasons.map((r, i) => {
          const on = open.includes(i)
          return (
            <Reveal key={r.front} delay={i * 0.07}>
              <button onClick={() => toggle(i)} aria-pressed={on} className="h-52 w-full [perspective:1000px]">
                <motion.div className="relative h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: on ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -4 }}>
                  <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl [backface-visibility:hidden]"><span className="text-2xl text-gold">♥</span><span className="font-serif text-3xl">{r.front}</span></div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-[#f0d8a0] p-6 text-wine [backface-visibility:hidden] [transform:rotateY(180deg)]"><p className="font-serif text-xl font-medium leading-snug">{r.back}</p></div>
                </motion.div>
              </button>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
