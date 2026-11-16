import { motion } from 'framer-motion'
const flowers = [
  { x: 150, y: 92, s: 1.15, c: '#b3254a' }, { x: 92, y: 128, s: 0.9, c: '#f2cdd3' }, { x: 208, y: 128, s: 0.9, c: '#d8b676' },
  { x: 120, y: 66, s: 0.7, c: '#e68aa0' }, { x: 182, y: 70, s: 0.75, c: '#f8f0e4' },
]
function Flower({ x, y, s, c, i }: { x: number; y: number; s: number; c: string; i: number }) {
  return (
    <motion.g style={{ transformOrigin: `${x}px ${y}px` }} initial={{ scale: 0, rotate: -40, opacity: 0 }} whileInView={{ scale: s, rotate: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.25, duration: 1.2, type: 'spring', bounce: 0.35 }}>
      {[0, 60, 120, 180, 240, 300].map(a => <ellipse key={a} cx={x} cy={y - 20} rx="11" ry="20" fill={c} opacity=".92" transform={`rotate(${a} ${x} ${y})`} />)}
      <circle cx={x} cy={y} r="8" fill="#d8b676" />
    </motion.g>
  )
}
export default function Bouquet() {
  return (
    <svg viewBox="0 0 300 340" role="img" aria-label="An animated bouquet of flowers" className="mx-auto w-full max-w-xs drop-shadow-[0_20px_40px_rgba(0,0,0,.5)]">
      {flowers.map((f, i) => <motion.path key={i} d={`M150 290 Q${(150 + f.x) / 2 + (i % 2 ? 10 : -10)} ${(290 + f.y) / 2} ${f.x} ${f.y}`} stroke="#5f8a5b" strokeWidth="4" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: i * 0.12 }} />)}
      {[-1, 1].map(d => <motion.path key={d} d={`M150 250 Q${150 + d * 40} 215 ${150 + d * 62} 225 Q${150 + d * 40} 255 150 250`} fill="#4d7a4a" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8 }} style={{ transformOrigin: '150px 250px' }} />)}
      {flowers.map((f, i) => <Flower key={i} {...f} i={i} />)}
      <path d="M95 300 L150 262 L205 300 L190 335 L110 335Z" fill="#f2cdd3" opacity=".9" /><path d="M95 300 L150 275 L205 300" stroke="#d8b676" strokeWidth="3" fill="none" />
    </svg>
  )
}
