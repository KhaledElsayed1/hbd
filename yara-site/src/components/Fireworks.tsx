import { useEffect, useRef } from 'react'
import { boom } from '../sfx'
export const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const COLORS = ['#f6e2b3', '#d8b676', '#f2cdd3', '#e35a7b', '#b3254a', '#f8f0e4']
const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const pick = () => COLORS[Math.floor(Math.random() * COLORS.length)]
const G = 0.11
type Pt = { x: number; y: number; px: number; py: number; vx: number; vy: number; g: number; life: number; max: number; c: string; s: number }
type Rk = { x: number; y: number; vx: number; vy: number; c: string; heart: boolean }
type Cf = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string; ph: number }

/** Full-screen fireworks (round + heart-shaped), confetti and golden sparkles on ONE canvas. Starts whenever `run` changes to a non-zero value. */
export default function Fireworks({ run }: { run: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv?.getContext?.('2d')
    if (!run || !cv || !ctx || reducedMotion()) return
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5), mobile = innerWidth < 700
    let w = 0, h = 0, raf = 0, lastBoom = 0
    const resize = () => { w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize(); addEventListener('resize', resize)
    const parts: Pt[] = [], rockets: Rk[] = [], conf: Cf[] = []
    const stars = Array.from({ length: mobile ? 35 : 60 }, () => ({ x: Math.random(), y: Math.random(), p: Math.random() * 6, v: rnd(0.1, 0.4) }))
    const newConf = (stagger: boolean): Cf => ({ x: rnd(0, w), y: stagger ? rnd(-h * 0.8, -10) : rnd(-40, -10), vx: rnd(-0.4, 0.4), vy: rnd(1.4, 3.2), r: rnd(0, 6), vr: rnd(-0.12, 0.12), w: rnd(6, 10), h: rnd(10, 16), c: pick(), ph: rnd(0, 6) })
    for (let i = 0; i < (mobile ? 80 : 140); i++) conf.push(newConf(true))
    const explode = (x: number, y: number, c: string, heart: boolean) => {
      if (parts.length > 700) return
      const n = heart ? 64 : mobile ? 56 : 84
      for (let i = 0; i < n; i++) {
        let vx: number, vy: number
        if (heart) { const a = (i / n) * Math.PI * 2, k = rnd(0.95, 1.05) * 0.26; vx = 16 * Math.sin(a) ** 3 * k; vy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * k }
        else { const a = Math.random() * 6.283, sp = rnd(1, 5.2) * (Math.random() < 0.3 ? 0.55 : 1); vx = Math.cos(a) * sp; vy = Math.sin(a) * sp }
        const max = rnd(60, 100)
        parts.push({ x, y, px: x, py: y, vx, vy, g: heart ? 0.02 : 0.035, life: max, max, c: Math.random() < 0.2 ? '#f8f0e4' : c, s: rnd(1.3, 2.3) })
      }
      const now = performance.now()
      if (now - lastBoom > 140) { lastBoom = now; boom(heart ? 1 : 0.8) }
    }
    const t0 = performance.now()
    let last = t0, nextLaunch = t0 + 150
    const frame = (now: number) => {
      const dt = Math.min(2.5, (now - last) / 16.667), el = (now - t0) / 1000; last = now
      ctx.clearRect(0, 0, w, h)
      if (el < 46 && now >= nextLaunch) {
        rockets.push({ x: rnd(w * 0.12, w * 0.88), y: h + 8, vx: rnd(-0.6, 0.6), vy: -Math.sqrt(2 * G * (h - rnd(h * 0.14, h * 0.45))), c: pick(), heart: Math.random() < 0.35 })
        nextLaunch = now + (el < 3 ? rnd(220, 420) : el < 20 ? rnd(650, 1100) : rnd(1800, 2600))
      }
      ctx.globalCompositeOperation = 'source-over'
      for (let i = conf.length - 1; i >= 0; i--) {
        const f = conf[i]; f.y += f.vy * dt; f.x += (f.vx + Math.sin(f.ph + el * 2) * 0.6) * dt; f.r += f.vr * dt
        if (f.y > h + 30) { if (el < 14) Object.assign(f, newConf(false)); else { conf.splice(i, 1); continue } }
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.r); ctx.scale(1, Math.cos(f.r * 2 + f.ph)); ctx.fillStyle = f.c; ctx.globalAlpha = 0.9; ctx.fillRect(-f.w / 2, -f.h / 2, f.w, f.h); ctx.restore()
      }
      ctx.globalCompositeOperation = 'lighter'
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]; r.x += r.vx * dt; r.y += r.vy * dt; r.vy += G * dt
        ctx.fillStyle = '#f6e2b3'; ctx.globalAlpha = 0.9; ctx.fillRect(r.x - 1, r.y, 2, 8)
        if (r.vy > -0.6) { explode(r.x, r.y, r.c, r.heart); rockets.splice(i, 1) }
      }
      const fric = Math.pow(0.985, dt)
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.px = p.x; p.py = p.y; p.vx *= fric; p.vy = p.vy * fric + p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt
        if (p.life <= 0) { parts.splice(i, 1); continue }
        ctx.globalAlpha = Math.min(1, p.life / p.max * 1.4); ctx.strokeStyle = p.c; ctx.lineWidth = p.s; ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke()
      }
      if (el < 50) {
        const fade = el > 44 ? (50 - el) / 6 : 1
        for (const s of stars) {
          const y = (((s.y * h - el * s.v * 12) % h) + h) % h, x = s.x * w
          ctx.globalAlpha = ((Math.sin(el * 2 + s.p) + 1) / 2) * 0.8 * fade; ctx.fillStyle = '#f6e2b3'; ctx.fillRect(x - 1, y - 1, 2.4, 2.4); ctx.fillRect(x - 4, y - 0.4, 8, 0.8); ctx.fillRect(x - 0.4, y - 4, 0.8, 8)
        }
      }
      if (el > 50 && !parts.length && !rockets.length && !conf.length) { ctx.clearRect(0, 0, w, h); return }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); ctx.clearRect(0, 0, w, h) }
  }, [run])
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[75] h-full w-full" />
}
