import { config } from '../data/config'
import Reveal from './Reveal'
import HeartBurst from './HeartBurst'
export default function Finale() {
  return (
    <footer className="relative flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center">
      <Reveal><h2 className="h2 max-w-3xl">{config.finale.title}</h2><p className="mx-auto mt-6 max-w-xl font-serif text-2xl italic text-blush/90">{config.finale.text}</p></Reveal>
      <Reveal delay={0.2} className="mt-12"><HeartBurst label={config.finale.button} /></Reveal>
      <p className="mt-16 font-serif text-lg text-gold">Made with all my love, for my fiancée.</p>
    </footer>
  )
}
