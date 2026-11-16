import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../data/config'
import { getPlaying, startMusic } from '../audio'
export default function Intro({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [fin, setFin] = useState(false)
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    if (!open) return
    let i = 0; const t = setTimeout(function tick() { i++; setTyped(config.intro.message.slice(0, i)); i < config.intro.message.length ? setTimeout(tick, 32) : setFin(true) }, 1100)
    return () => clearTimeout(t)
  }, [open])
  useEffect(() => { document.body.style.overflow = leaving ? '' : 'hidden'; return () => { document.body.style.overflow = '' } }, [leaving])
  const go = () => { if (!getPlaying()) startMusic(); setLeaving(true); setTimeout(onDone, 1100) }
  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-wine px-5" exit={{ opacity: 0, scale: 1.08, filter: 'blur(14px)' }} transition={{ duration: 1 }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#5b1228_0%,#220810_70%)]" />
          <motion.p className="relative mb-10 font-serif text-xl italic text-blush/90 sm:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: open ? 0 : 1 }} transition={{ delay: open ? 0 : 0.8, duration: 1.2 }}>{config.intro.envelopeHint}</motion.p>
          <motion.button onClick={() => { setOpen(true); startMusic() }} disabled={open} aria-label="Open the envelope" className="relative h-44 w-72 sm:h-52 sm:w-80" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: open ? 60 : 0 }} transition={{ duration: 1.1 }} whileHover={open ? undefined : { scale: 1.04 }}>
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#7a1b38] to-[#4a0f22] shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)]" />
            <motion.div className="absolute left-4 right-4 rounded-sm bg-ivory p-4 text-wine" initial={{ top: 10, height: '85%' }} animate={{ top: open ? -120 : 10 }} transition={{ duration: 1, delay: 0.5 }}><div className="font-serif text-lg italic">For my love</div></motion.div>
            <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(160deg,transparent 50%,#5a1228 50%),linear-gradient(200deg,transparent 50%,#6a1731 50%)' }} />
            <motion.div className="absolute left-0 top-0 h-1/2 w-full origin-top" style={{ background: 'linear-gradient(#8a2442,#6a1731)', clipPath: 'polygon(0 0,100% 0,50% 100%)', zIndex: open ? 0 : 2 }} animate={{ rotateX: open ? 180 : 0 }} transition={{ duration: 0.9 }} />
            {!open && <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-3xl text-gold drop-shadow">❤</span>}
          </motion.button>
          <div className="relative mt-24 min-h-[9rem] max-w-xl text-center">
            {open && <p aria-live="polite" className="font-serif text-2xl leading-relaxed text-ivory sm:text-3xl">{typed}<span className="ml-0.5 inline-block w-px animate-pulse bg-gold">&nbsp;</span></p>}
            {fin && <motion.button className="btn mt-8" onClick={go} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>{config.intro.button}</motion.button>}
          </div>
          <button onClick={go} className="absolute bottom-6 text-xs text-ivory/50 underline-offset-4 hover:underline">Skip intro</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
