import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../data/config'
import PhotoFrame from './PhotoFrame'
import Reveal from './Reveal'
export default function Letter() {
  const [open, setOpen] = useState(false)
  const L = config.letter
  return (
    <section className="sec text-center" aria-labelledby="le-h">
      <Reveal><h2 id="le-h" className="h2">{L.title}</h2></Reveal>
      <div className="relative mx-auto mt-14 max-w-2xl">
        {!open && (
          <motion.button onClick={() => setOpen(true)} whileHover={{ y: -6 }} aria-label={L.cta} className="relative mx-auto block h-52 w-80 sm:h-60 sm:w-96">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-rose to-cherry shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)]" />
            <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(160deg,transparent 50%,#5a1228 50%),linear-gradient(200deg,transparent 50%,#6a1731 50%)' }} />
            <div className="absolute left-0 top-0 h-1/2 w-full" style={{ background: 'linear-gradient(#8a2442,#6a1731)', clipPath: 'polygon(0 0,100% 0,50% 100%)' }} />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-gold">❤</span><span className="absolute -bottom-10 left-0 right-0 font-serif text-lg italic text-blush/80">{L.cta}</span>
          </motion.button>
        )}
        {open && (
          <motion.article initial={{ opacity: 0, y: 80, rotateX: -25 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="rounded-xl bg-ivory p-8 text-left text-wine shadow-[0_40px_100px_-20px_rgba(0,0,0,.8)] sm:p-14">
            <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-gold"><PhotoFrame file={config.letterPhoto} alt="My love" fallbackIndex={2} /></div>
            {L.paragraphs.map((p, i) => <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.9 }} className={`mb-5 font-serif text-xl leading-relaxed sm:text-2xl ${i === 0 ? 'italic' : ''}`}>{p}</motion.p>)}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + L.paragraphs.length * 0.9 }} className="mt-8 font-serif text-xl italic">{L.signoff}<div className="mt-1 text-3xl text-rose">{config.yourName} ♥</div></motion.div>
          </motion.article>
        )}
      </div>
    </section>
  )
}
