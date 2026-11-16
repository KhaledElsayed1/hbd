import { useSyncExternalStore } from 'react'
import { Music2, VolumeX } from 'lucide-react'
import { getPlaying, subscribe, toggleMusic } from '../audio'
export default function Music() {
  const on = useSyncExternalStore(subscribe, getPlaying)
  return (
    <button onClick={() => toggleMusic()} aria-pressed={on} aria-label={on ? 'Pause music' : 'Play music'} className="glass fixed bottom-5 right-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full text-gold transition hover:scale-110">
      {on ? <Music2 className="animate-pulse" size={20} /> : <VolumeX size={20} />}
    </button>
  )
}
