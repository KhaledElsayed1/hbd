import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gift as GiftIcon } from 'lucide-react'
import { birthday } from '../data/birthday'
import Fireworks, { reducedMotion } from './Fireworks'
import { chime, puff } from '../sfx'
import './birthday.css'

const HEIGHTS = [200, 250, 220], DUR = ['1.3s', '1.6s', '1.45s']

function Candle({ i, out, onOut }: { i: number; out: boolean; onOut: () => void }) {
  const top = 300 - HEIGHTS[i], fy = top - 8, gid = `bd-f${i}`, bid = `bd-b${i}`
  return (
    <button type="button" className="candle" style={{ ['--d' as string]: DUR[i] }} disabled={out} onClick={onOut} aria-label={out ? `Candle ${i + 1}, blown out` : `Blow out candle ${i + 1}`}>
      <div className={`glow ${out ? 'off' : ''}`} style={{ top: `${(top - 34) / 3}%` }} />
      <svg viewBox="0 0 80 300" aria-hidden focusable="false">
        <defs>
          <linearGradient id={bid} x1="0" x2="1"><stop offset="0" stopColor="#e2b8b2" /><stop offset=".45" stopColor="#fff4e6" /><stop offset="1" stopColor="#d3a3a8" /></linearGradient>
          <linearGradient id={gid} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ff8a2b" /><stop offset=".6" stopColor="#ffc15a" /><stop offset="1" stopColor="#ffe9a8" stopOpacity=".6" /></linearGradient>
        </defs>
        <ellipse cx="40" cy="294" rx="22" ry="5" fill="#000" opacity=".35" />
        <rect x="26" y={top} width="28" height={292 - top} rx="4" fill={`url(#${bid})`} />
        <ellipse cx="40" cy={top} rx="14" ry="4" fill="#fff9ef" />
        <path d={`M29 ${top + 1}v16a3 3 0 0 0 6 0v-14z`} fill="#fff6ea" />
        <path d={`M45 ${top + 2}v10a2.6 2.6 0 0 0 5.2 0v-9z`} fill="#fff6ea" />
        <rect x="26" y={top + (292 - top) * 0.45} width="28" height="4" fill="#d8b676" opacity=".8" />
        <line x1="40" y1={top} x2="40" y2={fy} stroke={out ? '#3a2a26' : '#2a1a14'} strokeWidth="2.2" strokeLinecap="round" />
        {out && <circle className="ember" cx="40" cy={fy} r="2" fill="#ff7a3a" />}
        <g transform={`translate(40 ${fy})`}>
          <g className={`flame ${out ? 'off' : ''}`}>
            <path d="M0 0C-10 -10 -11 -26 0 -50C11 -26 10 -10 0 0Z" fill={`url(#${gid})`} />
            <path d="M0 -2C-5 -8 -5 -18 0 -30C5 -18 5 -8 0 -2Z" fill="#fff6d2" />
            <ellipse cx="0" cy="-4" rx="3.4" ry="4.5" fill="#7fa4ff" opacity=".5" />
          </g>
        </g>
      </svg>
      {out && [0, 1, 2, 3].map(k => <span key={k} className="smoke" style={{ top: `${(fy - 6) / 3}%`, animationDelay: `${k * 0.45}s`, ['--sx' as string]: `${(k % 2 ? 1 : -1) * (8 + k * 5)}px` }} />)}
    </button>
  )
}

function Typewriter({ text, delay = 0, speed = 38, onDone }: { text: string; delay?: number; speed?: number; onDone?: () => void }) {
  const chars = useMemo(() => Array.from(text), [text])
  const [n, setN] = useState(reducedMotion() ? chars.length : 0)
  useEffect(() => {
    if (reducedMotion()) { onDone?.(); return }
    let i = 0, iv = 0
    const t = window.setTimeout(() => { iv = window.setInterval(() => { i++; setN(i); if (i >= chars.length) { clearInterval(iv); onDone?.() } }, speed) }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])
  return <><span className="sr-only">{text}</span><span aria-hidden>{chars.slice(0, n).join('')}{n < chars.length && <i className="cursor">&nbsp;</i>}</span></>
}

function Hearts() {
  const hs = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ left: Math.random() * 100, size: 14 + Math.random() * 26, dur: 9 + Math.random() * 9, delay: -Math.random() * 14, c: ['#e35a7b', '#f2cdd3', '#d8b676', '#b3254a'][i % 4] })), [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[74] overflow-hidden">
      {hs.map((h, i) => <span key={i} className="bd-heart" style={{ left: `${h.left}%`, fontSize: h.size, color: h.c, animationDelay: `${h.delay}s`, ['--dur' as string]: `${h.dur}s` }}>♥</span>)}
    </div>
  )
}

function GiftReveal({ onReplay }: { onReplay: () => void }) {
  const [bad, setBad] = useState(false)
  const [second, setSecond] = useState(false)
  return (
    <motion.div className="relative z-[76] flex flex-col items-center text-center" initial={{ opacity: 0, scale: 0.6, filter: 'blur(14px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="gift-frame"><div className="gift-inner">
        {bad ? (
          <div className="flex aspect-[4/5] w-[78vw] max-w-[420px] flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-rose/50 via-cherry to-wine p-6">
            <GiftIcon className="h-12 w-12 text-gold" strokeWidth={1.2} />
            <p className="font-serif text-xl italic text-blush">Your gift photo goes here</p>
            <p className="text-xs text-ivory/60">Add it at public/{birthday.giftPhoto}</p>
          </div>
        ) : <img className="gift-img" src={`${import.meta.env.BASE_URL}${birthday.giftPhoto}`} alt={birthday.giftAlt} decoding="async" onError={() => setBad(true)} />}
      </div></div>
      <p className="mt-8 min-h-[2.2rem] max-w-xl font-serif text-2xl italic text-blush sm:text-3xl"><Typewriter text={birthday.line1} delay={1700} onDone={() => setSecond(true)} /></p>
      <p className="mt-3 min-h-[3rem] max-w-xl font-serif text-xl leading-relaxed text-ivory/90 sm:text-2xl">{second && <Typewriter text={birthday.line2} speed={32} />}</p>
      <button className="btn btn-ghost mt-8 !py-2.5 text-xs" onClick={onReplay}>{birthday.replay}</button>
    </motion.div>
  )
}

/** Final section: three candles → fireworks + confetti → gift photo reveal. Happens only once. */
export default function Birthday() {
  const [lit, setLit] = useState([true, true, true])
  const [phase, setPhase] = useState<'candles' | 'fireworks' | 'gift'>('candles')
  const [run, setRun] = useState(0)
  const done = useRef(false), ref = useRef<HTMLElement>(null)
  const blow = (i: number) => { if (!lit[i]) return; puff(); setLit(l => l.map((v, j) => (j === i ? false : v))) }
  useEffect(() => {
    if (lit.some(Boolean) || done.current) return
    done.current = true
    window.setTimeout(() => { setPhase('fireworks'); setRun(1); ref.current?.scrollIntoView?.({ behavior: 'smooth', block: 'center' }) }, 900)
    window.setTimeout(() => { setPhase('gift'); chime() }, 3400)
  }, [lit])
  const left = lit.filter(Boolean).length
  return (
    <section ref={ref} aria-label="Birthday surprise" className="bd relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-16">
      <div aria-hidden className="bd-glow" style={{ opacity: phase === 'candles' ? 0.25 + left * 0.25 : 0.5 }} />
      <p className="sr-only" aria-live="polite">{left === 3 ? '' : left > 0 ? `${left} candle${left > 1 ? 's' : ''} left` : 'All candles are out'}</p>
      <AnimatePresence mode="wait">
        {phase === 'candles' && (
          <motion.div key="candles" className="relative z-10 flex flex-col items-center text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1 }} exit={{ opacity: 0, scale: 0.94, filter: 'blur(10px)', transition: { duration: 1 } }}>
            <h2 className="gold-text mb-14 max-w-2xl font-serif text-4xl italic leading-tight sm:text-6xl">{birthday.title}</h2>
            <div className="candles" role="group" aria-label="Three birthday candles">
              {[0, 1, 2].map(i => <Candle key={i} i={i} out={!lit[i]} onOut={() => blow(i)} />)}
            </div>
            <div className="plate" aria-hidden />
            <p className="mt-10 max-w-md font-serif text-xl italic text-blush/90 sm:text-2xl">{birthday.hint}</p>
          </motion.div>
        )}
        {phase === 'gift' && <GiftReveal key="gift" onReplay={() => setRun(r => r + 1)} />}
      </AnimatePresence>
      <Fireworks run={run} />
      {phase !== 'candles' && !reducedMotion() && <Hearts />}
    </section>
  )
}
