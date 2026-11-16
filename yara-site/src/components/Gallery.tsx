import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { mixed, videoUrl, type Item } from '../data/media'
import PhotoFrame from './PhotoFrame'
import Reveal from './Reveal'
const base = import.meta.env.BASE_URL
/** Shows the WHOLE photo/video (never cropped) over a blurred copy of itself, so the square is always filled. */
function Media({ it, contain }: { it: Item; contain: boolean }) {
  const cls = `h-full w-full ${contain ? 'object-contain' : 'object-cover'}`
  if (it.kind === 'video') return it.poster ? <img src={`${base}videos/${it.poster}`} alt="" loading="lazy" className={cls} /> : <video src={`${videoUrl(it.file)}#t=0.5`} muted playsInline preload="metadata" className={cls} />
  return <PhotoFrame file={it.thumb || it.file} alt={it.caption} className={contain ? '!object-contain' : ''} />
}
export default function Gallery() {
  const [shown, setShown] = useState(48)
  const [idx, setIdx] = useState<number | null>(null)
  const step = useCallback((d: number) => setIdx(i => (i === null ? i : (i + d + mixed.length) % mixed.length)), [])
  useEffect(() => {
    if (idx === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setIdx(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [idx, step])
  const cur = idx !== null ? mixed[idx] : null
  return (
    <section id="gallery" className="sec" aria-labelledby="gal-h">
      <Reveal className="text-center"><h2 id="gal-h" className="h2">A Collection of Beautiful Memories</h2><p className="mt-4 font-serif text-xl italic text-blush/80">Eight years of us, every picture and every moment in motion</p></Reveal>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {mixed.slice(0, shown).map((it, i) => (
          <motion.button key={it.kind + it.file} onClick={() => setIdx(i)} aria-label={`Open ${it.kind}: ${it.caption}`} className="group relative aspect-square overflow-hidden rounded-xl border border-gold/20 bg-cherry"
            initial={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true, margin: '60px' }} transition={{ duration: 0.8 }}>
            <div aria-hidden className="absolute inset-0 scale-125 opacity-50 blur-2xl"><Media it={it} contain={false} /></div>
            <div className="absolute inset-0 transition duration-700 group-hover:scale-105"><Media it={it} contain /></div>
            {it.kind === 'video' && <span className="absolute right-2 top-2 rounded-full bg-wine/75 p-1.5 text-gold"><Play size={14} fill="currentColor" /></span>}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-wine/80 via-transparent p-3 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"><span className="text-xs text-gold">{it.date || it.caption}</span></div>
          </motion.button>
        ))}
      </div>
      {shown < mixed.length && <div className="mt-12 text-center"><button className="btn btn-ghost" onClick={() => setShown(s => s + 48)}>More memories ({mixed.length - shown})</button></div>}
      <AnimatePresence>
        {cur && (
          <motion.div role="dialog" aria-modal="true" aria-label={cur.caption} className="fixed inset-0 z-[70] flex items-center justify-center bg-wine/95 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)}>
            <button aria-label="Close" onClick={() => setIdx(null)} className="absolute right-5 top-5 z-10 rounded-full border border-gold/40 p-2 text-gold"><X /></button>
            <button aria-label="Previous" onClick={e => { e.stopPropagation(); step(-1) }} className="absolute left-3 top-1/2 z-10 rounded-full border border-gold/40 bg-wine/60 p-2 text-gold"><ChevronLeft /></button>
            <button aria-label="Next" onClick={e => { e.stopPropagation(); step(1) }} className="absolute right-3 top-1/2 z-10 rounded-full border border-gold/40 bg-wine/60 p-2 text-gold"><ChevronRight /></button>
            <motion.figure key={cur.kind + cur.file} onClick={e => e.stopPropagation()} className="flex w-full max-w-3xl flex-col items-center" initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.45 }}>
              <div className="h-[62vh] w-[88vw] max-w-3xl overflow-hidden rounded-lg border border-gold/30 bg-black/40 shadow-2xl">
                {cur.kind === 'video' ? <video src={videoUrl(cur.file)} controls autoPlay playsInline className="h-full w-full object-contain" /> : <PhotoFrame file={cur.file} alt={cur.caption} className="!object-contain" />}
              </div>
              <figcaption className="mt-4 text-center"><p className="font-serif text-2xl">{cur.caption}</p><p className="mt-2 max-w-lg font-serif text-lg italic text-blush/90">{cur.message}</p></figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
