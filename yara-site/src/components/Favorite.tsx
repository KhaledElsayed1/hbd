import { config } from '../data/config'
import PhotoFrame from './PhotoFrame'
import Reveal from './Reveal'
import Bouquet from './Bouquet'
import HeartBurst from './HeartBurst'
export default function Favorite() {
  return (
    <section className="sec" aria-labelledby="fav-h">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal><div className="mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-t-[999px] rounded-b-2xl border border-gold/40 shadow-[0_40px_100px_-30px_rgba(179,37,74,.6)]"><PhotoFrame file={config.favoritePhoto} alt="My favorite person" fallbackIndex={1} /></div></Reveal>
        <Reveal delay={0.15}><h2 id="fav-h" className="h2">{config.favorite.title}</h2>{config.favorite.text.map(t => <p key={t} className="mt-6 font-serif text-xl leading-relaxed text-ivory/90">{t}</p>)}<div className="mt-10"><HeartBurst label="Tap the heart" /></div></Reveal>
      </div>
      <Reveal className="mt-24"><Bouquet /><p className="mt-4 text-center font-serif text-xl italic text-blush/80">Flowers that never fade, for you</p></Reveal>
    </section>
  )
}
