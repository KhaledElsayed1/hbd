// Tiny WebAudio sound effects. The AudioContext is only created on the first call, which always follows a tap/click.
let ac: AudioContext | null = null
const ctx = () => {
  try { if (!ac) ac = new AudioContext(); if (ac.state === 'suspended') void ac.resume(); return ac } catch { return null }
}
const noise = (c: AudioContext, dur: number) => {
  const b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const s = c.createBufferSource(); s.buffer = b; return s
}
const env = (g: GainNode, t: number, peak: number, attack: number, end: number) => {
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + end)
}
/** soft "pfff" when a candle is blown out */
export function puff() {
  const c = ctx(); if (!c) return; const t = c.currentTime
  const n = noise(c, 0.6), f = c.createBiquadFilter(), g = c.createGain()
  f.type = 'bandpass'; f.Q.value = 0.8; f.frequency.setValueAtTime(1800, t); f.frequency.exponentialRampToValueAtTime(500, t + 0.45)
  env(g, t, 0.22, 0.05, 0.5); n.connect(f); f.connect(g); g.connect(c.destination); n.start(t); n.stop(t + 0.6)
}
/** distant firework thump + crackle */
export function boom(size = 1) {
  const c = ctx(); if (!c) return; const t = c.currentTime
  const o = c.createOscillator(), g = c.createGain()
  o.type = 'sine'; o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.35)
  env(g, t, 0.2 * size, 0.01, 0.4); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 0.45)
  const n = noise(c, 0.3), h = c.createBiquadFilter(), g2 = c.createGain()
  h.type = 'highpass'; h.frequency.value = 3200; env(g2, t + 0.05, 0.05 * size, 0.02, 0.25)
  n.connect(h); h.connect(g2); g2.connect(c.destination); n.start(t + 0.05); n.stop(t + 0.35)
}
/** gentle two-note chime for the gift reveal */
export function chime() {
  const c = ctx(); if (!c) return
  ;[880, 1318.5].forEach((f, i) => {
    const t = c.currentTime + i * 0.22, o = c.createOscillator(), g = c.createGain()
    o.type = 'sine'; o.frequency.value = f; env(g, t, 0.08, 0.02, 1.6); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 1.7)
  })
}
