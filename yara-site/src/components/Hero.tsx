import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { config } from '../data/config'
import PhotoFrame from './PhotoFrame'
export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const words = config.hero.title.split(' ')
  return (
    <header ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <motion.div className="h-full w-full" initial={{ scale: 1.15, filter: 'blur(14px)' }} animate={ready ? { scale: 1, filter: 'blur(0px)' } : {}} transition={{ duration: 2.4, ease: 'easeOut' }}>
          <PhotoFrame file={config.heroPhoto} alt="My love" eager fallbackIndex={0} className="opacity-70" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/50 to-wine/30" /><div className="absolute inset-0 bg-gradient-to-r from-wine/90 via-wine/30 to-transparent" />
      </motion.div>
      <div className="sec relative z-10 !py-32">
        <motion.p className="mb-6 font-serif text-xl italic text-gold sm:text-2xl" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 1.2 }}>{config.hero.subtitle}</motion.p>
        <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.05] sm:text-7xl md:text-8xl" aria-label={config.hero.title}>
          {words.map((w, i) => (
            <motion.span key={i} aria-hidden className="mr-[0.25em] inline-block" initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ delay: 0.9 + i * 0.13, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{i === words.length - 1 ? <span className="gold-text italic">{w}</span> : w}</motion.span>
          ))}
        </h1>
        <motion.a href="#story" className="btn mt-12" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 2.3 }}>Begin the story</motion.a>
      </div>
      <motion.a href="#story" aria-label="Scroll down" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronDown /></motion.a>
    </header>
  )
}
