import { useState } from 'react'
import { Heart } from 'lucide-react'
import { pool } from '../data/media'
export const imgUrl = (f: string) => `${import.meta.env.BASE_URL}images/${f}`
/** If `file` is missing, falls back to your auto-loaded photo #fallbackIndex, then to a placeholder. */
type P = { file: string; alt: string; className?: string; eager?: boolean; fallbackIndex?: number }
export default function PhotoFrame({ file, alt, className = '', eager, fallbackIndex }: P) {
  const fb = fallbackIndex !== undefined && pool.length ? pool[fallbackIndex % pool.length] : undefined
  const [src, setSrc] = useState(file)
  const [bad, setBad] = useState(false)
  if (bad)
    return (
      <div role="img" aria-label={alt} className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose/60 via-cherry to-wine p-4 text-center ${className}`}>
        <Heart className="h-8 w-8 text-gold/80" strokeWidth={1.2} />
        <span className="font-serif text-lg italic text-blush/90">{alt}</span>
        <span className="text-[11px] text-ivory/50">add public/images/{file}</span>
      </div>
    )
  return <img src={imgUrl(src)} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => (fb && src !== fb ? setSrc(fb) : setBad(true))} className={`h-full w-full object-cover ${className}`} />
}
