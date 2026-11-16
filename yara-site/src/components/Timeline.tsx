import { config } from '../data/config'
import PhotoFrame from './PhotoFrame'
import Reveal from './Reveal'
export default function Timeline() {
  return (
    <section id="story" className="sec" aria-labelledby="story-h">
      <Reveal className="mb-20 text-center"><h2 id="story-h" className="h2">Our Love Story</h2><p className="mt-4 font-serif text-xl italic text-blush/80">Every chapter, with you in it</p></Reveal>
      <div className="relative">
        <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:left-1/2" />
        <ol className="space-y-16 md:space-y-24">
          {config.timeline.map((t, i) => (
            <li key={t.title} className={`relative grid gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <span aria-hidden className="absolute left-[10px] top-3 h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_20px_4px_rgba(216,182,118,.6)] md:left-1/2 md:-translate-x-1/2" />
              <Reveal><div className="glass overflow-hidden rounded-2xl"><div className="aspect-[4/3] overflow-hidden"><div className="h-full w-full transition duration-[1500ms] hover:scale-105"><PhotoFrame file={t.photo} alt={t.title} fallbackIndex={3 + i} /></div></div></div></Reveal>
              <Reveal delay={0.15} className="self-center"><p className="text-sm text-gold">{t.date}</p><h3 className="mt-2 font-serif text-3xl sm:text-4xl">{t.title}</h3><p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-ivory/85">{t.text}</p></Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
