import { useEffect, useRef } from 'react'
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext('2d')!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let w = 0, h = 0, raf = 0
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight }
    resize(); addEventListener('resize', resize)
    const n = innerWidth < 640 ? 28 : 55
    const ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.4, v: Math.random() * 0.25 + 0.08, p: Math.random() * 6 }))
    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.y -= p.v; p.x += Math.sin(t / 2500 + p.p) * 0.2
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
        ctx.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t / 1400 + p.p))
        ctx.fillStyle = '#e9cd92'; ctx.shadowColor = '#d8b676'; ctx.shadowBlur = 8
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
