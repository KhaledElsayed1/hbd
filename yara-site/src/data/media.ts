import raw from './media.json'
import { config } from './config'
type M = { photos: { file: string; thumb: string; date: string; year: string }[]; videos: { file: string; poster: string; date: string }[] }
export const media = raw as M
export const pool = media.photos.map(p => p.file)
export const videoUrl = (f: string) => `${import.meta.env.BASE_URL}videos/${f}`
export type Item = { kind: 'photo' | 'video'; file: string; thumb?: string; poster?: string; date: string; caption: string; message: string }
const m = config.autoMessages
const fill = (a: Item[]) => a.map((x, i) => (x.message ? x : { ...x, caption: x.caption || m[i % m.length].caption, message: m[i % m.length].message }))
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }
const photos: Item[] = fill(media.photos.length
  ? media.photos.map(p => ({ kind: 'photo' as const, file: p.file, thumb: p.thumb, date: p.date, caption: '', message: '' }))
  : config.photos.map(p => ({ kind: 'photo' as const, file: p.file, date: p.date, caption: p.caption, message: p.message })))
const videos: Item[] = fill(media.videos.map(v => ({ kind: 'video' as const, file: v.file, poster: v.poster, date: v.date, caption: '', message: '' })))
/** Photos and videos mixed in a different random order on every visit. */
export const mixed: Item[] = shuffle([...photos, ...videos])
const step = Math.max(1, Math.floor(photos.length / 5))
export const stories: Item[] = media.photos.length ? photos.filter((_, i) => i % step === 0).slice(0, 5) : photos.slice(0, 3)
