import { config } from './data/config'
// Plays the songs listed in config.music (public/audio/*.mp3) one after another, looping. If none exist, a romantic generative piano plays.
// Romantic generative music (piano-like arpeggios + warm pad + reverb). If public/audio/music.mp3 exists, it plays instead.
let ctx: AudioContext | null = null, bus: GainNode, master: GainNode, timer: number | undefined
let file: HTMLAudioElement | null = null, playing = false, step = 0, next = 0, idx = 0
const songs: string[] = (config as { music?: string[] }).music ?? ['audio/habibi.mp3']
const subs = new Set<() => void>()
export const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
export const getPlaying = () => playing
const set = (v: boolean) => { playing = v; subs.forEach(f => f()) }
const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12)
const chords = [[57, 60, 64, 69], [53, 60, 65, 69], [60, 64, 67, 72], [55, 62, 67, 71]] // Am F C G
const pattern = [0, 1, 2, 3, 2, 1, 2, 1], EIGHTH = 60 / 62 / 2

function build() {
  ctx = new AudioContext(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination)
  bus = ctx.createGain(); const wet = ctx.createGain(); wet.gain.value = 0.6; const rev = ctx.createConvolver()
  const len = ctx.sampleRate * 3.4, buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6) }
  rev.buffer = buf; bus.connect(master); bus.connect(rev); rev.connect(wet); wet.connect(master)
}
function note(f: number, t: number, dur: number, v: number) {
  const c = ctx!, g = c.createGain(), lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  for (const [type, m, vol] of [['triangle', 1, 1], ['sine', 2, 0.25], ['sine', 3.01, 0.07]] as const) {
    const o = c.createOscillator(), og = c.createGain(); o.type = type; o.frequency.value = f * m; og.gain.value = vol; o.connect(og); og.connect(lp); o.start(t); o.stop(t + dur + 0.05)
  }
  lp.connect(g); g.connect(bus)
}
function pad(f: number, t: number, dur: number) {
  const c = ctx!, g = c.createGain(), o = c.createOscillator(); o.frequency.value = f; o.detune.value = (Math.random() - 0.5) * 8
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.045, t + 1.6); g.gain.linearRampToValueAtTime(0.0001, t + dur)
  o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.1)
}
function tick() {
  const c = ctx!
  while (next < c.currentTime + 1.4) {
    const s = step % 8, ch = chords[Math.floor(step / 8) % 4]
    note(mtof(ch[pattern[s]]), next, 2.4, 0.15)
    if (s === 0) { note(mtof(ch[0] - 12), next, 3.6, 0.22); ch.slice(0, 3).forEach(m => pad(mtof(m), next, 4.6)) }
    if (s % 3 === 0 && Math.random() < 0.55) note(mtof(ch[1 + Math.floor(Math.random() * 3)] + 12), next + EIGHTH * 0.5, 2, 0.09)
    step++; next += EIGHTH
  }
}
async function playSong(): Promise<boolean> {
  for (let n = 0; n < songs.length; n++) {
    const a = new Audio(`${import.meta.env.BASE_URL}${songs[idx]}`); a.volume = 0.7
    a.onended = () => { idx = (idx + 1) % songs.length; file = null; playSong() }
    try { await a.play(); file = a; return true } catch { idx = (idx + 1) % songs.length }
  }
  return false
}
export async function startMusic() {
  if (playing) return
  if (!ctx) build()
  ctx!.resume()
  if (file) { try { await file.play(); set(true); return } catch { file = null } }
  if (await playSong()) { set(true); return }
  next = ctx!.currentTime + 0.1; master.gain.cancelScheduledValues(0); master.gain.setTargetAtTime(0.9, ctx!.currentTime, 1.2)
  window.clearInterval(timer); timer = window.setInterval(tick, 250); tick(); set(true)
}
export function stopMusic() {
  file?.pause()
  if (ctx) { master.gain.setTargetAtTime(0, ctx.currentTime, 0.4); window.clearInterval(timer); timer = undefined }
  set(false)
}
export const toggleMusic = () => (playing ? stopMusic() : startMusic())
