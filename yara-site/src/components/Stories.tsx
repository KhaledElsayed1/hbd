import { stories } from '../data/media'
import PhotoFrame from './PhotoFrame'
import Reveal from './Reveal'
export default function Stories() {
  const items = stories
  return (
    <section className="sec" aria-labelledby="st-h">
      <Reveal className="mb-20 text-center"><h2 id="st-h" className="h2">Every Picture Has a Story</h2></Reveal>
      <div className="space-y-24">
        {items.map((p, i) => (
          <article key={p.file} className={`grid items-center gap-10 md:grid-cols-5 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <Reveal className="md:col-span-3"><div className="relative"><div aria-hidden className="absolute -inset-3 rounded-[1.6rem] border border-gold/30" /><div className="aspect-[4/3] overflow-hidden rounded-2xl"><PhotoFrame file={p.file} alt={p.caption} /></div></div></Reveal>
            <Reveal delay={0.2} className="md:col-span-2"><p className="text-sm text-gold">{p.date}</p><h3 className="mt-2 font-serif text-4xl">{p.caption}</h3><p className="mt-4 font-serif text-xl italic leading-relaxed text-blush/90">{p.message}</p></Reveal>
          </article>
        ))}
      </div>
    </section>
  )
}
