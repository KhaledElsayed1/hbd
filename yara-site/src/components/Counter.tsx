import { useEffect, useState } from 'react'
import { config } from '../data/config'
import Reveal from './Reveal'
function diff(from: Date, to: Date) {
  let y = to.getFullYear() - from.getFullYear(), m = to.getMonth() - from.getMonth(), d = to.getDate() - from.getDate()
  let h = to.getHours() - from.getHours(), mi = to.getMinutes() - from.getMinutes(), s = to.getSeconds() - from.getSeconds()
  if (s < 0) { s += 60; mi-- } if (mi < 0) { mi += 60; h-- } if (h < 0) { h += 24; d-- }
  if (d < 0) { d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); m-- } if (m < 0) { m += 12; y-- }
  return [['Years', y], ['Months', m], ['Days', d], ['Hours', h], ['Minutes', mi], ['Seconds', s]] as const
}
export default function Counter() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  const start = new Date(config.startDate)
  const parts = now < start ? diff(now, start) : diff(start, now)
  return (
    <section className="sec text-center" aria-labelledby="co-h">
      <Reveal><h2 id="co-h" className="h2">Every second with you</h2><p className="mt-3 font-serif text-xl italic text-blush/80">{now < start ? 'Counting down to us' : 'and I would take every single one again'}</p></Reveal>
      <div role="timer" aria-live="off" className="mt-12 grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-6">
        {parts.map(([l, v]) => <div key={l} className="glass rounded-2xl px-2 py-6"><div className="gold-text font-serif text-5xl tabular-nums sm:text-6xl">{String(v).padStart(2, '0')}</div><div className="mt-2 text-xs text-ivory/70">{l}</div></div>)}
      </div>
    </section>
  )
}
